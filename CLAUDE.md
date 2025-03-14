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