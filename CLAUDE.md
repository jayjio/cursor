# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3 application built with Vue 3 and TypeScript. The project uses a single-page architecture with `app.vue` as the main entry point (no pages/ directory structure currently).

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

## Architecture

### Single-File Application Structure
- The application currently uses `app.vue` as the main component instead of the pages/ directory
- All UI is contained within a single component with scoped styles
- Uses Vue 3 Composition API with `<script setup>` syntax

### Design System
The application uses CSS custom properties for consistent theming:
- `--bg-color`: Main background (#1a1c23)
- `--panel-bg-color`: Panel/card backgrounds (#22242b)
- `--white-color`: Primary text color (#fcf3ea)
- `--text-field-stroke-color`: Border color (#363944)
- Corner radius and spacing variables for consistent UI

### External Assets
The application references SVG assets from an external server (localhost:3845). These are stored in variables in the script setup:
- `logoSvg`: Jeremy Giovannetti Logo
- `unionSvg`: Arrow icon for CTA button

### Component Pattern
The main component includes:
1. **Header**: Logo + navigation items
2. **Main Content**: CTA section with floating label text input and action button
3. **Footer Cards**: Fixed-position card grid at bottom of viewport

### Styling Approach
- Uses scoped styles with Google Fonts (Rethink Sans)
- Responsive design with breakpoints at 1024px and 768px
- Hover effects and transitions for interactive elements
- Fixed footer with gradient overlay for visual depth

## Key Implementation Details

### Floating Label Pattern
The text input uses a floating label animation that:
- Starts centered in the field
- Floats to top-left when focused or has value
- Uses CSS transforms and transitions for smooth animation
- Input visibility is controlled via opacity based on focus state

### Reactive State Management
Uses Vue 3 refs for:
- `isFocused`: Tracks input focus state
- `inputValue`: Two-way binding for text input
- `inputRef`: Template ref for programmatic focus control

## OpenAI Integration

### API Route
The application includes an OpenAI integration via `/server/api/chat.post.ts` that:
- Accepts POST requests with `message` and `model` parameters
- Supports multiple OpenAI models (GPT-4, GPT-4 Turbo, GPT-3.5 Turbo, O1 Preview, O1 Mini)
- Returns AI-generated responses with usage metadata
- Handles errors gracefully with helpful error messages

### Environment Configuration
- Requires `OPENAI_API_KEY` environment variable in `.env` file
- The API key is configured as a private runtime config variable
- See `OPENAI_SETUP.md` for detailed setup instructions

### Frontend Integration
The main component (`app.vue`) includes:
- Model selector dropdown for choosing AI models
- Real-time API calls using Nuxt's `$fetch` utility
- Loading states during API requests
- Error handling with user-friendly messages
- Response display with animated fade-in effect
- Support for Enter key submission

## Development Notes

- Nuxt DevTools are enabled and accessible via Shift + Option + D in browser
- TypeScript configuration extends from `.nuxt/tsconfig.json` (auto-generated)
- The dev server runs on port 3000 by default
- Hot module replacement (HMR) is enabled for rapid development
- After adding the OpenAI API key to `.env`, restart the dev server
