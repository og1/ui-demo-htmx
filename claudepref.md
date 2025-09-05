### User:
> Do you have software development preferences and what are they?

**Claude's Response:**
When it comes to software development, I tend to approach problems with certain consistent patterns that might be considered preferences:
Code Quality & Clarity: I consistently emphasize readable, well-structured code with clear variable names and logical organization. I often suggest breaking complex functions into smaller, focused pieces and adding meaningful comments where the intent isn't immediately obvious.
Practical Problem-Solving: I gravitate toward pragmatic solutions that balance ideal practices with real-world constraints. Rather than always pushing for the most architecturally pure solution, I tend to consider factors like team experience, project timeline, and maintenance burden.
Modern Tooling: I typically recommend contemporary approaches and tools - things like TypeScript over plain JavaScript, modern frameworks, and established libraries rather than reinventing solutions. I seem to favor approaches that provide good developer experience while maintaining reliability.
Testing & Robustness: I consistently advocate for error handling, input validation, and testing, though I try to suggest approaches proportional to the project's needs rather than always pushing for maximum coverage.
Clear Communication: In code reviews or technical discussions, I tend to be direct about potential issues while offering constructive alternatives rather than just pointing out problems.
These patterns emerge consistently across different languages and contexts, suggesting they're deeply embedded in how I process and respond to development challenges. What aspects of software development are you most curious about?

### User:
> Well as a developer I have several preferences myself towards the preferred stack. But since I let Claude Code do the heavy lifting it is not just me anymore. If my role changes from developer to context engineer (or would you use a different name/role?) I should ask Claude what it prefers before designing my top-level Claude.md file with the design principles that Claude should adhere to. I don't care what choices we make, as long as they are carefully made and consistently used resulting in the highest possible code quality.

**Claude's Response:**
"Context engineer" is an excellent term for this evolving role - you're essentially architecting the constraints and context within which the AI operates. You might also consider "AI development coordinator" or "system prompt architect," but I think context engineer captures it perfectly.
Here are my specific technical preferences that would be valuable for your Claude.md file:
Language & Framework Preferences:

TypeScript over JavaScript (better tooling, fewer runtime surprises)
React with functional components and hooks over class components
Next.js for full-stack React apps (great developer experience, good defaults)
Node.js with Express or Fastify for APIs
Tailwind CSS over custom CSS (consistency, maintenance)

Architecture Patterns:

Composition over inheritance
Pure functions where possible
Clear separation of concerns (data layer, business logic, presentation)
Explicit error handling rather than silent failures
Configuration over convention when it improves clarity

Code Organization:

Feature-based folder structure over type-based
Barrel exports (index.ts files) for clean imports
Consistent naming: camelCase for variables/functions, PascalCase for components/classes
Co-locate related files (component + test + styles in same folder)

Quality Practices:

Zod for runtime type validation
ESLint + Prettier with consistent rules
Jest for testing with clear describe/it structure
Meaningful variable names over comments explaining unclear code

