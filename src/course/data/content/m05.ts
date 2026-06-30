import type { CourseModule } from "../module-types";

export const module05: CourseModule = {
  id: "module-5",
  number: 5,
  title: "Literature Reviews",
  summary:
    "Learn to synthesize existing research into a coherent narrative that maps what is known, where scientists disagree, and where your own study could contribute.",
  estimatedMinutes: 90,
  learningObjectives: [
    "Explain the purpose of a literature review in a research project",
    "Distinguish synthesis from summary when writing about sources",
    "Organize sources thematically, chronologically, or methodologically",
    "Identify research gaps that motivate new studies",
    "Apply systematic search and note-taking strategies for review writing",
  ],
  sections: [
    {
      title: "Why Literature Reviews Matter",
      body: "Before you collect a single data point, you need to understand what other researchers have already discovered. A literature review is the written map of that landscape. It shows your reader—and yourself—that your project is grounded in existing knowledge rather than built on assumptions.\n\nIn professional research, literature reviews appear in many forms. A standalone review article surveys an entire field. A review section inside a research paper situates one specific study within prior work. A thesis or science fair project often includes a shorter review that explains why the student's question is worth asking. All of these share the same core job: establish context, demonstrate credibility, and reveal gaps.\n\nThink of a literature review as a conversation you are joining. You are not the first person to wonder about sleep and memory, microplastics in water, or how AI tutors affect learning. Other researchers have asked related questions, used different methods, and reached conclusions that sometimes agree and sometimes conflict. Your review summarizes that conversation—not by repeating every speaker's words, but by explaining what the group collectively knows and where they still talk past each other.\n\nStrong reviews also protect you from reinventing the wheel. A student who spends weeks studying plant growth under colored light without reading prior studies might duplicate work done decades ago—or worse, design a flawed experiment that earlier papers already corrected. Reading widely first saves time and strengthens your eventual contribution.\n\nFinally, a literature review clarifies your vocabulary. Fields develop shared terms—\"working memory,\" \"effect size,\" \"double-blind\"—that mean specific things to experts. When you read deeply, you learn to use those terms precisely, which makes your own research question sharper and your communication with mentors more productive.",
      callouts: [
        {
          type: "did-you-know",
          title: "Reviews can change entire fields",
          body: "The 2015 review by Ioannidis on reproducibility in science influenced how journals, funders, and universities evaluate research quality worldwide. A well-written review does not just summarize—it can redirect how a community thinks.",
        },
      ],
    },
    {
      title: "Summary vs. Synthesis",
      body: "The most common mistake in student literature reviews is summarizing papers one after another: \"Smith found X. Then Jones found Y. Then Lee found Z.\" That format reads like a book report, not scholarship. Summary restates what one source said. Synthesis combines ideas from multiple sources to build an argument.\n\nSynthesis asks comparative questions. Do these studies agree on the main effect but disagree about why it happens? Did methods improve over time—from small classroom samples to large randomized trials? Does one body of work focus on short-term outcomes while another examines long-term effects? When you write synthetically, each paragraph has a theme, and each cited study supports a point about that theme.\n\nConsider a review on whether music improves focus during homework. A summary approach would describe five studies in sequence. A synthesis approach might open a paragraph on mixed results in noisy environments, citing two studies that found benefits and one that found harm. The next paragraph might discuss age differences, weaving together findings from adolescent and adult samples. The reader learns how evidence fits together—not just what each paper said in isolation.\n\nEffective synthesis also notes limitations across studies. If every prior experiment used college students, your review should flag that gap explicitly. If most studies measured performance after ten minutes but none tracked retention a week later, that pattern becomes part of your argument for why new research is needed.\n\nPractice synthesis in your notes before you draft prose. When reading, jot \"Agrees with Chen on X but uses younger sample\" rather than copying abstract sentences. Those comparative notes become the raw material for paragraphs that actually argue something.",
    },
    {
      title: "Organizing Your Review",
      body: "Once you have read enough sources, organization becomes the difference between a clear review and a confusing one. Three structures appear most often in student and professional work: thematic, chronological, and methodological.\n\nThematic organization groups sources by idea. A review on social media and teen mental health might have sections on sleep disruption, social comparison, cyberbullying, and positive support networks. Each section discusses multiple studies that address that theme. This structure works well when your goal is to show how different factors connect to your research question.\n\nChronological organization traces how understanding evolved. You might describe early alarmist claims, followed by larger studies that complicated the picture, and then recent work using better measurement tools. Chronological structure suits topics where methods or public debate changed dramatically over time—such as climate modeling or early COVID-19 research.\n\nMethodological organization compares studies by how they were conducted: lab experiments, surveys, longitudinal tracking, or computational models. This approach helps when different methods produce different results and you want to explain why. A student studying nutrition might separate randomized controlled trials from observational food diaries, then discuss what each design can and cannot prove.\n\nMost strong reviews blend structures subtly. A thematic review might order themes chronologically within each section. Choose the structure that best serves your argument, and make that structure visible to the reader with clear headings and transition sentences.\n\nWhichever structure you choose, write brief roadmap sentences at the start and end of each section: \"This section examines three competing explanations for declining pollinator counts\" or \"Having reviewed lab studies, we turn next to field observations.\" Roadmaps reduce reader confusion and keep your own drafting on track.",
      callouts: [
        {
          type: "tip",
          title: "Outline before you draft",
          body: "Create a one-page outline listing your main themes and which sources support, complicate, or contradict each theme. If a source does not fit anywhere, you may not need it—or you may have discovered a gap worth highlighting.",
        },
      ],
    },
    {
      title: "Searching Systematically",
      body: "A literature review is only as good as the sources you find. Random Googling tends to surface popular articles and recent news—not necessarily the most rigorous or relevant studies. Systematic searching means using deliberate keywords, multiple databases, and clear inclusion criteria.\n\nStart by listing search terms related to your question. Include synonyms and related concepts. If you study whether standing desks improve focus, also search \"sit-stand workstations,\" \"classroom ergonomics,\" and \"sedentary behavior adolescents.\" Use quotation marks for exact phrases and Boolean operators (AND, OR, NOT) to narrow or broaden results in Google Scholar, PubMed, or your school library database.\n\nTrack where you search and what you find. A simple spreadsheet with columns for author, year, title, database, key finding, methods, and limitations prevents duplicate reading and helps you sort sources later. When you find one excellent paper, mine its reference list backward and use Google Scholar's \"cited by\" feature to move forward. This citation chaining often reveals influential studies you would miss with a single keyword search.\n\nSet inclusion criteria before you read deeply. Decide what date range, population, or study type fits your project. You might include peer-reviewed experiments on teens but exclude opinion blogs or studies from the 1970s with outdated measurement tools—unless you are writing a historical review. Document these choices so your reader understands why certain work appears in your review and other work does not.\n\nSchedule two or three search passes rather than one marathon session. Early passes map the field; later passes target gaps your outline exposes. Save promising PDFs with consistent filenames (AuthorYearKeyword.pdf) so you are not hunting through Downloads folders the night before a deadline.",
    },
    {
      title: "Writing Process and Voice",
      body: "When you draft, write topic sentences that state the paragraph's claim, not the author's name. Weak opening: \"In 2022, Martinez et al. studied algae blooms.\" Stronger opening: \"Nutrient runoff remains the strongest predictor of algal blooms in freshwater lakes studied across three continents.\" Then bring in Martinez and others as evidence for that claim.\n\nUse reporting verbs thoughtfully. \"Demonstrate\" and \"establish\" imply strong evidence. \"Suggest,\" \"indicate,\" and \"propose\" signal preliminary or correlational findings. Matching your language to the strength of evidence shows scholarly maturity. Never write that a single small study \"proved\" anything—proof is rare in research, especially in the social and biological sciences.\n\nParaphrase by default and quote sparingly. Long block quotes often suggest you have not processed the material. When you paraphrase, you still need a citation—but you also demonstrate understanding. Reserve direct quotes for definitions, memorable phrasing, or passages where exact wording matters.\n\nMaintain an objective, analytical tone. It is fine to identify gaps or weaknesses in prior work, but avoid dismissive language. Instead of \"These researchers completely ignored sleep,\" write \"Most prior studies measured performance immediately after the intervention; few accounted for participants' sleep the previous night, which may confound attention outcomes.\" That framing is critical, not disrespectful.\n\nRead your draft aloud. If every sentence starts with a researcher’s name, you are probably summarizing. If sentences begin with ideas and weave in citations naturally, you are closer to synthesis.",
    },
    {
      title: "From Review to Research Gap",
      body: "The best literature reviews do not end with \"more research is needed\" as a vague throwaway line. They end with a specific, justified gap. After synthesizing evidence, ask: What question remains unanswered? What population has been overlooked? What method could test an unresolved debate?\n\nConnecting your review to your own project is the payoff. If you are building a low-cost water filter for a science fair, your review might show that charcoal filters reduce certain contaminants effectively but that few student-accessible designs have been tested against local tap water conditions in your region. That gap becomes the rationale for your experiment.\n\nRevise your review as your project evolves. Early in the process, the review helps you learn the field. After you collect data, you may return to add studies you missed or to compare your findings with prior work in the discussion section of your final paper. Treat the literature review as a living document, not a one-time homework assignment.\n\nFinally, cite consistently and completely. Every factual claim drawn from a source needs attribution. Use the citation style your mentor or competition requires—APA is common in sciences—and apply it uniformly. Sloppy citations undermine trust even when your synthesis is excellent.\n\nWhen you finish, ask a skeptical reader: \"Could you explain what we know, what we do not know, and why my study matters?\" If they can answer from your review alone, you have succeeded.",
    },
  ],
  vocabulary: [
    {
      term: "Literature review",
      definition:
        "A structured survey of published research on a topic that synthesizes findings, identifies patterns, and reveals gaps rather than listing sources sequentially.",
    },
    {
      term: "Synthesis",
      definition:
        "Combining ideas from multiple sources into an integrated argument organized by themes or questions, not by individual authors.",
    },
    {
      term: "Thematic organization",
      definition:
        "Arranging a review around conceptual topics or ideas, with multiple studies discussed within each theme.",
    },
    {
      term: "Chronological organization",
      definition:
        "Arranging a review by time period to show how methods, findings, or debate evolved.",
    },
    {
      term: "Citation chaining",
      definition:
        "Finding additional sources by examining references in a useful paper and tracking later papers that cite it.",
    },
    {
      term: "Inclusion criteria",
      definition:
        "Predetermined rules for which studies belong in a review based on date, method, population, or relevance.",
    },
    {
      term: "Research gap",
      definition:
        "A specific unanswered question or understudied area that justifies new investigation.",
    },
    {
      term: "Paraphrase",
      definition:
        "Restating a source's idea in your own words while still giving proper credit through citation.",
    },
    {
      term: "Reporting verb",
      definition:
        "A verb such as \"suggest,\" \"demonstrate,\" or \"indicate\" that signals how strongly a source supports a claim.",
    },
    {
      term: "Systematic search",
      definition:
        "A deliberate, documented process of finding sources using defined keywords, databases, and selection rules.",
    },
  ],
  keyTakeaways: [
    "A literature review maps existing knowledge and shows where your project fits—not just what each paper said individually.",
    "Synthesis organizes evidence by themes or questions; sequential summary is one of the weakest forms of review writing.",
    "Systematic searching, citation chaining, and clear inclusion criteria produce stronger, more defensible reviews.",
    "Objective tone and careful reporting verbs help you critique prior work without overstating what evidence supports.",
    "A strong review ends with a specific research gap that motivates your own study design.",
  ],
  commonMistakes: [
    "Writing a \"study by study\" summary with one paragraph per paper and no connecting argument.",
    "Citing only the first page of Google results while ignoring peer-reviewed databases and seminal older work.",
    "Using words like \"proved\" or \"obvious\" when evidence is correlational, mixed, or still debated.",
    "Listing a vague gap (\"more research is needed\") without explaining what question, population, or method is missing.",
  ],
  researchTips: [
    "Build a source matrix spreadsheet early so you can sort studies by theme, method, and sample size before drafting.",
    "Read abstracts and conclusions first to filter sources quickly, then deep-read the papers most relevant to your gap.",
    "Write one-sentence \"so what\" notes for each source: why it matters to your specific question.",
    "Ask a librarian or mentor to review your search terms—they often know database tricks students miss.",
  ],
  activity: {
    title: "Mini Thematic Literature Review",
    objective:
      "Practice synthesizing three provided abstracts into a short thematic review paragraph that identifies a research gap.",
    instructions: [
      "Obtain three peer-reviewed abstracts on a topic your instructor assigns (or choose one related to your project). Read each abstract twice.",
      "Create a source matrix noting each study's sample, method, main finding, and one limitation.",
      "Identify one theme that at least two abstracts share—for example, similar outcomes, conflicting results, or shared limitations.",
      "Draft one synthesis paragraph (150–200 words) organized around that theme. Cite all three sources within the paragraph using your required citation style.",
      "Write a second paragraph (75–100 words) stating a specific research gap your review reveals and why it matters.",
      "Exchange drafts with a peer and highlight every sentence that summarizes only one study versus sentences that combine multiple sources.",
      "Revise based on peer feedback, replacing summary-only sentences with synthetic ones where possible.",
    ],
    deliverable:
      "A two-paragraph mini review (225–300 words total) plus your completed source matrix.",
    timeEstimate: "60–75 minutes",
  },
  reflection: {
    prompt:
      "After completing your mini review, what specific gap would motivate a new study in this area? Explain why existing research has not fully answered that question yet.",
    guidelines: [
      "Name the gap precisely—avoid vague phrases like \"needs more study.\"",
      "Reference at least two limitations or missing elements you noticed across the abstracts.",
      "Connect the gap to a population, setting, method, or timeframe that prior work overlooked.",
      "Explain in plain language why filling this gap would matter to someone outside your classroom.",
    ],
    wordCount: "150–300 words",
    rubric: [
      "Gap is specific, feasible for student research, and clearly distinct from what prior studies already addressed.",
      "Response uses evidence from the review process rather than personal opinion alone.",
      "Writing is clear, organized, and free of unsupported claims about what research \"proved.\"",
    ],
  },
  furtherReading: [
    {
      title: "The Literature Review: Six Steps to Success (Fink)",
      description:
        "A practical guide to planning, searching, organizing, and writing reviews with worksheets suited to student researchers.",
    },
    {
      title: "Cochrane Handbook for Systematic Reviews (introductory chapters)",
      description:
        "Introduces rigorous systematic review methods used in health sciences—useful even when your project is a smaller narrative review.",
    },
    {
      title: "They Say / I Say (Graff & Birkenstein)",
      description:
        "Teaches how to enter academic conversations—a skill at the heart of synthesis and gap identification in literature reviews.",
    },
  ],
};
