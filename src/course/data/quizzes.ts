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
      q("m1-q1", "What best defines research?", ["Guessing until something sounds right", "A structured process for answering questions with evidence", "Collecting as many websites as possible", "Repeating what experts already said"], 1, "Research is systematic and evidence-based."),
      q("m1-q2", "How is research different from Googling?", ["Research never uses the internet", "Research evaluates methods and source quality", "Googling is always more accurate", "There is no difference"], 1, "Research requires critical evaluation, not just search results."),
      q("m1-q3", "Which is an experimental research type?", ["Randomized controlled trial", "Personal blog post", "News headline summary", "Social media poll without design"], 0, "RCTs test causal hypotheses under controlled conditions."),
      q("m1-q4", "A literature review primarily:", ["Collects original lab data", "Synthesizes existing published studies", "Replaces peer review", "Eliminates the need for citations"], 1, "Literature reviews map prior work and gaps."),
      q("m1-q5", "Curiosity in research means:", ["Ignoring inconvenient results", "Asking testable questions and refining them", "Avoiding difficult topics", "Only studying popular topics"], 1, "Curiosity drives question formation and revision."),
      q("m1-q6", "Observational research:", ["Always proves causation", "Studies phenomena without manipulating variables", "Cannot be published", "Is the same as a survey"], 1, "Observational designs watch rather than manipulate."),
      q("m1-q7", "Meta-analysis:", ["Ignores previous studies", "Combines results across multiple studies statistically", "Is only used in biology", "Replaces experiments entirely"], 1, "Meta-analyses aggregate quantitative findings."),
      q("m1-q8", "Qualitative research often focuses on:", ["Only p-values", "Meanings, experiences, and themes", "Large-scale randomization only", "Spreadsheet formulas"], 1, "Qualitative methods explore depth and context."),
      q("m1-q9", "Penicillin's discovery illustrates:", ["That accidents alone count as proof", "How observation can lead to systematic investigation", "Why peer review is unnecessary", "That research avoids experimentation"], 1, "Observation plus follow-up testing is key."),
      q("m1-q10", "Computational research often involves:", ["Ignoring data", "Using algorithms and simulations on data", "Only handwriting notes", "Avoiding statistics"], 1, "Computational work uses models and code."),
    ],
  },
{
    moduleId: "module-2",
    questions: [
      q("m3-q1", "A primary source is:", ["A textbook chapter summarizing many studies", "Original data or firsthand findings", "A Wikipedia article only", "A meme"], 1, "Primary sources present original evidence."),
      q("m3-q2", "Peer review means:", ["Authors review their own work privately", "Independent experts evaluate a manuscript before publication", "Students grade each other only", "AI writes the paper"], 1, "External expert review is central."),
      q("m3-q3", "Predatory journals often:", ["Charge fees with weak or fake review", "Have strict editorial standards", "Never accept payment", "Only publish Nobel winners"], 0, "Predatory outlets exploit pay-to-publish models."),
      q("m3-q4", "Boolean AND narrows results by:", ["Requiring all terms to appear", "Removing all filters", "Searching only images", "Randomizing order"], 0, "AND requires multiple terms."),
      q("m3-q5", "Citation chaining means:", ["Copying references without reading", "Following references forward and backward from a key paper", "Deleting bibliographies", "Using only one author"], 1, "Chains expand relevant literature networks."),
      q("m3-q6", "Open access publishing:", ["Hides papers from readers", "Makes research freely available under various license models", "Eliminates peer review always", "Is illegal"], 1, "OA increases accessibility with different models."),
      q("m3-q7", "Author credibility checks include:", ["Profile photo quality", "Affiliation, expertise, and publication record", "Number of hashtags", "Slide animations"], 1, "Expertise and track record matter."),
      q("m3-q8", "PubMed is especially strong for:", ["Biomedical and life sciences literature", "Only fiction", "Patent law only", "Social media trends"], 0, "PubMed indexes biomedical research."),
      q("m3-q9", "Funding conflicts should be:", ["Ignored", "Disclosed and considered when evaluating bias", "Hidden in appendices only", "Used to reject all industry research automatically"], 1, "Disclosures help assess potential bias."),
      q("m3-q10", "Tertiary sources include:", ["Raw survey datasets", "Encyclopedias and broad summaries", "Lab notebooks only", "Ethics applications"], 1, "Tertiary sources summarize fields."),
    ],
  },
{
    moduleId: "module-3",
    questions: [
      q("m4-q1", "The abstract should:", ["Hide the conclusion", "Summarize purpose, methods, results, and implications briefly", "List every raw data point", "Replace reading the paper"], 1, "Abstracts provide a concise overview."),
      q("m4-q2", "Methods section explains:", ["How data were collected and analyzed", "Authors' hobbies", "Unrelated news", "Only the discussion"], 0, "Methods enable replication and critique."),
      q("m4-q3", "Skimming first often includes:", ["Abstract, figures, and headings", "Only the references", "Random paragraphs", "Author emails"], 0, "Strategic skimming orients you quickly."),
      q("m4-q4", "Statistical significance does NOT automatically mean:", ["Result is plausible given design", "Finding is practically important", "P-value was calculated", "Sample existed"], 1, "Significance ≠ importance or causation."),
      q("m4-q5", "Limitations belong mainly in:", ["Methods or discussion", "Author names", "Journal cover", "Title only"], 0, "Authors discuss constraints and weaknesses openly."),
      q("m4-q6", "Supplementary material may contain:", ["Extra datasets, methods, or figures", "Unrelated ads", "Peer review comments always", "Only jokes"], 0, "Supplements extend the main paper."),
      q("m4-q7", "Deep reading requires:", ["Highlighting every sentence", "Active note-taking and questioning claims", "Skipping methods", "Avoiding figures"], 1, "Engaged reading tests each claim."),
      q("m4-q8", "Figures should be read:", ["After ignoring axes", "With attention to axes, units, and sample size", "Only if colorful", "Without the caption"], 1, "Axes and captions carry critical information."),
      q("m4-q9", "Results section should:", ["Interpret policy implications at length", "Present findings without over-interpreting", "Hide negative outcomes", "Include unrelated anecdotes"], 1, "Results report what was found."),
      q("m4-q10", "Confidence intervals show:", ["A range of plausible values for an estimate", "Authors' confidence in their careers", "Journal ranking", "Exact causal proof always"], 0, "CIs express estimate uncertainty."),
    ],
  },
{
    moduleId: "module-4",
    questions: [
      q("m2-q1", "A topic is too broad when:", ["It has clear variables", "It cannot be studied within available time and resources", "It includes a literature review", "It uses Google Scholar"], 1, "Scope must match feasibility."),
      q("m2-q2", "A research gap is:", ["A typo in a paper", "An unanswered or under-studied question", "A journal paywall", "A failed experiment only"], 1, "Gaps motivate new studies."),
      q("m2-q3", "Feasibility includes:", ["Only personal interest", "Time, funding, access, and equipment", "Number of social media followers", "Font choice in slides"], 1, "Practical constraints shape topic choice."),
      q("m2-q4", "Google Scholar is useful for:", ["Finding scholarly literature and citations", "Replacing all primary sources", "Guaranteeing truth", "Avoiding reading papers"], 0, "Scholar helps discover academic work."),
      q("m2-q5", "A stronger topic narrows:", ["Evidence requirements", "The question to specific variables and context", "Ethical standards", "Citation needs"], 1, "Focused questions are more testable."),
      q("m2-q6", "Reading news intelligently means:", ["Accepting headlines as final proof", "Tracing claims back to sources and methods", "Ignoring publication date", "Using only one outlet"], 1, "Trace claims to evidence."),
      q("m2-q7", "Which is a weak topic?", ["Effects of sleep duration on short-term memory in teens", "Artificial Intelligence", "Soil moisture and seed germination rates", "Music tempo and study focus in high school students"], 1, "'AI' alone is far too broad."),
      q("m2-q8", "Current trends can help you:", ["Avoid all prior work", "Identify active debates and open questions", "Skip literature reviews", "Eliminate controls"], 1, "Trends reveal where the field is moving."),
      q("m2-q9", "Scope refers to:", ["How wide or narrow your study question is", "The font size of your poster", "Your GPA", "Journal impact factor only"], 0, "Scope is breadth and depth of inquiry."),
      q("m2-q10", "Good topic selection balances:", ["Interest, feasibility, and contribution", "Popularity and clickbait", "Length and complexity only", "Avoidance of all statistics"], 0, "Sustainable projects balance these three."),
    ],
  },
{
    moduleId: "module-5",
    questions: [
      q("m7-q1", "Randomization primarily helps:", ["Increase bias", "Balance known and unknown confounders across groups", "Eliminate need for ethics", "Reduce sample size to one"], 1, "Random assignment supports causal inference."),
      q("m7-q2", "Longitudinal studies:", ["Observe one time point only", "Follow subjects over time", "Never use surveys", "Cannot study humans"], 1, "Longitudinal designs track change over time."),
      q("m7-q3", "Cross-sectional studies:", ["Collect data at one point in time", "Always prove causation", "Require decades only", "Ignore samples"], 0, "Cross-sectional snapshots one time point."),
      q("m7-q4", "IRB review protects:", ["Journal profits", "Rights and welfare of human participants", "Only animals", "Social media accounts"], 1, "IRBs oversee human subjects research."),
      q("m7-q5", "Replication means:", ["Repeating a study to test reliability of findings", "Copying text without citation", "Using one participant", "Avoiding statistics"], 0, "Replication tests reproducibility."),
      q("m7-q6", "Validity refers to:", ["Whether a study measures what it claims", "How pretty graphs are", "Number of references", "Author fame"], 0, "Validity is accuracy of measurement/inference."),
      q("m7-q7", "Pilot studies:", ["Replace full studies always", "Test procedures on a small scale before main study", "Eliminate ethics", "Are never published"], 1, "Pilots refine methods."),
      q("m7-q8", "Sample size affects:", ["Precision and power of conclusions", "Only font choice", "Citation format", "Peer review speed only"], 0, "Adequate samples support reliable inference."),
      q("m7-q9", "Survey design should:", ["Use leading questions freely", "Use clear, unbiased questions and appropriate scales", "Avoid pilot testing", "Hide purpose always"], 1, "Clear unbiased items improve data quality."),
      q("m7-q10", "Ethics in animal research requires:", ["No oversight", "Humane treatment and justification of use", "Unlimited harm", "Public posting of home addresses"], 1, "Animal research has ethical standards."),
    ],
  },
{
    moduleId: "module-6",
    questions: [
      q("m8-q1", "Median is:", ["The most frequent value", "The middle value when ordered", "Always equal to mean", "The largest outlier"], 1, "Median splits ordered data."),
      q("m8-q2", "Standard deviation measures:", ["Spread around the mean", "Journal impact", "Sample ethics", "Citation count"], 0, "SD quantifies variability."),
      q("m8-q3", "Correlation shows:", ["Association between variables", "Guaranteed causation", "Proof of manipulation", "Ethical approval"], 0, "Correlation is association, not causation."),
      q("m8-q4", "Outliers are:", ["Values far from the rest of the data", "Always errors to delete", "Only in qualitative research", "The mean itself"], 0, "Outliers may be real or erroneous."),
      q("m8-q5", "P-value in simple terms:", ["Probability of data at least this extreme if null were true", "Probability null is true", "Proof the effect is large", "Sample size"], 0, "P-values assess evidence against H0."),
      q("m8-q6", "Mode is:", ["Most frequently occurring value", "Average of all values", "Middle value", "Range width"], 0, "Mode is the most common value."),
      q("m8-q7", "Histograms display:", ["Distribution of a numeric variable", "Only time series of stocks", "Citation networks", "Survey consent forms"], 0, "Histograms show frequency distributions."),
      q("m8-q8", "Variance is:", ["Average squared deviation from the mean", "Always negative", "Same as median", "A chart type"], 0, "Variance measures spread squared."),
      q("m8-q9", "Misinterpreting p-values leads to:", ["Overstating evidence or importance", "Better ethics", "Automatic replication", "Clearer graphs only"], 0, "P-values are widely misunderstood."),
      q("m8-q10", "Data cleaning may include:", ["Handling missing values and obvious entry errors", "Deleting all outliers blindly", "Fabricating values", "Ignoring units"], 0, "Cleaning prepares reliable analysis."),
    ],
  },
{
    moduleId: "module-7",
    questions: [
      q("m10-q1", "Scientific writing favors:", ["Objective, precise language", "Emotional persuasion without evidence", "Slang and hype", "Unverifiable claims"], 0, "Objectivity and precision are core."),
      q("m10-q2", "Abstract typically excludes:", ["Lengthy literature review history", "Brief statement of main findings", "Concise methods summary", "Implication or conclusion"], 0, "Abstracts stay concise."),
      q("m10-q3", "Active voice often:", ["Improves clarity about who did what", "Is banned in all sciences", "Replaces citations", "Hides methods"], 0, "Active voice can clarify agency."),
      q("m10-q4", "Methods section tone should be:", ["Detailed enough for replication", "Vague to protect secrets always", "Humorous only", "Identical to introduction"], 0, "Methods enable reproduction."),
      q("m10-q5", "Discussion should:", ["Interpret results in context and note limitations", "Introduce new data not in results", "Ignore alternative explanations", "Skip citations"], 0, "Discussion interprets with humility."),
      q("m10-q6", "APA style concerns:", ["Citation and formatting conventions", "Experimental design only", "Statistical power only", "Poster size only"], 0, "APA governs presentation conventions."),
      q("m10-q7", "Fluff in writing:", ["Distracts from evidence", "Improves clarity", "Replaces discussion", "Is required in abstracts"], 0, "Cut unnecessary filler."),
      q("m10-q8", "Results section presents:", ["Findings with appropriate tables/figures", "Full policy manifesto", "Personal diary entries", "Only references"], 0, "Results show what was found."),
      q("m10-q9", "References section:", ["Credits sources and enables verification", "Is optional", "Replaces methods", "Contains raw data always"], 0, "References support transparency."),
      q("m10-q10", "Common writing mistake:", ["Overclaiming beyond the data", "Defining terms", "Reporting limitations", "Using headings"], 0, "Claims must match evidence."),
    ],
  },
{
    moduleId: "module-8",
    questions: [
      q("m12-q1", "Responsible AI use in research requires:", ["Verifying outputs against primary sources", "Trusting all generated citations", "Skipping peer review", "Hiding AI use always"], 0, "Verification is mandatory."),
      q("m12-q2", "AI hallucination means:", ["Model generates plausible but false information", "Hardware overheating", "Peer review delay", "Open access fee"], 0, "Hallucinations are false confident outputs."),
      q("m12-q3", "AI literature tools can help with:", ["Discovery and summarization when verified", "Replacing all reading", "Guaranteeing causation", "Ethics approval"], 0, "Tools assist but do not replace reading."),
      q("m12-q4", "Academic honesty with AI means:", ["Disclosing assistance per instructor/policy rules", "Submitting AI text as solely your analysis without review", "Fabricating data", "Deleting methods"], 0, "Follow disclosure and integrity policies."),
      q("m12-q5", "Prompt engineering improves:", ["Quality and specificity of AI responses", "Journal impact factor", "Sample randomization", "IRB speed"], 0, "Better prompts yield better assistance."),
      q("m12-q6", "Connected Papers and ResearchRabbit:", ["Visualize related literature networks", "Write ethics forms automatically", "Replace statistics", "Publish journals"], 0, "These tools map literature networks."),
      q("m12-q7", "You should treat AI summaries as:", ["Starting points requiring source checks", "Final authoritative truth", "Substitutes for citations", "Raw data"], 0, "Summaries need verification."),
      q("m12-q8", "Consensus and Elicit focus on:", ["Evidence-oriented literature Q&A and extraction", "Video editing", "Poster printing", "Lab safety only"], 0, "They support evidence discovery."),
      q("m12-q9", "Over-reliance on AI risks:", ["Shallow understanding and undetected errors", "Perfect replication", "Automatic IRB approval", "Eliminating bias entirely"], 0, "Over-reliance weakens learning."),
      q("m12-q10", "Best practice after AI finds papers:", ["Open and read the original sources", "Cite the chatbot only", "Skip methods sections", "Ignore publication year"], 0, "Always read primary sources."),
    ],
  },
];

