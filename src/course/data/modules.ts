export type CourseModuleSection = {
  title: string;
  body: string;
};

export type CourseActivity = {
  title: string;
  timeMinutes: number;
  steps: string[];
  deliverable: string;
};

export type CourseReflection = {
  prompt: string;
  wordTarget: string;
  guideQuestions: string[];
};

export type CourseModule = {
  id: string;
  number: number;
  title: string;
  tagline: string;
  summary: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  sections: CourseModuleSection[];
  keyTakeaways: string[];
  activity: CourseActivity;
  reflection: CourseReflection;
};

export const PASSING_SCORE = 0.8;
export const COURSE_ESTIMATED_MINUTES = 150;
export const COURSE_ESTIMATED_LABEL = "2 - 3 hours";

export const COURSE_MODULES: CourseModule[] = [
{
    id: "module-1",
    number: 1,
    title: "What Research Actually Is",
    tagline: "From curiosity to contribution",
    summary:
      "Learn what research is, how it differs from searching online, and the main types researchers use.",
    estimatedMinutes: 15,
    learningObjectives: [
      "Define research and explain its purpose",
      "Distinguish research from casual online searching",
      "Name major research types and when each applies",
    ],
    sections: [
      {
        title: "What research actually means",
        body:
          "Research is a structured process for answering questions with evidence. It starts with curiosity, narrows into a clear question, gathers information systematically, and draws conclusions you can defend. Research is not collecting random facts to support what you already believe, and it is not copying the first result you find online. Whether you are studying plant growth, social media habits, or machine learning, the core idea is the same: ask, investigate carefully, and explain what you found honestly - including what you still do not know.",
      },
      {
        title: "Research vs. Googling",
        body:
          "Googling is fast. Research is slower and more rigorous. When you Google, you get pages ranked by popularity and SEO - not necessarily by accuracy. Research adds steps Google skips: checking who wrote something, how they know it, whether other experts agree, and whether the method actually supports the claim. A blog post saying “vitamin C cures colds” is not research. A peer-reviewed trial measuring outcomes in hundreds of participants is closer. Good researchers use Google and AI as starting points, then verify everything against stronger sources.",
      },
      {
        title: "The research cycle",
        body:
          "Most research follows a loop: observe something interesting, ask a question, search what is already known, form a hypothesis, test or analyze, interpret results, and revise. Fleming noticed mold killing bacteria - that was observation. Turning that into penicillin required years of testing. NASA’s Mars missions begin with questions (“Was there ever water?”), then design instruments, collect data, and publish findings others can critique. You will use the same cycle on a smaller scale in school projects and science fairs.",
      },
      {
        title: "Types of research you will encounter",
        body:
          "Experimental research manipulates variables to test cause and effect (e.g., does fertilizer A grow plants faster than B?). Observational research watches without interfering (e.g., tracking bird migration patterns). Surveys collect self-reported data from people. Qualitative research explores meanings and experiences through interviews or themes. Quantitative research measures and analyzes numbers. Computational research uses code and simulations. Meta-analyses combine results from many studies. Literature reviews synthesize what a field already knows. No single type is “best” - the right choice depends on your question.",
      },
    ],
    keyTakeaways: [
      "Research is evidence-based inquiry, not random searching.",
      "Always ask: Who said this, how do they know, and what are the limits?",
      "Match your research type to your question.",
    ],
    activity: {
      title: "Turn broad ideas into research questions",
      timeMinutes: 4,
      steps: [
        "Pick three topics you find interesting (e.g., sports, climate, gaming, health).",
        "For each, write one overly broad question (bad example: “Is AI good?”).",
        "Rewrite each into a specific, testable question with a clear population and variable (good example: “Do 30-minute study sessions improve quiz scores more than 60-minute sessions for 9th graders?”).",
      ],
      deliverable: "Three rewritten questions - one sentence each.",
    },
    reflection: {
      prompt:
        "Pick one field you care about and explain in your own words why unanswered questions still exist there.",
      wordTarget: "50 - 100 words",
      guideQuestions: [
        "What do scientists already agree on?",
        "What is still debated or unknown?",
        "Why would answering the open question matter?",
      ],
    },
  },
{
    id: "module-2",
    number: 2,
    title: "Finding Reliable Sources",
    summary: "Tell strong sources from weak ones and use academic databases effectively.",
    tagline: "Where real evidence lives",
    estimatedMinutes: 15,
    learningObjectives: [
      "Distinguish primary, secondary, and tertiary sources",
      "Use trusted databases for your field",
      "Spot predatory journals and misinformation",
    ],
    sections: [
      {
        title: "Three source levels",
        body:
          "Primary sources present original evidence: research papers, datasets, official statistics, interview transcripts you collected, lab notes. Secondary sources analyze primary work: review articles, textbooks, documentary films that cite studies. Tertiary sources summarize fields at a high level: encyclopedias, most Wikipedia articles, general news summaries. For a research project, primary and strong secondary sources do the heavy lifting. Tertiary sources help you orient early, but never cite Wikipedia as proof.",
      },
      {
        title: "Peer review and journal quality",
        body:
          "Peer review means independent experts evaluate a study before publication. It is not perfect - flawed papers still get through - but it is a major quality filter. Be wary of journals that email you to publish overnight for a fee, guarantee acceptance, or have no real editorial board. Those are often predatory journals. Check whether the journal is indexed in PubMed, Scopus, or your library database. University-affiliated authors and clear methods sections are good signs; vague claims with no data are red flags.",
      },
      {
        title: "Where to search",
        body:
          "Google Scholar finds papers across fields. PubMed covers biomedical research. IEEE Xplore and ACM Digital Library focus on engineering and computer science. JSTOR and ERIC are strong for humanities and education. arXiv hosts preprints (early versions not yet peer-reviewed - use carefully). Semantic Scholar adds citation tools and AI summaries. Start broad, then use citation chaining: open a good paper’s references (backward) and Google Scholar’s “cited by” (forward) to find related work.",
      },
      {
        title: "Quick credibility checks",
        body:
          "Before trusting a source, ask: Who wrote it and what are their credentials? Where was it published? Does it cite evidence? Is it current enough for your topic? Who funded it - could there be bias? Do other independent sources agree? Advanced Google tricks help: use quotes for exact phrases, site:.edu or site:.gov to limit domains, and AND/OR to combine terms. If a source fails multiple checks, drop it - even if it confirms what you want to believe.",
      },
    ],
    keyTakeaways: [
      "Prioritize primary sources and peer-reviewed work.",
      "Verify author, venue, evidence, and funding.",
      "Use citation chaining to grow your source list.",
    ],
    activity: {
      title: "Source credibility sort",
      timeMinutes: 4,
      steps: [
        "Imagine you are researching sleep and academic performance.",
        "List five source types you might find: TikTok clip, NIH webpage, peer-reviewed journal article, student blog, textbook chapter.",
        "Rank them from most to least credible for a research paper and write one reason per ranking.",
        "Identify one source type you would never cite as primary evidence.",
      ],
      deliverable: "Your ranked list with brief justifications.",
    },
    reflection: {
      prompt:
        "Describe a time you trusted information online that you would now reject as a research source. What warning signs did you miss?",
      wordTarget: "50 - 100 words",
      guideQuestions: [
        "Was the author identifiable?",
        "Was evidence shown or just asserted?",
        "What would you check first next time?",
      ],
    },
  },
{
    id: "module-3",
    number: 3,
    title: "How to Read Papers",
    summary: "Read papers efficiently by knowing each section’s job and what to look for.",
    tagline: "References, citations, and source material",
    estimatedMinutes: 15,
    learningObjectives: [
      "Navigate a paper from abstract to references",
      "Skim strategically before deep reading",
      "Identify claims, evidence, and limitations",
    ],
    sections: [
      {
        title: "Anatomy of a paper",
        body:
          "Most scientific papers follow IMRaD: Introduction (why the question matters), Methods (what they did), Results (what they found), and Discussion (what it means). The abstract is a 150 - 300 word summary - read it first. Figures and tables often tell the story faster than paragraphs. References show the conversation the authors joined. Supplementary files may hold extra data. Knowing this structure lets you jump to the parts you need instead of reading linearly like a novel.",
      },
      {
        title: "How researchers actually read",
        body:
          "Experts rarely read every word on first pass. Pass 1: abstract + conclusion. Pass 2: figures, tables, and section headings. Pass 3: methods if you care about replication, results for numbers, discussion for interpretation. Pass 4: deep read only if the paper is central to your project. This saves hours. If the abstract does not match your topic, stop - do not finish a 20-page paper out of guilt.",
      },
      {
        title: "Annotation that helps",
        body:
          "Highlight with a purpose. Label margins with codes: C = main claim, E = evidence, M = method detail, L = limitation, ? = confusion. Write a one-paragraph summary in your own words when you finish. If you cannot explain the paper without copying sentences, you do not understand it yet. Pay special attention to sample size, how variables were measured, and whether the discussion overstates the results.",
      },
      {
        title: "Reading graphs and statistics",
        body:
          "Always read axis labels, units, and captions. A bar chart comparing groups should show error bars or sample sizes when possible. “Statistically significant” means unlikely to be random noise - it does not automatically mean important or causal. Correlation in a graph does not prove one variable caused the other. When numbers confuse you, note them and move on - you can learn stats later or ask a mentor. Never ignore a figure that contradicts the abstract.",
      },
    ],
    keyTakeaways: [
      "Skim abstract, figures, and conclusions before deep reading.",
      "Track claims, evidence, and limitations separately.",
      "Significance ≠ importance, and correlation ≠ causation.",
    ],
    activity: {
      title: "Paper triage practice",
      timeMinutes: 4,
      steps: [
        "Open any open-access paper on Google Scholar (or use a sample abstract your teacher provides).",
        "Spend 3 minutes on the abstract and figures only.",
        "Write: (1) main question, (2) main finding, (3) one limitation you suspect.",
        "Decide: worth a full read for your project - yes or no, and why in one sentence.",
      ],
      deliverable: "Four short answers (one sentence each).",
    },
    reflection: {
      prompt: "Which part of research papers do you find hardest - methods, results, or discussion - and what will you do differently next time?",
      wordTarget: "50 - 100 words",
      guideQuestions: [
        "Do you get lost in jargon or numbers?",
        "Will you skim first or annotate differently?",
      ],
    },
  },
{
    id: "module-4",
    number: 4,
    title: "Developing a Research Question",
    summary: "Find a topic that is interesting, focused, and doable with the time and tools you have.",
    tagline: "Methodology starts here",
    estimatedMinutes: 15,
    learningObjectives: [
      "Judge whether a topic is too broad or too narrow",
      "Use simple tools to spot research gaps",
      "Pick a topic you can finish in a semester",
    ],
    sections: [
      {
        title: "Start with genuine interest",
        body:
          "The best student projects come from curiosity, not from picking whatever sounds most impressive. You will spend weeks on this topic - reading papers, designing methods, troubleshooting data. If you do not care about the subject, you will burn out. Interest also helps you push through boring steps like formatting citations or cleaning spreadsheets. That said, interest alone is not enough. Your topic must also be answerable with the resources you have.",
      },
      {
        title: "Scope: not too big, not too tiny",
        body:
          "“Artificial intelligence” is too broad - you cannot study all of AI in one project. “The effect of 10-minute mindfulness exercises on self-reported stress in 11th-grade students during exam week” is focused. Too narrow can also be a problem: if only three people in the world have the condition you want to study, you may not find data. Aim for a question you could explain to a classmate in one sentence and defend in a five-minute conversation.",
      },
      {
        title: "Feasibility checklist",
        body:
          "Before committing, ask: Do I have access to participants, equipment, or datasets? Can I finish data collection before my deadline? Are there ethical barriers (human subjects, animals)? Is there published work I can build on? Can I afford any costs? A brilliant question you cannot actually study is still a bad project topic. Many strong high school projects reuse public datasets or run simple classroom-friendly experiments.",
      },
      {
        title: "Finding gaps with Google Scholar",
        body:
          "Open Google Scholar and search your general area. Read recent review papers or the discussion sections of 2 - 3 articles - authors often write “future research should examine…” That phrase signals a gap. News articles about “breakthroughs” can inspire topics, but trace claims back to studies. If every paper agrees and no one disagrees, the topic may be solved already. Look for active debate, mixed results, or new technology that old studies did not test.",
      },
    ],
    keyTakeaways: [
      "Narrow broad ideas into one clear question.",
      "Feasibility matters as much as excitement.",
      "Discussion sections and review papers reveal gaps.",
    ],
    activity: {
      title: "Topic refinement drill",
      timeMinutes: 4,
      steps: [
        "Write five broad topics you might explore.",
        "Star the one you care about most.",
        "For that topic, search Google Scholar and skim two recent paper titles or abstracts.",
        "Rewrite your topic three times, each version more specific than the last.",
      ],
      deliverable: "Your final one-sentence research question plus one gap you noticed in the literature.",
    },
    reflection: {
      prompt: "Why is your top topic feasible for you to complete within one semester?",
      wordTarget: "50 - 100 words",
      guideQuestions: [
        "What data or participants can you access?",
        "What is your biggest constraint (time, tools, ethics)?",
        "How will you keep scope manageable?",
      ],
    },
  },
{
    id: "module-5",
    number: 5,
    title: "Experimental Design",
    summary: "Choose study designs, understand sampling basics, and respect research ethics.",
    tagline: "Building a study you can defend",
    estimatedMinutes: 15,
    learningObjectives: [
      "Match design type to research question",
      "Explain randomization and sample size at a basic level",
      "Recognize when IRB approval is required",
    ],
    sections: [
      {
        title: "Design types in plain language",
        body:
          "Experiments randomly assign participants to conditions to test causation. Observational studies measure without assigning - good for ethics or large populations, weaker for causation. Cross-sectional studies snapshot one moment (“survey 500 students today”). Longitudinal studies follow the same people over time. Case studies dive deep into one person, school, or event. Pick the design that fits your question and constraints - not the fanciest one.",
      },
      {
        title: "Sampling, validity, and reliability",
        body:
          "Your sample should represent the population you want to generalize to, within reason. Random sampling reduces bias; convenience samples (your friends) limit generalization but are common in student work - acknowledge that limit. Validity asks: are you measuring what you think? Reliability asks: would you get similar results if repeated? Larger samples usually give more stable estimates, but a bigger messy study is not automatically better.",
      },
      {
        title: "Ethics and IRBs",
        body:
          "Human subjects research needs informed consent, privacy, and minimal risk. Schools and universities often require IRB (Institutional Review Board) approval before surveys or experiments on people. Never identify participants publicly without permission. Animal research has separate rules. If your project could cause harm, stress, or legal issues, stop and ask a mentor. Ethics is not a checkbox - it protects people and your credibility.",
      },
    ],
    keyTakeaways: [
      "Experiments test causation; observational designs often cannot.",
      "Acknowledge sample limits honestly.",
      "Get approval before studying people.",
    ],
    activity: {
      title: "One-page study outline",
      timeMinutes: 4,
      steps: [
        "Pick a simple question (your own or: “Does stretching before running reduce reported soreness?”).",
        "Name design type, IV, DV, sample, and one control.",
        "List one ethical consideration and how you will address it.",
      ],
      deliverable: "Bullet outline with at least six bullets.",
    },
    reflection: {
      prompt: "What ethical issue is most relevant to your planned or imagined project, and how would you handle it?",
      wordTarget: "50 - 100 words",
      guideQuestions: [
        "Do you need consent?",
        "How will you protect privacy?",
      ],
    },
  },
{
    id: "module-6",
    number: 6,
    title: "Data Analysis and Statistics",
    summary: "Interpret means, spread, correlation, and p-values without fear.",
    tagline: "What the numbers can and cannot say",
    estimatedMinutes: 15,
    learningObjectives: [
      "Calculate and interpret mean, median, and standard deviation",
      "Distinguish correlation from causation",
      "Explain p-values and confidence at an introductory level",
    ],
    sections: [
      {
        title: "Describing data",
        body:
          "Mean is the average - sensitive to outliers. Median is the middle value - better for skewed data like income. Mode is the most common value. Range and standard deviation describe spread: low SD means points cluster near the mean. Always look at your data before trusting one number. A mean test score of 80 hides whether everyone scored 78 - 82 or half failed and half aced.",
      },
      {
        title: "Correlation vs. causation",
        body:
          "Correlation means two variables move together statistically. Ice cream sales and drowning deaths both rise in summer - correlated, but ice cream does not cause drowning. Heat drives both. Establishing causation usually requires experiments or very careful designs. When you read “X linked to Y,” ask what else could explain the link and whether an experiment actually manipulated X.",
      },
      {
        title: "P-values and significance (intro level)",
        body:
          "A p-value roughly answers: if there were truly no effect, how surprising are these results? A small p-value (often < 0.05) leads researchers to say “statistically significant” - but that is not the same as “large” or “important.” A huge study can detect a tiny, meaningless effect. Confidence intervals give a range of plausible values for an estimate. Report what you found plainly and note uncertainty.",
      },
    ],
    keyTakeaways: [
      "Use median when outliers skew the mean.",
      "Correlation does not prove causation.",
      "Statistical significance ≠ practical importance.",
    ],
    activity: {
      title: "Quick dataset stats",
      timeMinutes: 4,
      steps: [
        "Use this dataset of study hours: 2, 3, 3, 4, 4, 4, 10.",
        "Calculate mean and median by hand or in Google Sheets.",
        "Note which better represents a “typical” student and why.",
        "Identify the outlier and how it affects the mean.",
      ],
      deliverable: "Mean, median, and two sentences of interpretation.",
    },
    reflection: {
      prompt: "Explain the difference between correlation and causation using a real-world example not from this lesson.",
      wordTarget: "50 - 100 words",
      guideQuestions: [
        "What two variables move together?",
        "What third factor might explain both?",
      ],
    },
  },
{
    id: "module-7",
    number: 7,
    title: "Communication: Writing Papers",
    summary: "Write clear, objective research sections readers can trust.",
    tagline: "Saying it clearly so the work survives",
    estimatedMinutes: 15,
    learningObjectives: [
      "Know what belongs in each paper section",
      "Write in objective, precise language",
      "Apply basic APA-style citation habits",
    ],
    sections: [
      {
        title: "Scientific tone",
        body:
          "Write to inform, not impress. Avoid “I think” overload in results sections - report data, interpret in discussion. Cut filler: “very,” “really,” “interesting.” Prefer “increased by 12%” over “increased a lot.” Passive voice appears often (“samples were heated”) but active voice can clarify who did what (“We surveyed 120 students”). Either is fine if clear. Never hide limitations to sound smarter - judges and reviewers respect honesty.",
      },
      {
        title: "Section jobs",
        body:
          "Abstract: standalone summary in ~250 words. Introduction: background, gap, your question. Methods: enough detail to replicate. Results: findings with tables/figures, minimal opinion. Discussion: interpret, compare to prior work, limitations, future directions. References: every claim tied to a source. Write results before discussion; write introduction last if you struggle - once you know what you found, introducing is easier.",
      },
      {
        title: "Citations and common mistakes",
        body:
          "APA is common in social and life sciences: author-date in text, reference list at end. MLA uses author-page for humanities. Pick one style and stick to it. Common mistakes: citing sources you did not read, overclaiming (“proves” instead of “suggests”), mixing tenses, and dumping raw data without explanation. Every in-text citation needs a reference list entry and vice versa.",
      },
    ],
    keyTakeaways: [
      "Each section has one job - do not mix results and interpretation.",
      "Be precise with numbers and cautious with claims.",
      "Cite consistently and read what you cite.",
    ],
    activity: {
      title: "Abstract in four moves",
      timeMinutes: 4,
      steps: [
        "Use a hypothetical study: question = effect of blue light filters on self-reported eye strain in students.",
        "Write four sentences: (1) background, (2) what you did, (3) main result, (4) implication.",
        "Keep under 100 words total.",
      ],
      deliverable: "A mini-abstract of ≤100 words.",
    },
    reflection: {
      prompt: "Which paper section would be hardest for you to write, and what is one strategy to make it easier?",
      wordTarget: "50 - 100 words",
      guideQuestions: [
        "Do you struggle with methods detail or interpreting results?",
        "Could you outline bullets before prose?",
      ],
    },
  },
{
    id: "module-8",
    number: 8,
    title: "AI in Research",
    summary: "Use AI tools to speed up work - without letting them replace your thinking.",
    tagline: "Powerful tool, dangerous shortcut",
    estimatedMinutes: 15,
    learningObjectives: [
      "Use AI for search and drafting with verification",
      "Know common AI research tools and their limits",
      "Follow academic honesty with AI assistance",
    ],
    sections: [
      {
        title: "Responsible AI use",
        body:
          "AI can brainstorm questions, summarize papers, suggest search terms, and help outline writing. It cannot replace reading sources, designing studies, or taking responsibility for errors. Treat every AI output as a draft that might be wrong - especially citations, which models often invent. Your name goes on the work; verify everything. Follow your school’s AI policy and disclose assistance when required.",
      },
      {
        title: "Tools worth knowing",
        body:
          "Semantic Scholar and Connected Papers map literature networks. Elicit and Consensus answer evidence-focused questions from papers. NotebookLM helps you query documents you upload. Perplexity cites web sources but still needs checking. ResearchRabbit suggests related papers visually. None of these replace reading the original PDF. Use them to find candidates faster, then read abstracts and methods yourself.",
      },
      {
        title: "Hallucinations, bias, and honesty",
        body:
          "Hallucinations are confident false statements - fake DOIs, nonexistent authors, reversed findings. Bias appears when training data skews toward popular views. AI may oversimplify nuance in ethics or statistics. Never submit AI-generated text you have not checked against primary sources. Use AI to learn faster, not to skip learning. When allowed, describe how you used it (“AI helped outline introduction; all citations verified manually”).",
      },
    ],
    keyTakeaways: [
      "Verify every AI citation and factual claim.",
      "Disclose AI use per school policy.",
      "AI assists; you remain the researcher.",
    ],
    activity: {
      title: "Verify, don’t trust",
      timeMinutes: 4,
      steps: [
        "Ask an AI tool for three papers on any topic (or imagine three titles it gave you).",
        "For each title, write how you would verify it exists (Google Scholar, DOI lookup, library).",
        "Note one sign a citation might be hallucinated.",
      ],
      deliverable: "Three verification steps plus one red flag list.",
    },
    reflection: {
      prompt: "Write three personal rules for using AI in your research work.",
      wordTarget: "50 - 100 words",
      guideQuestions: [
        "What will you never let AI do unsupervised?",
        "How will you document AI help?",
      ],
    },
  },
];

export function getModuleById(id: string) {
  return COURSE_MODULES.find((module) => module.id === id);
}

export function getNextModuleId(id: string) {
  const index = COURSE_MODULES.findIndex((module) => module.id === id);
  if (index < 0 || index >= COURSE_MODULES.length - 1) return null;
  return COURSE_MODULES[index + 1].id;
}

export function isModuleUnlocked(moduleId: string, completedModuleIds: string[]) {
  const index = COURSE_MODULES.findIndex((module) => module.id === moduleId);
  if (index <= 0) return true;
  const previous = COURSE_MODULES[index - 1];
  return completedModuleIds.includes(previous.id);
}
