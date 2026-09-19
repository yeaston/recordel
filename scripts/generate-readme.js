// Generate README.md for the free-directories public list
const fs = require('fs');
const data = JSON.parse(fs.readFileSync(__dirname + '/../data/free-directories.json', 'utf8'));

const CATS = [
  ['ai', '🤖 AI Tool Directories', 'Fastest wins — most accept any tool with an AI angle, self-serve, indexed in days.'],
  ['saas', '💼 SaaS & Software Directories', 'Review-driven profiles. Free vendor pages; seed a few user reviews to rank.'],
  ['launch', '🚀 Launch Platforms & Communities', 'Need a bit of storytelling. Product Hunt / BetaList / HN deserve their own prep time.'],
  ['media', '📰 Startup Media & Company Profiles', 'Company / founder pages — trust signals and evergreen links.'],
  ['dev', '👨‍💻 Developer Platforms', 'Write a build-story post or list your stack, link naturally.'],
  ['content', '✍️ High-DR Content Platforms', 'One good article / list / deck keeps sending links for years.'],
  ['design', '🎨 Design Galleries', 'They feature your landing page itself — polish it first.'],
];

const esc = s => s.replace(/\|/g, '\\|');
let tables = '';
for (const [key, title, desc] of CATS) {
  const rows = data.filter(d => d.cat === key).sort((a, b) => (b.dr || 0) - (a.dr || 0));
  tables += `\n## ${title}\n\n${desc}\n\n`;
  tables += '| # | Platform | DR | Notes | Link |\n|---|---|---|---|---|\n';
  rows.forEach((d, i) => {
    const u = d.url.replace(/^https?:\/\//, '');
    tables += `| ${i + 1} | **${esc(d.name)}** | ${d.dr ?? '—'} | ${esc(d.note || '')} | [Submit](${d.url}) |\n`;
  });
  tables += `\n`;
}

const header = `# 120+ Free Directories to Launch Your Startup (2026 Edition)

> **Every entry is free to submit.** No paid placements, no affiliate links — just the full working checklist we use to launch our own products.
>
> Built by [**Recordel**](https://recordel.com) — an AI screen recorder & video editor that runs 100% in your browser. Record your product demo, edit it with natural language, ship it the same day. 👋

**⭐ Star this repo if it saves you an afternoon — the list is updated as platforms come and go.**

## Why this list exists

Every founder hits the same wall after launch: "where do I get the first 1,000 visitors?" The answer nobody tells you — there are 100+ places that will list your product **for free**, most with self-serve forms that take 5 minutes each. The problem is finding them and knowing which are still alive. So we kept a list while launching [Recordel](https://recordel.com), and published it.

## How to use

1. **Prep once, paste everywhere** — write these before you start:
   - Name + one-line tagline (≤60 chars)
   - Short description (~160 chars) + long description (300+ chars)
   - Logo (512×512 PNG), 3–5 screenshots (1280×800), pricing model (Free/Freemium/Paid)
   - Privacy Policy & Terms URLs (some platforms require them)
2. **Work top-down within a category** — entries are roughly sorted by Domain Rating (DR).
3. **Track your submissions** — a simple spreadsheet (Platform / Date / Status) saves you from double-submitting.
4. **Alternatives directories** (AlternativeTo, Slant, Sitelike): list your product as an *alternative to a popular rival* — that's where their search traffic comes from.

## Featured: Recordel 🎥

[![Recordel](https://recordel.com/og-image.png)](https://recordel.com)

| | |
|---|---|
| 🎥 | **Screen + camera recording** — zero install, runs in your browser |
| 🪄 | **Natural-language AI editing** — describe the edit, get a studio-grade cut |
| 💬 | **AI auto captions** — 100% local Whisper + AI typo review |
| 🎬 | **3D camera moves, focus zoom & hand-drawn annotations** |
| 🔒 | **100% private** — videos never leave your device; BYOK (Claude / OpenAI / DeepSeek / Ollama) |

→ **[recordel.com](https://recordel.com)** · Free to start, Pro is a one-time lifetime pass.

---

## The List
`;

const footer = `
---

## Contributing

Found a dead link? A great free directory we missed? PRs welcome — please keep entries **free to submit** and include the direct submission URL.

## License

[MIT](LICENSE) — free to use, copy with attribution appreciated.

---

*If this helped your launch, a ⭐ is the best thanks. Built with 🧡 by [Recordel](https://recordel.com).*
`;

fs.writeFileSync(__dirname + '/../README.md', header + tables + footer);
const counts = {};
data.forEach(d => counts[d.cat] = (counts[d.cat] || 0) + 1);
console.log('README generated. Total:', data.length, JSON.stringify(counts));
