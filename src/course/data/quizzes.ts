export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type ModuleQuiz = {
  moduleId: string;
  questions: QuizQuestion[];
};

function q(
  id: string,
  prompt: string,
  options: string[],
  correctIndex: number,
  explanation: string,
): QuizQuestion {
  return { id, prompt, options, correctIndex, explanation };
}

export const MODULE_QUIZZES: ModuleQuiz[] = [
  {
    moduleId: "module-1",
    questions: [
      q(
        "m1-q1",
        "According to this unit, what best distinguishes research from everyday searching?",
        [
          "Research never uses the internet",
          "Research is a disciplined process for answering questions with evidence you can verify",
          "Research means collecting as many websites as possible",
          "Research is sharing opinions until people agree",
        ],
        1,
        "The lesson defines research as systematic, evidence-based inquiry—not casual searching or opinion-sharing.",
      ),
      q(
        "m1-q2",
        "Why is Googling alone usually not enough for a research project?",
        [
          "Search engines rank pages by popularity and clicks, not by peer review or methodological quality",
          "Google blocks all scientific papers",
          "Research projects cannot use keywords",
          "Googling is slower than reading journals",
        ],
        0,
        "The unit explains that search ranking does not equal truth—you must evaluate who wrote a source and how they know what they claim.",
      ),
      q(
        "m1-q3",
        "In the cycle of inquiry described in this unit, what typically happens after unexpected results?",
        [
          "Researchers discard the data and stop asking questions",
          "Researchers revise their thinking and often form new questions for another round of investigation",
          "Peer review is skipped to save time",
          "The hypothesis is declared permanently proven",
        ],
        1,
        "Inquiry is cyclical: observe, question, test, analyze, revise, and repeat as new evidence emerges.",
      ),
      q(
        "m1-q4",
        "Which study type actively manipulates a variable while controlling others to test cause and effect?",
        [
          "Experimental research (e.g., a randomized controlled trial)",
          "A literature review only",
          "Reading headlines without methods",
          "Copying expert quotes without citation",
        ],
        0,
        "Experimental designs intervene under controlled conditions—the unit uses pharmaceutical trials and classroom examples.",
      ),
      q(
        "m1-q5",
        "Observational research, as taught in this unit, is best described as:",
        [
          "Manipulating one group while hiding the hypothesis from participants",
          "Studying phenomena without manipulating variables, which limits causal claims",
          "Publishing results without any data",
          "The same thing as a meta-analysis",
        ],
        1,
        "Observational designs watch rather than manipulate; they can reveal patterns but causal claims need extra care.",
      ),
      q(
        "m1-q6",
        "What role does a literature review play in research?",
        [
          "It replaces the need to collect any new data in every project",
          "It synthesizes existing published work to map what is known and where gaps remain",
          "It eliminates the need for citations",
          "It proves a hypothesis before an experiment runs",
        ],
        1,
        "Literature reviews summarize and connect prior studies—they do not replace original investigation when your question requires it.",
      ),
      q(
        "m1-q7",
        "Alexander Fleming's penicillin story is used in this unit mainly to show that:",
        [
          "Accidents alone count as proof without follow-up testing",
          "Observation can spark a question that leads to systematic investigation and collaboration over years",
          "Peer review is unnecessary for breakthroughs",
          "Research avoids replication",
        ],
        1,
        "Fleming noticed mold killing bacteria, then others isolated, tested, and replicated—the full research cycle, not a one-day accident.",
      ),
      q(
        "m1-q8",
        "Qualitative research, in this unit, focuses most on:",
        [
          "Only calculating p-values",
          "Meanings, experiences, and themes (often through interviews or case studies)",
          "Randomized drug trials exclusively",
          "Spreadsheet formulas without context",
        ],
        1,
        "Qualitative methods explore depth and context; quantitative methods emphasize measurement and statistics.",
      ),
      q(
        "m1-q9",
        "A common mistake this unit warns against is:",
        [
          "Writing down your research question before searching",
          "Treating the first Google result as definitive without checking the source",
          "Reading the methods section of a paper",
          "Narrowing a broad topic like \"AI\" into a testable question",
        ],
        1,
        "The unit lists assuming the top search result is research-quality as a frequent student error.",
      ),
      q(
        "m1-q10",
        "Meta-analysis, as described in this unit, means:",
        [
          "Ignoring previous studies to start fresh",
          "Statistically combining results across multiple studies to estimate an overall effect",
          "Writing a blog post about one experiment",
          "Replacing experiments entirely in every field",
        ],
        1,
        "Meta-analyses aggregate quantitative findings from many studies—they are one research type among several.",
      ),
    ],
  },
  {
    moduleId: "module-2",
    questions: [
      q(
        "m3-q1",
        "A primary source, in this unit, is:",
        [
          "A textbook chapter that summarizes many studies",
          "Original data or firsthand findings (e.g., a journal article reporting new results)",
          "A Wikipedia article used without checking references",
          "A social media post with no linked study",
        ],
        1,
        "Primary sources present original evidence; secondary and tertiary sources interpret or summarize it.",
      ),
      q(
        "m3-q2",
        "Peer review means:",
        [
          "Authors privately approve their own manuscript",
          "Independent experts evaluate a manuscript before publication",
          "Students grade each other's homework only",
          "AI automatically publishes any PDF online",
        ],
        1,
        "Credibility depends partly on peer review—not on impressive websites or scientific-sounding language alone.",
      ),
      q(
        "m3-q3",
        "Warning signs of predatory journals include:",
        [
          "Unsolicited flattering emails, rapid \"acceptance,\" and fees with little real review",
          "Strict rejection rates and transparent editorial boards only",
          "Free publication with mandatory data sharing",
          "Indexing only in library catalogs with no web presence",
        ],
        0,
        "The unit covers Think.Check.Submit-style checks: fake boards, pay-to-publish, and names mimicking respected journals.",
      ),
      q(
        "m3-q4",
        "In database search, Boolean AND (e.g., sleep AND adolescents) narrows results by:",
        [
          "Requiring all listed terms to appear",
          "Removing every filter from the query",
          "Searching images only",
          "Randomizing result order",
        ],
        0,
        "AND requires multiple terms; OR broadens; NOT excludes—techniques taught in the search strategies section.",
      ),
      q(
        "m3-q5",
        "Citation chaining means:",
        [
          "Copying a bibliography without reading the papers",
          "Following references backward from a key paper and \"cited by\" links forward to find related work",
          "Using only one database forever",
          "Deleting sources you disagree with",
        ],
        1,
        "Backward and forward chaining expands a literature map faster than random keyword guessing.",
      ),
      q(
        "m3-q6",
        "PubMed is especially useful for:",
        [
          "Biomedical and life-sciences literature maintained by the U.S. National Library of Medicine",
          "Only fiction and poetry",
          "Patent law exclusively",
          "Ranking high school science fair projects",
        ],
        0,
        "The unit lists PubMed alongside Google Scholar, IEEE Xplore, arXiv, JSTOR, and discipline-specific tools.",
      ),
      q(
        "m3-q7",
        "When evaluating author credibility, this unit emphasizes checking:",
        [
          "Profile photo quality and follower count",
          "Affiliation, expertise, and publication record on the topic",
          "Number of hashtags in a tweet",
          "Whether the PDF has colorful charts",
        ],
        1,
        "Author expertise and venue reputation matter—not surface polish on a website.",
      ),
      q(
        "m3-q8",
        "A tertiary source includes:",
        [
          "Raw survey data you collected yourself",
          "An encyclopedia or broad textbook summary for background vocabulary",
          "A peer-reviewed RCT reporting new results",
          "Your lab notebook with original measurements",
        ],
        1,
        "Tertiary sources summarize fields; use them for context, not as sole evidence for specific claims.",
      ),
      q(
        "m3-q9",
        "Funding conflicts of interest should be:",
        [
          "Ignored if the abstract sounds confident",
          "Disclosed and weighed when judging possible bias in design or interpretation",
          "Hidden in appendices volunteers never read",
          "Used to automatically reject every industry-funded study",
        ],
        1,
        "Disclosures help you read critically—industry funding does not auto-invalidate work, but it demands closer methods reading.",
      ),
      q(
        "m3-q10",
        "Before citing a surprising study, this unit recommends checking Retraction Watch or the journal site because:",
        [
          "All popular papers are eventually retracted",
          "Withdrawn papers may still circulate online without a clear retraction notice",
          "Retractions only apply to books, not articles",
          "Retraction Watch replaces peer review",
        ],
        1,
        "Misinformation and retracted work can spread; verify that a cited study has not been withdrawn.",
      ),
    ],
  },
  {
    moduleId: "module-3",
    questions: [
      q(
        "m4-q1",
        "Experts often skim first by reading:",
        [
          "Every appendix in order before the abstract",
          "The abstract, figures, and section headings to decide if the paper fits your question",
          "Only author email addresses",
          "Random paragraphs from the references list",
        ],
        1,
        "Strategic skimming orients you quickly—the unit treats the paper like a map, not a novel read front to back on pass one.",
      ),
      q(
        "m4-q2",
        "The methods section exists so that:",
        [
          "Readers can evaluate how data were collected and whether they could replicate the study",
          "Authors can list hobbies unrelated to the study",
          "Journals can fill empty space",
          "Results can be interpreted without any numbers",
        ],
        0,
        "Trusting conclusions without reading methods is a mistake highlighted in this unit.",
      ),
      q(
        "m4-q3",
        "Statistical significance, as explained here, does NOT automatically mean:",
        [
          "A p-value was calculated",
          "The finding is large or practically important in the real world",
          "A sample existed",
          "Results were reported in a table",
        ],
        1,
        "Significance ≠ importance or causation—a core warning when reading results sections.",
      ),
      q(
        "m4-q4",
        "The results section should primarily:",
        [
          "Present findings without over-interpreting them",
          "Argue for policy changes at length",
          "Hide negative outcomes",
          "Introduce brand-new data not mentioned elsewhere",
        ],
        0,
        "Results report what was found; interpretation belongs mainly in the discussion.",
      ),
      q(
        "m4-q5",
        "Active annotation, in this unit, means:",
        [
          "Highlighting every sentence in one color",
          "Linking claims to specific evidence in your own words and marking confusion with questions",
          "Skipping all figures to save time",
          "Copying sentences directly into your notes without citation",
        ],
        1,
        "Highlighting without notes in your own words leads to poor retention—the unit pushes claim/evidence tables.",
      ),
      q(
        "m4-q6",
        "When reading a figure, you should pay special attention to:",
        [
          "Only whether it uses bright colors",
          "Axes, units, sample size, and the caption",
          "The font the authors preferred",
          "Whether it appears before the references",
        ],
        1,
        "Axes and captions carry critical information easy to misread if skipped.",
      ),
      q(
        "m4-q7",
        "Limitations are discussed mainly in:",
        [
          "Methods and/or discussion sections",
          "The journal cover art",
          "Author middle names only",
          "Supplementary ads",
        ],
        0,
        "Discussion interprets results but should acknowledge constraints openly.",
      ),
      q(
        "m4-q8",
        "Supplementary material may contain:",
        [
          "Extra datasets, extended methods, or additional figures supporting the main paper",
          "Unrelated advertisements",
          "Mandatory peer-review comments in every journal",
          "Only humorous footnotes",
        ],
        0,
        "Supplements extend the main paper when space limits the print version.",
      ),
      q(
        "m4-q9",
        "A confidence interval shows:",
        [
          "A range of plausible values for an estimate, expressing uncertainty",
          "How confident the authors feel about their careers",
          "The journal's impact factor",
          "Proof of causation by itself",
        ],
        0,
        "CIs express estimate uncertainty—paired with the unit's warning not to equate significance with importance.",
      ),
      q(
        "m4-q10",
        "Reading the discussion section carefully matters because authors may:",
        [
          "Overgeneralize beyond their data or understate alternative explanations",
          "Replace the need for any methods section",
          "Publish without references",
          "Remove all mention of limitations",
        ],
        0,
        "Discussion interprets findings; the unit warns you to compare claims to what methods and results actually support.",
      ),
    ],
  },
  {
    moduleId: "module-4",
    questions: [
      q(
        "m2-q1",
        "A topic is too broad for a student project when:",
        [
          "It names a specific population and measurable variable",
          "It cannot be studied within your available time, resources, and access",
          "It requires reading five peer-reviewed papers",
          "It uses Google Scholar",
        ],
        1,
        "Scope and feasibility filters prevent field-sized topics like \"AI\" or \"climate change\" with no boundary.",
      ),
      q(
        "m2-q2",
        "A research gap is:",
        [
          "A typo in a PDF",
          "An unanswered or under-studied question prior work leaves open",
          "A paywall on one journal",
          "Any failed experiment",
        ],
        1,
        "Gaps appear in review articles, discussion sections, and edges of what prior studies examined.",
      ),
      q(
        "m2-q3",
        "Feasibility includes practical checks such as:",
        [
          "Only whether the topic sounds impressive on applications",
          "Time, equipment, data access, permissions, and mentor support",
          "How many likes a related post got",
          "Poster font choice",
        ],
        1,
        "The unit asks you to confirm you can access sources, tools, and ethics approvals before committing.",
      ),
      q(
        "m2-q4",
        "Which topic is weak because it is too vague, per this unit's examples?",
        [
          "Effects of sleep duration on short-term memory in tenth graders",
          "Artificial Intelligence",
          "Soil moisture and seed germination rates in a school garden",
          "Music tempo and self-reported focus during homework",
        ],
        1,
        "'Artificial Intelligence' is a field, not a research question—you must narrow variables and context.",
      ),
      q(
        "m2-q5",
        "Refining a broad interest into a focused question often uses a funnel that adds:",
        [
          "More buzzwords without variables",
          "Constraints: where, when, who, and what you will measure",
          "Extra unrelated topics",
          "Elimination of all citations",
        ],
        1,
        "The cafeteria food-waste example shows adding location, time frame, and measurement to make a question testable.",
      ),
      q(
        "m2-q6",
        "Reading news about science intelligently means:",
        [
          "Treating headlines as final proof",
          "Tracing claims back to the original study and its methods",
          "Ignoring publication dates",
          "Using a single outlet forever",
        ],
        1,
        "Headlines summarize; research requires following through to sources and limitations.",
      ),
      q(
        "m2-q7",
        "The \"Would I still care in March?\" test helps you judge:",
        [
          "Whether your personal interest will sustain a multi-week project",
          "Which citation style to use",
          "Your final exam score",
          "Whether peer review exists",
        ],
        0,
        "Genuine interest sustains you through slow phases—choosing topics only for prestige often fails this test.",
      ),
      q(
        "m2-q8",
        "Review articles are especially helpful early because they:",
        [
          "Replace all primary sources forever",
          "Summarize a field and often list future directions or gaps explicitly",
          "Guarantee your experiment will succeed",
          "Eliminate the need for mentors",
        ],
        1,
        "The unit recommends starting with reviews and reading \"future research\" suggestions in discussion sections.",
      ),
      q(
        "m2-q9",
        "Scope refers to:",
        [
          "How wide or narrow your question, population, and methods are",
          "The font size on your poster",
          "Your GPA",
          "Journal impact factor alone",
        ],
        0,
        "Scope is breadth and depth of inquiry—must match what you can actually complete.",
      ),
      q(
        "m2-q10",
        "Strong topic selection balances:",
        [
          "Personal interest, feasibility, and a meaningful contribution to what is already known",
          "Clickbait potential and viral hashtags",
          "Maximum length and minimum reading",
          "Avoidance of all statistics",
        ],
        0,
        "The unit's sweet spot: meaningful to you, doable with your resources, and addressing honest uncertainty.",
      ),
    ],
  },
  {
    moduleId: "module-5",
    questions: [
      q(
        "m7-q1",
        "Random assignment primarily helps by:",
        [
          "Balancing known and unknown confounders across groups on average",
          "Eliminating the need for any ethics review",
          "Guaranteeing every hypothesis is true",
          "Reducing sample size to one participant",
        ],
        0,
        "Randomization supports causal inference when combined with controls—the unit contrasts this with observational designs.",
      ),
      q(
        "m7-q2",
        "A longitudinal study, as defined here,:",
        [
          "Collects data at a single point in time only",
          "Follows the same subjects over time to observe change",
          "Never includes surveys",
          "Cannot involve humans",
        ],
        1,
        "Longitudinal designs track change; cross-sectional snapshots one moment.",
      ),
      q(
        "m7-q3",
        "A cross-sectional study:",
        [
          "Collects data at one point in time",
          "Always proves causation without controls",
          "Requires decades of follow-up only",
          "Ignores samples entirely",
        ],
        0,
        "Cross-sectional work compares groups or conditions at one time—useful for patterns, weaker for causation.",
      ),
      q(
        "m7-q4",
        "An IRB (Institutional Review Board) primarily protects:",
        [
          "Journal subscription revenue",
          "Rights and welfare of human research participants",
          "Only animal studies",
          "Social media account privacy in general",
        ],
        1,
        "Human subjects research needs informed consent and risk minimization—the ethics section covers IRB concepts.",
      ),
      q(
        "m7-q5",
        "Replication in research means:",
        [
          "Repeating a study to test whether findings hold under similar conditions",
          "Copying paragraphs without citation",
          "Using exactly one participant",
          "Avoiding all statistics",
        ],
        0,
        "Replication tests reproducibility—a single student project is a start, not the final word.",
      ),
      q(
        "m7-q6",
        "Internal validity concerns whether:",
        [
          "Differences in your study plausibly come from your intervention rather than confounds",
          "Your graphs use attractive colors",
          "You have many references",
          "The authors are famous",
        ],
        0,
        "Validity and reliability sections separate whether you measure what you claim and whether measurements are consistent.",
      ),
      q(
        "m7-q7",
        "Blinding in an experiment helps reduce:",
        [
          "Bias when participants or measurers know who received which condition",
          "The need for any control group",
          "Ethics requirements entirely",
          "Sample size calculations",
        ],
        0,
        "Single- and double-blind designs are taught in the controls/randomization section.",
      ),
      q(
        "m7-q8",
        "Convenience sampling, as described here, means:",
        [
          "Using whoever is available (e.g., classmates) and describing limits honestly",
          "Randomly selecting every person in a country",
          "Guaranteeing results apply to all teenagers everywhere",
          "Avoiding any written consent",
        ],
        0,
        "Generalization requires honest population statements—convenience samples are common in student work with stated limits.",
      ),
      q(
        "m7-q9",
        "Writing a study protocol before collecting data helps you:",
        [
          "Catch design flaws early and document steps others could replicate",
          "Guarantee p-values below 0.05",
          "Skip literature review entirely",
          "Hide limitations from mentors",
        ],
        0,
        "The protocol section includes question, design, participants, procedure, analysis plan, and ethics.",
      ),
      q(
        "m7-q10",
        "Informed consent for human subjects should include:",
        [
          "What participants will do, risks, benefits, and the right to withdraw without penalty",
          "A promise that every hypothesis will be confirmed",
          "Permission to share private identifiers publicly",
          "Automatic publication in Nature",
        ],
        0,
        "Ethics section: assent for minors, parental consent when required, and minimizing risk.",
      ),
    ],
  },
  {
    moduleId: "module-6",
    questions: [
      q(
        "m8-q1",
        "The median is:",
        [
          "The most frequent value in a dataset",
          "The middle value when all observations are ordered",
          "Always identical to the mean",
          "The largest outlier only",
        ],
        1,
        "Median resists outliers—often better than the mean for skewed data like income or reaction times.",
      ),
      q(
        "m8-q2",
        "Standard deviation measures:",
        [
          "Typical spread of values around the mean",
          "Journal impact factor",
          "Whether ethics approval was granted",
          "How many citations a paper has",
        ],
        0,
        "Report center and spread together—e.g., mean quiz score with SD.",
      ),
      q(
        "m8-q3",
        "Correlation shows association between variables; this unit stresses it does NOT by itself prove:",
        [
          "Causation",
          "That a sample existed",
          "That two numbers were calculated",
          "That a scatterplot can be drawn",
        ],
        0,
        "Ice cream and drowning both rise in summer—heat drives both; correlation ≠ causation.",
      ),
      q(
        "m8-q4",
        "The \"average trap\" warning in this unit means:",
        [
          "Reporting only the mean without spread or distribution shape can hide important patterns",
          "Means are always wrong and should never be used",
          "Medians are illegal in science fairs",
          "Outliers always mean data fraud",
        ],
        0,
        "If half your plants died and half thrived, the mean height can look \"average\" while no plant was typical.",
      ),
      q(
        "m8-q5",
        "A p-value, in introductory terms from this unit, answers:",
        [
          "If the null were true, how likely would data this extreme appear by chance alone?",
          "The probability the null hypothesis is true",
          "Proof the effect is large enough to matter in daily life",
          "The exact sample size needed next year",
        ],
        0,
        "P-values are widely misunderstood—significance is not the same as practical importance.",
      ),
      q(
        "m8-q6",
        "The mode is:",
        [
          "The most frequently occurring value",
          "The arithmetic average",
          "The middle ordered value",
          "Always the same as the median",
        ],
        0,
        "Mode helps with categorical data (most common survey response).",
      ),
      q(
        "m8-q7",
        "Before deleting an outlier, this unit says you should:",
        [
          "Investigate whether it is a typo, a rare real event, or a measurement error—and document your rule",
          "Always delete any highest value to improve p-values",
          "Never tell your mentor",
          "Replace it with the mean without noting the change",
        ],
        0,
        "Never delete outliers silently—investigate and document.",
      ),
      q(
        "m8-q8",
        "A histogram is used to:",
        [
          "Show the distribution of a numeric variable",
          "List author names alphabetically",
          "Replace the need for a methods section",
          "Prove causation from one chart",
        ],
        0,
        "Visualize before calculating—shape matters for choosing summaries and tests.",
      ),
      q(
        "m8-q9",
        "Statistical significance differs from practical significance because:",
        [
          "A tiny effect can be detectable in huge samples but meaningless in real life",
          "They are always identical concepts",
          "Practical significance requires p > 0.05",
          "Only statisticians care about effect size",
        ],
        0,
        "The unit uses examples like a drug shortening headaches by seconds with p < 0.001—detectable but irrelevant.",
      ),
      q(
        "m8-q10",
        "Responsible reporting includes:",
        [
          "Sharing sample size, tests used, exclusions, and limitations—not hiding inconvenient outcomes",
          "Only mentioning results that \"worked\"",
          "Using \"proved\" for every significant p-value",
          "Skipping confidence intervals always",
        ],
        0,
        "Selective reporting damages trust—the unit connects this to reproducibility concerns in science.",
      ),
    ],
  },
  {
    moduleId: "module-7",
    questions: [
      q(
        "m10-q1",
        "Scientific writing, in this unit, should prioritize:",
        [
          "Objective, precise language tied to evidence",
          "Emotional persuasion without data",
          "Slang and hype to keep readers excited",
          "Unverifiable superlatives",
        ],
        0,
        "Replace \"Our results were amazing\" with numbers, sample sizes, and conditions.",
      ),
      q(
        "m10-q2",
        "IMRaD stands for:",
        [
          "Introduction, Methods, Results, and Discussion",
          "Internet, Media, Research, and Data",
          "Independent, Manipulated, Random, and Double-blind",
          "Index, Metadata, References, and Draft",
        ],
        0,
        "Each IMRaD section has a distinct job—mixing results into introduction weakens the paper.",
      ),
      q(
        "m10-q3",
        "Why does this unit caution against writing \"proved\" in most research papers?",
        [
          "Science rarely proves absolute truth; one study supports or suggests under stated conditions",
          "The word is banned by all journals globally",
          "Proof only applies to mathematics in every field",
          "Teachers forbid all past tense",
        ],
        0,
        "Calibrated language: \"suggests,\" \"is consistent with,\" \"one possible explanation.\"",
      ),
      q(
        "m10-q4",
        "The methods section should be detailed enough that:",
        [
          "Another researcher could replicate your procedure",
          "Readers never learn who collected data",
          "All raw data are hidden",
          "Statistics are skipped entirely",
        ],
        0,
        "Example upgrade: specify volume, timing, and duration of watering—not just \"we watered plants.\"",
      ),
      q(
        "m10-q5",
        "Interpretation of why results matter belongs mainly in:",
        [
          "Discussion",
          "Methods",
          "References list only",
          "The title alone",
        ],
        0,
        "Results present findings; discussion interprets, compares to prior work, and notes limits.",
      ),
      q(
        "m10-q6",
        "Patchwriting means:",
        [
          "Changing one or two words in a source sentence and treating it as paraphrase—it is still plagiarism",
          "Writing patches of code in an appendix",
          "Using patch notes in video games",
          "Citing every sentence twice",
        ],
        0,
        "Paraphrase fully in your own words and still cite—the citations section covers integrity.",
      ),
      q(
        "m10-q7",
        "Cutting filler like \"It is important to note that\" helps because:",
        [
          "It rarely adds meaning and hides weak logic",
          "Journals charge by the word only",
          "It replaces the need for data",
          "Reviewers require empty phrases",
        ],
        0,
        "Revision section: read aloud, cut filler, check numbers and units.",
      ),
      q(
        "m10-q8",
        "The abstract should:",
        [
          "Summarize background, purpose, methods, key findings, and conclusion in brief standalone form",
          "List every raw data point",
          "Replace reading the full paper for expert replication",
          "Include lengthy literature review history",
        ],
        0,
        "Abstracts stay concise—many readers never go further.",
      ),
      q(
        "m10-q9",
        "A common student mistake highlighted here is:",
        [
          "Reporting or interpreting results at length in the introduction",
          "Defining specialized terms once",
          "Citing sources in the discussion",
          "Using headings in long methods sections",
        ],
        0,
        "Introduction narrows from field to your question; it does not report your outcomes.",
      ),
      q(
        "m10-q10",
        "Primary sources are preferable when you:",
        [
          "Describe original experiments or data you rely on for specific factual claims",
          "Need a dictionary definition only",
          "Want a quick meme explanation",
          "Avoid reading methods entirely",
        ],
        0,
        "Trace important claims to primary literature; secondary sources are for background context.",
      ),
    ],
  },
  {
    moduleId: "module-8",
    questions: [
      q(
        "m12-q1",
        "Responsible AI use in research, per this unit, requires:",
        [
          "Verifying every citation and claim against primary sources you locate yourself",
          "Trusting fluent AI outputs because they sound authoritative",
          "Skipping peer review when AI drafted the text",
          "Never disclosing AI assistance",
        ],
        0,
        "You remain accountable for every sentence with your name on it.",
      ),
      q(
        "m12-q2",
        "An AI hallucination is:",
        [
          "A confident but false output, such as an invented paper or DOI",
          "Hardware overheating during training",
          "A delay in journal peer review",
          "An open-access publishing fee",
        ],
        0,
        "Models predict plausible text—they do not guarantee truth.",
      ),
      q(
        "m12-q3",
        "Connected Papers and ResearchRabbit are described as tools that:",
        [
          "Build visual maps of related articles from a seed paper",
          "Automatically run IRB approval",
          "Replace the need to read methods sections",
          "Publish journals for you",
        ],
        0,
        "AI mapping widens the net; human judgment and database literacy keep quality high.",
      ),
      q(
        "m12-q4",
        "Academic honesty with AI includes:",
        [
          "Following your school or fair policy on disclosure and acceptable assistance",
          "Submitting unedited AI prose as your own analysis",
          "Fabricating data AI suggested",
          "Deleting methods to hide AI use",
        ],
        0,
        "Policies vary—read them each semester and disclose tools when required.",
      ),
      q(
        "m12-q5",
        "The \"explain-without-AI test\" in this unit means:",
        [
          "After revising AI-assisted text, explain the content aloud without the tool—if you cannot, it is not yet yours",
          "Never speak about your project to mentors",
          "Only use AI during oral exams",
          "Ban all grammar checkers",
        ],
        0,
        "If you cannot explain a paragraph, you have not finished making it your own.",
      ),
      q(
        "m12-q6",
        "You should treat AI summaries of papers as:",
        [
          "Starting points that still require reading and verifying the original source",
          "Final authoritative truth",
          "Substitutes for citations in your bibliography",
          "Raw experimental data",
        ],
        0,
        "Summaries can misstate statistics or confuse correlation with causation.",
      ),
      q(
        "m12-q7",
        "Before pasting research data into a public AI chat, this unit warns you to:",
        [
          "Check privacy rules—avoid human subjects identifiers and confidential lab results",
          "Always share the most sensitive rows for better answers",
          "Assume vendors cannot store prompts",
          "Skip mentor approval",
        ],
        0,
        "Never paste confidential or identifiable data into public tools without policy clearance.",
      ),
      q(
        "m12-q8",
        "Consensus and Elicit are mentioned as tools that:",
        [
          "Help extract or query evidence from literature (with verification still required)",
          "Edit videos for science fairs",
          "Print posters automatically",
          "Replace Firebase progress tracking",
        ],
        0,
        "They support discovery and orientation—not replacement for reading full papers.",
      ),
      q(
        "m12-q9",
        "Over-reliance on AI risks:",
        [
          "Shallow understanding and undetected factual errors in your project",
          "Perfect automatic replication of experiments",
          "Eliminating all bias from statistics",
          "Instant IRB approval",
        ],
        0,
        "Speed without verification weakens learning and integrity.",
      ),
      q(
        "m12-q10",
        "Your verification column should mark \"Used in draft\" only when:",
        [
          "You found the source, read it personally, and confirmed the claim",
          "AI sounded confident",
          "The abstract was long",
          "The paper appeared in a Google search",
        ],
        0,
        "Claim | Source found? | Read personally? | Used in draft?—all yes before relying on it.",
      ),
    ],
  },
];

