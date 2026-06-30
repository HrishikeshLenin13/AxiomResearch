import type { CourseModule } from "../module-types";

export const module10: CourseModule = {
  id: "module-10",
  number: 10,
  title: "Scientific Writing",
  summary:
    "Develop the skills to write clear, objective research papers—from abstracts and methods to results and discussion—in formats used by scientific journals and student competitions.",
  estimatedMinutes: 105,
  learningObjectives: [
    "Distinguish scientific writing from persuasive or creative writing in tone and structure",
    "Organize a research paper using standard IMRaD sections and logical flow",
    "Write methods and results with precision, objectivity, and appropriate detail",
    "Craft introductions and discussions that situate findings within existing literature",
    "Apply basic citation practices and revision strategies that strengthen clarity and integrity",
  ],
  sections: [
    {
      title: "The Purpose and Voice of Scientific Writing",
      body:
        "Scientific writing exists to communicate evidence so that others can evaluate, reproduce, and build on your work. It is not the same as writing an opinion essay, a marketing brochure, or a diary entry. The voice is objective: you present what you did, what you found, and what you think it means—while acknowledging uncertainty and limitations. Strong scientific prose is precise. Weak scientific prose hides behind vague words like \"things,\" \"a lot,\" \"interesting,\" or \"proved.\"\n\nObjectivity does not mean boring. It means every claim is tied to evidence. Instead of writing \"Our results were amazing,\" write \"Germination rates increased 34 percent under the experimental condition compared to the control (n = 60, p < 0.01).\" Numbers, sample sizes, and conditions replace hype. Adjectives should describe measurable properties—\"significant,\" \"consistent,\" \"unexpected\"—only when you define what you mean.\n\nAudience matters. A research paper for a journal assumes readers who understand basic methods in your field but may not know your specific project. Define specialized terms once. Avoid jargon when plain language works. Sentences should be direct: subject, verb, object. Long chains of clauses confuse readers and hide logical gaps.\n\nRead papers in your target field and notice how authors introduce uncertainty, report numbers, and cite prior work. You are not copying voice—you are learning conventions that signal credibility to reviewers and teachers.\n\nScientific writing is also a record. Years from now, someone should be able to read your methods and repeat your study. That responsibility shapes every section. You are not just telling a story; you are documenting a process. Clarity, honesty, and completeness are ethical requirements, not stylistic preferences.",
      callouts: [
        {
          type: "mistake",
          title: "\"Proved\" is almost never correct",
          body:
            "Science rarely proves absolute truth. One study supports, suggests, or is consistent with a hypothesis. Reserve \"proved\" for mathematical proofs or contexts where your field explicitly allows it.",
        },
      ],
    },
    {
      title: "Structure of a Research Paper",
      body:
        "Most scientific papers follow IMRaD: Introduction, Methods, Results, and Discussion. Many also include an Abstract, References, and sometimes Acknowledgments, Appendices, or Figures. Each section has a distinct job. The Abstract is a standalone summary—often 150 to 300 words—covering background, purpose, methods, key findings, and conclusion. Many readers never go beyond the abstract, so it must be accurate and specific.\n\nThe Introduction answers three questions: What is known? What is unknown or contested? What did this study do to address the gap? It moves from broad context to your specific research question. It ends with your hypothesis or objectives. It does not report your results—that belongs in Results.\n\nMethods explain how you collected and analyzed data so another researcher could replicate your work. Include materials, procedures, participants or samples, instruments, and statistical tests. Write in past tense. Results present findings without interpretation—use text, tables, and figures. Save explanations of why results matter for the Discussion.\n\nDiscussion interprets findings, compares them to prior studies, acknowledges limitations, and suggests next steps. Some papers combine Results and Discussion; follow your teacher's or venue's guidelines. References list every source you cited. Consistency in format—APA, IEEE, or another style—shows professionalism.\n\nThink of the paper as a funnel and then an expansion. Introduction narrows from the field to your question. Results report what happened. Discussion widens again to implications for the field. If a paragraph does not fit its section's purpose, move or cut it.\n\nLong Methods sections benefit from subheadings such as Participants, Materials, Procedure, and Statistical Analysis. Subheadings guide readers even when journals omit them in final layout.",
    },
    {
      title: "Writing Methods and Results",
      body:
        "Methods should read like a recipe with enough detail to replicate. \"We watered the plants\" is insufficient. \"Plants received 50 mL of distilled water every 48 hours at 8:00 a.m. for six weeks\" is better. Specify brands, concentrations, and settings when they affect outcomes. Describe how you assigned treatments randomly if applicable. State how you handled missing data or outliers and which software you used for analysis.\n\nEthical details belong in Methods when human or animal subjects are involved: consent procedures, anonymization, and institutional approvals. Even classroom surveys should note how participation was voluntary and how data were stored securely.\n\nResults reporting follows a simple rule: present evidence, then point to it. \"Mean reaction time was shorter in the training group (M = 412 ms, SD = 38) than in the control group (M = 467 ms, SD = 41).\" Refer readers to tables and figures rather than repeating every number in prose. Highlight patterns that answer your research question. Report negative results too—finding no effect is still a finding.\n\nAvoid interpretation in Results. Phrases like \"This proves our hypothesis\" belong in Discussion. Similarly, do not hide inconvenient data. If only two of five conditions showed an effect, report all five. Selective reporting undermines trust and mirrors a serious form of research misconduct at professional levels.\n\nTables and figures carry much of the Results section. Each should be numbered, titled, and referenced in order. The text should guide the reader through the logic: first the overall pattern, then important details, then anything unexpected.\n\nWhen you report statistical tests, name the test, report the statistic and p-value, and include an effect size when available. Example: \"A two-sample t-test showed lower latency in the treatment group, t(48) = 2.31, p = 0.025, Cohen's d = 0.65.\"",
    },
    {
      title: "Crafting Introductions and Discussions",
      body:
        "A strong Introduction shows that you understand the field. Open with the broader problem—why anyone should care—then summarize relevant prior work in your own words with citations. Synthesis matters: do not list studies one after another without explaining how they connect. Identify the gap: what question remains unanswered? Close with your research question, hypothesis, or objectives and, if appropriate, a brief preview of your approach.\n\nStudents often write Introductions that are too broad (\"Since the beginning of time, humans have studied plants\") or too narrow (jumping straight to their experiment without context). Aim for five to eight well-cited sentences of background before stating your specific question.\n\nThe Discussion is where you interpret. Start with the direct answer to your research question, stated plainly. Then compare your findings to previous studies: Do they agree? If not, why might that be—different methods, samples, or conditions? Address limitations honestly. Small sample size, classroom constraints, or equipment failure are common in student research; naming them shows maturity.\n\nAvoid overstating. Correlation is not causation. A single semester project rarely settles a decades-old debate. Use calibrated language: \"These results suggest,\" \"One possible explanation,\" \"Future studies should test.\" End with implications and future directions. What would you do differently with more time or resources?\n\nIntroduction and Discussion require the most reading of other sources. Keep a separate document of notes on each paper you cite so you paraphrase accurately and avoid accidental plagiarism.\n\nIn Discussion, compare expected versus unexpected findings explicitly: what matched prior work, what did not, and which methodological differences might explain the gap. That structure shows you read the literature as an active conversation.",
      callouts: [
        {
          type: "tip",
          title: "Write the Introduction last",
          body:
            "Many researchers draft Methods and Results first, then write the Introduction once they know exactly what the paper covers. This prevents promising analyses you did not perform.",
        },
      ],
    },
    {
      title: "Citations, Paraphrasing, and Academic Integrity",
      body:
        "Scientific writing builds on prior work. Every idea, definition, method, or finding that is not your own original contribution needs a citation. Direct quotations are rare in science; paraphrasing in your own words is standard. When you paraphrase, you still cite the source. Changing one word in a sentence is not paraphrasing—it is patchwriting, and it is still plagiarism.\n\nLearn one citation style well—APA is common in social and life sciences; IEEE in engineering; CSE in some biology contexts. Use reference managers such as Zotero or Mendeley to format entries consistently. In-text citations should match your reference list exactly. Missing citations erode trust; fabricated citations are serious misconduct.\n\nPrimary sources are preferable when you describe original experiments or data. Secondary sources—textbooks, review articles—are fine for background but trace important claims back to primary literature when possible. If two sources disagree, acknowledge the disagreement rather than pretending consensus exists.\n\nCollaboration policies matter. Clarify with your teacher what help is allowed from peers, mentors, or AI tools. Acknowledge substantial assistance in Acknowledgments. Your name on the paper means you stand behind the accuracy of what is written.\n\nFor websites and datasets that may change, include retrieval dates in citations. For preprints, note that the work may not yet be peer reviewed unless a published version exists.",
    },
    {
      title: "Revising, Polishing, and Common Pitfalls",
      body:
        "First drafts exist to be revised. Set your paper aside for a day if possible, then read it aloud. Awkward sentences and missing transitions become obvious when spoken. Read one section at a time with its purpose in mind: Does every Methods paragraph help someone replicate? Does every Discussion paragraph interpret evidence?\n\nCut filler. \"It is important to note that\" rarely adds meaning. Replace passive voice where active voice is clearer—\"We measured temperature every hour\" beats \"Temperature was measured\" when you need to emphasize who did the work. Keep paragraphs focused: one main idea each.\n\nCheck numbers and units throughout. A typo in an exponent or a Celsius-Fahrenheit confusion can invalidate a reader's trust. Make sure every figure and table is cited in order and that captions match the content.\n\nPeer review helps. Trade papers with a classmate and use a rubric: clarity, logic, evidence, citations. Respond to feedback with an open mind. Revision is not failure; it is how scientific writing improves.\n\nScientific writing is a learnable skill. Each paper you write strengthens your ability to think like a researcher. The goal is not ornate prose—it is evidence, communicated so clearly that another person can follow your reasoning from question to conclusion.",
    },
  ],
  vocabulary: [
    {
      term: "IMRaD",
      definition:
        "Standard paper structure: Introduction, Methods, Results, and Discussion.",
    },
    {
      term: "Abstract",
      definition:
        "Brief standalone summary of the entire study, usually written last but placed first in the paper.",
    },
    {
      term: "Paraphrase",
      definition:
        "Restating another author's ideas in your own words while still providing a citation.",
    },
    {
      term: "Operational definition",
      definition:
        "A precise description of how a variable was measured or manipulated in a study.",
    },
    {
      term: "Passive voice",
      definition:
        "Sentence structure where the subject receives the action (e.g., \"Data were collected\"); use sparingly for clarity.",
    },
    {
      term: "Primary source",
      definition:
        "Original research publication presenting new data or findings for the first time.",
    },
    {
      term: "Literature gap",
      definition:
        "An unanswered question or unresolved debate that motivates a new study.",
    },
    {
      term: "Limitations section",
      definition:
        "Discussion of factors that restrict how broadly or confidently findings can be interpreted.",
    },
    {
      term: "In-text citation",
      definition:
        "Brief reference within the body of a paper pointing to a full entry in the reference list.",
    },
    {
      term: "Patchwriting",
      definition:
        "Superficially rewording a source while retaining its structure; a form of plagiarism.",
    },
  ],
  keyTakeaways: [
    "Scientific writing prioritizes precision, evidence, and reproducibility over persuasive or emotional language.",
    "Each IMRaD section serves a distinct purpose; mixing results with interpretation weakens the paper.",
    "Methods must be detailed enough for replication; Results must report all relevant findings honestly.",
    "Introductions synthesize prior work and identify gaps; Discussions interpret findings with calibrated claims.",
    "Accurate citations and careful paraphrasing are essential to academic integrity in every research genre.",
  ],
  commonMistakes: [
    "Reporting results in the Introduction or interpreting them at length in the Results section.",
    "Using vague language (\"a lot,\" \"better,\" \"stuff\") instead of measurable descriptions.",
    "Citing sources without reading them or listing references that do not match in-text citations.",
    "Overclaiming causation or certainty from a single study with a small or convenience sample.",
  ],
  researchTips: [
    "Maintain a running outline with bullet points for each section before drafting full paragraphs.",
    "Use past tense for what you did and found; present tense for established facts in the literature.",
    "Create a citation table mapping each claim in your Introduction to a specific source.",
    "Ask your mentor to review Methods alone first—replication problems are easier to fix early.",
  ],
  activity: {
    title: "Write an Abstract from a Sample Study",
    objective:
      "Practice condensing a full research narrative into a structured abstract that accurately summarizes background, methods, results, and conclusions.",
    instructions: [
      "Read the provided sample study summary (or your own completed project outline) including research question, methods, key numbers, and main conclusion.",
      "Identify the one-sentence problem or gap the study addresses and the one-sentence answer the data support.",
      "Draft an abstract of 180–250 words using four labeled parts: Background, Objective, Methods, Results/Conclusion (labels may be removed in the final version).",
      "Include at least two numeric findings with units or sample sizes where applicable.",
      "Remove interpretive hype; replace with precise, evidence-linked statements.",
      "Exchange abstracts with a partner. Each partner should list what they still cannot answer after reading only the abstract.",
      "Revise your abstract to address any gaps your partner identified without exceeding the word limit.",
    ],
    deliverable:
      "A polished abstract (180–250 words) plus a three-item checklist confirming background, methods, results, and conclusion are all present.",
    timeEstimate: "45–60 minutes",
  },
  reflection: {
    prompt:
      "Which section of a scientific paper do you find hardest to write—Introduction, Methods, Results, or Discussion—and why? Describe one specific strategy you will use to strengthen that section in your own project.",
    guidelines: [
      "Name the section and explain the difficulty with a concrete example from your experience.",
      "Connect the challenge to the section's purpose in IMRaD structure.",
      "Propose a strategy such as outlining, mentor feedback, reading model papers, or drafting order.",
      "Set a realistic goal for your next draft (word count, number of citations, or figure integration).",
    ],
    wordCount: "200–350 words",
    rubric: [
      "Identifies a specific section and explains the difficulty clearly.",
      "Demonstrates understanding of what that section should accomplish.",
      "Proposes a practical, actionable improvement strategy.",
      "Connects the reflection to the student's own research project.",
    ],
  },
  furtherReading: [
    {
      title: "Scientific Writing and Communication ( Hofmann )",
      description:
        "A comprehensive guide to writing each section of research papers with examples from multiple disciplines.",
    },
    {
      title: "Purdue OWL: APA Formatting and Style Guide",
      description:
        "Free online resource for in-text citations, reference lists, and common student writing questions.",
    },
    {
      title: "\"The Science of Scientific Writing\" (Gopen & Swan)",
      description:
        "Classic article on reader expectations and sentence structure in scientific prose; helpful for revision.",
    },
  ],
};
