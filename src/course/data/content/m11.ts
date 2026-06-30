import type { CourseModule } from "../module-types";

export const module11: CourseModule = {
  id: "module-11",
  number: 11,
  title: "Publishing and Presenting Research",
  summary:
    "Learn to share research through science fairs, posters, slide talks, student journals, and online portfolios—without treating presentation as an afterthought.",
  estimatedMinutes: 90,
  learningObjectives: [
    "Identify appropriate venues for sharing student research at different stages of a project",
    "Design research posters with clear visual hierarchy and concise scientific storytelling",
    "Build slide presentations suited to oral Q&A sessions at fairs and conferences",
    "Recognize student-friendly publication options and basic submission expectations",
    "Assemble a research portfolio that documents growth, methods, and outcomes over time",
  ],
  sections: [
    {
      title: "Why Sharing Research Matters",
      body:
        "Research that never leaves your notebook helps only you. Sharing work invites feedback, strengthens scientific communities, and teaches you to communicate under scrutiny. Presentation is not a separate skill from research—it is the final test of whether you truly understand what you did and why it matters. When you explain your project to a judge, teacher, or peer, gaps in your logic become visible immediately.\n\nDifferent audiences need different formats. A classroom poster session rewards walk-up clarity: someone should grasp your question and main finding in ninety seconds. A student journal expects a written paper with formal citations. A regional science fair may combine a poster, a short oral explanation, and live questions. Choosing the right venue early helps you plan timelines, permissions, and documentation.\n\nSharing also builds your reputation as a young researcher. Colleges, mentors, and collaborators notice students who can describe methods accurately and discuss limitations honestly. A portfolio that shows multiple projects over time demonstrates persistence better than a single polished slide deck ever could.\n\nFinally, public presentation reinforces ethics. When you stand beside your poster, you represent your data truthfully. You credit collaborators, acknowledge funding or school resources, and do not overstate conclusions. These habits define professional research culture.\n\nStart planning your presentation when you finalize your research question—not when the fair deadline appears on the calendar. Early planning gives time for printing, permissions, mentor review, and rehearsal.",
      callouts: [
        {
          type: "did-you-know",
          title: "Posters predated PowerPoint",
          body:
            "Academic conference poster sessions have been standard for decades. They allow dozens of researchers to share work simultaneously and encourage one-on-one conversation—skills that transfer directly to science fairs and symposia.",
        },
      ],
    },
    {
      title: "Science Fairs and Student Conferences",
      body:
        "Science fairs—from school-level exhibitions to regional and international competitions—evaluate research on question quality, methodology, analysis, presentation, and often an interview. Judges rarely read your full lab notebook during the event. They read your poster, listen to your explanation, and ask questions. That means you must prioritize clarity and verbal readiness over exhaustive detail on the board.\n\nBefore registering, read rubrics carefully. Some fairs emphasize originality; others weight statistical rigor or real-world application. Align your abstract and display with stated criteria. Confirm IRB or safety requirements if you worked with human subjects, animals, or hazardous materials. Missing approvals can disqualify otherwise strong projects.\n\nStudent conferences and symposia—often hosted by universities—may feel less competitive than fairs but still require professional behavior. Arrive early, dress appropriately for the venue, and practice a two-minute overview plus a five-minute expanded version. Prepare for questions you hope no one asks: What would you do differently? What are your limitations? How does your work relate to published studies?\n\nTreat every interaction as practice for future academic careers. Collect business cards or contact information from judges who offer mentorship. Send a brief thank-you email mentioning one piece of advice you applied. Networking is part of presenting research.\n\nBring a lab notebook or digital backup to the fair. If a judge asks about a specific trial date or outlier, you should answer from records—not from memory alone.",
    },
    {
      title: "Designing an Effective Research Poster",
      body:
        "A research poster is a large-format summary, typically read from four to six feet away. Standard sizes vary; ask your teacher before printing. Layout follows a natural reading path—often columns left to right, top to bottom—with clear section headings: Title and Authors, Introduction, Methods, Results, Conclusions, References, Acknowledgments.\n\nThe title should state the finding or question, not a vague label like \"Plant Project.\" Strong title: \"Increased Light Exposure Raises Germination Rate in Phaseolus vulgaris Under Classroom Conditions.\" Include your name, school, and mentor affiliations.\n\nVisual hierarchy guides the eye. Use one main result figure near the center or upper right—where many readers look first. Supporting figures should be smaller. Text blocks should be short: bullet points beat dense paragraphs. Aim for about 800 words total on the poster; if you need more detail, prepare a handout or QR code linking to your portfolio.\n\nFonts should be readable: at least 72 pt for the title, 36 pt for section headers, and 24 pt for body text minimum. High-contrast colors (dark text on light background) work best. Avoid glossy paper that creates glare under bright fair lighting. Print a small test page before committing to full size.\n\nPractice your poster talk without reading from the board. Point to figures as you explain. End with limitations and next steps—judges notice when students understand what they do not yet know.",
      callouts: [
        {
          type: "tip",
          title: "The 90-second walk-up",
          body:
            "Rehearse a ninety-second explanation for someone who approaches cold. If they stay interested, offer the five-minute version. Posters fail when students assume judges will read every word silently.",
        },
      ],
    },
    {
      title: "Slide Presentations for Oral Sessions",
      body:
        "Slides support spoken presentations at fairs, class defenses, and conference sessions—they are not standalone documents. One slide equals roughly one minute of talking. A ten-minute talk rarely needs more than ten to twelve slides plus a title slide. Your audience listens to you; slides should show evidence, not duplicate your script word for word.\n\nStructure mirrors your paper: title, motivation, question, methods (brief), key results (figures emphasized), conclusion, limitations, acknowledgments. Methods slides often include a photo of setup or a flowchart rather than a paragraph of text. Results slides should feature one main figure each with a clear takeaway in the title—for example, \"Training Reduced Mean Reaction Time by 12 Percent\" instead of \"Results.\"\n\nDesign principles overlap with posters: large fonts, minimal text, honest graphs, consistent colors. Avoid animations unless they clarify a process step. Never paste screenshots of entire tables; highlight the rows that matter. Include slide numbers for questions.\n\nPrepare for Q&A separately from slides. Anticipate questions about sample size, controls, alternative explanations, and ethics. If you do not know an answer, say so and describe how you would find out— that response often impresses judges more than a bluff.\n\nNote: this module focuses on live slide-based talks and poster sessions, not pre-recorded video submissions. Some competitions offer optional video categories, but mastering in-person explanation builds skills that transfer to any format.",
    },
    {
      title: "Student Publication Venues",
      body:
        "Publishing a paper is slower than presenting a poster but creates a citable record of your work. Student-focused journals—such as the Journal of Emerging Investigators, Curieux Academic Journal, or discipline-specific youth outlets—peer-review submissions with age-appropriate expectations. Read author guidelines before drafting; formatting mismatches cause unnecessary rejections.\n\nPreprint servers like arXiv accept some categories of work with parent or mentor sponsorship for minors; policies change, so verify current rules. School research bulletins or district journals offer lower-stakes first publication experience. Conference proceedings from student symposia may publish short abstracts or full papers.\n\nSubmission typically requires a cover letter, abstract, main text, figures, references, and sometimes a statement of author contributions. Respond professionally to reviewer comments if you receive a revise-and-resubmit decision. Rejection is common even for strong projects; treat feedback as direction for improvement.\n\nNever submit the same manuscript to multiple journals simultaneously unless venues explicitly allow it. Always disclose conflicts of interest and funding. If a mentor co-authors, discuss order and responsibilities early. Publication ethics apply to students exactly as they apply to professional scientists.",
    },
    {
      title: "Building a Research Portfolio",
      body:
        "A research portfolio documents your work beyond a single fair season. It can live on a personal website, GitHub Pages, Notion, or a structured PDF binder. Include project titles, dates, abstracts, posters, slide decks, papers, code repositories, datasets (when shareable), awards, and reflection essays on what you learned.\n\nOrganize by project or chronologically. Each entry should answer: What question did I ask? What did I do? What did I find? What would I do next? Link to external publications or news coverage when available. Use consistent file naming so materials stay findable years later.\n\nGitHub suits computational projects: store analysis scripts, README files explaining how to reproduce figures, and tagged releases for fair submissions. LinkedIn or a simple bio page can summarize your research interests for mentors and programs. Privacy matters—do not post human subjects data or proprietary information without permission.\n\nUpdate the portfolio after every milestone, not only at project end. Future you will need old posters for college applications, scholarship essays, and internship interviews. A portfolio turns scattered files into evidence of sustained inquiry.\n\nPresenting and publishing are cycles, not finish lines. Each venue teaches something new about audience, format, and rigor. Start local—class showcase, school fair—then expand as your project matures.",
    },
  ],
  vocabulary: [
    {
      term: "Poster session",
      definition:
        "An event where researchers display large-format summaries and discuss their work with attendees in person.",
    },
    {
      term: "Visual hierarchy",
      definition:
        "Arrangement of text and graphics so the most important information is seen first.",
    },
    {
      term: "Abstract (conference)",
      definition:
        "Short summary submitted for consideration in a fair or symposium program; often 150–300 words.",
    },
    {
      term: "Peer review",
      definition:
        "Evaluation of a manuscript by independent experts before publication.",
    },
    {
      term: "Preprint",
      definition:
        "A research paper shared publicly before formal peer review, common in some STEM fields.",
    },
    {
      term: "Rubrics",
      definition:
        "Scoring guides listing criteria judges or teachers use to evaluate projects.",
    },
    {
      term: "Q&A session",
      definition:
        "Period after a presentation when the audience asks clarifying or critical questions.",
    },
    {
      term: "Author contributions",
      definition:
        "Statement describing who designed the study, collected data, analyzed results, and wrote the paper.",
    },
    {
      term: "Handout",
      definition:
        "Supplementary one-page document with extra detail, citations, or contact information for poster viewers.",
    },
    {
      term: "Portfolio",
      definition:
        "Curated collection of research outputs demonstrating skills, progress, and outcomes over time.",
    },
  ],
  keyTakeaways: [
    "Sharing research through fairs, posters, and publications completes the scientific process and exposes gaps in understanding.",
    "Posters and slides require different design rules but share a need for visual hierarchy, honest figures, and concise language.",
    "Science fair success depends on rubric alignment, ethical approvals, and practiced verbal explanation—not display size alone.",
    "Student journals and symposia offer pathways to citable publication when projects meet venue-specific standards.",
    "A maintained portfolio preserves posters, papers, and code as evidence of long-term research growth.",
  ],
  commonMistakes: [
    "Cramming entire lab notebooks onto posters or slides instead of highlighting one clear narrative.",
    "Designing for print the night before without checking dimensions, font size, or school printing deadlines.",
    "Overstating conclusions during oral Q&A because of nervousness or competitive pressure.",
    "Submitting to journals without reading formatting guidelines or obtaining mentor approval on authorship.",
  ],
  researchTips: [
    "Photograph your poster and booth at the fair; images strengthen future portfolio and application materials.",
    "Rehearse answers to limitation questions with a mentor before the event.",
    "Use QR codes on posters linking to a portfolio page with data tables judges can explore later.",
    "Keep a master slide deck template with your school colors and accessible fonts for reuse across projects.",
  ],
  activity: {
    title: "Draft a One-Page Poster Outline",
    objective:
      "Plan a research poster layout with section headings, bullet content, and figure placement before full graphic design.",
    instructions: [
      "Choose your capstone or current research topic and write a working title that includes the organism, system, or population studied.",
      "Divide one letter-sized page into six labeled blocks matching standard poster sections: Title/Authors, Introduction, Methods, Results, Conclusions, References.",
      "Write no more than three bullet points per block; each bullet should be a phrase, not a full paragraph.",
      "Sketch (on paper or digitally) where one main figure and one supporting figure will go and note what each will show.",
      "Add a box for Acknowledgments listing mentors, institutions, and funding or equipment sources.",
      "Share your outline with a peer and ask them to identify the main finding in under thirty seconds; revise if they cannot.",
      "List three questions you expect judges to ask and draft brief answer bullets beneath your outline.",
    ],
    deliverable:
      "A one-page poster outline with section bullets, figure placement notes, and a short anticipated Q&A list.",
    timeEstimate: "50–65 minutes",
  },
  reflection: {
    prompt:
      "Where would you first share your finished research project—a school fair, regional competition, student journal, class symposium, or online portfolio—and why? Describe what format (poster, slides, written paper) you would prioritize at that venue.",
    guidelines: [
      "Name a specific venue or audience rather than a vague goal like \"everyone.\"",
      "Explain how your project's stage (early, mid, complete) fits that venue's expectations.",
      "Identify the primary format and one design or communication priority for that format.",
      "Note one step you must complete before sharing (approval, printing, submission deadline, etc.).",
    ],
    wordCount: "200–350 words",
    rubric: [
      "Chooses a realistic venue aligned with project maturity and access.",
      "Connects format choice to audience needs and evaluation style.",
      "Demonstrates awareness of practical requirements such as timelines or approvals.",
      "Writing reflects the student's own project rather than generic presentation advice.",
    ],
  },
  furtherReading: [
    {
      title: "How to Design an Award-Winning Scientific Poster (Purrington)",
      description:
        "Practical advice on layout, fonts, and common poster mistakes with before-and-after examples.",
    },
    {
      title: "Journal of Emerging Investigators — Author Guidelines",
      description:
        "Representative student-journal expectations for manuscripts, figures, and submission ethics.",
    },
    {
      title: "Science Buddies: Science Fair Project Display Board Guide",
      description:
        "Accessible introduction to tri-fold and flat poster conventions for school and regional fairs.",
    },
  ],
};
