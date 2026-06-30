import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PASSING_SCORE } from "../data/modules";
import { getQuizByModuleId, scoreQuiz, type QuizQuestion } from "../data/quizzes";
import { useCourse } from "../context/CourseProvider";

type QuizViewProps = {
  moduleId: string;
  moduleTitle: string;
  nextModuleId: string | null;
};

export function QuizView({ moduleId, moduleTitle, nextModuleId }: QuizViewProps) {
  const quiz = getQuizByModuleId(moduleId);
  const { recordQuizAttempt, progress } = useCourse();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ correct: number; total: number; score: number; passed: boolean } | null>(
    null,
  );

  const previous = progress?.moduleScores[moduleId];
  const questions = quiz?.questions ?? [];

  const allAnswered = useMemo(
    () => questions.every((question) => answers[question.id] !== undefined),
    [answers, questions],
  );

  async function handleSubmit() {
    if (!allAnswered || submitting) return;
    setSubmitting(true);
    const scored = scoreQuiz(questions, answers);
    const attempt = await recordQuizAttempt(moduleId, scored.score);
    setResult({ ...scored, passed: attempt.passed });
    setSubmitted(true);
    setSubmitting(false);
  }

  function handleRetry() {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
  }

  if (!quiz) {
    return (
      <div className="course-card p-8">
        <p>Quiz not available for this section yet.</p>
        <Link to="/learn/modules/$moduleId" params={{ moduleId }} className="text-[var(--course-accent-deep)] mt-4 inline-block font-medium">
          Back to lesson
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-10">
      <div className="course-card p-6 md:p-8">
        <p className="course-kicker">Section quiz</p>
        <h1 className="course-serif text-3xl md:text-4xl mt-1">{moduleTitle}</h1>
        <p className="text-[var(--course-ink-soft)] mt-2">
          Score at least {Math.round(PASSING_SCORE * 100)}% to unlock the next section.
          {previous ? ` Attempts: ${previous.attempts}. Best: ${Math.round(previous.score * 100)}%.` : ""}
        </p>
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
          showResults={submitted}
        />
      ))}

      <div className="course-card p-6 flex flex-wrap items-center gap-3 justify-between">
        {!submitted ? (
          <>
            <Link
              to="/learn/modules/$moduleId"
              params={{ moduleId }}
              className="text-sm text-[var(--course-ink-soft)] hover:text-[var(--course-ink)]"
            >
              Review lesson
            </Link>
            <button
              type="button"
              disabled={!allAnswered || submitting}
              onClick={() => void handleSubmit()}
              className="course-btn-primary !py-2.5 !px-6 !text-sm disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit quiz"}
            </button>
          </>
        ) : result ? (
          <div className="w-full space-y-4">
            <div>
              <p className="text-lg font-semibold">
                {result.passed ? "You passed!" : "Not quite. Review the lesson and try again."}
              </p>
              <p className="text-[var(--course-ink-soft)]">
                Score: {result.correct}/{result.total} ({Math.round(result.score * 100)}%)
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {!result.passed && (
                <button type="button" onClick={handleRetry} className="course-btn-primary !py-2.5 !px-6 !text-sm">
                  Retake quiz
                </button>
              )}
              {result.passed && nextModuleId ? (
                <Link
                  to="/learn/modules/$moduleId"
                  params={{ moduleId: nextModuleId }}
                  className="course-btn-primary !py-2.5 !px-6 !text-sm"
                >
                  Next section
                </Link>
              ) : null}
              {result.passed && !nextModuleId ? (
                <Link to="/learn/dashboard" className="course-btn-primary !py-2.5 !px-6 !text-sm">
                  Back to dashboard
                </Link>
              ) : null}
              {!result.passed ? (
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
          let className =
            "w-full text-left rounded-xl border px-4 py-3 text-sm transition-colors ";
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
