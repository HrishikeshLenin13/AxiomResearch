import { COURSE_MODULE_META } from "../course/data/module-meta";

export const AXIOM_APPLICATION_URL = "https://tally.so/r/gDJLWP";

export const PUBLIC_PROGRAMS = [
  {
    id: "research-foundations",
    title: "Research Foundations",
    status: "Self-paced course",
    summary: `${COURSE_MODULE_META.length} self-paced units on sources, study design, and writing.`,
    description:
      "Start here if you’re new to academic research. Learn to read papers, narrow a research question, choose a method, interpret results, and write about what your evidence supports.",
    access:
      "The syllabus is public. To take the lessons and assessments, you need an Axiom volunteer access code.",
    action: "See the syllabus and access details",
    to: "/course",
  },
  {
    id: "mentored-research",
    title: "Mentored Research",
    status: "Application-based",
    summary: "Develop an original research project with guidance if accepted and matched.",
    description:
      "For students who want to take a focused question further. A mentor can help refine the question, review the study plan, and give feedback on the project.",
    access:
      "Ask Axiom about current openings and requirements. Applying does not guarantee a mentor match.",
    action: "Ask about mentorship",
    to: "/contact",
  },
  {
    id: "collaborative-research",
    title: "Collaborative Research Teams",
    status: "Peer-led",
    summary: "Work with other students on a question, share the research, and review drafts.",
    description:
      "Student teams can divide tasks such as reviewing sources, collecting evidence, and drafting a paper. Internal peer review gives the team a chance to improve its methods and writing.",
    access: "Ask Axiom whether a team is accepting new members or how to propose a project.",
    action: "Ask about joining a team",
    to: "/contact",
  },
  {
    id: "open-research-database",
    title: "Open Research Database",
    status: "In development",
    summary: "A planned free archive for reviewed student papers. No papers are listed yet.",
    description:
      "Axiom is building a searchable archive so readers can find and learn from student research. Papers will be listed only after submission, review, and approval.",
    access: "The archive is not open yet. Contact Axiom before preparing a submission for it.",
    action: "Read about the research archive",
    to: "/research",
  },
] as const;