/** Five questions per module keeps total quiz time ~45–60 min for the full course. */
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
    q("f-q1", "Research is best described as:", ["Looking up facts until you confirm what you already believe", "A systematic process for answering unanswered questions with evidence", "Collecting as many websites as possible", "Copying expert opinions without checking methods"], 1, "Research is structured, evidence-based inquiry."),
    q("f-q2", "The main difference between Googling and research is that research:", ["Never uses the internet", "Evaluates source quality, methods, and limits", "Is always faster", "Requires a university lab"], 1, "Research adds evaluation that search ranking does not."),
    q("f-q3", "A primary source is:", ["A textbook summary of many studies", "Original data or firsthand findings", "An encyclopedia entry", "A news headline"], 1, "Primary sources present original evidence."),
    q("f-q4", "Peer review means:", ["Authors privately check their own draft", "Independent experts evaluate a manuscript before publication", "Students grade each other", "AI auto-approves the paper"], 1, "External expert review is the quality filter."),
    q("f-q5", "Predatory journals often:", ["Have strict review and never charge fees", "Charge fees with weak or fake review", "Only publish Nobel-level work", "Are the same as PubMed"], 1, "They exploit pay-to-publish with little scrutiny."),
    q("f-q6", "When reading a paper, a strong first pass usually includes:", ["Every appendix word", "Abstract, figures, and headings", "Only the author bios", "The acknowledgements"], 1, "Skim structure before deep reading."),
    q("f-q7", "Statistical significance does not automatically mean:", ["A p-value was calculated", "The finding is practically important", "A sample existed", "Results were reported"], 1, "Significance is not the same as importance."),
    q("f-q8", "A topic is too broad when:", ["It names a population and a variable", "It cannot be studied with your time and resources", "It uses Google Scholar", "It includes a methods plan"], 1, "Scope must match feasibility."),
    q("f-q9", "A research gap is:", ["A missing citation format", "An unanswered or under-studied question", "A journal paywall", "A failed quiz"], 1, "Gaps motivate new work."),
    q("f-q10", "Randomization in experiments mainly helps:", ["Increase sample size to one", "Balance confounders across groups", "Remove the need for ethics review", "Prove a hypothesis before data"], 1, "Random assignment supports fair comparison."),
    q("f-q11", "An IRB primarily protects:", ["Journal rankings", "Rights and welfare of human participants", "Only animal studies", "Slide design"], 1, "IRBs oversee human subjects research."),
    q("f-q12", "Correlation means:", ["One variable caused the other", "Two variables are associated", "The study was an experiment", "The p-value is zero"], 1, "Association is not causation."),
    q("f-q13", "The median is:", ["The most frequent value", "The middle value when data are ordered", "Always equal to the mean", "The largest outlier"], 1, "Median splits ordered data."),
    q("f-q14", "A p-value is closest to:", ["The probability the null hypothesis is true", "How surprising the data would be if the null were true", "Proof the effect is large", "Sample size"], 1, "P-values measure surprise under the null."),
    q("f-q15", "Scientific writing should:", ["Hype findings and hide limits", "Stay precise, objective, and matched to the data", "Avoid citations", "Put interpretation in the results tables only"], 1, "Tone and claims must match evidence."),
    q("f-q16", "The discussion section should:", ["Introduce brand-new unreported data", "Interpret results, compare to prior work, and note limitations", "Repeat the abstract word for word", "List raw spreadsheets"], 1, "Discussion interprets; it does not hide new results."),
    q("f-q17", "An AI hallucination is:", ["A hardware crash", "A fluent but false generated claim or citation", "A peer-review delay", "An open-access fee"], 1, "Models can invent plausible falsehoods."),
    q("f-q18", "After an AI tool lists papers, you should:", ["Cite the chatbot as the source", "Open and verify the original papers", "Skip methods sections", "Assume every DOI is real"], 1, "Always verify against primary sources."),
    q("f-q19", "Citation chaining is:", ["Deleting a bibliography", "Following references backward and \"cited by\" forward from a key paper", "Using only one database", "Copying citations without reading"], 1, "It grows a trustworthy literature map."),
    q("f-q20", "A strong research question is:", ["Vague and unmeasurable", "Specific, testable, and feasible", "The same as a broad topic like \"AI\"", "Unrelated to prior literature"], 1, "Precision makes a question investigable."),
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
