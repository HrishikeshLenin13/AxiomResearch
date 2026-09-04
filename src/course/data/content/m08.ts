import type { CourseModule } from "../module-types";

export const module08: CourseModule = {
  id: "module-8",
  number: 8,
  title: "Statistics for Beginners",
  summary:
    "Build intuition for descriptive statistics, distributions, correlation, and introductory inference so you can interpret data honestly and push back when numbers are misused in meetings or papers.",
  estimatedMinutes: 110,
  learningObjectives: [
    "Calculate and interpret mean, median, mode, and standard deviation",
    "Describe distribution shape and the impact of outliers",
    "Distinguish correlation from causation in research claims",
    "Explain p-values and confidence intervals at an introductory level",
    "Evaluate whether statistical results are practically meaningful",
  ],
  sections: [
    {
      title: "Why Statistics Matter in Research",
      body: "Data without analysis is noise. Statistics is the set of tools researchers use to summarize evidence, quantify uncertainty, and decide how much trust to place in patterns that might otherwise be coincidence. You do not need to become a professional statistician to conduct strong student research—but you do need to understand what common numbers mean and what they cannot say.\n\nConsider a simple classroom example. You test whether a five-minute breathing exercise lowers heart rate before presentations. You measure ten students before and after. Their average heart rate drops from 92 to 86 beats per minute. Is that a real effect or random fluctuation? Statistics helps you describe the drop, estimate how much variability existed across students, and judge whether a similar drop might appear by chance even if the exercise did nothing.\n\nStatistics also protects you from fooling yourself. Humans excel at spotting patterns—even when none exist. A few lucky coin flips feel like a \"hot hand.\" A week of sunny days during a festival feels like the ritual worked. Formal analysis slows impulsive conclusions and forces you to report uncertainty honestly.\n\nThis module covers foundations: descriptive statistics, distributions, correlation versus causation, and introductory inference. Advanced techniques—regression, ANOVA, Bayesian methods—build on these ideas. Master the basics first; they appear in nearly every paper you will read.",
      callouts: [
        {
          type: "did-you-know",
          title: "Statistics in the Apollo program",
          body: "NASA engineers used probability and statistical quality control to assess risks and reliability—decisions about redundant systems and test thresholds depended on quantifying uncertainty, not gut feeling alone.",
        },
      ],
    },
    {
      title: "Descriptive Statistics",
      body: "Descriptive statistics summarize datasets. The mean (average) adds all values and divides by count. It uses every data point but is sensitive to outliers—a single extremely high score can pull the mean upward. The median is the middle value when data are ordered; half the observations fall above and half below. Median resists outliers and often better represents \"typical\" income or housing prices in skewed distributions.\n\nThe mode is the most frequent value—useful for categorical data (most common survey response) but may not exist or may be uninformative for continuous measurements. Range (max minus min) gives spread but ignores everything in between. Variance and standard deviation quantify typical distance from the mean. Low standard deviation means points cluster tightly; high standard deviation means wide spread.\n\nAlways report descriptive stats appropriate to your data type. Means for skewed reaction times can mislead; medians may tell a truer story. Pair centers with spread: \"Mean quiz score was 78 (SD = 12)\" communicates both average and variability. Graphs complement numbers—histograms reveal shape that summaries hide.\n\nWhen comparing groups, describe each group separately before testing differences. \"Group A: M = 81, SD = 9; Group B: M = 74, SD = 14\" sets up meaningful comparison. Readers can see not only average differences but whether groups overlapped substantially.",
    },
    {
      title: "Distributions, Outliers, and Visual Thinking",
      body: "A distribution shows how often each value—or range of values—occurs. Many biological and psychological measurements approximate a bell-shaped normal distribution, but real data often skews: test scores bunch near the top, reaction times have a long tail of slow responses, income concentrates at lower ranges with a few high earners.\n\nShape matters for analysis choices. Strong skew or small samples may violate assumptions of tests that require approximate normality. Transformations (like taking logarithms) or non-parametric tests may help—consult a mentor when assumptions fail.\n\nOutliers are points far from the rest. They may be typos (heart rate recorded as 820), rare genuine events (a student who studied 10 hours nightly), or measurement errors. Never delete outliers silently. Investigate, document, and apply consistent rules decided before analysis when possible.\n\nVisualize before calculating. Scatterplots show relationships between two numeric variables. Box plots compare medians and spread across groups. Bar charts with error bars display means and uncertainty—but choose bar charts for counts or categories, not for every continuous outcome. Misleading axis scaling can exaggerate tiny differences; start axes at zero when appropriate and label units clearly.",
      callouts: [
        {
          type: "mistake",
          title: "The average trap",
          body: "Reporting only the mean without spread or graph shape hides important stories. If half your plants died and half thrived, the mean height might look \"average\" while no plant was actually typical.",
        },
      ],
    },
    {
      title: "Correlation vs. Causation",
      body: "Correlation measures how two variables move together, usually summarized by correlation coefficient r between -1 and +1. Values near +1 mean when one variable increases, the other tends to increase. Values near -1 mean inverse association. Values near zero mean little linear relationship.\n\nCorrelation does not imply causation. Ice cream sales and drowning incidents both rise in summer—heat drives both, not ice cream causing drowning. Strong correlations can reflect confounding, reverse causation, or coincidence. Observational studies especially require cautious language: \"associated with\" rather than \"causes.\"\n\nEstablishing causation typically requires controlled experiments, temporal order (cause precedes effect), plausible mechanism, and consistency across studies. Even experiments can mislead if poorly controlled. Media headlines routinely confuse correlation with causation; your research writing should not.\n\nWhen you report correlations, note sample size and context. r = 0.85 from three points is meaningless noise. r = 0.35 from 500 participants might be statistically detectable but practically modest—explaining only part of the variation. Always pair correlation with a scatterplot so nonlinear relationships are visible.",
    },
    {
      title: "Introduction to Inference",
      body: "Inference uses sample data to draw conclusions about a larger population while acknowledging uncertainty. You rarely measure everyone; you estimate parameters and ask how compatible data are with competing hypotheses.\n\nA p-value answers a specific question: If the null hypothesis were true and there were really no effect, how likely would we be to see data this extreme (or more) just by chance? Small p-values (often below 0.05 in many fields) suggest such data would be rare under the null, so we might reject H₀. A p-value is not the probability that H₀ is true, nor that your result is important.\n\nConfidence intervals provide a range of plausible values for a parameter, such as the mean difference between groups. A 95% confidence interval means that if we repeated the study many times, about 95% of calculated intervals would contain the true value. Wide intervals indicate imprecise estimates—common with small samples.\n\nStatistical significance is not the same as practical significance. A drug might shorten headache duration by six seconds with p < 0.001 in a huge trial—statistically detectable but irrelevant to patients. Conversely, meaningful effects in small studies may not reach significance. Report effect sizes (how big the difference is) alongside p-values and intervals.",
    },
    {
      title: "Interpreting and Communicating Results Responsibly",
      body: "Responsible reporting starts with transparency. Share your sample size, descriptive statistics, tests used, assumptions checked, and any data exclusions. Hide nothing that affects interpretation. Selective reporting—only mentioning outcomes that \"worked\"—damages trust and has contributed to reproducibility crises in science.\n\nUse plain language for non-expert audiences. Instead of \"We rejected the null at α = 0.05,\" write \"Students who used the study strategy scored higher on average; the difference was unlikely to occur by chance alone given our sample, though the effect was moderate and should be tested in larger groups.\" Translate numbers into meaning.\n\nAvoid common misinterpretations: do not say \"prove,\" do not treat p = 0.06 as totally different from p = 0.04 without context, and do not ignore confidence intervals. Acknowledge limitations—small samples, convenience recruitment, single measurement times—that constrain generalization.\n\nTools like Google Sheets, Excel, Python, R, or jamovi can compute statistics. Software does not replace thinking. Check that formulas reference correct cells, that units make sense, and that outputs answer your actual research question. When possible, verify one calculation by hand to build intuition.\n\nStatistics supports scientific judgment; it does not replace it. Combine numerical results with your design quality, prior literature, and real-world importance. That integration—not any single p-value—is what makes research credible.",
    },
  ],
  vocabulary: [
    {
      term: "Mean",
      definition:
        "The arithmetic average of a set of values, calculated by summing all observations and dividing by the count.",
    },
    {
      term: "Median",
      definition:
        "The middle value of an ordered dataset; half the observations fall above and half below.",
    },
    {
      term: "Standard deviation",
      definition:
        "A measure of how spread out values are around the mean; larger values indicate greater variability.",
    },
    {
      term: "Distribution",
      definition:
        "The pattern showing how frequently different values occur in a dataset.",
    },
    {
      term: "Outlier",
      definition:
        "An observation that lies far from the bulk of the data and may reflect error, rarity, or special circumstances.",
    },
    {
      term: "Correlation",
      definition:
        "A statistical relationship describing how two variables tend to change together, not necessarily causally.",
    },
    {
      term: "p-value",
      definition:
        "The probability of obtaining results at least as extreme as those observed, assuming the null hypothesis is true.",
    },
    {
      term: "Confidence interval",
      definition:
        "A range of values that estimates a population parameter with a specified level of confidence.",
    },
    {
      term: "Statistical significance",
      definition:
        "A result unlikely under the null hypothesis at a chosen threshold; distinct from practical importance.",
    },
    {
      term: "Effect size",
      definition:
        "A measure of the magnitude of a difference or relationship, independent of sample size.",
    },
  ],
  keyTakeaways: [
    "Descriptive statistics summarize data; always report spread and visualize shape, not just averages.",
    "Correlation describes association; causation requires strong design, controls, and often experiments.",
    "p-values and confidence intervals quantify uncertainty—they do not prove hypotheses or guarantee importance.",
    "Outliers and skewed distributions can invalidate naive analysis; investigate before you calculate.",
    "Transparent reporting of methods, exclusions, and limitations is as important as the numbers themselves.",
  ],
  commonMistakes: [
    "Equating statistical significance with large or meaningful real-world effects.",
    "Using the mean alone on skewed data or data with extreme outliers without comment.",
    "Claiming causation from correlational surveys or uncontrolled comparisons.",
    "Treating p = 0.05 as a magical boundary that makes results \"true\" or \"false.\"",
  ],
  researchTips: [
    "Make histograms or scatterplots before running tests—your eyes catch problems formulas miss.",
    "Report descriptive stats for each group separately in a small table in your results section.",
    "When sample size is small, focus on effect sizes and confidence interval width, not p-values alone.",
    "Keep a statistics decision log: which test you chose, why, and what assumptions you checked.",
  ],
  activity: {
    title: "Dataset Analysis in Google Sheets",
    objective:
      "Analyze a provided dataset using descriptive statistics and one appropriate comparison or correlation, then report three evidence-based findings.",
    instructions: [
      "Open the instructor-provided dataset (or collect a small approved dataset from your project pilot).",
      "Create summary tables for mean, median, standard deviation, and sample size for each relevant group or variable.",
      "Build at least two charts (histogram, box plot, scatterplot, or bar chart) that reveal distribution or relationships.",
      "Identify and document any outliers; explain whether you retained, corrected, or excluded them and why.",
      "Run one appropriate test or correlation (e.g., compare two group means or compute r between two variables) using Sheets formulas or approved add-ons.",
      "Write three bullet findings: each must include a statistic, plain-language interpretation, and one limitation.",
      "Peer-review a partner's analysis and check whether their conclusions exceed what the data support.",
    ],
    deliverable:
      "A shared spreadsheet with tables and charts plus a half-page findings summary (200–250 words).",
    timeEstimate: "75–90 minutes",
  },
  reflection: {
    prompt:
      "Choose one statistic from your dataset analysis and explain it in plain language for a classmate who has not taken this course. What does it say about your research question, and what caution would you add?",
    guidelines: [
      "Define the statistic conceptually before giving your numeric result.",
      "Connect the number to your research question or hypothesis—not just to the spreadsheet.",
      "Include one limitation such as sample size, measurement error, or correlational design.",
      "Avoid jargon like \"reject the null\" without translation.",
    ],
    wordCount: "150–300 words",
    rubric: [
      "Explanation is accurate and understandable to a non-specialist reader.",
      "Response balances what the evidence suggests with appropriate uncertainty.",
      "Cautionary note identifies a specific weakness, not a generic disclaimer.",
    ],
  },
  furtherReading: [
    {
      title: "Statistics Done Wrong (Reinhart)",
      description:
        "Short, readable catalog of common statistical errors in published research—excellent for building critical reading skills.",
    },
    {
      title: "Naked Statistics (Wheelan)",
      description:
        "Accessible tour of core statistical ideas with everyday examples suited to motivated high school students.",
    },
    {
      title: "Interpreting the Confidence Interval (Cumming)",
      description:
        "Explains why effect sizes and intervals often communicate more than p-values alone.",
    },
  ],
};
