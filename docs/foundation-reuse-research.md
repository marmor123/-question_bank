# Game-first versus question-interface reuse

Research date: 2026-10-20. Planning evidence, not an adoption decision. No candidate was built, exported or playtested in this investigation. No hour or cost estimate is supported yet.

## Finding

Starting from an existing game **can** be cheaper when its play loop, presentation and persistence already match the desired game. That is a valid alternative, not a misunderstanding. But the two investigated candidates do not demonstrate that match. The main adaptation cost is not displaying a question: it is replacing progression and coordinating question outcomes with battle state, rewards, redemption and crash recovery.

For this particular first playable, retaining selected React question components and writing a small adventure shell remains a plausible lower-rework hypothesis. It is not a measured conclusion. Godot with selected OpenRPG components remains a credible alternative when its scene/animation authoring saves enough work. Using an engine, adopting a whole game's rules, and choosing browser versus installed distribution are three separate choices.

## Inspected primary sources

- EmberQuest revision [`8e260b00d01ec06e0acc36087ba7c4a187e3417e`](https://github.com/TheDroidYourLookingFor/EmberQuest/tree/8e260b00d01ec06e0acc36087ba7c4a187e3417e).
- GDQuest Godot OpenRPG revision [`d59f2f71bc046ac53239a4e590861269e7100a36`](https://github.com/gdquest-demos/godot-open-rpg/tree/d59f2f71bc046ac53239a4e590861269e7100a36).
- Local study application: `app/package.json`, `app/src/components/StemContent.tsx`, `MarkdownTable.tsx`, `ChoicesAndExplanationPane.tsx`, `ExhibitZoomModal.tsx`, `app/src/db/tutorAnswerStorage.ts`, and `app/vite.config.ts`. These local files were inspected but are not published with this note.
- Existing requirements: [game-design.md](game-design.md) and [CONTEXT.md](../CONTEXT.md).

## Concrete comparison

| Approach | Actual reusable work | Adaptation and uncertainty |
|---|---|---|
| Fork EmberQuest and add questions | Existing JavaScript browser game, manual/AFK combat, inventory, character saves and backups. Same browser platform makes embedding a React panel conceivable. | Current `index.html` is roughly 39,000 lines and includes combat, quest, contract, login, AFK and guild-raid XP sources. Replacing growth with qualifying question answers requires auditing these paths, not merely adding a modal. Existing routes, economy and presentation are not the agreed Kenney branching-world-map adventure. CDN libraries and cloud/social code need an explicit offline boundary. |
| Use OpenRPG as Godot base | Real turn-based combat orchestration, battler animations, action selection, field scenes and transitions; existing Kenney art use fits the selected family. | Combat is round/action selection, not the agreed automatic ordinary attacks with occasional tactical pauses. Victory rewards are explicitly placeholders. The demo is not evidence that our reward or durable adventure-state systems already exist. Browser React components would need a Godot UI reimplementation or a separate browser UI bridge. Phone layout/export and durable restart must be proven. |
| Reuse local React question UI with a small game shell | Stem/table rendering, answer/explanation interface, exhibit pan/zoom, existing web tooling and offline installation patterns. | Still must build route travel, battle orchestration, sprite motion, question/game state contract and game persistence. Presentation can be richly themed without changing the question component's implementation technology. Existing study progress and Firebase sync must not become the game's progress store. |

### EmberQuest: source evidence

The [single game file](https://github.com/TheDroidYourLookingFor/EmberQuest/blob/8e260b00d01ec06e0acc36087ba7c4a187e3417e/index.html) loads Tabler, Supabase and pako from CDNs near its start. `awardExperience` has call sites for quest, login, contract, combat, dungeon-AFK, AFK and guild-raid rewards. `toggleAFK` starts an interval, sets `afkEnabled` and `lastAfkAt`, and persists slots; disabling it clears the interval and these flags. Therefore an ordinary question pause must be distinguished from turning off user AFK mode, background catch-up and session restart. A visual overlay alone is not proof of a complete pause.

The same file has character-slot serialization under `SAVE_KEY`, bank storage under `BANK_KEY`, backups and save-health metadata. Existing persistence is useful, but these separate domains do not establish an atomic commit spanning a newly added question record and its game reward. One durable source of truth or an explicitly recoverable commit scheme would still be required.

[LICENSE](https://github.com/TheDroidYourLookingFor/EmberQuest/blob/8e260b00d01ec06e0acc36087ba7c4a187e3417e/LICENSE) contains GPL version 3. Any adopted code and dependencies need a precise distribution-license inventory. This investigation does not decide legal compatibility of a combined product.

### OpenRPG: source evidence

The [README](https://github.com/gdquest-demos/godot-open-rpg/blob/d59f2f71bc046ac53239a4e590861269e7100a36/README.md) describes a work-in-progress demo and learning resource, explicitly not a framework. Its current README requests Godot 4.7.2 or newer; this is an upstream statement, not a verified available toolchain or successful local build.

[`combat.gd`](https://github.com/gdquest-demos/godot-open-rpg/blob/d59f2f71bc046ac53239a4e590861269e7100a36/src/combat/combat.gd) has explicit action-selection and action-execution phases, with signals and awaited animation completion. These provide concrete insertion points for a question phase. They do not automatically provide a serializable continuation after the app closes. `_get_victory_message_events` and `_get_loss_message_events` are described as placeholders for future outcome logic.

[`player.gd`](https://github.com/gdquest-demos/godot-open-rpg/blob/d59f2f71bc046ac53239a4e590861269e7100a36/src/common/player.gd) holds a live gamepiece reference and signals. The source tree includes Dialogic saving support; that is not evidence of a complete battle/question/adventure save model. This inspection did not establish such a model. [`project.godot`](https://github.com/gdquest-demos/godot-open-rpg/blob/d59f2f71bc046ac53239a4e590861269e7100a36/project.godot) declares GL Compatibility rendering. No project export preset appeared in the inspected tree; engine export capability must not be presented as a tested phone/browser build of this project.

[Code is MIT](https://github.com/gdquest-demos/godot-open-rpg/blob/d59f2f71bc046ac53239a4e590861269e7100a36/LICENSE). [Credits](https://github.com/gdquest-demos/godot-open-rpg/blob/d59f2f71bc046ac53239a4e590861269e7100a36/CREDITS.md) list Tiny Town, Tiny Dungeon, derived animated characters and listed audio as CC0. Addons and their example assets include their own notices; copy only an inventoried subset.

### Local reuse boundary

`StemContent` takes a stem string and renders paragraphs/tables: a small presentation seam. `ChoicesAndExplanationPane` takes a `Question`, `UserProgress`, selected choice and callbacks: reusable with an adapter, not entirely independent of study-app assumptions. `ExhibitZoomModal` implements touch/pointer pan and zoom but assumes `/data/` asset paths. Paths and offline packaging need adjustment for a separate app.

`recordAnswer` currently writes study progress inside a Dexie transaction. It does not also commit a game reward. This is an available persistence pattern, not a ready-made game transaction. The new app needs separate progress storage and a single consistent answer/reward/adventure transition.

## Smallest evidence needed before final adoption

Compare the same disposable encounter, same chosen art and same representative long question in the leading web and game-first approach. Include an exhibit/table, a question pause, submit/return to battle, and close/reopen before and after submission. Check that combat does not advance during reading and that a reward is neither lost nor duplicated. Include a phone-sized layout and networking-disabled run after installation.

The comparison should record actual work added, modified and discarded, plus observed behavior. That gives a defensible cost comparison without changing the established gameplay design. The user should react to question-screen styling separately: either a clean panel or a fantasy-themed panel can be built in either foundation.
