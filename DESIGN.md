---
name: Axiom
description: A student research nonprofit and a focused learning workspace.
colors:
  paper: "#ffffff"
  field: "#f5f6f8"
  ink: "#17202d"
  secondary-ink: "#535e6d"
  action: "#1557ad"
  action-hover: "#124686"
  action-field: "#edf3fb"
  navy: "#162338"
  line: "#e1e5eb"
typography:
  display:
    fontFamily: "Aptos, Helvetica Neue, system-ui, sans-serif"
    fontSize: "clamp(2.7rem, 6.2vw, 5.5rem)"
    fontWeight: 680
    lineHeight: 1.015
    letterSpacing: "-0.04em"
  lesson:
    fontFamily: "Aptos, Helvetica Neue, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.25vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  control: "0.55rem"
  panel: "0.75rem"
spacing:
  gutter: "clamp(1.25rem, 4vw, 3rem)"
  section: "clamp(3.75rem, 7vw, 7rem)"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0.7rem 1rem"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
---

## Overview

The nonprofit site invites students to explore; Axiom Learn helps them concentrate. Public pages use a centered opening, a single instructive visual, and editorial lists. Course views prioritize the current task, progress, and a readable measure.

## Colors

Use ink on white and light gray for most content. Use blue for actions and current states, not decoration. Reserve dark navy for the course feature.

## Typography

Use large, compact editorial headings on the public site and more generous line height inside the course. Keep supporting copy plain and direct.

## Layout

Align public pages to the shared content width and fluid gutters. Collapse the marketing navigation and the course curriculum independently. See [the design-system guide](docs/axiom-design-system.md) for implementation details.
