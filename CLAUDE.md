# CLAUDE.md - Portfolio Project Guide

## Build/Dev Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run generate` - Generate static project

## Code Style Guidelines
- **Template**: Use Pug templating with proper indentation
- **Script**: Vue 2 component format with named exports
- **Styling**: SASS with scoped styles
- **Naming**: 
  - Components: PascalCase (e.g., `TweetCollection.vue`)
  - Methods/Properties: camelCase
- **Imports**: Group by type (components, utilities)
- **Props**: Define with type and defaults when possible
- **Computed Properties**: Use for derived state
- **File Structure**: Group related components in subdirectories
- **CSS**: Mobile-responsive with media queries (@media)
- **Theme**: Respect Vuetify theming and color variables
- **Error Handling**: Check for nulls with safe navigation

## Copy Voice
When writing or editing portfolio copy, aim for a voice halfway between Mason's and Instrument's (the agency). Reference: `static/domains/portfolio/Instrument_copywriting.md` (10 Instrument case studies).
- **Take from Instrument:** clear case study structure (project description, challenge, approach, result), confident framing, short punchy section headers, and connecting craft to the client's goals.
- **Take from Mason:** first person ("I"), plain conversational language, short sentences, specific details, and real numbers.
- **Avoid:** agency jargon and filler ("best-in-class," "next-level," "seamless"), hype ("10x"), and claims that aren't backed by evidence.
- Keep Mason's exact wording when he supplies copy; only fix typos and grammar unless he asks for rewrites.

## Portfolio Review Skills
Two personal skills are installed for reviewing pages:
- `portfolio-review` (`~/.claude/skills/portfolio-review/`): a full hiring-manager review across copy, IA, positioning, case studies, visual design, and CTAs, with a severity-coded report.
- `hiring-manager-bar` (`~/.claude/skills/hiring-manager-bar/`), by Karl Koch: checks whether a page answers the core hiring questions (what you're good at, what you shipped, your contribution, how you work, how to reach you) and gives prioritized fixes tied to the actual files. Can implement fixes on request.

**When Mason finishes a page** (a case study, /founders, the homepage, etc.), remind him to run one or both skills on that page before moving on, e.g. "Want to run portfolio-review or hiring-manager-bar on this page?" Give them this goal: landing a design engineer role with early-stage startup founders.