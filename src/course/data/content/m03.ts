import type { CourseModule } from "../module-types";

export const module03: CourseModule = {
  id: "module-3",
  number: 3,
  title: "Finding Reliable Sources",
  summary:
    "Learn to distinguish primary, secondary, and tertiary sources; use academic databases effectively; and detect predatory journals, bias, and misinformation—skills you will use on every Axiom literature review.",
  estimatedMinutes: 100,
  learningObjectives: [
    "Distinguish primary, secondary, and tertiary sources and use each appropriately",
    "Apply credibility criteria including peer review, author expertise, and publication venue",
    "Navigate major academic databases and preprint servers responsibly",
    "Use Boolean operators, citation chaining, and reference mining to find stronger evidence",
    "Recognize predatory journals, conflicts of interest, and common misinformation patterns",
  ],
  sections: [
    {
      title: "Why Sources Matter in Research",
      body: "Your research is only as strong as the evidence supporting it. A beautifully written paper built on unreliable sources collapses under scrutiny. Conversely, even a modest student project gains credibility when every claim traces to vetted, appropriate sources. Learning to find and evaluate sources is not a bureaucratic hurdle—it is the foundation of trustworthy research.\n\nConsider a real consequence: during the early COVID-19 pandemic, a flawed study claiming hydroxychloroquine was effective spread rapidly before peer review caught serious methodological problems. Politicians and media cited it; patients requested treatments based on weak evidence. The episode showed how source quality affects real lives, not just grades.\n\nSources also shape what questions you can ask. If only one small study exists on your topic, you must acknowledge limited evidence. If dozens of rigorous trials exist, you can synthesize patterns and identify outliers. Your literature search is reconnaissance—it maps the terrain before you design your own contribution.\n\nHigh school researchers sometimes treat sources as decorations—quotes sprinkled to satisfy a teacher. Professionals treat sources as infrastructure. Every claim about prior findings, every comparison to established knowledge, every justification for method choice rests on sources you can defend. This module teaches you to build that infrastructure deliberately.",
      callouts: [
        {
          type: "did-you-know",
          title: "The penicillin story depended on published prior work",
          body: "Fleming's discovery built on decades of bacteriology research documented in journals. Even groundbreaking observations connect to sources that came before them.",
        },
      ],
    },
    {
      title: "Primary, Secondary, and Tertiary Sources",
      body: "Researchers classify sources by how close they are to original evidence. Understanding these categories prevents you from citing a textbook summary when you should cite the original experiment—or vice versa when you need background context.\n\nPrimary sources present original research, data, or firsthand accounts. Examples include peer-reviewed journal articles reporting new experiments, government datasets from NASA or NOAA, interview transcripts you collected, historical letters, and clinical trial results. When you write \"Smith et al. found that…,\" you should usually point to a primary source unless you are discussing how others interpreted Smith's work.\n\nSecondary sources analyze, interpret, or summarize primary sources. Literature reviews, scholarly books, documentary films with cited experts, and news articles by science journalists fall here. They are valuable for context and overview but should not replace reading key primary papers when you make specific factual claims.\n\nTertiary sources compile information from secondary sources for quick reference. Encyclopedias, textbooks, and most Wikipedia articles are tertiary. They help you learn vocabulary and big-picture history but rarely suffice as the sole evidence for research claims. Use Wikipedia's reference lists as launch pads—not as endpoints.\n\nThe same document can function differently depending on use. A journal article is primary when you cite its new results; it becomes secondary context when you mention it only to show what was known before your project. Think about what role each source plays in your argument.",
    },
    {
      title: "Evaluating Credibility",
      body: "Not all published work is equally trustworthy. Credibility evaluation is a skill you apply to every source, regardless of how impressive the title or website looks.\n\nPeer review is a major quality signal. Before publication in reputable journals, manuscripts are reviewed anonymously by experts who critique methods, statistics, and conclusions. Peer review is imperfect—flawed studies sometimes pass—but it catches many errors and reduces blatant fraud compared to unpublished posting.\n\nAuthor expertise matters. Check affiliations: Is the author a professor at a research university, a scientist at NASA, a clinician at a hospital? Do they have prior publications on the same topic? A single author with no institutional affiliation and no track record warrants extra scrutiny, though independent researchers occasionally produce excellent work.\n\nPublication venue reveals standards. Journals like Nature, The Lancet, or discipline-specific respected journals maintain editorial boards and rejection rates that filter weak submissions. Be wary of journals that spam researchers with flattering invitations to publish quickly for a fee—that pattern often indicates predatory publishing.\n\nRecency and relevance depend on field. Medical guidance on COVID-19 from 2020 may be outdated by 2024. Fundamental physics from 1950 may still be valid. Always ask whether newer evidence supersedes older sources.\n\nTransparency strengthens credibility. Trust sources that describe methods clearly, acknowledge limitations, disclose funding sources, and provide access to data when possible. Opacity is a red flag.",
      callouts: [
        {
          type: "mistake",
          title: "Equating \"published\" with \"trustworthy\"",
          body: "Thousands of predatory journals publish papers for payment without real peer review. Always check journal reputation, not just that a PDF exists online.",
        },
      ],
    },
    {
      title: "Academic Databases and Search Tools",
      body: "Google is general; academic databases are specialized. Learning a few core tools dramatically improves the quality of sources you find.\n\nGoogle Scholar (scholar.google.com) indexes scholarly literature across disciplines. It shows citation counts, related articles, and links to PDFs when available. Use it as a broad starting point, then verify each paper's venue and quality individually.\n\nPubMed (pubmed.ncbi.nlm.nih.gov) focuses on biomedical and life sciences literature. It is maintained by the U.S. National Library of Medicine and links to free full-text articles when available through PubMed Central.\n\nIEEE Xplore, ACM Digital Library, and arXiv serve engineering and computer science. arXiv hosts preprints—papers posted before peer review— which are useful for cutting-edge topics but should be read with extra caution until formally published.\n\nJSTOR and ERIC provide humanities, social sciences, and education research respectively. Your school or public library may offer free access—ask a librarian.\n\nSemantic Scholar and Connected Papers visualize citation networks, helping you find influential papers and recent developments quickly. NASA's Technical Reports Server and NOAA's climate data portals offer primary government data for environmental and space topics.\n\nNo single database covers everything. A thorough search uses two or three tools, compares results, and records where each useful paper was found.",
      callouts: [
        {
          type: "tip",
          title: "Ask your librarian first",
          body: "School and public librarians know which databases your institution pays for—often including expensive resources you cannot access from a home Google search alone.",
        },
      ],
    },
    {
      title: "Search Strategies That Work",
      body: "Finding good sources is not luck—it is technique. Master a few strategies and you will spend less time drowning in irrelevant results.\n\nBoolean operators refine searches. AND narrows: \"sleep AND academic performance AND adolescents\" returns papers containing all terms. OR broadens: \"heart attack OR myocardial infarction\" captures different terminology. NOT excludes: \"jaguar NOT car\" removes automotive noise when searching for the animal. Use quotation marks for exact phrases: \"randomized controlled trial.\"\n\nCitation chaining follows references forward and backward. When you find one excellent paper, read its reference list (backward chaining) to locate foundational work. Then search Google Scholar for \"cited by\" that paper (forward chaining) to find newer studies that built on it. This snowball method often reveals the most important sources in a field faster than random keyword searches.\n\nReference mining applies the same idea systematically: download three highly cited review articles on your topic and merge their bibliographies. Deduplicate, then prioritize papers cited by all three.\n\nKeyword iteration improves results. Start broad, scan titles and abstracts, note recurring technical terms authors use, then search again with those precise terms. If \"social media addiction\" yields junk, try \"problematic social media use\" or \"social networking site compulsive use.\"\n\nKeep a search log: database, date, keywords, number of results, and which papers you saved. Reproducibility matters—even for your own literature review.",
    },
    {
      title: "Predatory Journals and Misinformation",
      body: "The open-access publishing boom created opportunities for fraud. Predatory journals mimic legitimate academic publishers but accept papers with little or no peer review in exchange for publication fees. They exist to profit, not to advance knowledge.\n\nWarning signs include unsolicited flattering emails inviting submission, promises of rapid publication within days, fake editorial boards listing researchers who never agreed to serve, missing or vague peer review descriptions, and journal names suspiciously similar to well-known titles (e.g., \"Journal of Advanced Science\" vs. established journals).\n\nCheck Think.Check.Submit (thinkchecksubmit.org) guidelines and consult lists maintained by academic librarians. If a journal appears on Beall's List successors or university warnings, avoid citing it unless you are explicitly studying predatory publishing itself.\n\nMisinformation spreads outside predatory journals too. Social media posts, influencer videos, and partisan websites often cherry-pick studies, confuse correlation with causation, or cite retracted papers without noting retraction. Retraction Watch (retractionwatch.com) tracks withdrawn papers—always verify that a cited study has not been retracted.\n\nConflicts of interest bias results. A nutrition study funded entirely by a candy manufacturer deserves skepticism. Legitimate papers disclose funding; read those disclosures. Industry influence does not automatically invalidate research, but it demands closer reading of methods and independent replication.",
    },
    {
      title: "Organizing Sources for Your Project",
      body: "Finding sources is half the battle; organizing them determines whether you can actually use them when writing. Start organizing from day one, not the night before your draft is due.\n\nUse a reference manager if possible—Zotero and Mendeley are free and integrate with browsers to save citations automatically. At minimum, maintain a spreadsheet with columns for author, year, title, source type (primary/secondary), key findings, limitations, and relevance to your question.\n\nTag sources by theme, not just by assignment. Labels like \"methodology comparison,\" \"local data,\" \"historical background,\" and \"contradicting evidence\" help when you outline later. A paper that seems marginally relevant in week two may become essential in week six.\n\nSave PDFs with consistent filenames: AuthorYear-ShortTitle.pdf. Back up to cloud storage. Lost sources waste hours.\n\nWrite annotated notes immediately after reading—not weeks later when memory fades. Two sentences on main findings and one on limitations per paper saves enormous time during synthesis.\n\nFinally, know when to stop searching. No literature review is exhaustive. When new searches keep returning papers you already have, and recent reviews cite the same core studies you found, you likely have sufficient coverage for a student project. Shift energy toward reading deeply and designing your contribution.",
    },
  ],
  vocabulary: [
    {
      term: "Primary source",
      definition:
        "Original material presenting firsthand data, research findings, or direct evidence—such as a journal article reporting new experimental results.",
    },
    {
      term: "Secondary source",
      definition:
        "Material that analyzes, interprets, or summarizes primary sources, such as review articles or scholarly books.",
    },
    {
      term: "Tertiary source",
      definition:
        "Compiled reference material like encyclopedias and textbooks that summarize secondary sources for overview purposes.",
    },
    {
      term: "Peer review",
      definition:
        "Independent expert evaluation of a manuscript before publication in a scholarly journal.",
    },
    {
      term: "Predatory journal",
      definition:
        "A publication that charges fees without providing legitimate editorial standards or genuine peer review.",
    },
    {
      term: "Preprint",
      definition:
        "A research paper shared publicly before formal peer review, common on servers like arXiv and bioRxiv.",
    },
    {
      term: "Citation chaining",
      definition:
        "Finding additional sources by tracing references in a paper (backward) or papers that cite it (forward).",
    },
    {
      term: "Boolean operators",
      definition:
        "Words like AND, OR, and NOT used in database searches to combine or exclude keywords.",
    },
    {
      term: "Retraction",
      definition:
        "Official withdrawal of a published paper because of errors, fraud, or irreproducible results.",
    },
    {
      term: "Conflict of interest",
      definition:
        "A situation where financial or personal interests could improperly influence research design, results, or interpretation.",
    },
  ],
  keyTakeaways: [
    "Primary sources provide original evidence; secondary and tertiary sources interpret or summarize it for context.",
    "Credibility depends on peer review, author expertise, publication venue, transparency, and recency—not on impressive websites.",
    "Academic databases like Google Scholar, PubMed, and discipline-specific repositories find higher-quality literature than general web search alone.",
    "Boolean operators and citation chaining are practical techniques for efficient, thorough literature searches.",
    "Predatory journals and misinformation require active detection—verify venues, funding disclosures, and retraction status.",
  ],
  commonMistakes: [
    "Citing Wikipedia or blog posts as primary evidence for specific research claims.",
    "Stopping after the first page of Google results without checking peer-reviewed alternatives.",
    "Assuming a source is credible because it uses scientific-sounding language or charts.",
    "Failing to track citations and notes, then being unable to locate sources during writing.",
  ],
  researchTips: [
    "For every source, write one sentence on why it is credible before adding it to your bibliography.",
    "Use \"cited by\" in Google Scholar on one landmark paper to map the most influential follow-up work.",
    "Check Retraction Watch or the journal site if a paper's findings seem too perfect or politically convenient.",
    "Save searches in databases you revisit often so you can re-run them when your topic evolves.",
  ],
  activity: {
    title: "Source Credibility Audit",
    objective:
      "Practice evaluating mixed-quality sources by applying credibility criteria and classifying source types.",
    instructions: [
      "Your instructor will provide (or you will locate) five sample sources on a shared topic such as sleep and academic performance.",
      "For each source, classify it as primary, secondary, or tertiary.",
      "Evaluate credibility using at least four criteria: peer review, author expertise, venue reputation, and transparency.",
      "Assign each source a credibility rating: High, Medium, Low, or Reject, with two sentences of justification.",
      "Identify at least one source you would cite in a research paper and one you would exclude, explaining why.",
      "Rewrite one weak claim from a low-credibility source using information from a stronger source you found via citation chaining.",
      "Submit your audit table and rewritten claim.",
    ],
    deliverable:
      "A one-page audit table covering all five sources plus a paragraph rewriting one claim with improved evidence.",
    timeEstimate: "50–65 minutes",
  },
  reflection: {
    prompt:
      "Describe one source you initially trusted—perhaps from social media, a news headline, or a quick Google search—but would now reject or downgrade after learning about source evaluation. What red flags did you miss?",
    guidelines: [
      "Describe the source specifically (type, where you found it, what it claimed).",
      "Explain which credibility criteria it failed (peer review, expertise, bias, recency, etc.).",
      "Identify what you would do differently now to verify similar claims.",
      "If possible, name a stronger alternative source you found on the same topic.",
    ],
    wordCount: "150–300 words",
    rubric: [
      "Clearly describes a real or realistic source and its original appeal",
      "Applies specific credibility criteria rather than vague distrust",
      "Demonstrates improved verification habits with a concrete alternative approach",
    ],
  },
  furtherReading: [
    {
      title: "The Information (James Gleick)",
      description:
        "A history of how information is stored, transmitted, and validated—from talking drums to the internet—providing context for modern source evaluation.",
    },
    {
      title: "Calling Bullshit (Bergstrom & West)",
      description:
        "A practical guide to detecting misinformation, misleading statistics, and pseudo-scientific claims in media and online sources.",
    },
    {
      title: "They Say / I Say (Graff & Birkenstein)",
      description:
        "Teaches how to enter academic conversations responsibly by accurately representing sources before responding to them.",
    },
  ],
};
