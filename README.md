# Plutus21 Design Kit

A kit for designing Plutus21 website pages with Claude Code, one section at a time.

It starts empty. You bring a wireframe and set the look, and for each section Claude builds two layout options from it, A and B. You compare them side by side in the **lab**, pick one, and Claude puts the picks together into a finished page. Everything is plain HTML, CSS and JavaScript: no frameworks and no build step.

---

## Who does what

| Role | What they do |
|---|---|
| **Builder** | Works with Claude: sets the look, builds the sections, picks options, assembles the pages, saves to GitHub. |
| **Reviewer** | Looks in now and then: pulls the latest, views the lab, and writes comments in `review.md`. Never edits the HTML. |

The builder's Claude reads `review.md` at the start of every session and works through any open comments, so feedback never gets lost in chat.

---

## Getting started (builder)

You need **Git** and **Claude Code** installed, plus access to this private repo on GitHub.

```bash
git clone <repo-url> design-kit
cd design-kit
claude
```

Then just say **hi**.

Claude takes it from there with a short checklist, one step at a time:

1. Check your computer has what the kit needs (Python, Node, Chrome)
2. Install the three design skills
3. A two-minute tour of the skills
4. How we work together
5. Start your first page

You won't be asked "allow this?" for everyday work. The kit pre-approves editing its own files, the viewer, the screenshot tools, the design skills and everyday Git (see `.claude/settings.json`). Anything else still asks you first, and force-push is blocked.

After the first time, saying hi gets you a quick status instead: what's done, what's next, and any review comments waiting.

### What you can say

| Say | What happens |
|---|---|
| "Start a new page" | Claude reads your wireframe, lists the sections, and asks you about the look you want |
| "Build the next section" | Claude builds options A and B, checks them, and sends you the lab link |
| "Show me the lab" | Claude starts the viewer and gives you the link |
| "Assemble the page" | Claude puts the picked options together into the finished page |
| "Save and push" | Claude saves everything to GitHub with a clear message |

You can always just ask in your own words too.

---

## The design skills

The kit uses three design skills, written and maintained by other people on GitHub. They aren't stored in this repo. Claude installs them for you in Step 2, and `skills-lock.json` records which ones the kit expects.

| Skill | What Claude uses it for |
|---|---|
| **design-taste-frontend** | Ideas for laying out each section's content, plus a look-and-fix loop on screenshots |
| **hallmark** | A quality check before Claude shows you anything: keyboard focus, motion settings, mobile layout, nothing invented |
| **hairline-create** | Thin-line drawings that react to the pointer, for sections that need a figure |

You never need to call them yourself. They help propose directions when you're setting the look, but once you've agreed one in `design.md`, it wins, and the skills only help build and check.

To install them by hand (for example on the reviewer's machine), run these from inside the `design-kit` folder:

```bash
npx skills add Leonxlnx/taste-skill --skill design-taste-frontend --agent claude-code --yes
npx skills add nutlope/hallmark --skill hallmark --agent claude-code --yes
npx skills add lucasmarkes/hairline --skill hairline-create --agent claude-code --yes
```

---

## Reviewing (reviewer)

1. Get the latest:

   ```bash
   git pull
   ```

2. Start the viewer from inside the `design-kit` folder, then open **http://localhost:8080/lab.html**:

   ```bash
   python3 -m http.server 8080 --bind 127.0.0.1
   ```

3. Read `progress.md` for where things stand, and `notes/` for what was decided and why.
4. Write comments in `review.md` under the section they're about, one per line:

   ```markdown
   ## About · hero
   - [ ] Option B, but make the headline shorter. (2026-10-30)
   ```

5. Save and send them:

   ```bash
   git add review.md
   git commit -m "Review comments"
   git push
   ```

In the next session, the builder's Claude handles each open comment, ticks the box `- [x]` and adds a line saying what it changed.

---

## What's in the folder

```
design-kit/
├── README.md        this file, for people
├── CLAUDE.md        the rules and routines, for Claude
├── design.md        the look you agreed (written when the first page starts)
├── progress.md      where every section stands
├── review.md        the reviewer's comments
├── lab.html         the viewer for comparing options
├── brief/           the wireframes and client content, one folder per page
├── kit/             the design system: a neutral base, then your colours, fonts and shared components
├── tools/           the screenshot scripts Claude uses to check its work
├── pages/
│   └── <page>/      its sections (each with options A and B) and the finished page
├── notes/           one short note per decision, content lists, and what we still need from the client
├── skills-lock.json the design skills the kit expects
├── .local/          local only, not in Git: screenshots and setup markers
├── .claude/settings.json  what Claude may do without asking
└── .claude/skills/  where the design skills install (not in Git)
```

## The rules, in short

The full list is in `CLAUDE.md`. The ones that matter most:

- **Content comes only from the wireframes.** Claude never invents numbers, quotes, logos, names or awards. Anything missing gets a visible placeholder like `[Year]` and goes on `notes/content-gaps.md`, the list of things to ask the client for.
- **The look is yours.** When you start a page, Claude asks for references, colours, fonts and mood, proposes a direction, and writes what you agree in `design.md`. Every section follows it.
- **Two real options per section, A and B**, not small variations of one idea.
- **Claude checks its own work** with screenshots on desktop and phone before showing you.
- **One decision, one note**, so there's always a record of why.

---

## Git, the five commands you need

| To | Run |
|---|---|
| Get the latest | `git pull` |
| See what changed | `git status` |
| Stage your changes | `git add <file>` (or `git add -A` for everything) |
| Save them with a message | `git commit -m "What you did"` |
| Send them to GitHub | `git push` |

The builder can just tell Claude *"save and push"*.
