# CLAUDE.md

This file provides guidance to Claude Code when working with Mizu.

## Project Identity

**Mizu** (水, "water") is a self-hosting platform for macOS home labs. Think Coolify, Railway, or Heroku — but running on Mac Minis and MacBooks.

### Core Vision
- **Visual-first**: Canvas/flowchart interface for designing deployments
- **macOS-native**: Built specifically for Apple hardware home labs
- **Delightful UX**: Simple things stay simple, complex things remain possible
- **Local-first**: Your machine, your data, your rules

### What We're Building
A platform where developers can deploy and manage applications through drag-and-drop visual interfaces, eliminating YAML archaeology and Kubernetes complexity for home lab use cases.

### Personality
- Hobby project with heart — not enterprise software
- Geek/anime-inspired without being cringe
- Opinionated but escape hatches exist
- Water flows naturally; so should deployments

---

## Operating Principles

- **Correctness over cleverness**: Prefer boring, readable solutions that are easy to maintain.
- **Smallest change that works**: Minimize blast radius; don't refactor adjacent code unless it meaningfully reduces risk.
- **Leverage existing patterns**: Follow established project conventions before introducing new abstractions.
- **Prove it works**: Validate with tests/build/lint. "Seems right" is not done.
- **Be explicit about uncertainty**: If you cannot verify something, say so and propose the safest next step.
- **UX matters**: This isn't enterprise software — if it's not delightful to use, it's not done.

---

## Commands

```bash
# Development
bun run repo dev --app studio         # Start dev server (localhost:3000)
bun run repo build --app studio       # Build for production
bun run repo serve --app studio       # Serve built app

# Verification (run before marking work complete)
bun run check-types                   # Type check all packages
bun run fmt-lint                      # Check formatting (Biome)
bun run test                          # Run tests (Vitest)
bun run repo test:e2e                 # Run E2E tests

# Database (Drizzle)
bun run repo db:generate --app studio # Generate migrations
bun run repo db:migrate --app studio  # Run migrations
bun run repo db:push --app studio     # Push schema to DB
bun run repo db:seed --app studio     # Seed database

# Docker
bun run repo docker:up --app studio   # Start services
bun run repo docker:down --app studio # Stop services

# Code Generation
bun run gen:app                       # Generate new TanStack app
bun run gen:lib                       # Generate new library package
```

---

## Architecture

**Turborepo monorepo** using **Bun** as runtime and package manager.

### Package Structure

```
apps/studio/                      # Mizu Studio - main web interface (TanStack Start)
packages/
  studio/
    domain/                       # Drizzle schemas + drizzle-zod entities
    repository/                   # Database layer (Drizzle ORM + PostgreSQL)
    service/                      # Business logic (queries/mutations)
    trpc/                         # tRPC router definitions
  shared/
    cli/                          # Monorepo CLI tool (bun run repo ...)
    logger/                       # Pino-based logger
    typescript-config/            # Shared TSConfig
  configs/studio-config/          # Environment configuration
```

### Data Flow

```
Domain (schemas) → Repository (DB) → Service (logic) → tRPC (API) → Frontend (React)
```

### Key Patterns

1. **drizzle-zod**: Auto-generate Zod schemas from Drizzle tables
   ```typescript
   createInsertSchema(), createUpdateSchema(), createSelectSchema()
   ```

2. **Folder-per-Entity in Service Layer**:
   ```
   service/src/queries/todos/get-todo.ts
   service/src/mutations/todos/create-todo.ts
   ```

3. **Merged tRPC Routers**: Split by concern, then merge:
   ```typescript
   export const todosRouter = mergeRouters(todosQueries, todosMutations, todosSubscriptions)
   ```

