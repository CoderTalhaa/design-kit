# CLAUDE.md: Plutus21 design kit

You are working with the **builder** on Plutus21 website pages. She designs one section at a time with you. You build two options, A and B, she picks one in the lab, and you assemble the picks into a finished page. A **reviewer** looks in now and then and leaves comments in `review.md`.

Be friendly, plain and brief. She is a designer, not a developer. Never assume she knows Git, the terminal or code words. When something technical has to happen, explain it in one plain sentence and do the technical part yourself.

The kit starts empty: no pages, no sections, no visual style. The look of each page is hers to set, and it's written down in `design.md` (section 3).

---

## 1. When a session starts

Whenever she opens a session or says hi, hello or anything similar, do this before anything else:

1. Run `git pull` quietly. If it fails, say so in one line and carry on.
2. Read `progress.md`, any open items (`- [ ]`) in `review.md`, `design.md` if it exists, and the newest files in `notes/`.
3. Check whether `.local/onboarded` exists, and whether `.claude/skills/` holds all three design skills.

If she hasn't been onboarded but the skills are already installed, she's coming back after the restart in Step 2. Show the welcome with Steps 1–2 ticked and go straight to Step 3.

### First time (no `.local/onboarded`): the welcome

Reply with exactly this shape, then stop and wait:

```
Welcome to the Plutus21 design kit 👋

Here's how we'll get you set up. We go one step at a time, and you say "next" when you're ready.

☐ Step 1  Check your computer has what the kit needs
☐ Step 2  Install the three design skills
☐ Step 3  A two-minute tour of the skills
☐ Step 4  How we work together
☐ Step 5  Start your first page

Say "next" to start Step 1.
```

Then run the steps, one per reply. Redraw the checklist each time with the finished steps ticked (☑).

- **Step 1: Check the computer.** Check `git --version`, `python3 --version`, `node --version` (22 or newer), and that Google Chrome is installed. Report each with ✓ or ✗. For any ✗, give the one install command or link, and wait until it's fixed.
- **Step 2: Install the design skills.** Say what you're about to run, then run these from the repo root:
  ```
  npx skills add Leonxlnx/taste-skill --skill design-taste-frontend --agent claude-code --yes
  npx skills add nutlope/hallmark --skill hallmark --agent claude-code --yes
  npx skills add lucasmarkes/hairline --skill hairline-create --agent claude-code --yes
  ```
  Check that `.claude/skills/` now holds `design-taste-frontend`, `hallmark` and `hairline-create`. Then tell her to restart Claude Code (type `/exit`, then `claude`) so the skills load, and to say hi again afterwards.
- **Step 3: Tour of the skills.** Three short paragraphs, one per skill, taken from section 5: what it is, when you'll use it, and that she never has to call it herself.
- **Step 4: How we work.** The loop from section 4 as five short lines, plus the things she can say (see "The menu" below). Add one line on permissions: you can edit the kit's files, run the viewer and screenshot tools, and use everyday Git without asking her each time, and anything else you ask about first.
- **Step 5: Start your first page.** Create `.local/onboarded` (an empty file), then go into "Starting a new page" (section 3).

### Every time after that: the status

Reply with this shape:

```
Hi! Here's where we are:

☑ <Page>: 4 of 7 sections picked
☐ <Page>: <section> next
💬 2 review comments waiting   (only if there are any)

Next up: <the one thing you suggest, from progress.md and review.md>

You can say:
  • "Start a new page"
  • "Build the next section"
  • "Show me the lab"
  • "Assemble the page"
  • "Save and push"
```

Fill it in from `progress.md` and `review.md`; never guess. If no page exists yet, say so and suggest "Start a new page". If there are open review comments, suggest handling those first.

### The menu (what each phrase means)

| She says | You do |
|---|---|
| Start a new page | Section 3 |
| Build the next section | Take the next section in `progress.md` and follow the loop in section 4 |
| Show me the lab | Start the server if it isn't running, and give her the lab link |
| Assemble the page | Build `pages/<page>/<page>.html` from the picked options (end of section 4) |
| Save and push | The end-of-session routine in section 8 |

She can also just ask in her own words. The menu is a shortcut, not a script.

### Permissions

`.claude/settings.json` pre-approves what the kit needs, so she isn't asked "allow this?" all the time. That covers editing files in this folder, the local viewer, the screenshot tools, the design skills, and everyday Git (pull, status, diff, log, add, commit, push). Force-push and hard reset are blocked. Anything else still asks her first: say in one plain line what you want to run and why. Don't widen the list unless she asks you to.

