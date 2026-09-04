import type { CourseModule } from "../module-types";

export const module07: CourseModule = {
  id: "module-7",
  number: 7,
  title: "Experimental Design",
  summary:
    "Compare study designs, sampling strategies, validity threats, and ethical requirements so you can plan a study Axiom mentors will take seriously.",
  estimatedMinutes: 100,
  learningObjectives: [
    "Distinguish experimental, observational, and descriptive study designs",
    "Explain randomization, blinding, and control groups in causal inference",
    "Evaluate sampling methods and their limits for generalization",
    "Identify threats to internal and external validity",
    "Describe ethical review requirements for human and animal subjects",
  ],
  sections: [
    {
      title: "Types of Study Designs",
      body: "Not every research question calls for the same design. Choosing the wrong design is like using a hammer to turn a screw—you might force progress, but the result will be weak. The three broad families you will encounter most often are experiments, observational studies, and descriptive studies.\n\nExperiments actively manipulate at least one independent variable while controlling others. Random assignment to conditions is the gold standard when you want to argue that X caused Y. A classic example: randomly assign plants to receive different fertilizer amounts while holding light, water, and pot size constant, then measure growth. If the only systematic difference is fertilizer, differences in growth are strong evidence of a causal effect.\n\nObservational studies measure variables without manipulating them. Researchers survey teens about screen time and sleep, or compare health outcomes in populations with different diets, without assigning anyone to a condition. Observational work can reveal patterns and generate hypotheses, but confounding variables make causal claims harder. People who sleep less might also exercise less, drink more caffeine, or face more stress—any of which could explain poor outcomes.\n\nDescriptive studies document what exists: cataloging species in a wetland, mapping noise levels near highways, or recording how often a behavior occurs. They answer \"what\" and \"how much\" before \"why.\" Case studies zoom in deeply on one person, school, or event. They generate insight and hypotheses but rarely generalize to entire populations.\n\nOther design labels describe timing. Cross-sectional studies collect data at one point in time—like one survey this month. Longitudinal studies follow the same subjects over months or years, revealing change and stability. Repeated cross-sectional designs sample different people each wave but track trends in a population. Match the design to your question: if you need to know whether scores improve after an intervention, you need before-and-after or comparison-group logic, not a one-time snapshot alone.",
      callouts: [
        {
          type: "did-you-know",
          title: "Randomized trials changed medicine",
          body: "James Lind's 1747 scurvy trial aboard HMS Salisbury is often cited as an early controlled experiment: sailors received different dietary supplements, and citrus fruit quickly stood out. Modern clinical trials still use the same core idea—compare groups fairly.",
        },
      ],
    },
    {
      title: "Controls, Randomization, and Blinding",
      body: "Controls give you a baseline. Without a control group receiving no treatment, a placebo, or the current standard approach, you cannot know whether an outcome came from your intervention or from time, attention, or expectation. Students testing a study app should compare app users to students using their usual study method—not to students who do nothing and feel guilty about it, which creates unfair stress differences.\n\nRandom assignment distributes known and unknown confounds across groups on average. Flip a coin, use a random number generator, or draw names from a hat—document the process. Non-random assignment (letting volunteers choose the \"fun\" condition) stacks the deck. Enthusiastic volunteers may improve for reasons unrelated to your treatment.\n\nBlocking and stratification refine randomization when groups must be balanced on key traits—grade level, prior GPA, or baseline skill. Randomize within each block so groups are comparable on variables that strongly affect outcomes.\n\nBlinding reduces bias. Single-blind studies hide condition assignment from participants. Double-blind studies also hide assignment from researchers who measure outcomes. Blind where possible: if you know which plants got \"super fertilizer,\" you might measure more carefully. If participants know they received a supposed memory booster, placebo effects can inflate scores. Full blinding is not always possible—teaching interventions obviously visible to teachers—but acknowledge that limitation.",
    },
    {
      title: "Sampling and Generalization",
      body: "Your sample is the group you actually study; the population is the larger group you hope to speak about. A classroom of thirty volunteers is a sample; \"ninth graders in U.S. public schools\" might be the population you care about. Generalization requires both a representative sample and a design that supports the claim you want to make.\n\nConvenience sampling—using whoever is available—is common in student projects and acceptable if you describe limits honestly. \"Results apply to volunteers in this after-school club\" is accurate. \"Results prove how all teenagers learn\" is not. Random sampling from a defined population strengthens claims but is often impractical for high school researchers.\n\nSample size affects precision. Small samples produce unstable estimates; one outlier can swing averages dramatically. You do not need hundreds of participants for every project, but you should avoid drawing bold conclusions from three or four data points. When in doubt, consult a mentor about reasonable minimums for your design.\n\nReplication—repeating a study with new samples or settings—is how fields build confidence. A single student experiment is a start, not the final word. Document conditions precisely so others could replicate. Science progresses when findings survive repetition, not when one dramatic result goes viral.",
      callouts: [
        {
          type: "tip",
          title: "Define your population early",
          body: "Write one sentence: \"I will recruit [who] from [where] using [method] and my findings may apply to [population with limits].\" This prevents overclaiming later.",
        },
      ],
    },
    {
      title: "Validity and Reliability",
      body: "Validity asks whether your study measures what you think it measures and supports the conclusions you draw. Reliability asks whether your measurements are consistent. A bathroom scale that reads ten pounds heavy every day is reliable but not valid. A scale that jumps randomly is neither.\n\nInternal validity concerns whether differences within your study plausibly come from your intervention rather than confounds. History effects, maturation, testing effects, and selection bias threaten internal validity. If students take the same quiz three times, improvement might reflect practice, not your teaching tool. Longitudinal designs need comparison groups or careful baseline measurement.\n\nExternal validity concerns whether results extend beyond your lab setup. Highly controlled experiments may not mirror real classrooms. Real-world field studies trade control for realism. Neither is automatically \"better\"—they answer different questions.\n\nConstruct validity links your operational definitions to the concepts you care about. A single multiple-choice quiz may not fully capture \"critical thinking.\" Triangulate: combine quizzes, rubrics, and observation when possible. Report limitations openly. Judges and reviewers respect researchers who know what their design can and cannot show.",
    },
    {
      title: "Ethics and Institutional Review",
      body: "Ethical research protects people and animals from harm, respects autonomy, and distributes benefits and burdens fairly. Even low-risk classroom surveys can raise privacy issues. Even plant experiments may involve biosafety rules. Ethics is not a bureaucratic checkbox—it is core to trustworthy science.\n\nHuman subjects research typically requires informed consent: participants (or parents/guardians for minors) understand what they will do, risks, benefits, and that they may withdraw without penalty. Assent from younger participants matters even when parents sign forms. Deception is rarely acceptable in student work; if used in professional psychology, debriefing and justification are required.\n\nInstitutional Review Boards (IRBs) or ethics committees review formal research proposals—common in university and hospital settings. High school science fairs often use affiliated IRBs or school review processes for human subjects projects. Animal research requires humane treatment, appropriate housing, and often veterinary oversight. Check rules for your competition or school before you begin.\n\nMinimize risk. Collect only data you need. Store identifiers securely or use anonymous codes. Vulnerable populations—children, patients, prisoners—warrant extra protection. If your project could cause psychological distress, physical harm, or legal trouble (e.g., unsupervised chemical synthesis), redesign or choose another question.",
    },
    {
      title: "Building a Study Protocol",
      body: "A protocol is your blueprint: question, design, participants, materials, procedure, timeline, analysis plan, and ethics documentation. Writing it before data collection keeps you honest and catches flaws early.\n\nStart with your research question and hypothesis. Specify inclusion and exclusion criteria—who can participate and who cannot. Describe materials and how you will standardize them. Write the procedure step-by-step so another researcher could replicate it. Include a data sheet template and name the statistical tests or qualitative coding approach you plan.\n\nPre-registering analysis plans—publicly posting what you will test before seeing results—reduces the temptation to cherry-pick favorable outcomes. Advanced student competitions increasingly reward this transparency.\n\nBuild in checkpoints: pilot test, ethics approval, data collection window, analysis, revision. Leave buffer time. Equipment fails, participants drop out, and surveys take longer to administer than expected. A protocol is a living document—update it when you change something important, and note why.\n\nConnect design choices back to your literature review. If prior work used double-blind trials, explain why your project uses a single-blind or observational approach instead. Conscious tradeoffs show maturity; accidental ignorance shows the opposite.",
    },
  ],
  vocabulary: [
    {
      term: "Random assignment",
      definition:
        "Placing participants into experimental conditions by chance so groups are comparable on average.",
    },
    {
      term: "Control group",
      definition:
        "A comparison condition that does not receive the experimental treatment, or receives a placebo or standard treatment.",
    },
    {
      term: "Observational study",
      definition:
        "Research that measures variables without manipulating them; useful for patterns but weaker for causal claims.",
    },
    {
      term: "Longitudinal study",
      definition:
        "Research that follows the same subjects over time to observe change or stability.",
    },
    {
      term: "Confounding variable",
      definition:
        "A factor linked to both the treatment and outcome that can mimic or hide a causal effect.",
    },
    {
      term: "Internal validity",
      definition:
        "The degree to which a study supports causal conclusions about relationships within the study itself.",
    },
    {
      term: "External validity",
      definition:
        "The degree to which study findings generalize to other people, settings, and times.",
    },
    {
      term: "Informed consent",
      definition:
        "Voluntary agreement to participate after understanding procedures, risks, benefits, and rights.",
    },
    {
      term: "IRB",
      definition:
        "Institutional Review Board—a committee that reviews human subjects research for ethical compliance.",
    },
    {
      term: "Replication",
      definition:
        "Repeating a study under similar or varied conditions to test whether findings hold.",
    },
  ],
  keyTakeaways: [
    "Experiments with random assignment best support causal claims; observational designs require cautious interpretation.",
    "Control groups, randomization, and blinding reduce bias but must match ethical and practical constraints.",
    "Samples should be described honestly; generalization requires representative recruitment and adequate size.",
    "Validity and reliability determine whether measurements and conclusions are trustworthy.",
    "Human and animal research demand informed consent, risk minimization, and appropriate institutional review.",
  ],
  commonMistakes: [
    "Calling a project an \"experiment\" when nothing was manipulated or randomly assigned.",
    "Using a no-treatment control that creates unequal motivation or harm instead of an ethical baseline.",
    "Ignoring confounding variables such as prior experience, time of day, or instructor differences.",
    "Skipping ethics review or parental consent because the project \"seems harmless.\"",
  ],
  researchTips: [
    "Draw your design as a timeline diagram showing when each group receives treatment and when you measure outcomes.",
    "Pilot your procedure on two or three people to catch confusing instructions before full data collection.",
    "Keep a lab notebook entry for every deviation from protocol—reviewers notice undocumented changes.",
    "When random assignment is impossible, measure potential confounds and discuss them in your limitations section.",
  ],
  activity: {
    title: "Study Design Blueprint",
    objective:
      "Draft a complete one-page study protocol for a research question of your choice, including design, sampling, controls, and ethics.",
    instructions: [
      "Choose a feasible question related to your capstone or instructor prompt. State null and alternative hypotheses.",
      "Select a design type (experiment, observational, descriptive, etc.) and justify why it fits the question.",
      "Define participants, recruitment method, sample size target, and inclusion/exclusion criteria.",
      "List independent, dependent, and control variables with operational definitions.",
      "Describe randomization, control group, and blinding procedures—or explain why each is not used.",
      "Outline a step-by-step data collection procedure and planned analysis approach.",
      "Add an ethics section covering consent, risks, privacy, and whether IRB or school approval is needed.",
    ],
    deliverable:
      "A one-page study protocol (approximately 400–600 words) with labeled sections ready for mentor review.",
    timeEstimate: "70–90 minutes",
  },
  reflection: {
    prompt:
      "What ethical considerations apply to your proposed study design? Describe risks, consent requirements, and steps you would take to minimize harm while still answering your question.",
    guidelines: [
      "Identify who participates and whether they are a vulnerable population requiring extra safeguards.",
      "Explain what participants will experience and how you will obtain informed consent or assent.",
      "Discuss data privacy—what you collect, how you store it, and whether responses are anonymous.",
      "Acknowledge any design compromises you made for ethical reasons and how they limit conclusions.",
    ],
    wordCount: "150–300 words",
    rubric: [
      "Ethical issues are specific to the proposed design, not generic statements about \"being safe.\"",
      "Consent and privacy procedures are realistic for a high school researcher.",
      "Response connects ethics to scientific quality—how protecting participants also protects validity.",
    ],
  },
  furtherReading: [
    {
      title: "Design of Experiments (Montgomery)",
      description:
        "Standard reference on experimental design principles—start with early chapters on randomization and blocking.",
    },
    {
      title: "NIH Protecting Human Research Participants (online training)",
      description:
        "Free modules covering consent, risk, and IRB concepts required in many science fair human subjects pathways.",
    },
    {
      title: "The Book of Why (Pearl & Mackenzie)",
      description:
        "Accessible introduction to causal reasoning and why design—not just statistics—determines what claims you can make.",
    },
  ],
};