export const QUIZ_QUESTIONS_PER_MODULE = 10;

export const FINAL_QUIZ_BRIEFING = [
  "This final covers all eight units. Only multiple-choice questions are graded.",
  "You need 80% to complete the course. The grade appears as soon as you submit.",
  "A retake after your first attempt is capped at 80%.",
  "Leaving or closing the tab can delete this attempt.",
];

export const FINAL_QUIZ: ModuleQuiz = {
  moduleId: "final",
  questions: [
    q("f-q1", "Research, as taught in Unit 1, is best described as:", ["Confirming what you already believe via quick searches", "A systematic, evidence-based process for answering unanswered questions", "Collecting as many websites as possible", "Sharing opinions until they sound expert"], 1, "Unit 1: structured inquiry, not casual searching."),
    q("f-q2", "Googling differs from research because research requires:", ["Never using online tools", "Evaluating source quality, methods, and limitations", "Always being faster", "Avoiding all statistics"], 1, "Unit 1: search ranking ≠ truth."),
    q("f-q3", "A primary source is:", ["A textbook summary", "Original data or firsthand findings", "A meme with a chart", "An encyclopedia entry alone"], 1, "Unit 2: primary = original evidence."),
    q("f-q4", "Peer review means:", ["Authors approve their own paper privately", "Independent experts evaluate a manuscript before publication", "AI publishes automatically", "Students vote on grades"], 1, "Unit 2: external expert review."),
    q("f-q5", "Predatory journals often:", ["Charge fees with weak or fake review", "Have strict unpaid peer review only", "Never accept submissions", "Are the same as PubMed"], 0, "Unit 2: pay-to-publish red flags."),
    q("f-q6", "When reading a paper, a strong first pass includes:", ["Abstract, figures, and headings", "Only the references alphabetically", "Author social media", "Every supplement first"], 0, "Unit 3: strategic skimming."),
    q("f-q7", "Statistical significance does not automatically mean:", ["A p-value exists", "The finding is practically important", "A sample was measured", "Results were tabulated"], 1, "Unit 3: significance ≠ importance."),
    q("f-q8", "A topic is too broad when:", ["It cannot be completed with your time and resources", "It names one variable", "It includes a methods plan", "It uses Google Scholar"], 0, "Unit 4: scope must match feasibility."),
    q("f-q9", "A research gap is:", ["An unanswered question in the literature", "A typo", "A paywall", "Any failed quiz"], 0, "Unit 4: gaps motivate new work."),
    q("f-q10", "Random assignment mainly helps:", ["Balance confounders across groups", "Remove ethics requirements", "Prove hypotheses before data", "Reduce sample to n=1"], 0, "Unit 5: supports causal inference with controls."),
    q("f-q11", "An IRB protects:", ["Human participants' rights and welfare", "Journal profits", "Only animals", "Poster fonts"], 0, "Unit 5: consent and risk minimization."),
    q("f-q12", "Correlation means two variables are associated; it does not by itself prove:", ["Causation", "That data were collected", "That a scatterplot exists", "That units were labeled"], 0, "Unit 6: association ≠ causation."),
    q("f-q13", "The median is the:", ["Middle value when data are ordered", "Most frequent value", "Always equal to the mean", "Largest outlier"], 0, "Unit 6: median resists outliers."),
    q("f-q14", "A p-value indicates:", ["How surprising the data would be if the null were true", "The probability the null is true", "Proof of a large effect", "Sample size directly"], 0, "Unit 6: widely misunderstood— not proof of importance."),
    q("f-q15", "Scientific writing should stay:", ["Precise, objective, and matched to the evidence", "Full of hype and hidden limits", "Free of all citations", "Interpretive in the results section"], 0, "Unit 7: tone follows evidence."),
    q("f-q16", "The discussion section should:", ["Interpret results, compare to prior work, and note limitations", "Introduce unreported new data", "Repeat the abstract verbatim", "List raw spreadsheets only"], 0, "Unit 7: IMRaD roles."),
    q("f-q17", "An AI hallucination is:", ["A fluent but false claim or citation", "A computer crash", "Peer-review delay", "An OA fee"], 0, "Unit 8: verify every AI-suggested source."),
    q("f-q18", "After AI suggests papers, you should:", ["Open and verify the originals in a trusted database", "Cite the chatbot", "Skip methods", "Assume DOIs are real"], 0, "Unit 8: verification is non-negotiable."),
    q("f-q19", "Citation chaining means:", ["Following references backward and \"cited by\" forward from a key paper", "Deleting bibliographies", "Using one keyword forever", "Copying quotes without reading"], 0, "Unit 2: snowball search strategy."),
    q("f-q20", "A strong research question is:", ["Specific, testable, and feasible", "As broad as \"AI\" or \"health\"", "Unrelated to prior literature", "Unmeasurable by design"], 0, "Unit 4: refinement funnel."),
  ],
};

export function getQuizByModuleId(moduleId: string) {
  if (moduleId === "final") return FINAL_QUIZ;
  const quiz = MODULE_QUIZZES.find((entry) => entry.moduleId === moduleId);
  if (!quiz) return undefined;
  return {
    ...quiz,
    questions: quiz.questions.slice(0, QUIZ_QUESTIONS_PER_MODULE),
  };
}

export function scoreQuiz(questions: QuizQuestion[], answers: Record<string, number>) {
  let correct = 0;
  for (const question of questions) {
    if (answers[question.id] === question.correctIndex) correct += 1;
  }
  return {
    correct,
    total: questions.length,
    score: questions.length === 0 ? 0 : correct / questions.length,
  };
}
