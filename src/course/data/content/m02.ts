import type { CourseModule } from "../module-types";

export const module02: CourseModule = {
  id: "module-2",
  number: 2,
  title: "Choosing a Research Topic",
  summary:
    "Learn how to find feasible, meaningful research topics with the right scope, evaluate gaps in existing knowledge, and refine broad ideas into focused questions—the step where most Axiom projects succeed or stall.",
  estimatedMinutes: 90,
  learningObjectives: [
    "Evaluate topic scope, feasibility, and available resources before committing",
    "Use scholarly tools and review papers to identify research gaps",
    "Distinguish strong research topics from weak or overly broad ones",
    "Refine broad interests into specific, answerable research questions",
    "Balance personal passion with practical constraints in topic selection",
  ],
  sections: [
    {
      title: "Start With Genuine Interest",
      body: "The best research topics almost always begin with curiosity you already have. A student who loves basketball might study how sleep affects free-throw accuracy. A student concerned about local pollution might analyze water quality data from nearby streams. Interest sustains you through the slow, sometimes frustrating parts of research—reading dense papers, redesigning a flawed survey, or waiting weeks for plants to grow in an experiment.\n\nChoosing a topic because it \"sounds impressive\" on a college application rarely works. Admissions readers and science fair judges can tell when enthusiasm is manufactured. They respond more strongly to projects where the student's voice comes through—where you can explain not just what you studied, but why you cared enough to spend months on it.\n\nThat said, interest alone is not enough. You must also ask whether your curiosity can be shaped into a question that research methods can address. Loving space exploration is a starting point; \"How did NASA's Perseverance rover select its landing site on Mars?\" is a researchable question with documented sources, engineering reports, and published analyses. Loving space exploration but asking \"What is the meaning of the universe?\" is philosophically rich but not a feasible high school science project.\n\nTry this exercise: write down three things you would read about for fun on a rainy afternoon. For each, ask what you still do not understand and what evidence could help you learn more. The overlap between passion and investigability is where strong topics live.",
      callouts: [
        {
          type: "tip",
          title: "The \"Would I still care in March?\" test",
          body: "Research projects stretch over weeks or months. If your excitement fades after one evening of Googling, pick a topic with deeper personal relevance.",
        },
      ],
    },
    {
      title: "Scope and Feasibility",
      body: "Scope means how broad or narrow your topic is. Feasibility means whether you can actually complete the project given your time, skills, equipment, budget, and access to data or participants. These two factors determine whether a topic that sounds brilliant on paper will succeed in practice.\n\nA classic scope error is choosing a topic too large for the available time. \"Artificial intelligence\" encompasses thousands of papers, dozens of subfields, and decades of debate. No high school student can research AI as a whole in one semester. A scoped-down version—\"How do large language models perform on ninth-grade biology exam questions compared to human students?\"—defines a boundary you can defend and investigate.\n\nFeasibility questions are practical. Do you need expensive lab equipment you do not have? Must you travel to a remote site? Does your question require surveying thousands of people or accessing confidential medical records you cannot obtain? A topic about the effect of a new drug on cancer patients sounds important, but without institutional approval, trained supervision, and clinical access, it is not feasible for an independent student project.\n\nTime is the most common constraint. Estimate honestly: How many hours per week can you devote for eight to twelve weeks? Reading five papers might take ten hours. Designing and running a simple experiment might take forty. Writing and revising a report might take twenty. If your plan exceeds your available hours, narrow the question or simplify the method.\n\nResources include mentors, libraries, databases, software, and community connections. Before committing to a topic, identify at least three sources or tools you can access without extraordinary effort. If you cannot find them, adjust the topic early rather than discovering the gap mid-project.",
    },
    {
      title: "Finding Gaps in Existing Knowledge",
      body: "Strong research does not repeat what is already settled. It addresses open questions, unresolved debates, or under-studied populations and contexts. Finding gaps requires reading what others have already done—not to copy their work, but to see where the conversation continues.\n\nStart with review articles and meta-analyses. These papers summarize entire fields and often include sections explicitly labeled \"Future Directions\" or \"Limitations and Gaps.\" Reading one good review on your topic can save weeks of unfocused searching. Google Scholar, PubMed, and your school librarian are allies here.\n\nNews articles and popular science books can spark interest but rarely reveal gaps precisely. A headline saying \"Study shows meditation improves memory\" tells you a finding exists; it does not tell you whether the study used teenagers, what type of meditation, or how long effects lasted. Follow the headline to the original paper, then read what that paper cites and what newer papers cite it.\n\nLook for questions that prior studies mention but do not answer. Perhaps most research on screen time and sleep uses self-reported phone use rather than objective tracking. Perhaps studies on urban gardening focus on adults but not high school volunteers. Perhaps experiments on plant growth under LED lights test one species but not the crops grown in your region. Gaps often appear at the edges of existing work.\n\nA gap does not have to be a world-first discovery. At the student level, applying a known method to a new context—your school, your city, your age group—can be meaningful if you explain why that context matters and what prior work overlooked.",
      callouts: [
        {
          type: "did-you-know",
          title: "Most published papers end with \"future research\" suggestions",
          body: "Authors routinely list unanswered questions in their discussion sections. Reading the last two pages of relevant papers is one of the fastest ways to find viable topic ideas.",
        },
      ],
    },
    {
      title: "Good Topics vs. Weak Topics",
      body: "Learning to recognize weak topics early prevents months of wasted effort. Weak topics share patterns: they are too broad, too vague, unfalsifiable, purely opinion-based, or impossible to investigate with available methods.\n\nToo broad: \"Climate change.\" \"Mental health.\" \"Social media.\" These are fields, not research topics. Better: \"How has the average number of frost-free days in our county changed between 1970 and 2020 according to NOAA climate records?\" The revision names a variable, a location, a time frame, and a data source.\n\nToo vague: \"Does music affect the brain?\" Affects how? Which music? Which brain functions? Measured how? Stronger: \"Does listening to instrumental versus lyrical music during homework sessions affect self-reported concentration scores among tenth graders?\" Specificity makes design possible.\n\nUnfalsifiable or purely philosophical: \"What is the best form of government?\" \"Is beauty objective?\" These invite debate but not systematic evidence gathering in a student project timeframe. Reframe toward empirically testable angles: \"How do local voters rank competing priorities in published municipal survey data?\"\n\nAlready answered or trivial: \"Does smoking cause lung cancer?\" The answer is established beyond reasonable doubt; repeating it adds little unless you study a genuinely new angle. Similarly, \"What is the boiling point of water?\" is a lookup question, not research.\n\nStrong topics sit in a sweet spot: personally meaningful, appropriately scoped, grounded in prior literature, feasible with your resources, and addressing a question where honest uncertainty remains.",
    },
    {
      title: "Refining Broad Ideas Into Focused Questions",
      body: "Refinement is the craft of turning a cloud of interest into a sharp question. Use a funnel: start wide, then apply filters for scope, feasibility, and gap until a workable topic emerges.\n\nStep one: write your broad interest in one sentence. Example: \"I am interested in how schools reduce food waste.\"\n\nStep two: add constraints. Where? Your school cafeteria. When? This academic year. Who? Students and staff. What measure? Pounds of waste per lunch period.\n\nStep three: check the literature. Search Google Scholar for \"school cafeteria food waste intervention.\" Read abstracts of five recent papers. Note what interventions were tested (smaller portions, education campaigns, composting programs) and what populations were studied.\n\nStep four: identify your angle. Perhaps prior studies focus on elementary schools but not high schools. Perhaps none measure whether student awareness campaigns change behavior over a full semester. Your refined question: \"Does a four-week student-led awareness campaign reduce per-student cafeteria food waste at our high school compared to the month before the campaign?\"\n\nStep five: test the question against criteria. Is it specific? Yes. Measurable? Yes, if you can weigh waste. Feasible? Yes, with cafeteria permission. Interesting? That is for you to judge—but the process has transformed a vague interest into a project blueprint.\n\nWrite multiple versions of your question and share them with a teacher, librarian, or peer. External feedback catches blind spots you cannot see alone.",
      callouts: [
        {
          type: "mistake",
          title: "Locking in your topic before reading any prior research",
          body: "Students who skip the literature review often discover halfway through that their \"original\" idea was published five years ago—or that a key method requires equipment they cannot access.",
        },
      ],
    },
    {
      title: "Getting Teacher and Mentor Approval",
      body: "Before you invest significant time, discuss your topic with someone experienced— a science teacher, research mentor, librarian, or club advisor. Their role is not to choose your topic for you but to stress-test your plan before you commit.\n\nCome prepared with more than a title. Share your refined question, why it interests you, two or three sources you have already found, a rough method outline, and an honest assessment of feasibility. This shows you have thought seriously, which makes feedback more useful.\n\nMentors may redirect you. They might say your question is too ambitious, suggest a dataset you did not know existed, or warn about ethical requirements such as parental consent for human subjects. Listen carefully. Redirection is not rejection—it is scope management that saves projects.\n\nEthical considerations matter especially for topics involving people, animals, or sensitive data. Surveys of classmates, interviews about mental health, or experiments on living organisms may require approval from an institutional review board or at minimum explicit consent procedures. Raise these issues early.\n\nOnce approved, document your agreed-upon question in writing. Projects drift easily—each interesting tangent pulls you wider. A written research question serves as an anchor. You can adjust it with mentor approval if evidence demands, but arbitrary drift without reflection weakens the final product.",
    },
    {
      title: "Building a Topic Portfolio",
      body: "Experienced researchers rarely commit to the first idea that excites them. They maintain a short list of candidate topics, evaluate each against criteria, and select the strongest. You should do the same.\n\nCreate a simple table with columns for topic, refined question, key sources found, feasibility rating (high/medium/low), and personal interest rating. Score three to five candidates. The winner might not be your initial favorite—it might be the one where feasibility and gap align best.\n\nKeep rejected topics in the portfolio. A question that fails feasibility this semester might work next year with different resources. A background section from an abandoned topic might support a related project later.\n\nRevisit your topic after two weeks of reading. If you cannot find enough sources, or if every paper says the same thing and leaves no gap, pivot early. Two weeks of reading is cheap; ten weeks of stuck progress is expensive.\n\nChoosing a research topic is not a one-time decision—it is the first in a series of thoughtful choices that shape everything downstream. Invest time here, and the rest of your project becomes clearer, more manageable, and far more rewarding.",
    },
  ],
  vocabulary: [
    {
      term: "Scope",
      definition:
        "The boundaries of a research project—how broad or narrow the topic, population, time frame, and methods are.",
    },
    {
      term: "Feasibility",
      definition:
        "Whether a research project can realistically be completed given available time, skills, resources, and access.",
    },
    {
      term: "Research gap",
      definition:
        "An unanswered question, understudied population, or unresolved debate in existing published literature.",
    },
    {
      term: "Review article",
      definition:
        "A paper that summarizes and synthesizes many studies on a topic, often highlighting trends and future directions.",
    },
    {
      term: "Operational definition",
      definition:
        "A precise, measurable description of how a variable will be identified or recorded in a study.",
    },
    {
      term: "Falsifiable",
      definition:
        "Capable of being proven wrong through evidence; a hallmark of scientific questions.",
    },
    {
      term: "Variables",
      definition:
        "Factors that change or can be measured in a study, such as temperature, survey response, or treatment type.",
    },
    {
      term: "Pilot study",
      definition:
        "A small preliminary test of methods or instruments before the full research project begins.",
    },
    {
      term: "Institutional Review Board (IRB)",
      definition:
        "A committee that evaluates whether research involving human subjects meets ethical standards before it proceeds.",
    },
  ],
  keyTakeaways: [
    "Strong topics combine genuine personal interest with a question that research methods can actually address.",
    "Scope and feasibility filters prevent projects that are too broad, too expensive, or impossible to complete on time.",
    "Research gaps appear in review articles, discussion sections, and at the edges of what prior studies examined.",
    "Refinement turns broad interests into specific questions with defined variables, populations, and data sources.",
    "Discuss topics early with mentors and be willing to pivot if literature review reveals problems.",
  ],
  commonMistakes: [
    "Choosing a topic for perceived prestige rather than sustained personal interest.",
    "Failing to narrow a field-sized topic (e.g., \"climate change\") into an investigable question.",
    "Committing to a project before checking whether sources, equipment, or permissions are available.",
    "Ignoring ethical requirements for research involving people, animals, or sensitive information.",
  ],
  researchTips: [
    "Maintain a topic portfolio of three to five candidates and score each on interest, gap, and feasibility before choosing.",
    "Read the \"Future Research\" or \"Limitations\" sections of three papers before finalizing your question.",
    "Write your question on an index card and keep it visible while working—use it to reject tangents.",
    "Schedule a fifteen-minute topic check-in with a mentor two weeks into reading; pivot early if needed.",
  ],
  activity: {
    title: "Topic Refinement Workshop",
    objective:
      "Practice transforming overly broad research interests into focused, feasible questions using scope and gap analysis.",
    instructions: [
      "Start with this list of ten broad topics: Artificial Intelligence, Climate Change, Social Media, Nutrition, Sleep, Urban Pollution, Sports Performance, Music and Learning, Vaccines, and Renewable Energy.",
      "For each broad topic, write one overly vague research question (the kind you should avoid).",
      "Rewrite each vague question into a focused version that specifies population, variable, time frame, or location.",
      "Choose three of your refined questions and spend fifteen minutes each searching Google Scholar for related papers.",
      "For each of the three, note one potential research gap suggested by what you read.",
      "Select your single strongest question and write a one-paragraph feasibility assessment covering time, resources, and access.",
      "Submit your ten vague-to-focused pairs plus your final chosen question with gap and feasibility notes.",
    ],
    deliverable:
      "A two-page worksheet with refined question pairs, gap notes for three candidates, and a feasibility paragraph for your top choice.",
    timeEstimate: "60–75 minutes",
  },
  reflection: {
    prompt:
      "Describe the research topic you are most seriously considering (or would consider if starting today). Explain why it is feasible within one semester, what gap or open question it addresses, and what resources you would need to complete it.",
    guidelines: [
      "State your refined research question clearly, not just a broad field name.",
      "Address feasibility honestly—time, equipment, data access, and mentor support.",
      "Identify at least one specific gap or unresolved aspect your project would address.",
      "Name two concrete resources (databases, datasets, people, tools) you would use.",
    ],
    wordCount: "150–300 words",
    rubric: [
      "Presents a specific, scoped research question rather than a broad topic",
      "Demonstrates realistic feasibility assessment with named constraints and resources",
      "Identifies a genuine gap or open question grounded in prior knowledge",
    ],
  },
  furtherReading: [
    {
      title: "Where Good Ideas Come From (Steven Johnson)",
      description:
        "Explores how curiosity, connected ideas, and slow hunches lead to discoveries—useful framing for how research topics emerge organically.",
    },
    {
      title: "Research Design: Qualitative, Quantitative, and Mixed Methods Approaches (Creswell)",
      description:
        "A standard text on aligning research questions with appropriate designs; the early chapters on topic development are especially helpful.",
    },
    {
      title: "A PhD Is Not Enough (Peter Feibelman)",
      description:
        "Though aimed at physics graduate students, its advice on choosing manageable problems and communicating scope applies well to student researchers.",
    },
  ],
};
