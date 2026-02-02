<p align="center">
  <img src="assets/logo.png" alt="Mizu Logo" width="128" height="128" />
</p>

<h1 align="center">水 Mizu</h1>

<p align="center">
  <strong>Self-hosting platform for macOS home labs.</strong>
</p>

<p align="center">
  <em>Deploy your apps like water flows — naturally, effortlessly.</em>
</p>

---

> ⚠️ **Fair Warning**: This is a hobby project born from late-night coding sessions and too much coffee. Maintenance is not guaranteed—updates come when inspiration strikes, bugs get fixed when they annoy me enough, and features ship when they're ready. Use at your own risk, and maybe keep backups of your backups.

---

## What is Mizu?

Mizu (水, "water" in Japanese) is a self-hosting platform designed specifically for **macOS**. Think [Coolify](https://coolify.io), [Railway](https://railway.com), or the old-school Heroku vibes—but running on that Mac Mini collecting dust in your closet or the MacBook you retired from daily use.

**The core idea**: Deploy and manage applications through a visual canvas interface. Drag, drop, connect, deploy. No YAML archaeology. No Kubernetes PhD required.

### Why Another Self-Hosting Platform?

Most self-hosting solutions assume you're running Linux on a VPS or a Raspberry Pi cluster. Mizu assumes you're a developer with spare Apple hardware who wants to:

- **Run your side projects** without paying cloud bills
- **Self-host services** (databases, APIs, personal tools) at home
- **Learn deployment patterns** in a visual, interactive way
- **Keep your data** on hardware you physically own

### Why macOS?

Because Mac Minis are silent, energy-efficient, and surprisingly capable servers. Because that 2019 MacBook Pro still has life in it. Because sometimes the best home lab is the hardware you already have.

---

## Philosophy

```
"The water that flows adapts to the container it fills."
```

Mizu aims to make deployment feel fluid:

- **Visual-first**: A canvas interface where your infrastructure is a flowchart, not a wall of config files
- **Opinionated defaults**: Sensible configurations out of the box—escape hatches available when you need them
- **Local-first**: Your machine, your data, your rules
- **Progressive complexity**: Simple things stay simple; complex things remain possible

---

## Planned Features

| Status | Feature | Description |
|:------:|---------|-------------|
| 🎯 | **Canvas Editor** | Visual flowchart interface for designing deployments |
| 📋 | **Container Management** | Docker-based isolation with native macOS integration |
| 📋 | **Git Integration** | Deploy from GitHub, GitLab, or local repositories |
| 📋 | **One-Click Services** | Databases, caches, message queues with minimal setup |
| 📋 | **Reverse Proxy** | Automatic SSL and routing via Caddy/Traefik |
| 📋 | **Resource Monitoring** | CPU, memory, and network dashboards |
| 📋 | **Backup System** | Scheduled backups to local storage or S3-compatible services |
| 💭 | **Wake-on-LAN** | Power management for energy-conscious home labs |
| 💭 | **Multi-machine** | Orchestrate deployments across multiple Macs |

> 🎯 = In Progress | 📋 = Planned | 💭 = Maybe Someday

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TanStack Router, TanStack Query |
| Backend | TanStack Start (SSR), tRPC, Drizzle ORM |
| Database | PostgreSQL |
| Runtime | Bun |
| Build | Turborepo, Vite |

---

## Project Status

🚧 **Early Development** — The foundation is being laid. Core architecture exists, but user-facing features are still taking shape.

Current focus:
1. Solidifying the monorepo architecture
2. Building the canvas/flowchart editor
3. Crafting delightful UX (because life's too short for ugly interfaces)

---

## Inspirations

Mizu stands on the shoulders of giants. These projects shaped the vision:

| Project | What We Learned |
|---------|-----------------|
| [Coolify](https://coolify.io) | Self-hosting can be beautiful and accessible |
| [Railway](https://railway.com) | Canvas-based infrastructure visualization works |
| [Heroku](https://heroku.com) | Developer experience matters more than features |
| [Dokku](https://dokku.com) | The power of git-push deployments |
| [CapRover](https://caprover.com) | One-click apps lower the barrier to entry |
| [Portainer](https://portainer.io) | Good container UX is achievable |

If you haven't tried these, you should. They're all excellent.

---

## What Mizu Is Not

Let's set expectations:

- **Not production-grade** — This is for home labs and side projects, not your startup's infrastructure
- **Not multi-cloud** — It runs on your Mac, that's it
- **Not a Kubernetes replacement** — If you need K8s, you probably don't need Mizu
- **Not guaranteed to work** — See the warning at the top

---

## Contributing

This is a personal project, but if you're interested in self-hosting on macOS and want to help shape Mizu, feel free to open issues or PRs. Just know that responses may be slow—this is built in the margins of life.

**Areas where help would be appreciated:**
- macOS system integration (launchd, network configuration)
- Container runtime expertise
- UI/UX design feedback
- Documentation

---

## Name

水 (Mizu) — Water. Chosen because:
- Water adapts to any container (flexible deployments)
- Water flows naturally (visual pipeline design)
- Water is essential but often invisible (infrastructure should fade into the background)
- It sounds cool and I like anime, sue me

---

## License

MIT — Do what you want, just don't blame me when things break.

---

<p align="center">
  <sub>Built with 🍵 and questionable life choices.</sub>
</p>
