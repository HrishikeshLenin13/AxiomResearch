import type { CourseModule } from "../module-types";

export const module01: CourseModule = {
  id: "module-1",
  number: 1,
  title: "What Research Really Is",
  summary:
    "Understand what research means, how it differs from searching online, and the major types of research that drive discovery. This is the foundation Axiom expects before you join a real research project.",
  estimatedMinutes: 90,
  learningObjectives: [
    "Define research and explain why structured inquiry exists",
    "Distinguish research from casual online searching",
    "Describe the cycle of inquiry used across scientific fields",
    "Identify major research types and when each is appropriate",
    "Recognize how real discoveries—from penicillin to space exploration—follow research principles",
  ],
  sections: [
    {
      title: "What Research Actually Means",
      body: "Research is a disciplined process for answering questions with evidence. When scientists, historians, engineers, or social scientists say they are doing research, they mean something far more rigorous than looking up facts on the internet. Research begins with a question that does not yet have a satisfactory answer, and it proceeds through careful steps designed to reduce bias, test ideas fairly, and build knowledge that others can verify.\n\nAt its core, research is about uncertainty. If you already know the answer with complete confidence, you are not researching—you are confirming. Researchers embrace what they do not know and design methods to learn more. A high school student studying whether different music genres affect study focus is doing research. A student copying paragraphs from Wikipedia without evaluating sources is not.\n\nResearch also differs from opinion. Everyone has opinions about climate change, nutrition, or social media, but research asks: what does the evidence show? That question requires data, methods, and transparency about how conclusions were reached. Good research makes its reasoning visible so that other people can check the work, repeat experiments, or challenge findings with new evidence.\n\nFinally, research is cumulative. No single study settles a question forever. Each project adds a piece to a larger puzzle. Isaac Newton famously said he saw further by standing on the shoulders of giants—researchers build on prior work, cite their sources, and acknowledge limitations. That humility is not weakness; it is what makes science trustworthy over time.",
      callouts: [
        {
          type: "did-you-know",
          title: "The word \"research\" literally means to search again",
          body: "The prefix \"re-\" means again, and \"search\" means to look carefully. Research is repeated, systematic looking—not a one-time Google search.",
        },
      ],
    },
    {
      title: "Research vs. Googling",
      body: "Googling is fast. Type a question, click a link, skim an article, and you have an answer in seconds. That speed is useful for everyday life—finding a recipe, checking movie times, or learning a quick definition. But Googling is not research, and confusing the two is one of the most common mistakes young scholars make.\n\nWhen you Google, search engines prioritize pages that are popular, recent, or optimized for clicks—not necessarily pages that are accurate, peer-reviewed, or methodologically sound. The first result for \"Is coffee good for you?\" might be a blog post written by someone with no medical training, funded by a coffee company, or cherry-picking studies to support a pre-existing belief. Research requires you to evaluate who produced the information, how they know what they claim, and whether other experts agree.\n\nResearch also takes longer because it involves multiple steps: defining a question, finding sources, reading critically, comparing findings, identifying gaps, and sometimes collecting your own data. A student who spends thirty minutes on Google and declares \"I found my answer\" has completed a search. A student who spends two weeks reading five peer-reviewed papers, noting where they agree and disagree, and drafting a focused question has begun research.\n\nThat said, Google and Google Scholar can be starting points for research. The difference is what you do next. Do you accept the first answer, or do you trace claims to original studies? Do you note the date and author, or scroll past? Research turns searching into a deliberate investigation with standards for quality.",
      callouts: [
        {
          type: "mistake",
          title: "Assuming the first search result is the best answer",
          body: "Search engines rank pages by relevance algorithms, not truth. Always ask: Who wrote this? What evidence supports it? Can I find the same claim in a peer-reviewed source?",
        },
      ],
    },
    {
      title: "The Cycle of Inquiry",
      body: "You may have learned the \"scientific method\" as a linear list: observe, hypothesize, experiment, conclude. In practice, research is better understood as a cycle. Scientists observe something interesting, ask questions, form hypotheses, design tests, collect data, analyze results, and then—crucially—revise their thinking and often start again with new questions suggested by what they found.\n\nObservation is the starting point. Alexander Fleming observed that mold on a petri dish seemed to kill bacteria around it. That observation did not immediately become penicillin; it became a question: What substance in the mold is responsible, and could it treat infections? Without a clear question, observations remain curiosities rather than discoveries.\n\nHypotheses are testable predictions. A strong hypothesis states a specific relationship you can measure. Weak: \"Plants like music.\" Strong: \"Exposure to classical music for two hours daily will increase the average height of bean plants over a four-week period compared to a silent control group.\" The strong version defines variables, duration, and a comparison—making it possible to design an experiment.\n\nTesting and analysis follow. Researchers choose methods appropriate to their question: controlled experiments, surveys, interviews, simulations, or archival analysis. After collecting data, they use statistics or structured reasoning to determine whether results support or contradict the hypothesis. Unexpected results are not failures—they often lead to the most important discoveries.\n\nRevision closes the loop. Findings are published, peer-reviewed, and debated. Other labs attempt replication. Over time, strong evidence accumulates and theories evolve. NASA's Mars rovers follow this same cycle: each mission asks questions raised by the previous one, refining what we know about the Red Planet one investigation at a time.",
    },
    {
      title: "Major Types of Research",
      body: "Not all research looks the same. Different questions require different approaches, and understanding the major types helps you choose appropriate methods and interpret others' work fairly.\n\nExperimental research manipulates one variable to observe its effect on another while controlling everything else. A pharmaceutical trial testing whether a new drug reduces blood pressure more than a placebo is experimental. The key feature is that the researcher actively intervenes—giving one group the drug and another a sugar pill—to establish cause and effect.\n\nObservational research studies phenomena without manipulating them. Epidemiologists who track disease patterns across populations during a pandemic are observing, not experimenting on people. Observational studies can reveal strong associations but usually cannot prove causation as definitively as controlled experiments.\n\nSurvey and questionnaire research collects self-reported data from many participants. Political polls, customer satisfaction surveys, and school climate assessments fall here. Surveys can reach large samples quickly, but answers depend on honest reporting and careful question design.\n\nQualitative research explores meaning, experience, and context through interviews, focus groups, or detailed case studies. A researcher interviewing refugees about their resettlement experiences is gathering rich narrative data that numbers alone cannot capture. Quantitative research, by contrast, emphasizes measurement, statistics, and numerical patterns—such as analyzing test scores across thousands of students.\n\nOther important types include computational research (using simulations and algorithms), meta-analysis (statistically combining results from many studies), and literature reviews (synthesizing existing published work to map what is known). No type is inherently superior; the best choice depends on your question, resources, and ethical constraints.",
      callouts: [
        {
          type: "tip",
          title: "Match your method to your question",
          body: "Before choosing how to research, ask: Do I need to prove cause and effect, explore lived experience, or summarize what others have found? Your question should drive your method—not the other way around.",
        },
      ],
    },
    {
      title: "Case Study: From Penicillin to NASA",
      body: "Real discoveries illustrate research principles better than any textbook definition. Consider penicillin. In 1928, Alexander Fleming returned from vacation to find that a mold called Penicillium had contaminated one of his bacterial culture plates. Around the mold, bacteria had died. Many lab workers might have thrown the plate away; Fleming instead asked why.\n\nHe did not immediately announce a miracle drug. He investigated systematically: isolating the mold, testing whether it killed bacteria in controlled conditions, and publishing his findings. Years later, Howard Florey and Ernst Chain developed methods to mass-produce penicillin, leading to clinical trials that saved countless lives during World War II. The story shows observation, questioning, collaboration, replication, and application—hallmarks of research at its best.\n\nNASA's exploration of space follows a parallel arc. When the Apollo missions returned moon rocks, scientists did not stop asking questions—they analyzed samples, published results, and designed new missions based on gaps. The Perseverance rover on Mars drills cores, caches samples, and sends data back to Earth so teams worldwide can study geology, atmospheric chemistry, and potential signs of ancient life. Each mission is built on decades of prior research, and each generates questions for the next.\n\nThese examples share common threads: curiosity disciplined by method, willingness to revise beliefs, transparency through publication, and patience. Breakthroughs rarely happen in a single afternoon. They emerge from sustained inquiry by people who treat surprises as invitations to dig deeper rather than obstacles to avoid.",
    },
    {
      title: "Why Research Matters for You",
      body: "You might wonder why research skills matter if you do not plan to become a scientist. The answer is that research is a way of thinking applicable far beyond laboratories. Every time you evaluate a health claim on social media, compare college options, investigate a local policy, or decide whether a news headline is misleading, you are using research skills—or failing to use them.\n\nIn school, research projects teach you to manage complexity. A topic like \"climate change\" is overwhelming until you narrow it to a specific, answerable question: How has average rainfall in your county changed over the past fifty years according to NOAA records? That refinement transforms a vague interest into a feasible project with clear sources and methods.\n\nEmployers and universities value research literacy because it signals critical thinking, persistence, and communication. Whether you enter medicine, law, engineering, journalism, or entrepreneurship, you will need to find reliable information, assess competing claims, and present evidence clearly. Research training builds those muscles early.\n\nAt Axiom, volunteers use these same skills on actual projects—reading papers, checking sources, designing small studies, and writing up findings for mentors and teammates. This course is not busywork; it is preparation for work that affects real communities.\n\nPerhaps most importantly, research connects you to humanity's shared project of understanding the world. When you read a paper, design a survey, or analyze data, you join a conversation that spans centuries and continents. You are not just completing an assignment—you are participating in how knowledge grows. That is what research really is.",
    },
  ],
  vocabulary: [
    {
      term: "Research",
      definition:
        "A systematic, evidence-based process for answering questions that do not yet have established answers.",
    },
    {
      term: "Evidence",
      definition:
        "Information or data that supports or contradicts a claim, obtained through observation, measurement, or documented sources.",
    },
    {
      term: "Hypothesis",
      definition:
        "A testable prediction about the relationship between variables, stated before data collection begins.",
    },
    {
      term: "Peer review",
      definition:
        "Evaluation of scholarly work by independent experts in the same field before publication, to check quality and validity.",
    },
    {
      term: "Variable",
      definition:
        "Any factor that can change or be measured in a study, such as temperature, test score, or treatment type.",
    },
    {
      term: "Bias",
      definition:
        "Systematic error that skews results or interpretations away from the truth, often unconscious.",
    },
    {
      term: "Replication",
      definition:
        "Repeating a study's methods to verify whether its findings hold under similar conditions.",
    },
    {
      term: "Qualitative research",
      definition:
        "Research focused on words, meanings, and experiences, often through interviews or case studies.",
    },
    {
      term: "Quantitative research",
      definition:
        "Research that uses numerical data and statistical analysis to identify patterns and test relationships.",
    },
    {
      term: "Literature review",
      definition:
        "A structured summary and synthesis of previously published research relevant to a specific topic or question.",
    },
  ],
  keyTakeaways: [
    "Research is a structured, evidence-based process for answering unanswered questions—not casual searching or opinion-sharing.",
    "Googling finds information quickly; research evaluates sources, methods, and limitations to build reliable conclusions.",
    "Inquiry is cyclical: observe, question, test, analyze, revise, and repeat as new evidence emerges.",
    "Different research types (experimental, observational, survey, qualitative, quantitative) suit different questions.",
    "Real breakthroughs like penicillin and space exploration result from sustained curiosity, method, and collaboration over time.",
  ],
  commonMistakes: [
    "Treating the first Google result as a definitive, research-quality answer without verifying the source.",
    "Confusing a broad topic (e.g., \"AI\") with a research question that can actually be investigated.",
    "Assuming one study or one experiment proves a claim beyond any doubt.",
    "Skipping the question-defining stage and jumping straight to data collection or writing.",
  ],
  researchTips: [
    "Before searching, write your question in one sentence. If you cannot, your topic may still be too vague.",
    "Keep a simple research log: date, source, main claim, and your notes on credibility.",
    "When you find a surprising fact, trace it to the original study rather than trusting secondary summaries.",
    "Read the methods section of any paper you cite—claims are only as strong as how data was gathered.",
  ],
  activity: {
    title: "From Curiosity to Research Question",
    objective:
      "Practice distinguishing everyday searching from research by transforming broad interests into specific, testable questions.",
    instructions: [
      "List five topics you find genuinely interesting (sports, music, environment, technology, health, etc.).",
      "For each topic, write one question you could answer by Googling in under five minutes, and label it \"Search.\"",
      "For the same topics, write one question that would require reading multiple sources, comparing evidence, or collecting data, and label it \"Research.\"",
      "Choose your strongest research question and refine it: make it specific, measurable, and feasible for a high school student within one semester.",
      "Write two to three sentences explaining why your refined question qualifies as research rather than a quick search.",
      "Share your refined question with a peer and give each other feedback: Is it too broad? Is it testable? Is it interesting?",
      "Revise your question based on feedback and submit the final version with your explanation.",
    ],
    deliverable:
      "A one-page document containing your five topic pairs (search vs. research questions), your refined research question, and a brief justification.",
    timeEstimate: "45–60 minutes",
  },
  reflection: {
    prompt:
      "Choose a field you care about—medicine, space, sports analytics, social justice, gaming, or any other area—and explain why unanswered questions still exist there. What would a researcher need to do differently from someone who simply reads popular articles about the topic?",
    guidelines: [
      "Name the field clearly in your opening sentence.",
      "Identify at least one specific unanswered or debated question in that field.",
      "Explain why the question has not been fully resolved yet (limitations, cost, ethics, complexity).",
      "Contrast what a researcher would do versus what a casual reader would do when exploring this question.",
    ],
    wordCount: "150–300 words",
    rubric: [
      "Identifies a real field and a specific, non-trivial unanswered question",
      "Explains why the question remains open with reasonable detail",
      "Clearly distinguishes research approach from casual information gathering",
    ],
  },
  furtherReading: [
    {
      title: "The Craft of Research (Booth, Colomb, Williams)",
      description:
        "A widely used introduction to turning vague interests into focused research questions and arguments, written for students across disciplines.",
    },
    {
      title: "Bad Science (Ben Goldacre)",
      description:
        "An accessible critique of how research can be misreported, misinterpreted, or manipulated—and how to spot those problems as a reader.",
    },
    {
      title: "The Double Helix (James Watson)",
      description:
        "A firsthand account of the discovery of DNA's structure, illustrating how curiosity, competition, and collaboration drive scientific research.",
    },
  ],
};
