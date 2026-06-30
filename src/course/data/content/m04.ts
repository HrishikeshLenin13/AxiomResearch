import type { CourseModule } from "../module-types";

export const module04: CourseModule = {
  id: "module-4",
  number: 4,
  title: "Reading Research Papers",
  summary:
    "Learn the anatomy of research papers, efficient reading strategies used by experts, and how to annotate, interpret methods and results, and assess limitations.",
  estimatedMinutes: 100,
  learningObjectives: [
    "Identify the purpose of each major section in a standard research paper",
    "Apply a strategic reading order that prioritizes figures, methods, and results",
    "Annotate papers effectively by tracking claims, evidence, and limitations",
    "Interpret methods and results sections with appropriate skepticism",
    "Recognize how field-specific conventions differ across biology, psychology, and computer science",
  ],
  sections: [
    {
      title: "Anatomy of a Research Paper",
      body: "Research papers follow conventions that can feel intimidating until you learn the blueprint. Most scientific articles share a common skeleton: title, abstract, introduction, methods, results, discussion, references, and often supplementary materials. Each section has a distinct job, and knowing those jobs lets you navigate efficiently instead of reading linearly from start to finish like a novel.\n\nThe title and abstract are your preview. The title should indicate topic and often method; the abstract summarizes the entire study in roughly 150–300 words—background, question, approach, main findings, and significance. Read the abstract first, but never cite it as if you read the full paper. Abstracts omit nuance and limitations for brevity.\n\nThe introduction sets context: what is known, what is unknown, and why this study matters. It ends with research questions or hypotheses. Methods describe exactly what researchers did—participants, materials, procedures, statistical tests, software. Results present findings, usually with tables and figures. Discussion interprets findings, compares them to prior work, acknowledges limitations, and suggests future directions. References list every source cited.\n\nSupplementary materials—appendices, extra datasets, detailed protocols—appear online and can be essential for replication. Figures and tables often convey the core evidence more clearly than paragraphs. A paper on NASA rover data might include geological maps; a psychology paper might include survey instruments in an appendix.\n\nDifferent fields tweak the template. Humanities papers may lack a separate methods section; computer science conferences often emphasize figures and algorithms. Nonetheless, the underlying logic persists: question, approach, evidence, interpretation.",
      callouts: [
        {
          type: "tip",
          title: "Treat the paper like a map, not a novel",
          body: "Skilled readers jump to the sections they need. You are not required to read every word on the first pass—learn the layout, then dive deep where your question demands.",
        },
      ],
    },
    {
      title: "How Experts Read Papers",
      body: "Graduate students and professors rarely read papers cover-to-cover on first contact. They use a strategic sequence honed over years—one you can adopt immediately.\n\nStep one: read the title and abstract. Decide if the paper is relevant to your question. If not, move on without guilt. Time is finite; not every paper deserves deep reading.\n\nStep two: skim figures, tables, and captions. In many sciences, figures are the heart of the argument. A graph showing temperature rise over decades communicates faster than three pages of prose. Ask: What is being measured? What trends appear? Do error bars or sample sizes look reasonable?\n\nStep three: read the methods section selectively. Focus on sample size, how variables were measured, controls, and statistical tests. If methods are unclear or impossible to replicate, treat results cautiously regardless of how exciting they sound.\n\nStep four: read results, connecting each claim to specific figures or tables. Note exact numbers, significance levels, and effect sizes—not just \"significant\" or \"not significant.\"\n\nStep five: read introduction and discussion for context—often after results make more sense. Discussion reveals authors' interpretations, limitations, and how findings fit the broader field.\n\nStep six: mine the reference list for your next reads. One good paper leads to ten more through citation chaining.\n\nThis approach—sometimes called the \"three-pass\" method—saves hours and builds comprehension because you understand evidence before absorbing interpretation.",
    },
    {
      title: "Reading the Methods Section Carefully",
      body: "The methods section is where many casual readers skim or skip—and where careful readers find whether claims are justified. Methods answer: How did the authors know what they claim to know?\n\nStart with participants or samples. Who or what was studied? How many? How were they selected? A survey of twelve volunteers from one classroom cannot support broad claims about \"all teenagers.\" NASA's analysis of Mars soil samples from one drill site informs geology at that location—not the entire planet uniformly.\n\nNext examine measurement. How were variables operationalized? If the paper studies \"anxiety,\" did researchers use a validated clinical scale or a single self-report question? Weak measurement weakens everything downstream.\n\nControls and comparison groups separate correlation from causation. In experiments, what happened to the control group? Were participants randomly assigned? In observational studies, what confounding variables might explain the pattern besides the proposed cause?\n\nStatistical methods matter. Did researchers use appropriate tests for their data type? Small samples with fancy statistics can mislead. Look for effect sizes, confidence intervals, and not just p-values. A p-value below 0.05 with a tiny effect may be \"statistically significant\" but practically meaningless.\n\nReproducibility signals quality. Strong papers provide enough detail for another lab to repeat the work. Vague methods—\"standard protocols were followed\" without citation—are a warning sign.",
      callouts: [
        {
          type: "mistake",
          title: "Trusting conclusions without reading methods",
          body: "A shocking result in the abstract is worthless if the study had twelve participants, no control group, or a measurement tool that does not measure what it claims.",
        },
      ],
    },
    {
      title: "Interpreting Results and Figures",
      body: "Results sections present evidence; they should not yet argue for broad world-changing conclusions—that belongs in discussion. Your job is to separate what the data actually show from what authors later claim they mean.\n\nRead every figure caption carefully. Captions explain axes, units, sample sizes, and symbols. A line graph of penicillin effectiveness should specify dose, bacterial strain, and time points. Missing details in captions sometimes reflect missing rigor in the study itself.\n\nCompare reported numbers to visual displays. Do bars in a chart match the text? Do error bars overlap in ways that contradict claims of \"large differences\"? Misalignment between text and figures occasionally indicates sloppiness or selective reporting.\n\nWatch for cherry-picking. Did authors report only outcomes that looked good while omitting failed experiments? Pre-registration—declaring analysis plans before collecting data—reduces this risk, but many papers are not pre-registered. Supplementary materials sometimes contain the full picture.\n\nDistinguish statistical significance from importance. A drug that lowers blood pressure by half a millimeter might be statistically detectable with ten thousand participants but clinically irrelevant. Ask: Would this effect matter in real life?\n\nNegative results deserve respect. Papers showing \"no effect\" are harder to publish but scientifically valuable. If every published study on a topic shows positive results, publication bias may be distorting the literature.",
    },
    {
      title: "Annotation Habits That Build Understanding",
      body: "Highlighting without thinking creates colorful PDFs and empty memory. Effective annotation is active—it forces you to process and question as you read.\n\nUse a consistent symbol system. Stars for main claims, question marks for confusion, exclamation points for surprising findings, checkmarks for claims you verified elsewhere. Margin notes in your own words beat copying sentences.\n\nCreate a paper summary template: citation, research question, sample/method in one sentence, three key findings, two limitations, one connection to your project. Filling this takes ten minutes per paper and produces study notes you will reuse when writing.\n\nTrack claims and evidence in two columns. Claim: \"Sleep deprivation reduces working memory in adolescents.\" Evidence: \"Figure 2, n=84, one night of 4-hour sleep vs. 8-hour control, p<0.01 on n-back task.\" This habit reveals when claims outrun evidence.\n\nWrite questions as you read. \"Why didn't they measure caffeine intake?\" \"Does this apply outside the U.S.?\" Questions guide follow-up searches and mentor conversations.\n\nDigital tools like Zotero, Hypothesis, or PDF readers with annotation export help organize notes across many papers. Paper is fine too—what matters is the thinking, not the medium.\n\nReview annotations within forty-eight hours. Brief recall cements understanding far better than filing notes away unread.",
      callouts: [
        {
          type: "did-you-know",
          title: "Fleming's original penicillin paper was only a few pages",
          body: "Classic papers are often shorter than modern ones, but they still follow the same logic: observation, method, result, implication. Learning the structure once helps you read across centuries of science.",
        },
      ],
    },
    {
      title: "Discussion, Limitations, and References",
      body: "The discussion section is where authors interpret results—and where careful readers apply the most skepticism. Interpretation involves judgment; judgment can be influenced by bias, hope, or funding pressure.\n\nCompare discussion claims to results section facts. Authors sometimes generalize beyond their data: a study on college freshmen becomes \"young adults\" in discussion; a lab experiment becomes \"real-world proof.\" Flag overreach.\n\nLimitations sections reveal honesty. Strong authors name weaknesses: small samples, short duration, homogeneous populations, unmeasured confounds. Weak papers bury limitations in one vague sentence or omit them entirely. Absence of limitations is not a sign of perfection—it often signals poor awareness.\n\nFuture directions suggest where the field is heading. These sentences are gold for students choosing research topics. If authors say \"long-term effects remain unstudied,\" that gap might be your opportunity—scaled appropriately.\n\nReferences validate the paper's foundation. Scan whether citations include recent work, diverse perspectives, and primary sources. Papers that cite only their authors' prior work or a narrow echo chamber deserve scrutiny.\n\nConflicts of interest and funding statements appear near the end. A cardiovascular study funded entirely by a processed-food trade group does not automatically fail, but you should read methods with extra care.",
    },
    {
      title: "Reading Across Disciplines",
      body: "Research papers differ by field, and adjusting expectations prevents frustration when you cross disciplinary boundaries.\n\nBiology and medicine papers emphasize experimental protocols, statistical tests, and ethical approvals for human or animal subjects. Expect dense methods, figure panels with microscopy or gel images, and discussion linking findings to molecular mechanisms or clinical implications. PubMed-format papers often follow IMRaD structure (Introduction, Methods, Results, and Discussion) strictly.\n\nPsychology and social science papers discuss constructs like anxiety, motivation, or group identity that require clear operational definitions. Watch for validated instruments versus ad-hoc surveys. Effect sizes and confidence intervals appear frequently because human behavior varies widely.\n\nComputer science and engineering papers—especially in conferences—may prioritize algorithm description, benchmark comparisons, and runtime analysis over lengthy prose. Figures show architecture diagrams and performance charts. Preprints on arXiv move fast; check whether a conference version with peer review exists.\n\nInterdisciplinary work—climate science, bioinformatics, cognitive neuroscience—combines conventions. Read slowly, look up unfamiliar terms, and do not assume one field's standards apply universally.\n\nPractice with one paper outside your comfort zone each semester. A biology student reading a machine learning paper—or vice versa—builds versatility prized in modern research environments, including NASA missions that combine geology, chemistry, and robotics.",
    },
  ],
  vocabulary: [
    {
      term: "Abstract",
      definition:
        "A brief summary at the start of a paper covering background, methods, main findings, and significance—usually 150–300 words.",
    },
    {
      term: "IMRaD",
      definition:
        "Standard paper structure: Introduction, Methods, Results, and Discussion.",
    },
    {
      term: "Operational definition",
      definition:
        "A precise explanation of how an abstract concept is measured or identified in a specific study.",
    },
    {
      term: "Control group",
      definition:
        "Participants or conditions that do not receive the experimental treatment, providing a baseline for comparison.",
    },
    {
      term: "Statistical significance",
      definition:
        "A mathematical indication that observed results are unlikely due to random chance alone, often p < 0.05.",
    },
    {
      term: "Effect size",
      definition:
        "A measure of the magnitude of a finding, indicating practical importance beyond statistical significance.",
    },
    {
      term: "Confound",
      definition:
        "An unmeasured variable that distorts the apparent relationship between the variables of interest.",
    },
    {
      term: "Peer review",
      definition:
        "Expert evaluation of a manuscript before publication, assessing validity and quality.",
    },
    {
      term: "Pre-registration",
      definition:
        "Publicly documenting study hypotheses and analysis plans before data collection to reduce selective reporting.",
    },
    {
      term: "Supplementary materials",
      definition:
        "Additional data, methods, or figures published online alongside the main paper.",
    },
  ],
  keyTakeaways: [
    "Research papers follow predictable sections; each section serves a specific purpose in presenting evidence and interpretation.",
    "Expert readers skim abstracts and figures first, then methods and results, then introduction and discussion for context.",
    "Methods sections reveal whether results are trustworthy—sample, measurement, controls, and statistics matter most.",
    "Active annotation linking claims to specific evidence builds comprehension and supports later writing.",
    "Discussion interprets results but may overgeneralize; limitations and funding disclosures require careful attention.",
  ],
  commonMistakes: [
    "Reading papers linearly from introduction to references on the first pass, wasting time before confirming relevance.",
    "Citing findings from abstracts without reading methods and results in the full paper.",
    "Assuming statistical significance means a finding is large or practically important.",
    "Highlighting text without writing notes in your own words, leading to poor retention.",
  ],
  researchTips: [
    "Use a one-page summary template for every paper you read seriously—future you will thank present you.",
    "When confused by a figure, cover the caption and try to interpret the graph, then check whether you were right.",
    "If a paper is central to your project, read two papers it cites and one paper that cites it for context.",
    "Schedule two reading sessions per paper: one for strategic skim, one for deep methods and results review.",
  ],
  activity: {
    title: "Guided Paper Annotation",
    objective:
      "Apply strategic reading and structured annotation to a provided research paper, producing a concise evidence-based summary.",
    instructions: [
      "Obtain the sample paper PDF assigned by your instructor (or select one approved paper related to your topic).",
      "First pass (15 minutes): read the abstract, skim all figures and tables, and decide the paper's main question.",
      "Second pass (25 minutes): read methods and results carefully, annotating sample size, measures, controls, and key statistics.",
      "Third pass (15 minutes): read introduction and discussion, noting how authors interpret findings and what limitations they acknowledge.",
      "Complete the paper summary template: citation, question, method, three findings, two limitations, one relevance note for your project.",
      "Write a five-sentence plain-language summary of the paper's main claim for a non-expert reader.",
      "Submit your annotated PDF (or notes export) plus the summary template and five-sentence summary.",
    ],
    deliverable:
      "Annotated paper or exported notes, completed summary template, and a five-sentence plain-language summary.",
    timeEstimate: "55–70 minutes",
  },
  reflection: {
    prompt:
      "What part of reading research papers is hardest for you—methods, statistics, vocabulary, motivation, or something else? Describe your difficulty honestly and explain one specific strategy from this module you will try on your next paper.",
    guidelines: [
      "Name the specific difficulty rather than saying \"everything is hard.\"",
      "Give a concrete example from a paper you recently attempted to read.",
      "Identify one strategy from this module (three-pass reading, annotation template, figure-first approach, etc.).",
      "Explain how and when you will apply that strategy on your next reading assignment.",
    ],
    wordCount: "150–300 words",
    rubric: [
      "Identifies a genuine, specific reading challenge with an example",
      "Selects an appropriate strategy from the module content",
      "Provides a realistic plan for applying the strategy to future reading",
    ],
  },
  furtherReading: [
    {
      title: "How to Read a Paper (S. Keshav)",
      description:
        "A classic three-pass method guide written for computer science students but widely applicable across disciplines.",
    },
    {
      title: "How to Read a Book (Mortimer Adler)",
      description:
        "Though not about journal articles specifically, its lessons on analytical reading transfer directly to deep engagement with research texts.",
    },
    {
      title: "The Visual Display of Quantitative Information (Edward Tufte)",
      description:
        "Helps readers interpret charts, graphs, and figures critically—essential for understanding results sections.",
    },
  ],
};
