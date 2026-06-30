import type { CourseModule } from "../module-types";

export const module06: CourseModule = {
  id: "module-6",
  number: 6,
  title: "Research Questions and Hypotheses",
  summary:
    "Transform broad interests into focused, testable research questions and clear hypotheses with well-defined variables.",
  estimatedMinutes: 80,
  learningObjectives: [
    "Distinguish strong research questions from vague or untestable ones",
    "Identify independent, dependent, and control variables in a study design",
    "Write operational definitions that make abstract concepts measurable",
    "Formulate null and alternative hypotheses appropriate to the question",
    "Revise questions using feedback and prior literature",
  ],
  sections: [
    {
      title: "From Topic to Question",
      body: "A research topic is a neighborhood; a research question is the exact address. \"Climate change\" is a topic. \"Do school gardens reduce cafeteria food waste among eighth graders over one semester?\" is a question you could actually investigate. The shift from topic to question is one of the most important skills in research—and one of the hardest for beginners.\n\nStrong questions emerge from curiosity sharpened by reading. After reviewing what others have found, you notice what has not been tested in your context, with your resources, on your timeline. NASA engineers do not ask \"How do we improve space travel?\" They ask whether a specific heat shield material survives re-entry temperatures observed in last year's test flight. Specificity makes progress possible.\n\nGood research questions share several traits. They are focused enough to answer with available methods. They are grounded in existing knowledge—not random guesses. They are ethical to pursue. They produce answers that matter, even if the answer is \"no effect found.\" A question that cannot be wrong is not really a research question; it is a slogan.\n\nStudent researchers often worry their question sounds too small. Small is usually better. A precise question with a clear method beats a grand question you cannot measure. You can always build follow-up studies later; you cannot recover a semester lost to an impossible scope.\n\nWrite your question as a single sentence and test whether it contains a population, a comparison or condition, and a measurable outcome. If any piece is missing, your question is still a topic in disguise.",
      callouts: [
        {
          type: "tip",
          title: "The \"how\" and \"why\" ladder",
          body: "Start with a broad interest, then ask \"why does that matter?\" and \"how could I measure it?\" repeatedly until you reach a question you could answer with data in one term.",
        },
      ],
    },
    {
      title: "Strong vs. Weak Questions",
      body: "Weak questions hide vagueness behind impressive words. \"Does technology affect the brain?\" sounds serious but offers no clue what technology, which brain outcomes, or in whom. Weak questions also smuggle in assumptions: \"Why is organic food healthier?\" assumes it is healthier before testing. Strong questions stay neutral and measurable: \"Do organic and conventional apples differ in pesticide residue levels when purchased from the same grocery chain?\"\n\nCompare these pairs. Weak: \"How does music help students learn?\" Strong: \"Does listening to instrumental music during 20-minute algebra practice sessions improve quiz scores for ninth-grade students compared to silent study?\" Weak: \"Is social media bad for teens?\" Strong: \"Is daily social media use above two hours associated with self-reported sleep duration among high school juniors in this district?\" Notice how the strong versions name populations, conditions, outcomes, and often comparison groups.\n\nQuestions also differ by type. Descriptive questions ask what is happening: \"What bacteria species appear on classroom door handles?\" Comparative questions ask about differences between groups or conditions. Correlational questions ask whether two measured variables move together. Causal questions ask whether changing one factor changes another—and they require designs that support cause-and-effect inference, usually experiments with controls.\n\nBefore you commit to a question, test it with the FINER checklist when appropriate: Feasible with your time and tools; Interesting to you and others; Novel or needed given prior work; Ethical; Relevant to the problem you care about. If your question fails several checks, revise early.\n\nSwap weak questions with a partner and challenge each other: \"What would you actually measure?\" and \"What result would surprise you?\" Surprising possible answers signal a real question.",
    },
    {
      title: "Variables and Operational Definitions",
      body: "Variables are the factors you measure or manipulate. The independent variable (IV) is what you change or compare—music vs. silence, fertilizer type, app version. The dependent variable (DV) is what you measure as the outcome—test score, plant height, error rate. Control variables are factors you hold steady so they do not confuse results—same room, same time of day, same instructions.\n\nAbstract concepts must become measurable through operational definitions. \"Stress\" could mean cortisol level, heart rate, or score on a validated survey. \"Academic performance\" might mean GPA, one quiz, or teacher rubric scores. Your definition must match your method. If you cannot observe or record it, it is not yet operational.\n\nConfounding variables lurk when unmeasured factors co-vary with your IV and DV. Studying whether breakfast improves morning focus fails if the breakfast group also sleeps more. Good designs anticipate confounds and control, measure, or randomize them. Random assignment in experiments helps balance unknown confounds across groups.\n\nList every variable before you collect data. Share the list with a mentor. One missing control—lighting, prior experience, motivation—can invalidate weeks of work. Operational definitions belong in your methods section so another researcher could replicate your study.\n\nDraw a simple diagram: IV on the left, arrow to DV on the right, control variables listed beneath. If the diagram feels crowded, your design may be too ambitious for one project.",
      callouts: [
        {
          type: "mistake",
          title: "Hidden variables",
          body: "A student tested whether blue light filters improve sleep but let participants choose their own bedtime. Motivation and schedule—not the filters—may have driven the results. Always ask what else changed alongside your independent variable.",
        },
      ],
    },
    {
      title: "Hypotheses and Predictions",
      body: "A hypothesis is a testable statement about the relationship you expect between variables. It translates your question into a claim you can support or refute with evidence. If your question asks whether compost type affects tomato yield, your hypothesis might predict that tomato plants in vermicompost outperform those in standard potting mix on total fruit mass after twelve weeks.\n\nHypotheses must be falsifiable—you must be able to imagine evidence that would show them wrong. \"Positive thinking improves health\" is difficult to test until you define positive thinking and health outcomes. \"Participants who complete a ten-minute gratitude journaling exercise report lower immediate anxiety scores on a 7-point scale than participants who copy neutral text\" is falsifiable.\n\nDirectional hypotheses predict the direction of an effect: A will be greater than B. Non-directional hypotheses predict a difference without specifying direction: A and B will differ. Use directional hypotheses when prior literature or theory strongly suggests one outcome; otherwise non-directional claims are often more honest.\n\nDistinguish hypotheses from predictions and from the question itself. The question opens inquiry. The hypothesis states your expected answer. A prediction is sometimes the numeric outcome you expect: \"Group A will score at least 10% higher.\" In strict statistical testing, you will also formalize null and alternative hypotheses—covered next.\n\nAfter writing a hypothesis, list three possible outcomes: support, refute, or inconclusive because of weak methods. If inconclusive is the only realistic outcome, tighten your measurement plan before collecting data.",
    },
    {
      title: "Null and Alternative Hypotheses",
      body: "In formal hypothesis testing, researchers pair two competing statements. The null hypothesis (H₀) typically says there is no effect, no difference, or no relationship in the population—any sample difference you see is due to chance. The alternative hypothesis (H₁ or Hₐ) says there is an effect, difference, or relationship worth detecting.\n\nFor example, comparing two study strategies: H₀: mean quiz scores are equal for Strategy A and Strategy B. H₁: mean quiz scores differ between the groups. If you predict A is better, H₁ might be one-sided: mean score for A is greater than for B. Statistical tests use these statements to calculate how surprising your data would be if H₀ were true—that logic leads to p-values in a later module.\n\nYou never \"prove\" H₀ or H₁. You collect evidence that is more or less consistent with one story. Failure to reject H₀ does not mean \"nothing happened\"—your study might lack power, measure poorly, or use too small a sample. Language matters: report \"we did not find sufficient evidence to reject the null hypothesis,\" not \"we proved there is no effect.\"\n\nAlign H₀ and H₁ with your design and variables. Every comparison group needs a clear counterpart. If you manipulate three fertilizer levels, your hypotheses must specify which pairs you compare or use an omnibus test across all levels. Sloppy hypothesis pairs create sloppy analysis.\n\nWrite H₀ and H₁ in plain words first, then in symbols if your mentor requires notation. Plain language keeps you honest about what you are actually testing.",
    },
    {
      title: "Refining Questions Through Literature and Feedback",
      body: "Your first question draft is rarely your final one. Use literature reviews to tighten wording, choose realistic outcomes, and avoid duplicated work. If ten studies already compared two popular study apps, perhaps your contribution compares a low-cost alternative or tests transfer to exam performance a week later.\n\nPeer and mentor feedback catches ambiguity you no longer see. Ask reviewers: Could you tell what I would measure? Could you run this study from my description alone? Do you see ethical issues I missed? Revise based on concrete confusion, not every opinion.\n\nPilot testing—trying your procedure on a small scale—often reveals flawed questions. A survey item everyone misinterprets means your operational definition failed. An experiment where the outcome never varies means your DV is insensitive or your conditions too similar.\n\nDocument revisions. Science fairs and journals respect researchers who show how their thinking evolved. A short paragraph in your notebook—\"Originally asked X; shifted to Y because prior studies measured Z differently\"—demonstrates intellectual honesty and saves you from forgetting why you made key choices.\n\nSet a revision deadline two weeks before data collection. Questions refined under panic tend to shrink scope chaotically; questions refined with time tend to improve logically.",
    },
  ],
  vocabulary: [
    {
      term: "Research question",
      definition:
        "A focused inquiry that defines what a study seeks to answer using specified methods and measurable outcomes.",
    },
    {
      term: "Hypothesis",
      definition:
        "A testable prediction about the relationship between variables, grounded in theory or prior evidence.",
    },
    {
      term: "Independent variable",
      definition:
        "The factor manipulated or compared by the researcher to observe its effect on outcomes.",
    },
    {
      term: "Dependent variable",
      definition:
        "The outcome measured to assess the effect of the independent variable.",
    },
    {
      term: "Operational definition",
      definition:
        "A precise description of how an abstract concept will be measured or manipulated in a study.",
    },
    {
      term: "Confounding variable",
      definition:
        "An uncontrolled factor that varies systematically with the independent and dependent variables and may distort conclusions.",
    },
    {
      term: "Null hypothesis (H₀)",
      definition:
        "The default statement that there is no effect, difference, or relationship in the population being studied.",
    },
    {
      term: "Alternative hypothesis (H₁)",
      definition:
        "The statement that an effect, difference, or relationship exists, contrary to the null hypothesis.",
    },
    {
      term: "Falsifiable",
      definition:
        "Capable of being shown wrong through evidence; a requirement for scientific hypotheses.",
    },
    {
      term: "Control variable",
      definition:
        "A factor held constant across conditions so it does not influence the dependent variable.",
    },
  ],
  keyTakeaways: [
    "Research questions must be specific, measurable, ethical, and feasible—not broad topics dressed as questions.",
    "Operational definitions turn abstract ideas into data you can actually collect.",
    "Independent, dependent, and control variables must be identified before data collection begins.",
    "Hypotheses are falsifiable predictions; null and alternative hypotheses frame formal statistical testing.",
    "Revise questions using literature, pilot tests, and mentor feedback rather than locking in your first draft.",
  ],
  commonMistakes: [
    "Asking questions that assume the conclusion (\"Why is X better?\" before showing X is better).",
    "Failing to define how variables are measured, making replication and analysis impossible.",
    "Writing hypotheses so vague that no result could clearly disprove them.",
    "Claiming to \"prove\" the null hypothesis when a study simply failed to detect an effect.",
  ],
  researchTips: [
    "Rewrite your question as a fill-in-the-blank: \"Among [population], does [IV] affect [DV] when [controls] are held constant?\"",
    "State your hypothesis, then write one sentence describing evidence that would contradict it.",
    "Keep a variable table in your lab notebook with columns for name, type (IV/DV/control), and how it is measured.",
    "Read the methods sections of three related papers to see how experts operationalize similar concepts.",
  ],
  activity: {
    title: "Question and Hypothesis Workshop",
    objective:
      "Convert ten weak research questions into strong ones and develop full variable tables and hypothesis pairs for your top two.",
    instructions: [
      "Review the list of ten weak questions provided by your instructor (or draft ten from your own brainstorming).",
      "For each weak question, rewrite it to specify population, conditions, measurable outcome, and comparison when needed.",
      "Circle the three strongest revised questions based on feasibility, ethics, and interest.",
      "For your top two questions, build a variable table listing IV, DV, at least three control variables, and operational definitions.",
      "Write null and alternative hypotheses for both top questions, matching the statistical comparison you would run.",
      "Share one question with a partner and revise based on their confusion or suggested confounds.",
      "Submit your ten rewrites plus full documentation for your two best questions.",
    ],
    deliverable:
      "Ten revised questions, two complete variable tables, and two null/alternative hypothesis pairs with brief rationale.",
    timeEstimate: "50–65 minutes",
  },
  reflection: {
    prompt:
      "Draft one research question and directional hypothesis for your project topic. Defend why the question is testable, why your predicted direction is reasonable given prior knowledge, and what evidence would challenge your hypothesis.",
    guidelines: [
      "Include operational definitions for your main independent and dependent variables.",
      "Explain how your question connects to at least one finding or gap from prior reading.",
      "Identify one confounding variable and describe how you would control or measure it.",
      "Use cautious scientific language—avoid \"prove\" and absolute claims.",
    ],
    wordCount: "150–300 words",
    rubric: [
      "Question and hypothesis are specific, falsifiable, and aligned with each other.",
      "Operational definitions are clear enough that another student could replicate the measurement.",
      "Response acknowledges uncertainty and possible outcomes that would not support the hypothesis.",
    ],
  },
  furtherReading: [
    {
      title: "Research Design: Qualitative, Quantitative, and Mixed Methods Approaches (Creswell & Creswell)",
      description:
        "Explains how research questions shape design choices across quantitative and qualitative traditions.",
    },
    {
      title: "The Craft of Research (Booth, Colomb, & Williams)",
      description:
        "Classic guide to turning topics into questions and arguments—highly readable for advanced high school students.",
    },
    {
      title: "APA Style Journal Article Reporting Standards",
      description:
        "Official guidance on stating hypotheses, variables, and methods clearly in psychological and behavioral research.",
    },
  ],
};
