# Disposable question-to-combat playtest

Decision: [Evaluate the question-to-combat loop in a small prototype](https://github.com/marmor123/-question_bank/issues/5).

From this worktree root: `python -m http.server 8767 --bind 127.0.0.1`

Open http://127.0.0.1:8767/prototypes/visual-comparison/combat.html

The user chose one hero for the first playtest on 20 October 2026. This is provisional, not approval of the final player format. The already-selected Kenney pixel direction is preserved.

Two pacing variants share the same short route and rules: `?variant=hybrid` automatically exchanges ordinary attacks, while `?variant=manual` waits for each Attack press. The bottom arrows switch pacing without resetting in-memory progress. This comparison deliberately keeps the visual design stable to isolate the combat-control question.

Try the tower, deliberately miss its first question, answer the different recovery question, then enter the courtyard. Its question opportunity is optional; the guardian's question attempt is required. Feedback waits for Continue, which returns to combat and animates a stronger or weaker effect. Finish the adventure, then enter the separate Redemption section. Each challenge uses one eligible missed question. Correct answers survive simulated defeat.

All questions are explicitly fictional reading-comprehension fixtures. None of the local medical bank or source PDFs is included. Sprite source and CC0 license are inherited unchanged from the selected motion comparison.

Scope: a few-minute flow test, in-memory only. Refresh resets it. This does not implement the full adventure, offline installation/service worker, durable save/resume, medical images/tables, specialty selection/abilities, consumables, victory streaks, or balanced difficulty. A single growth counter stands in for permanent progression; separate overall/specialty growth is still required by the agreed design. Coin/damage values and one-question Redemption length are disposable tuning.

No prototype code should be promoted directly to production. No production engine choice is implied. The decision remains open until the user evaluates the pacing, interruptions and readability.