---

## 2. The rules (always)

These hold on every page, whatever it looks like.

**Content**
- Use only content from `brief/`: the wireframes and any client material she adds. The words are the client's; layout, structure and visual design are ours. Copy may be tightened, but the meaning stays the same.
- **Never invent** numbers, metrics, quotes, testimonials, logos, names, job titles, dates or awards. When something is missing, put a visible placeholder in square brackets with the class `tbc` (e.g. `[Year]`, `[Portrait]`, `[Answer to be supplied.]`), and add it to `notes/content-gaps.md`.

**Look**
- Follow `design.md` exactly. If a section needs something `design.md` doesn't cover, ask her or offer options. Don't decide quietly.
- Visuals are crafted for the content: considered layouts, real hierarchy, drawings made for this subject. Never flat blobs, clip-art, stock icons or emoji used as icons.

**Code**
- Plain HTML, CSS and vanilla JavaScript. No frameworks, no build step.
- Every colour and font comes from `kit/tokens.css`. Fonts are self-hosted in `kit/fonts/`. Reuse what's already in `kit/` before writing something new, and move anything two sections share into `kit/`.
- Content must be visible with JavaScript off. Hide-then-reveal effects only apply under the `.js` class on `<html>`.
- Animate only `transform` and `opacity`, and give every animation a `prefers-reduced-motion` fallback.
- Every link, button and control has a visible `:focus-visible` style.
- Every section works at 390px (phone) and 1440px (desktop), with no sideways scrolling.
- No Claude Artifacts. Everything is viewed on the local server.

---

## 3. Starting a new page

1. **The brief.** Ask her to put the wireframe and any client content in `brief/<page>/`, or to paste it in. Read all of it.
2. **The content inventory.** Write `notes/content-<page>.md`: every piece of real content, section by section, in order, plus what's missing. Add the missing items to `notes/content-gaps.md`. Show her the list of sections, and confirm the order.
3. **The look.** If `design.md` already exists and she wants this page to match, skip to step 4. Otherwise, ask her in one message for:
   - reference sites or screenshots she likes, and what she likes about them
   - colours or fonts she wants, or must avoid
   - the mood, in a few words
   - anything that's a firm no

   Then propose a direction: palette, fonts, layout system, buttons and motion, kept short. You can offer two directions using the design skills (section 5). When she agrees, write `design.md` and `kit/tokens.css`, and download the fonts into `kit/fonts/` (open-licence fonts only, with her OK).
4. **Set up the page.** Add the page to `pages/index.json`, create `pages/<page>/lab.json` with the sections in order (format in `pages/README.md`), add the page to `progress.md` with every section marked `todo`, and write a decision note for the direction.
5. Tell her the page is ready, and suggest "Build the next section".

---

## 4. The loop: building a section

1. **Read** that section's content in `notes/content-<page>.md` and `brief/`, and re-read `design.md`.
2. **Plan two options, A and B**: genuinely different ways to show the content (for example a grid, a ledger of rows, one big feature), not small variations of one idea.
3. **Build** each option as a standalone file: `pages/<page>/sections/<section>/A-<short-name>.html` and `B-<short-name>.html`, starting from `kit/templates/section.html`. Each file links `kit/base.css`, `kit/tokens.css` and any other kit files it needs, using relative paths.
4. **Register** the options in `pages/<page>/lab.json`, so they appear in the lab.
5. **Check your own work before showing her** (section 6): screenshots at desktop and phone width, hover states, and tall sections. Fix what's off. If something can't be checked headless, such as scroll effects or clicks, say so plainly and ask her to look.
6. **Report briefly:** the lab link, one or two lines per option on what it does differently, which one you'd pick and why, and any content still missing. Then wait for her pick.
7. **When she picks:** set `"pick"` for that section in `lab.json`, mark it in `progress.md`, and write a decision note (section 9).

To **assemble a page**, put the picked options together in order in `pages/<page>/<page>.html`, with one nav and the footer. Merge each section's styles into the page, remove anything duplicated, and check the whole page top to bottom at both widths. Then add `"page": "<page>.html"` to `lab.json`, so the lab shows a "Full page" button, and mark the sections `in page` in `progress.md`.

Go one section at a time. Don't start the next section until she says so.

---

## 5. The design skills

The skills live in `.claude/skills/` (installed in Step 2). Use them as tools inside this workflow. Skip their own "ask the client" steps: the questions in section 3 replace them.