4. **Dual tRPC Clients**: HTTP for queries/mutations, WebSocket for real-time

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TanStack Router, TanStack Query, tRPC Client, Tailwind CSS |
| Backend | TanStack Start (SSR), tRPC Server, Drizzle ORM, PostgreSQL |
| Auth | better-auth |
| AI | Vercel AI SDK |
| Build | Vite, Turborepo |
| Runtime | Bun |

---

## Domain Concepts

### Future Core Entities (planned)
- **Project**: A collection of services and resources
- **Service**: A deployable unit (container, app, database)
- **Resource**: Infrastructure component (volume, network, secret)
- **Deployment**: A versioned release of a service
- **Flow**: Visual canvas representation of project topology

### Canvas Editor (priority feature)
The visual flowchart interface is central to Mizu's identity. When building UI:
- Nodes represent services/resources
- Edges represent connections/dependencies
- Drag-and-drop for adding new components
- Real-time status visualization

---

## Workflow

### Plan Mode
Enter plan mode for non-trivial tasks (3+ steps, multi-file changes, architectural decisions). Include verification steps. If new information invalidates the plan: stop, update, continue.

### Incremental Delivery
- Thin vertical slices over big-bang changes
- Small, verifiable increments: implement → test → verify → expand
- Feature flags for risky changes

### Verification Before "Done"
- `bun run check-types` passes
- `bun run fmt-lint` passes
- `bun run test` passes (or documented reason)
- Behavior matches acceptance criteria
- **UX feels right** (not just functionally correct)

### Bug Fixing
1. **Reproduce** reliably
2. **Localize** the failure (UI, API, DB, build)
3. **Reduce** to minimal failing case
4. **Fix** root cause (not symptoms)
5. **Guard** with regression coverage
6. **Verify** end-to-end

---

## Task Management

Use `tasks/` directory for non-trivial work:
- `tasks/todo.md` - Checklist with acceptance criteria
- `tasks/lessons.md` - Failure modes and prevention rules

### Plan Template
```markdown
- [ ] Restate goal + acceptance criteria
- [ ] Locate existing implementation / patterns
- [ ] Design: minimal approach + key decisions
- [ ] Implement smallest safe slice
- [ ] Add/adjust tests
- [ ] Run verification (check-types/fmt-lint/test)
- [ ] Summarize changes + verification story
```

---

## Code Style

| Rule | Value |
|------|-------|
| Formatter | Biome |
| Indent | 2 spaces |
| Line width | 100 chars |
| Quotes | Single (double in JSX) |
| Trailing commas | Yes |
| Path alias | `@/*` → `./src/*` |

**Type safety**: Avoid `any` and ignores. Encode invariants at boundaries.

**Dependencies**: Don't add new deps unless existing stack cannot solve it cleanly.

---

## Commit Convention

Format: `<emoji> <type>(<scope>?): <subject>`

| Emoji | Type | Use |
|-------|------|-----|
| ✨ | feat | New feature |
| 🐛 | fix | Bug fix |
| 📝 | docs | Documentation |
| 💄 | style | UI/styling |
| ♻️ | refactor | Code restructure |
| ⚡ | perf | Performance |
| ✅ | test | Tests |
| 🔧 | chore | Maintenance |
| 🏗️ | build | Build system |
| 👷 | ci | CI/CD |
| 🔒 | security | Security |

---

## Communication

- Lead with outcome and impact
- Reference concrete artifacts (file paths, commands, errors)
- Ask questions only when blocked: one targeted question with recommended default
- State assumptions if inferred
- Show verification story: what you ran and the outcome

---

## Error Recovery

**Stop-the-line rule**: If anything unexpected happens (test failures, build errors, regressions), stop adding features, preserve evidence, return to diagnosis.

**Safe fallbacks**: Prefer "safe default + warning" over partial behavior. Degrade gracefully with actionable errors.

---

## Definition of Done

- Behavior matches acceptance criteria
- Verification passes (check-types/fmt-lint/test)
- Code follows existing conventions
- UX is intuitive (for user-facing changes)
- Short verification story exists
