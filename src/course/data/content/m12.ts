import type { CourseModule } from "../module-types";

export const module12: CourseModule = {
  id: "module-12",
  number: 12,
  title: "AI in Research",
  summary:
    "Learn to use AI tools responsibly for literature discovery and drafting while verifying every claim—Axiom projects increasingly involve AI, and volunteers must not let it replace judgment.",
  estimatedMinutes: 100,
  learningObjectives: [
    "Describe realistic capabilities and limits of AI tools in the research workflow",
    "Use AI-assisted tools to accelerate literature search and synthesis without replacing critical reading",
    "Verify AI-generated citations, summaries, and statistics against primary sources",
    "Apply school and publication policies on AI disclosure and acceptable assistance",
    "Develop a personal workflow that treats AI as a collaborator requiring constant oversight",
  ],
  sections: [
    {
      title: "What AI Can and Cannot Do in Research",
      body:
        "Artificial intelligence tools—large language models, semantic search engines, and automated summarizers—have changed how researchers find and organize information. They can suggest search terms, cluster related papers, draft outlines, and explain difficult concepts in plain language. Used well, they reduce friction in early stages of a project. Used carelessly, they introduce false citations, biased summaries, and overconfidence.\n\nAI systems do not understand science the way a trained researcher does. They predict plausible text based on patterns in training data. That means they can sound authoritative while being wrong. A model might invent a journal article that never existed, misquote a finding, or present a minority view as consensus. You remain responsible for every sentence that bears your name.\n\nWhat AI does well: brainstorming questions, comparing terminology across fields, generating checklists, reformatting notes, suggesting synonyms for database searches, and producing first drafts you plan to rewrite entirely. What AI does poorly: guaranteeing factual accuracy, replacing experiments, choosing valid statistical tests without supervision, or determining whether a source is predatory.\n\nThink of AI as a fast but unreliable research assistant. It can speed up tedious steps but cannot sign your integrity pledge. The habit you build now—verify, cite, disclose—will matter in college, industry, and published work.",
      callouts: [
        {
          type: "mistake",
          title: "Hallucinated citations",
          body:
            "Language models frequently generate realistic-looking author names, titles, and DOIs for papers that do not exist. Always locate the primary source in a trusted database before citing.",
        },
      ],
    },
    {
      title: "AI Tools for Literature Discovery",
      body:
        "Several tools specialize in academic search rather than general chat. Connected Papers and ResearchRabbit build visual maps of related articles starting from one seed paper. Semantic Scholar and Google Scholar remain essential for keyword and citation chasing. Elicit and Consensus use AI to extract claims from abstracts—useful for orientation, not as a substitute for reading full methods.\n\nNotebookLM lets you upload PDFs you already have and query them with grounded responses tied to those documents—reducing but not eliminating hallucination risk. Perplexity and similar answer engines cite web sources inline; click through and confirm each source matches the claim attributed to it.\n\nEffective workflow: start with a known high-quality review or textbook chapter. Use AI mapping tools to expand outward. Save every promising paper to a reference manager. Read abstracts yourself and tag papers as \"must read,\" \"maybe,\" or \"discard.\" AI suggestions widen the net; human judgment keeps quality high.\n\nWhen searching, combine AI with traditional strategies from earlier modules: Boolean operators, author alerts, forward and backward citation tracing. AI does not replace database literacy. If your school provides access to Web of Science, PubMed, or IEEE Xplore, learn their interfaces directly.\n\nDocument your search process in a research log: date, tool used, query, number of results, and how you filtered. Reviewers and teachers increasingly ask how you found sources; transparency protects you.",
    },
    {
      title: "Drafting, Outlining, and Organization",
      body:
        "AI can help structure thinking. You might paste your research question and ask for an IMRaD outline, then rewrite every bullet in your own words. You might feed anonymized notes and request a gap analysis paragraph—then verify each cited fact. Some students use AI to translate complex paragraphs into simpler language while checking the original source side by side.\n\nOrganization tools matter as much as chatbots. Reference managers sync with word processors. Spreadsheets track variables and trial runs. Version control on GitHub preserves analysis scripts. AI summaries of your own uploaded notes can help before exams or fair interviews, provided the notes are accurate to begin with.\n\nAvoid submitting AI-generated text as final prose unless your instructor explicitly allows it with disclosure. Even when allowed, edit heavily. Teachers recognize generic phrasing, uniform sentence length, and vague transitions. Your voice—specific to your project, your school context, your actual numbers—should dominate.\n\nNever paste confidential data, human subjects information, proprietary lab results, or personal identifiers into public AI tools. Check your school's data use policy. When in doubt, ask your mentor.\n\nGood practice: any paragraph initially drafted with AI assistance should be marked in your working file and rewritten until you can explain every claim without looking at the screen.",
      callouts: [
        {
          type: "tip",
          title: "The explain-without-AI test",
          body:
            "After revising an AI-assisted paragraph, close the tool and explain the same content aloud to a peer. If you cannot, the paragraph is not yet yours.",
        },
      ],
    },
    {
      title: "Verification and Fact-Checking",
      body:
        "Verification is non-negotiable. For every citation an AI tool suggests, locate the paper independently. Confirm title, authors, year, journal, volume, and pages. Read the abstract at minimum; read methods and results for any claim you rely on.\n\nFor numerical statements, trace back to the original table or figure. AI summarizers sometimes round incorrectly or confuse correlation with causation. If a tool says \"studies show X,\" ask: which studies? how many? under what conditions?\n\nCross-check definitions against textbooks or encyclopedia entries from reputable publishers. Compare AI explanations of statistical tests with your course notes or a statistics tutor. When two sources disagree, prioritize peer-reviewed primary literature and note uncertainty in your writing.\n\nMaintain a \"verification column\" in your notes: Claim | Source found? | Read personally? | Used in draft? Only check \"Used in draft\" when the first three are yes.\n\nIf verification fails, discard the claim. There is no partial credit for a polished paragraph built on a fake reference.",
    },
    {
      title: "Academic Integrity and Disclosure Policies",
      body:
        "Schools, fairs, and journals are updating AI policies rapidly. Some prohibit AI-generated text entirely except for grammar checking. Others allow AI for brainstorming with written disclosure. Read the current policy for every assignment and submission category.\n\nDisclosure typically includes which tools you used, for what purpose, and how you verified outputs. Example: \"Claude was used to suggest initial search keywords on March 3, 2026; all papers were retrieved and read via Google Scholar. No AI-generated text appears in the final manuscript.\" Honesty prevents honor code violations.\n\nAuthorship means accountability. You cannot blame a chatbot for plagiarism or fabricated data. Collaborators—including AI—do not appear as co-authors on student papers unless a venue explicitly allows unconventional attribution, which is rare.\n\nDiscuss AI use with your mentor early. They may prefer certain tools, forbid others, or require saving chat logs. Science fairs may add interview questions about how you used technology. Preparing honest answers demonstrates maturity.\n\nAcademic integrity is long-term capital. Shortcuts that bypass reading may save an hour and cost a disqualification.",
    },
    {
      title: "Building Your Personal AI Research Workflow",
      body:
        "Sustainable workflows are written down. Create a one-page policy for yourself covering allowed uses, forbidden uses, verification steps, and disclosure language. Revisit it each semester as tools and rules evolve.\n\nA balanced workflow might look like this: Week 1—use AI mapping tools from a seed review; verify and save ten papers. Week 2—read and annotate without AI except for dictionary-style definitions you verify. Week 3—outline sections yourself; optionally ask AI for missing heading ideas you rewrite. Week 4—draft alone; use AI only for grammar or readability checks if permitted. Week 5—run every citation and number through manual verification before submission.\n\nPair AI with human feedback. Mentors, librarians, and classmates catch errors software misses. Participate in workshops on information literacy offered by your school or local library.\n\nStay curious about limitations. Ask how models were trained, what cutoff dates apply, and whether the tool accesses live web data or static snapshots. Understanding the machinery prevents magical thinking.\n\nAI in research is neither forbidden magic nor a free pass. It is a powerful set of tools that rewards skeptical, transparent, and diligent users. The researchers who thrive will be those who combine AI speed with human judgment—the same combination that defines good science with or without machines.",
    },
  ],
  vocabulary: [
    {
      term: "Large language model (LLM)",
      definition:
        "AI system trained on vast text data to generate and analyze language; outputs require verification.",
    },
    {
      term: "Hallucination",
      definition:
        "Confident AI output that is factually incorrect or unsupported, including invented references.",
    },
    {
      term: "Semantic search",
      definition:
        "Search based on meaning and concept similarity rather than exact keyword matching alone.",
    },
    {
      term: "Grounded response",
      definition:
        "AI answer constrained to user-provided documents rather than open-ended generation.",
    },
    {
      term: "Citation chaining",
      definition:
        "Finding additional papers by following references backward and forward from a known source.",
    },
    {
      term: "Disclosure statement",
      definition:
        "Written description of how AI tools were used in a project, submitted with the work.",
    },
    {
      term: "Primary source verification",
      definition:
        "Confirming claims by reading the original publication rather than summaries alone.",
    },
    {
      term: "Predatory journal",
      definition:
        "Low-quality publisher that prioritizes fees over rigorous review; AI search may surface these.",
    },
    {
      term: "Reference manager",
      definition:
        "Software such as Zotero or Mendeley that stores citations and formats bibliographies.",
    },
    {
      term: "Training data cutoff",
      definition:
        "The date after which an AI model has no built-in knowledge of new events or publications.",
    },
  ],
  keyTakeaways: [
    "AI accelerates discovery and drafting but does not guarantee accuracy or replace human judgment.",
    "Every AI-suggested citation or claim must be verified against primary sources before use.",
    "Literature tools like Connected Papers and Semantic Scholar work best combined with traditional search skills.",
    "School and venue policies on AI use and disclosure must be read and followed for each submission.",
    "A written personal workflow keeps AI assistance transparent, ethical, and aligned with your mentor's expectations.",
  ],
  commonMistakes: [
    "Citing papers suggested by AI without confirming they exist in a scholarly database.",
    "Pasting sensitive or identifiable research data into public AI chat interfaces.",
    "Submitting lightly edited AI prose that reads generic and lacks project-specific evidence.",
    "Assuming AI summaries of statistics or methods are accurate without reading original papers.",
  ],
  researchTips: [
    "Keep a verification log next to your bibliography marking which sources you have read in full.",
    "Ask AI for search strategies and synonyms, then run those queries yourself in trusted databases.",
    "Save PDFs to a reference manager before summarizing so summaries link to files you control.",
    "Re-read your institution's academic honesty policy at the start of each research project.",
  ],
  activity: {
    title: "Verify AI-Suggested Sources",
    objective:
      "Use an AI tool to discover candidate papers, then independently verify each citation and assess whether the source supports the claimed finding.",
    instructions: [
      "Select a focused research question from your project or a provided sample topic.",
      "Use one AI-assisted discovery tool (Elicit, Consensus, Perplexity, ResearchRabbit, or similar) to obtain at least five paper suggestions related to your question.",
      "For each suggestion, record the full citation as given by the tool in a table.",
      "Search Google Scholar, Semantic Scholar, or PubMed to confirm each paper exists; note any hallucinated or mismatched entries.",
      "For three verified papers, read the abstract and skim methods/results. Write one sentence on whether the paper actually supports your original question.",
      "Write a short paragraph summarizing how many suggestions were valid, what errors you found, and what you learned about verification.",
      "Draft a two-sentence AI disclosure statement you would include with a assignment using this process.",
    ],
    deliverable:
      "A verification table (minimum five sources), three-sentence summaries for three valid papers, an error summary paragraph, and a disclosure statement.",
    timeEstimate: "55–70 minutes",
  },
  reflection: {
    prompt:
      "Describe your personal rules for using AI in research. What will you use it for, what will you refuse to use it for, and how will you verify and disclose AI assistance in your capstone project?",
    guidelines: [
      "List at least two acceptable uses and two prohibited or restricted uses specific to your school context.",
      "Explain your verification step for citations and factual claims.",
      "Include how you will document or disclose AI use to teachers, fairs, or journals.",
      "Identify one situation where AI might tempt you to cut corners and how you will resist it.",
    ],
    wordCount: "250–400 words",
    rubric: [
      "Rules are specific and actionable rather than vague promises to \"use AI responsibly.\"",
      "Verification and disclosure practices are described concretely.",
      "Demonstrates understanding of hallucination and integrity risks.",
      "Connects policies to the student's own capstone or ongoing project.",
    ],
  },
  furtherReading: [
    {
      title: "MIT Libraries: Using Generative AI in Research",
      description:
        "Guidance on capabilities, limits, citation verification, and ethical use in academic work.",
    },
    {
      title: "Consensus — Help Center and Methodology",
      description:
        "Documentation on how AI extracts claims from papers and why full-text reading remains necessary.",
    },
    {
      title: "International Center for Academic Integrity: AI and Honor Codes",
      description:
        "Overview of how institutions frame AI assistance, disclosure, and student responsibility.",
    },
  ],
};