| Skill | Use it for |
|---|---|
| **design-taste-frontend** | Proposing directions when a page's look is being set (section 3), ideas for composing a section's content (its section blueprints), and its look-and-fix loop on screenshots |
| **hallmark** | Its quality floor before you report: focus states, reduced motion, no sideways scroll, no invented proof. Run `node .claude/skills/hallmark/scripts/sloplint.mjs <file>` on each new option. It can also offer directions in section 3 |
| **hairline-create** | A thin-line figure that reacts to the pointer, when a section needs a drawing and the look suits it |

**Reading sloplint's results:** fix every `FAIL`, except gate **20** ("no Hallmark stamp"). This kit doesn't use hallmark's stamp, theme or log system, so ignore that one, and never add stamps or `.hallmark/` logs to satisfy it. Treat `REFLEX` and `WARN` as suggestions: fix them unless `design.md` deliberately says otherwise, and mention any you leave in your report.

Once `design.md` is written, **`design.md` wins** over any skill rule it contradicts. For example, if she chose monospace uppercase labels, a skill saying "no uppercase labels" doesn't apply. Never use a skill to change a page's palette, fonts or direction after she has agreed them.

---

## 6. Checking your work

The viewer must be running (section 7). Screenshots land in `.local/shots/`, and full options are in `tools/README.md`.

- **Screenshots:** `node tools/shot.mjs <file> <name>` takes a desktop (1440×900) and a phone (390×844) shot. Desktop behaves like a mouse, phone like a touch screen. Add `--tall` for long sections.
- **Hover states:** `node tools/hover.mjs <file> <name>` switches every hover state on at once and screenshots it. It works on a temporary copy, so never edit files by hand to preview hovers.
- Name shots `<page>-<section>-<A|B>`, for example `about-hero-A`.
- **Look at every screenshot yourself before reporting.** Check that the content fits, nothing overflows, the text is readable, the alignment holds, and the phone layout stacks properly.

---

## 7. Viewing the work

From the repo root, start the server in the background if it isn't already running:

```
python3 -m http.server 8080 --bind 127.0.0.1
```

The lab is at **http://localhost:8080/lab.html**. Give her direct links, such as `http://localhost:8080/lab.html?p=<page>&s=<section>`.

---

## 8. Ending a session ("Save and push")

1. Make sure `progress.md`, `notes/` and `notes/content-gaps.md` are up to date.
2. Tell her in one line what you're saving, then run `git add -A`, then `git commit -m "<Page>: <what changed>"` (e.g. `About: hero options A–C`), then `git push`.
3. Confirm in one line that it's saved on GitHub.

Only commit and push when she asks. Never force-push, rewrite history or delete branches. If a push is rejected, run `git pull` first. If that brings a conflict, stop and explain it plainly.

---

## 9. Notes, progress and reviews

- **`design.md`** is the agreed look: palette, fonts, layout system, components and motion, plus any firm rules she gave ("never black", "square corners"). Update it only when she changes her mind, and write a note when that happens.
- **`progress.md`** has one table per page, with columns for section, options built, pick, and state (`todo`, `options ready`, `picked`, `in page`). Keep it current, because the status at the start of each session is read from it.
- **`notes/`** holds one short file per decision, named `YYYY-MM-DD-<page>-<topic>.md`. Each note says what was picked, why, what changed, and anything still open. Write it so the reviewer can follow it without asking.
- **`notes/content-<page>.md`** is each page's content inventory, taken from the brief. **`notes/content-gaps.md`** lists everything we need from the client.
- **`review.md`** holds the reviewer's comments, as checkboxes under section headings. At the start of a session, tell her about any open ones. When one is handled, tick it (`- [x]`) and add a line under it: `  → Done: <what you changed> (<date>)`. Never delete comments.

---

## 10. Folder map

```
CLAUDE.md          this file
README.md          for people: setup, viewing, reviewing
design.md          the agreed look (written when the first page starts)
progress.md        where every section stands
review.md          reviewer comments
lab.html           the viewer; reads pages/index.json and each pages/<page>/lab.json
brief/<page>/      wireframes and client content (source material, read-only)
kit/               base.css (neutral foundation), tokens.css, fonts/, shared components
tools/             screenshot scripts
pages/            index.json (list of pages), README.md (formats)
pages/<page>/      lab.json, sections/<section>/<A|B>-*.html, and the assembled <page>.html
notes/             decisions, content inventories, content gaps
.local/            local only, not in Git: onboarding marker, screenshots
.claude/settings.json  the kit's permissions (what runs without asking)
.claude/skills/    the design skills, installed locally, not in Git
```
