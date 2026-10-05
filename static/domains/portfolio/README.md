# Portfolio review skills

Two Claude Code skills are installed for reviewing portfolio pages. They're personal skills, so they work in any project.

## hiring-manager-bar

- **Location:** `~/.claude/skills/hiring-manager-bar/`
- **By:** Karl Koch ([source](https://github.com/kemiljk/skills/tree/main/skills/hiring-manager-bar), based on [The hiring manager is your user](https://karlkoch.me/writing/the-hiring-manager-is-your-user/))
- **What it checks:** whether a page answers the core hiring questions: what you're good at, what you shipped, what you contributed, how you work, and how to reach you. Gives prioritized fixes tied to the actual files, and can implement them on request.

## portfolio-review

- **Location:** `~/.claude/skills/portfolio-review/`
- **By:** Won J. You ([source](https://github.com/wonjyou/portfolio-review-skill))
- **What it checks:** a full hiring-manager review across copy, information architecture, positioning, case studies, visual design, and CTAs, delivered as a severity-coded report.

## How to use them

Run both on each page when it's finished: `hiring-manager-bar` first for clarity gaps, then `portfolio-review` for a broader polish and positioning pass. Goal to give them: landing a design engineer role with early-stage startup founders.
