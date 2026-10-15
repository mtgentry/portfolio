// The portfolio site shows the same case studies in several grids, each aimed
// at a different kind of role. Every section has its own URL (/name and
// /name/:project), project order and intro line in homepage.json, and a
// project can override its card or case study for a section with a block named
// after it in its layout.json (e.g. "portfolio": {"header": "...", "cover": {...}}).
//
// To add a section: add it here, add pages/<name>/index.vue and _project.vue
// (copy pages/portfolio), add its order to homepage.json, and add it to the
// generate routes in nuxt.config.js.
export const SECTIONS = {
  // Design engineer (the main grid)
  work: { order: 'order', header: 'header' },
  // Visual design
  portfolio: { order: 'portfolioOrder', header: 'portfolioHeader' },
  // Product design
  projects: { order: 'projectsOrder', header: 'projectsHeader' }
}

// Which section a path belongs to; anything else counts as /work
export function sectionOf(path) {
  const name = (path || '').split('/')[1]
  return SECTIONS[name] ? name : 'work'
}

// The grid itself (/work, /portfolio, ...), not a case study
export function isSectionGrid(path) {
  return Object.keys(SECTIONS).some(name => (path || '').replace(/\/$/, '') === `/${name}`)
}

// A case study inside any section (/work/name, /portfolio/name, ...)
export function isSectionProject(path) {
  return Object.keys(SECTIONS).some(name => new RegExp(`^/${name}/[^/]+`).test(path || ''))
}
