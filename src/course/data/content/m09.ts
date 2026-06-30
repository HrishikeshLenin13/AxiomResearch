import type { CourseModule } from "../module-types";

export const module09: CourseModule = {
  id: "module-9",
  number: 9,
  title: "Data Visualization",
  summary:
    "Learn to create clear, honest charts and figures that communicate research findings effectively to scientists and general audiences.",
  estimatedMinutes: 95,
  learningObjectives: [
    "Explain why visualization is a core research skill, not a cosmetic afterthought",
    "Select chart types that match the question your data answers",
    "Apply design principles that prevent misleading or confusing graphics",
    "Create accessible figures with labels, color, and layout that work for all readers",
    "Evaluate published figures critically and revise your own drafts toward publication quality",
  ],
  sections: [
    {
      title: "Why Data Visualization Matters in Research",
      body:
        "Every research project eventually produces numbers, categories, relationships, or patterns that need to be understood. Raw tables of data are rarely enough. A well-designed figure can reveal a trend in seconds that might take a reader ten minutes to extract from a spreadsheet. Visualization is not decoration added at the end of a project—it is a form of analysis. When you plot your data, you often notice outliers, gaps, or unexpected clusters that change how you interpret your results.\n\nScientists use figures because research communication depends on clarity and trust. A journal article, poster, or fair presentation will be judged partly on whether your graphics support your claims honestly. Judges and reviewers do not expect artistic masterpieces; they expect figures that are accurate, labeled, and easy to read from a normal viewing distance. For high school researchers, strong visualization signals maturity: you are thinking about your audience, not just your own understanding.\n\nThere is also a practical reason to care early. Many students collect data throughout a semester and only think about charts the night before a deadline. That leads to rushed, confusing graphics. If you sketch possible figures while designing your study, you clarify what you need to measure and how many data points you require. Visualization forces you to ask: What comparison am I trying to show? What would convince a skeptical reader?\n\nDifferent audiences read the same figure differently. A judge at a science fair may spend ninety seconds at your poster; a journal reviewer may zoom in on axis labels and sample sizes. Designing for your actual audience—not only for yourself—helps you choose chart types, font sizes, and caption wording before you print or submit.\n\nFinally, visualization connects quantitative and qualitative research. A bar chart of survey responses and a thematic diagram of interview codes are both visual arguments. The medium differs, but the goal is the same: translate evidence into a form another person can evaluate. Mastering this skill will serve you in every STEM field, in social science, and in any career that involves presenting evidence.",
      callouts: [
        {
          type: "did-you-know",
          title: "The chart that changed public health",
          body:
            "John Snow's 1854 map of cholera deaths in London did not use modern software, but it was a powerful visualization. By plotting cases on a street map, he showed that outbreaks clustered around a contaminated water pump—evidence that helped overturn the miasma theory of disease.",
        },
      ],
    },
    {
      title: "Principles of Honest Visual Communication",
      body:
        "The most important rule in research visualization is honesty. A figure should never exaggerate, hide, or distort what the data actually show. One common form of dishonesty is manipulating the axis. If a bar chart measures values from 95 to 100 but the y-axis starts at zero, the bars look dramatically different when the real difference is small. Truncated axes are not always wrong—line charts tracking small changes sometimes start above zero for readability—but you must label them clearly and avoid implying a false magnitude.\n\nAnother problem is cherry-picking. Showing only the time range where your hypothesis looks correct, while hiding the full dataset, misleads readers. Always ask whether your figure represents the complete relevant data. If you exclude outliers, state why in the caption or methods section. Transparency builds credibility.\n\nChartjunk is clutter that looks impressive but adds no information: heavy 3D effects, unnecessary gridlines, decorative icons, or rainbow color schemes that confuse rather than clarify. Edward Tufte, a pioneer in data visualization, argued that ink should show data. Every visual element should earn its place. When in doubt, simplify.\n\nLabels are non-negotiable. Axes need names and units. Bars, lines, and points need a legend if their meaning is not obvious. The figure caption should stand alone: a reader skimming your poster should understand the main message without reading your entire paper. Honest, labeled, simple figures outperform flashy ones in every research setting.\n\nDual y-axes—two vertical scales on one chart—can imply relationships that do not exist. If you compare variables with different units, side-by-side panels or normalized scales explained in the caption are usually safer. When you encounter dual-axis charts in news articles, ask whether the visual link reflects real data or design choices.",
    },
    {
      title: "Choosing the Right Chart Type",
      body:
        "Different questions require different chart types. Before opening any software, write one sentence: \"I want to show ___ .\" That sentence guides your choice. If you want to compare amounts across categories—such as average test scores for three teaching methods—a bar chart is usually appropriate. If you want to show change over time, such as plant height measured weekly, a line chart works well. If you want to show the distribution of a single variable, such as reaction times from fifty trials, a histogram displays how often each range of values occurs.\n\nScatterplots reveal relationships between two continuous variables. For example, hours studied versus exam score: each point is one student, and a pattern may suggest correlation. Be careful not to imply causation from a scatterplot alone. Box plots summarize distributions and compare groups while showing median, spread, and outliers—useful when your data are skewed or contain extreme values.\n\nPie charts are popular but often misused. They work only when you have a few categories that sum to a meaningful whole, such as the proportion of survey respondents choosing each option. If you have more than five slices or want precise comparisons, a bar chart is clearer. Stacked bar charts can show composition, but stacked area charts make comparison difficult—avoid them unless you have a strong reason.\n\nWhen presenting uncertainty, include error bars, confidence intervals, or shaded regions that represent variability. Never plot only averages without showing how much your data varied. Choosing the right chart is a sign that you understand your own analysis, not just your software.\n\nHeatmaps and maps appear in environmental and epidemiology projects. They work when location or intensity is part of the argument. Always include a color key, define what each region or cell represents, and avoid projections or bin sizes that hide important detail.",
      callouts: [
        {
          type: "tip",
          title: "The one-sentence chart test",
          body:
            "Before finalizing any figure, say aloud: \"This chart shows [variable] across/for [groups/time].\" If you cannot complete the sentence clearly, the chart type or labels need revision.",
        },
      ],
    },
    {
      title: "Design for Clarity and Accessibility",
      body:
        "Good design serves every reader, including people with color-vision deficiency or low vision. About eight percent of men and a smaller percentage of women have some form of color blindness. If your chart uses only red and green to distinguish groups, many viewers cannot tell them apart. Use color plus another cue: different shapes, line styles, patterns, or direct labels on the chart. Tools like ColorBrewer and online simulators help you test palettes.\n\nFont size matters on posters and slides. Text that looks fine on your laptop may be unreadable from six feet away. Titles, axis labels, and legends should be large enough for your intended viewing distance. Avoid cramming too many panels into one figure. If you need four comparisons, consider four simple charts arranged cleanly rather than one overcrowded grid.\n\nConsistency helps readers learn your visual language quickly. If blue circles always mean the control group in one figure, do not switch to red squares in the next without reason. Use the same units throughout a project. Convert everything to the same scale before comparing across figures.\n\nAccessibility also means writing captions that describe the takeaway, not just the mechanics. Weak caption: \"Figure 2. Bar chart of results.\" Strong caption: \"Figure 2. Mean germination rate was highest under 12-hour light exposure (n = 30 seeds per condition; error bars = standard error).\" The strong version tells readers what to notice and how the data were collected.",
    },
    {
      title: "Tools and a Practical Workflow",
      body:
        "You do not need expensive software to make excellent research figures. Google Sheets and Microsoft Excel handle bar charts, line charts, scatterplots, and histograms for most student projects. Python libraries such as Matplotlib and Seaborn, and R packages like ggplot2, offer more control and reproducibility—every change is saved in code, which is valuable if you need to update figures after collecting more data. Canva and BioRender can help with diagrams and infographics, but always prioritize accuracy over aesthetics.\n\nA reliable workflow saves time. First, clean your data: fix typos, decide how to handle missing values, and document any transformations. Second, explore with quick draft charts—do not polish yet. Third, choose your final chart types based on the questions you are answering. Fourth, apply design rules: labels, units, readable fonts, honest axes. Fifth, export at high resolution (300 dpi or higher for print posters; PNG or SVG for slides). Sixth, ask a peer who did not work on the project to interpret the figure without your explanation. If they struggle, revise.\n\nKeep a \"figure log\" in your lab notebook or research journal: filename, data source, software used, date created, and version notes. When a teacher asks you to explain a graph months later, you will be grateful you documented your steps. Reproducibility applies to visualization as much as to experiments.\n\nIf you code figures in Python or R, save the script with the exported image and note which spreadsheet rows feed each series. Months later, when a mentor asks for a revision, you will update one file instead of rebuilding from memory.",
    },
    {
      title: "From Draft Figure to Publication Quality",
      body:
        "Publication-quality figures share several traits. They have a clear visual hierarchy: the most important comparison is obvious within three seconds. They use restrained color—often two or three hues plus gray. They include sample sizes, units, and definitions of error bars in the caption or on the figure itself. They avoid distortion and unnecessary decoration. They match the style guidelines of the venue where you will present, whether that is a school science fair, a student journal, or a conference poster session.\n\nCritique figures you see in the wild. News articles and social media posts often use misleading charts. Practice identifying truncated axes, missing baselines, and correlation presented as causation. Then apply the same critical eye to your work. Before submitting a poster or paper, run through a checklist: Are axes labeled with units? Is the chart type appropriate? Does the caption state the main finding? Would someone color-blind understand the groups? Is the resolution high enough for printing?\n\nRevision separates good student work from exceptional work. Your first chart is a draft. Take feedback from mentors, classmates, and teachers seriously. Often the best improvement is removing elements rather than adding them. A single clear figure that supports one claim is more powerful than a busy dashboard that tries to say everything at once.\n\nData visualization is a skill you build project by project. Start simple, stay honest, and treat every figure as part of your scientific argument. When your charts are clear and trustworthy, your research becomes easier to share, easier to defend, and easier for others to build upon.",
    },
  ],
  vocabulary: [
    {
      term: "Axis truncation",
      definition:
        "Starting a chart axis above zero (or below a natural baseline) in a way that can exaggerate visual differences; acceptable only when clearly labeled and justified.",
    },
    {
      term: "Chartjunk",
      definition:
        "Decorative or redundant visual elements that do not convey data and may distract or mislead the reader.",
    },
    {
      term: "Histogram",
      definition:
        "A chart showing the frequency of values within consecutive ranges (bins) for a single numeric variable.",
    },
    {
      term: "Scatterplot",
      definition:
        "A graph displaying individual data points by two numeric variables to reveal patterns, clusters, or correlations.",
    },
    {
      term: "Error bar",
      definition:
        "A line extending from a plotted value indicating uncertainty, such as standard error or confidence interval.",
    },
    {
      term: "Legend",
      definition:
        "A key explaining what colors, symbols, or line styles represent in a figure.",
    },
    {
      term: "Caption",
      definition:
        "Text accompanying a figure that describes what is shown, how it was produced, and the main takeaway.",
    },
    {
      term: "Reproducibility",
      definition:
        "The ability to recreate a figure or analysis from saved data, code, and documented steps.",
    },
    {
      term: "Color-vision deficiency",
      definition:
        "Reduced ability to distinguish certain colors; important consideration when choosing figure palettes.",
    },
    {
      term: "Visual hierarchy",
      definition:
        "Arrangement of elements so the most important information draws the reader's attention first.",
    },
  ],
  keyTakeaways: [
    "Visualization is a form of analysis that reveals patterns and supports honest communication of evidence.",
    "Choose chart types based on the question you are answering, not on what looks most impressive.",
    "Honest axes, complete data, clear labels, and simple design build trust with scientific audiences.",
    "Accessible figures use more than color alone and remain readable at the intended viewing distance.",
    "A repeatable workflow—clean data, draft, refine, peer-test, export—produces stronger figures under deadline pressure.",
  ],
  commonMistakes: [
    "Using pie charts or 3D effects when simpler bar or line charts would communicate more clearly.",
    "Forgetting units, sample sizes, or error bars, leaving readers unable to judge significance or variability.",
    "Designing figures at the last minute without checking whether the chart type matches the research question.",
    "Assuming readers will understand color coding without a legend or direct labels on the chart.",
  ],
  researchTips: [
    "Sketch your expected figures when planning data collection so you know what measurements you need.",
    "Ask someone unfamiliar with your project to interpret each figure; confusion highlights needed fixes.",
    "Save both your raw data file and your chart source file so you can update figures after new data arrive.",
    "Study figures in published papers in your field and note conventions for captions, error bars, and layout.",
  ],
  activity: {
    title: "Redesign a Misleading Chart",
    objective:
      "Identify deceptive design choices in a flawed figure and produce an honest, clearly labeled replacement that communicates the same dataset accurately.",
    instructions: [
      "Find or use a provided example of a misleading chart from news media, social media, or a textbook (truncated axis, cherry-picked range, wrong chart type, or missing labels).",
      "Write a short paragraph identifying at least three specific problems with the original figure and how each problem could mislead a reader.",
      "Obtain or reconstruct the underlying data (approximate values from the chart if necessary, and note this limitation).",
      "Choose an appropriate chart type for the research question the data should answer and justify your choice in one or two sentences.",
      "Create the redesigned figure in Google Sheets, Excel, or another tool. Include axis labels with units, a descriptive title, a legend if needed, and a complete caption.",
      "Add error bars or a note about variability if the data represent averages or summaries.",
      "Compare the original and redesigned versions side by side and write three sentences explaining how the honest version changes the message.",
    ],
    deliverable:
      "A one-page document containing the original chart (or screenshot), your critique, the redesigned figure with caption, and a brief comparison paragraph.",
    timeEstimate: "60–75 minutes",
  },
  reflection: {
    prompt:
      "Which chart type best fits the data you are collecting (or expect to collect) in your own research project, and why? Describe one figure you plan to include in your final presentation and how you will ensure it is honest and accessible.",
    guidelines: [
      "Name the variables you will plot and whether they are categorical, continuous, or time-based.",
      "State your chosen chart type and connect it to the specific comparison or pattern you want to show.",
      "Identify one design choice you will prioritize (labels, color accessibility, error bars, or sample size notation).",
      "Acknowledge one limitation of your planned figure and how you will address it in text or caption.",
    ],
    wordCount: "200–350 words",
    rubric: [
      "Chart type is appropriate for the data and research question described.",
      "Reasoning connects visualization choices to scientific communication goals.",
      "At least one honesty or accessibility consideration is addressed concretely.",
      "Writing is specific to the student's project rather than generic advice.",
    ],
  },
  furtherReading: [
    {
      title: "Fundamentals of Data Visualization (Wilke)",
      description:
        "A free online book covering chart selection, color, uncertainty, and common pitfalls with clear examples for beginners.",
    },
    {
      title: "The Visual Display of Quantitative Information (Tufte)",
      description:
        "A classic text on clarity and integrity in charts; especially useful for understanding chartjunk and axis design.",
    },
    {
      title: "ColorBrewer 2.0",
      description:
        "An online tool for choosing color palettes that remain distinguishable for color-vision-deficient readers and work in print.",
    },
  ],
};
