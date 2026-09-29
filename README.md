# Naveen Peddi — Portfolio

A personal portfolio built with React, Vite, CSS Modules, Motion and Lucide icons.

## Run it on your computer

You need [Node.js](https://nodejs.org) (version 20 or newer) installed once.

```bash
npm install      # download the building blocks (first time only)
npm run dev      # start the site at http://localhost:5173
```

Other commands:

```bash
npm run build    # make the final, fast version of the site in the dist/ folder
npm run preview  # look at that final version locally
npm run lint     # check the code for mistakes
```

## Where things live

| Folder | What's inside |
| --- | --- |
| `src/styles/tokens.css` | Design tokens: colors, fonts, type sizes, spacing, breakpoints, motion. Like Figma variables. |
| `src/styles/global.css` | Base styles for plain HTML elements. |
| `src/data/` | Your content: profile, about, projects, skills, experience, resume, POCs, navigation. Edit words here, not in components. |
| `src/components/layout/` | Header, mobile menu, footer, skip link, the page frame. |
| `src/components/ui/` | Small reusable pieces: Button, Tag, Container, SectionHeading, CopyEmail. |
| `src/components/motion/` | Reveal animations (respect "reduce motion"). |
| `src/components/work/` | Project list and project rows. |
| `src/components/case-study/` | Case-study pieces (Next project). More in Stage 5. |
| `src/sections/` | Homepage sections in order: Hero, About, Work, Skills, Experience, Resume. Contact is the footer. |
| `src/pages/` | One file per page: Home, Work, CaseStudy, NotFound, Foundation. |
| `public/` | Files served as-is: favicon, résumé PDF, images. |

Visit `/foundation` to see the design system as a live page.
