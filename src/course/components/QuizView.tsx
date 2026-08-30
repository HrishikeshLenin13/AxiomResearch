import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FINAL_QUIZ_SECONDS,
  MODULE_QUIZ_SECONDS,
  PASSING_SCORE,
  RETAKE_SCORE_CAP,
} from "../data/modules";
import { getQuizByModuleId, scoreQuiz, type QuizQuestion } from "../data/quizzes";
import { useCourse } from "../context/CourseProvider";

type QuizViewProps = {
  moduleId: string;
  moduleTitle: string;
  nextModuleId: string | null;
  briefing: string[];
  isFinal?: boolean;
};

export function QuizView({ moduleId, moduleTitle, nextModuleId, briefing, isFinal = false }: QuizViewProps) {
  const quiz = getQuizByModuleId(moduleId);
  const { recordQuizAttempt, progress, setQuizSessionActive, submitCourse } = useCourse();
  const [phase, setPhase] = useState<"briefing" | "active" | "results">("briefing");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(isFinal ? FINAL_QUIZ_SECONDS : MODULE_QUIZ_SECONDS);
  const [result, setResult] = useState<{
    correct: number;
    total: number;
    rawScore: number;
    recordedScore: number;
    passed: boolean;
    capped: boolean;
  } | null>(null);
  const submittedRef = useRef(false);
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const previous = progress?.moduleScores[moduleId];
  const questions = quiz?.questions ?? [];
  const totalSeconds = isFinal ? FINAL_QUIZ_SECONDS : MODULE_QUIZ_SECONDS;
  const isRetake = (previous?.attempts ?? 0) > 0;

  const allAnswered = useMemo(
    () => questions.every((question) => answers[question.id] !== undefined),
    [answers, questions],
  );

  const finish = useCallback(
    async (currentAnswers: Record<string, number>) => {
      if (submittedRef.current) return;
      submittedRef.current = true;
      setSubmitting(true);
      const scored = scoreQuiz(questions, currentAnswers);
      const attempt = await recordQuizAttempt(moduleId, scored.score);
      setResult({
        correct: scored.correct,
        total: scored.total,
        rawScore: attempt.rawScore,
        recordedScore: attempt.recordedScore,
        passed: attempt.passed,
        capped: attempt.capped,
      });
      setPhase("results");
      setQuizSessionActive(false);
      setSubmitting(false);
    },
    [moduleId, questions, recordQuizAttempt, setQuizSessionActive],
  );

  useEffect(() => {
    if (phase !== "active") return;
    setQuizSessionActive(true);
    const interval = window.setInterval(() => {
      setSecondsLeft((value) => {
        if (value <= 1) {
          window.clearInterval(interval);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [phase, setQuizSessionActive]);

  useEffect(() => {
    if (phase === "active" && secondsLeft === 0) {
      void finish(answersRef.current);
    }
  }, [finish, phase, secondsLeft]);

  useEffect(() => {
    if (phase !== "active") return;
    function onBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = "If you leave, this quiz attempt may be deleted.";
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [phase]);

  useEffect(() => {
    return () => setQuizSessionActive(false);
  }, [setQuizSessionActive]);

  function startQuiz() {
    submittedRef.current = false;
    setAnswers({});
    setResult(null);
    setSecondsLeft(totalSeconds);
    setPhase("active");
  }

  function confirmLeave(): boolean {
    if (phase !== "active") return true;
    return window.confirm(
      "Leave this quiz? Your answers for this attempt may be deleted and you will need to start over.",
    );
  }

  if (!quiz) {
    return (
      <div className="course-card p-8">
        <p>Quiz not available yet.</p>
        <Link to="/learn/dashboard" className="text-[var(--course-accent-deep)] mt-4 inline-block font-medium">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timerLabel = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const timerUrgent = secondsLeft <= 60;

  if (phase === "briefing") {
    return (
      <div className="course-card p-6 md:p-8 space-y-5">
        <p className="course-kicker">{isFinal ? "Final exam" : "Unit quiz"}</p>
        <h1 className="course-serif text-3xl md:text-4xl">{moduleTitle}</h1>
        <p className="text-[var(--course-ink-soft)]">
          {questions.length} multiple-choice questions · {Math.round(totalSeconds / 60)} minute timer ·{" "}
          {Math.round(PASSING_SCORE * 100)}% to pass
        </p>
        {previous ? (
          <p className="text-sm text-[var(--course-ink-soft)]">
            Attempts: {previous.attempts}. Best recorded score: {Math.round(previous.score * 100)}%.
            {isRetake ? ` Retakes are capped at ${Math.round(RETAKE_SCORE_CAP * 100)}%.` : ""}
          </p>
        ) : null}

        <div>
          <h2 className="font-semibold">Before you start</h2>
          <ul className="mt-3 space-y-2 text-[var(--course-ink-soft)] list-disc pl-5">
            {briefing.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li>The timer starts when you click Begin. Unanswered questions count as incorrect if time runs out.</li>
            <li>If you leave or close the tab, this attempt may be deleted.</li>
            <li>
              Your first attempt can earn up to 100%. Any retake is recorded at a maximum of{" "}
              {Math.round(RETAKE_SCORE_CAP * 100)}%.
            </li>
            <li>Your grade appears immediately after you submit. There are no written questions.</li>
          </ul>
        </div>

        <button type="button" onClick={startQuiz} className="course-btn-primary">
          Begin quiz
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-10">
      <div className="course-card p-6 md:p-8 sticky top-[4.5rem] z-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="course-kicker">{isFinal ? "Final exam" : "Unit quiz"}</p>
            <h1 className="course-serif text-2xl md:text-3xl mt-1">{moduleTitle}</h1>
          </div>
          {phase === "active" ? (
            <div
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                timerUrgent ? "border-red-400 text-red-700 bg-red-50" : "border-[var(--course-line)]"
              }`}
            >
              Time left {timerLabel}
            </div>
          ) : null}
        </div>
      </div>

      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          index={index}
          question={question}
          selected={answers[question.id]}
          onSelect={(optionIndex) =>
            setAnswers((current) => ({ ...current, [question.id]: optionIndex }))
          }
          showResults={phase === "results"}
        />
      ))}

      <div className="course-card p-6">
        {phase === "active" ? (
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <Link
              to={isFinal ? "/learn/dashboard" : "/learn/modules/$moduleId"}
              params={isFinal ? undefined : { moduleId }}
              onClick={(event) => {
                if (!confirmLeave()) event.preventDefault();
                else setQuizSessionActive(false);
              }}
              className="text-sm text-[var(--course-ink-soft)] hover:text-[var(--course-ink)]"
            >
              Leave quiz
            </Link>
            <button
              type="button"
              disabled={!allAnswered || submitting}
              onClick={() => void finish(answers)}
              className="course-btn-primary !py-2.5 !px-6 !text-sm disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit quiz"}
            </button>
          </div>
        ) : result ? (
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold">
                {result.passed ? "Passed. Your grade is recorded." : "Not passed. Review the lesson and retake."}
              </p>
              <p className="text-[var(--course-ink-soft)] mt-1">
                Raw score: {result.correct}/{result.total} ({Math.round(result.rawScore * 100)}%)
              </p>
              <p className="text-[var(--course-ink-soft)]">
                Recorded grade: {Math.round(result.recordedScore * 100)}%
                {result.capped ? ` (retake cap ${Math.round(RETAKE_SCORE_CAP * 100)}%)` : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={startQuiz} className="course-btn-secondary !py-2.5 !px-6 !text-sm">
                Retake quiz
              </button>
              {result.passed && nextModuleId ? (
                <Link
                  to="/learn/modules/$moduleId"
                  params={{ moduleId: nextModuleId }}
                  className="course-btn-primary !py-2.5 !px-6 !text-sm"
                >
                  Next unit
                </Link>
              ) : null}
              {result.passed && isFinal && !progress?.courseSubmitted ? (
                <>
                  <button
                    type="button"
                    onClick={() => void submitCourse()}
                    className="course-btn-primary !py-2.5 !px-6 !text-sm"
                  >
                    Submit course
                  </button>
                  <Link to="/learn/dashboard" className="course-btn-secondary !py-2.5 !px-6 !text-sm">
                    Back to dashboard
                  </Link>
                </>
              ) : null}
              {result.passed && isFinal && progress?.courseSubmitted ? (
                <Link to="/learn/dashboard" className="course-btn-primary !py-2.5 !px-6 !text-sm">
                  Course submitted
                </Link>
              ) : null}
              {result.passed && !nextModuleId && !isFinal ? (
                <Link to="/learn/final" className="course-btn-primary !py-2.5 !px-6 !text-sm">
                  Take final exam
                </Link>
              ) : null}
              {!result.passed && !isFinal ? (
                <Link
                  to="/learn/modules/$moduleId"
                  params={{ moduleId }}
                  className="course-btn-secondary !py-2.5 !px-6 !text-sm"
                >
                  Back to lesson
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function QuestionCard({
  index,
  question,
  selected,
  onSelect,
  showResults,
}: {
  index: number;
  question: QuizQuestion;
  selected?: number;
  onSelect: (optionIndex: number) => void;
  showResults: boolean;
}) {
  return (
    <div className="course-card p-6 md:p-8">
      <p className="text-sm text-[var(--course-ink-soft)] mb-2">Question {index + 1}</p>
      <h2 className="text-lg font-medium">{question.prompt}</h2>
      <div className="mt-4 space-y-2">
        {question.options.map((option, optionIndex) => {
          const isSelected = selected === optionIndex;
          const isCorrect = optionIndex === question.correctIndex;
          let className = "w-full text-left rounded-xl border px-4 py-3 text-sm transition-colors ";
          if (showResults) {
            if (isCorrect) className += "border-emerald-600/40 bg-emerald-50";
            else if (isSelected) className += "border-red-600/40 bg-red-50";
            else className += "border-[var(--course-line)]";
          } else {
            className += isSelected
              ? "border-[var(--course-accent-deep)] bg-[var(--course-bg-warm)]"
              : "border-[var(--course-line)] hover:border-[var(--course-accent)]/40 hover:bg-[var(--course-paper)]";
          }

          return (
            <button
              key={option}
              type="button"
              disabled={showResults}
              onClick={() => onSelect(optionIndex)}
              className={className}
            >
              {option}
            </button>
          );
        })}
      </div>
      {showResults ? (
        <p className="mt-3 text-sm text-[var(--course-ink-soft)]">{question.explanation}</p>
      ) : null}
    </div>
  );
}
