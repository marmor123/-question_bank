# First playable cardiology adventure

Agreed planning handoff, 21 October 2026. No production implementation is authorized.

Canonical decision discussion: [Define the first playable adventure and its acceptance checks](https://github.com/marmor123/-question_bank/issues/7), part of [Plan the first playable study RPG adventure](https://github.com/marmor123/-question_bank/issues/1).

## Status and purpose

The user agreed to the scope, acceptance rules, provisional tuning and implementation defaults below. This is the specification artifact for resolving the planning ticket. All acceptance checks are pending for the production slice. Disposable prototype results are evidence only within their documented scope.

Test whether a small, readable, offline study adventure is engaging: travel through one cardiology area, practice questions, fight a guardian and boss, retain growth through defeat, then revisit eligible misses in a separate Redemption battle. Target 20–30 minutes for the regular adventure as a pacing hypothesis, with no timer or pressure to shorten reading.

## Settled foundation

- Godot installed apps, with GDScript as the recommended implementation baseline. Android first, then iPhone, with desktop support. Browser/PWA is outside this first-playable target.
- Independent game UI, saves, answer history, rewards and progression. Share only versioned read-only question content and inventoried assets with the study app. Import no study progress or mutable study runtime/sync.
- Fullscreen, close-up top-down Kenney Tiny Town/Tiny Dungeon world. Older Pokémon-inspired non-question dialogue boxes; a separate clean clinical question screen.
- One hero, automatic ordinary attacks and pauses for tactical choices. Reuse selected assets and ideas; do not promote disposable prototype code or adopt a whole game's progression.
- Native presentation was human-approved. This does not prove overall cost savings, physical-phone usability, exported offline behavior, durable saves or migrations. Mac access for iPhone builds is not secured.

See the [foundation resolution](https://github.com/marmor123/-question_bank/issues/6#issuecomment-6322441551). Local evidence also includes `docs/adr/0001-independent-godot-game.md` and `prototypes/foundation-comparison/README.md`; these existing uncommitted files are not included in the published specification artifact.

## Area and encounter scope

For now, choosing where to travel chooses the study specialty. Local areas/enemies use their associated specialty. Only one cardiology area and one enemy type are included; a larger connected world is deferred. This replaces specialty-menu-first regular-adventure entry provisionally. Separate Redemption entry remains unchanged.

The provisional route is a starting clearing, a fork with optional stops, reconnection, a guardian checkpoint, then the boss. Tap authored paths/small clearings to walk; camera follows, supports drag-to-look and Return to hero. Obstacles bound travel. Camera actions do not start encounters.

| Location | Encounter | Required? | Completion |
| --- | --- | --- | --- |
| Before fork | Question stop A | Yes | Correct original answer, or one different recovery attempt after a miss |
| Branches | Question stops B and C | No | Same question/recovery flow |
| Branches | Treasure | No | Receive one potion, subject to carrying capacity |
| After reconnection | Ordinary guardian battle | Yes | Victory opens boss entrance for this adventure |
| End | Boss battle | Yes | Victory completes the adventure |

There are six route encounters. Merchant service in the starting clearing is not another required encounter. Put optional question B plus treasure on one branch and optional question C on the other, with backtracking available before the boss. Boss victory makes this regular adventure review-only; separate Redemption remains playable. Do not mark the sample or specialty complete just for defeating the boss.

Arrival never auto-starts an encounter: use Talk/Open/Challenge or an equivalent explicit action. Mark checkpoints clearly. Players can approach/leave without starting. Defeat leaves a battle checkpoint closed; retrying or visiting available optional question stops preserves progression/results. Cleared encounters permit passage and reward-free outcome/explanation review, with no replay in this slice.

Enemy direction: reuse the guardian look already tried, with a visibly distinct boss variant of that same type. The user must review exact boss styling before visual acceptance. Names, scene density, spacing, speed and motion can be tuned within the approved direction; no random encounters or unrestricted roaming are implied.

## Question content and selection

Use the inspected 12 standalone cardiology identities as the candidate pool:

`cardiology:p7`, `cardiology:p9`, `cardiology:p13`, `cardiology:p17`, `cardiology:p21`, `cardiology:p27`, `cardiology:p39`, `cardiology:p41`, `cardiology:p45`, `cardiology:p53`, `cardiology:p57`, `cardiology:p59`.

The [sample inspection](https://github.com/marmor123/-question_bank/issues/4#issuecomment-6287406164) establishes structural feasibility, not clinical correctness, final source/media fidelity or redistribution permission. Recheck selected source version, canonical identity, answer keys, objectives, structured tables, images and holds before packaging. Source text, exhibits and screenshots remain local; the full question bank is not approved for this game release.

Exclude every member of linked units, including their first items, from the package and every selection path. Linked content must fail first-playable readiness. Complete linked-unit behavior is deferred because ordered answers/context, immediate feedback and missed-only Redemption still need reconciliation.

- All regular question paths use standalone cardiology: route, combat, boss, recovery and consumable recovery.
- Prefer unanswered questions. After exhaustion, previously seen questions can keep retries and the boss phase possible, without additional rewards. A question missed in this adventure remains awaiting later Redemption even if a same-adventure retry is correct.
- Route recovery uses one different question from the same specialty. A recovery miss also enters the missed pool; passage opens after that attempt regardless of correctness. No incorrect answer awards permanent progression or answer coins.
- A full first pass can use up to nine questions: three route originals, three route recoveries, and three battle questions. The other three are a small reserve, not a guarantee against exhaustion after retries.
- Canonical question identity governs first-correct eligibility, not legacy IDs or source memberships. Do not duplicate rewards through content aliases or corrections.
- Community accuracy is source metadata, not a validated difficulty model. Flat rewards apply; difficulty bonuses are deferred. Recovery preference for easier questions must not invent difficulty classifications.
- Required missing stem/choice media, unusable answer keys or held content prevent readiness. Missing optional explanation material has an explicit unavailable state. Explanation-only assets must not appear before feedback.

## Reading flow

Show the dedicated clean question screen with a compact move/reward context indicator. Combat is fully paused through selection, submission, takeaway and explanation review. Submission shows result and a short educational takeaway automatically; full original explanation/images are one tap away. Wait for explicit Continue, then return to the battle and animate the committed result. There is no time limit for reading.

Long stems, 5–7 answer choices, structured tables and zoomable exhibits are part of acceptance, not optional polish. Preserve readable wrapping and deliberate scrolling, touch targets and phone safe areas. Review of cleared encounters grants nothing again.

## Combat and progression

| Battle | Optional tactical pauses per attempt | Required question phases |
| --- | ---: | --- |
| Ordinary guardian | 1 | None |
| Boss | 1 | 1, before the boss can be defeated |
| Redemption | Separate batch format below | Up to 5 attempts |

At each regular optional pause choose a question-powered move, one healing potion if available, or continue automatic attacks. Potion use consumes that pause's action; it cannot be followed by that pause's question move. Correct question answers cause the stronger move; incorrect answers still cause a reduced effect with no punitive counterattack. The boss phase cannot be bypassed by damage, a potion or declining an optional question; it requires an attempt, not correctness.

Start every battle attempt, including retries and Redemption, at full health. This does not replenish potions. Base health, damage, attack speed and exact pause triggers may be tuned during future implementation. The ordinary fight must be winnable without answering questions; the boss must be winnable with incorrect answers using sensible tactical choices; defeat must remain possible. Keep accepted pause counts, potion values and progression bonuses unless changed with the user.

| Qualifying event | Overall XP | Cardiology XP | Base coins |
| --- | ---: | ---: | ---: |
| First qualifying correct answer, including recovery/Redemption | 10 | 10 | 5 |
| First ordinary-battle victory | 0 | 0 | 10 |
| First boss victory | 0 | 0 | 20 |

No battle-victory XP; no incorrect-answer XP/coins. No repeat permanent question rewards. First victory after losses remains eligible for its base coins.

- At 20 overall XP, grant one level: +10% maximum health and ordinary-attack damage.
- At 30 cardiology XP, unlock +20% question-move damage for both stronger and reduced outcomes.
- Further upgrades are deferred; preserve XP beyond these thresholds. No claim of medical mastery follows from progression or redemption.
- First consecutive eligible victory has no bonus; second adds 2 coins, then increase by 2 per eligible consecutive victory, capped at 6 bonus coins per victory. Defeat resets the streak while retaining earned coins, growth and question results. Ineligible replay/review earns nothing.

## Potions, merchant and defeat

Start with one potion. Treasure contains another; capacity is two. A potion heals 40% of maximum health, capped at full health. The merchant sells potions for 5 coins, respecting capacity. Cosmetics are deferred.

After defeat, retry or leave while preserving committed questions/rewards. Optional recovery restores only potions spent in that failed attempt: pay 2 coins total or attempt one new eligible cardiology question. Correctness is not needed to restore supplies. A correct recovery-cost answer earns normal eligible rewards; a miss enters the missed pool. If no unanswered eligible question remains, offer free recovery. Recovery cannot multiply supplies or be claimed twice for the same expenditure.

The hero's full-health battle restart is separate from restoring potions. Purchase, consumption, recovery payment and recovery receipt must survive interruption consistently. Full-capacity/overlap handling is specified in Agreed implementation defaults below.

## Separate Redemption

Use the existing separate section, not a regular map branch. Misses become eligible only after their originating adventure finishes; no clock cooldown. Offer cardiology and All specialties with eligible counts; only cardiology exists in this slice.

One short battle contains up to five eligible missed questions, or fewer if fewer remain. Each is a required attempt with automatic attacks between questions. Do not add optional question draws outside the batch. Correct answers immediately redeem their identities and award normal first-qualifying-correct rewards even if the battle is later lost. Incorrect answers remain missed; no extra route-style recovery question follows.

After defeat, consumable recovery can use another eligible missed question, with restoration regardless of correctness and normal redemption/rewards on a correct answer. If none remain, restore spent supplies for free. This recovery is separate from the battle's five-question batch. An empty eligible pool starts no challenge and shows nothing to redeem.

Redemption victory earns the ordinary base of 10 coins under the first-victory/streak rules; stable challenge identity and post-completion behavior are specified below.

## Offline, resume and update contract

Package the selected read-only question revision, all required clinical media, game art and runtime resources for exported offline use. Readiness must verify usable selected content; do not install or copy the entire bank. All core play must work after process exit and a cold launch without networking, not just while an editor/session remains running.

Persist independently owned game state: hero/adventure location and encounters, battle/question phase, selected answer, results, first-correct flags, pending effects, missed pool and originating-adventure completion, coins/streak, both XP tracks/unlocks, inventory and recovery receipts. Answer outcome, rewards and next phase commit together before success is acknowledged. A pending effect resolves once even across termination.

Backgrounding pauses gameplay; return requires explicit resume. Restore hero position, encounter state, selected answer and reading/feedback phase. Failed writes are visible and preserve the prior valid state. Never silently reset or acknowledge an answer that was not committed.

An unfinished adventure stays on its original content version. Corrections apply to subsequent adventures without resetting canonical reward eligibility or progression. Save migrations retain a recoverable previous save. Incompatible/failed migration must not overwrite it or silently start fresh. The production storage format and recovery implementation are engineering choices that must satisfy these checks; the prototype's scratch persistence is not adopted.

## Acceptance checklist — all pending

Use isolated game test profiles and local content. Record device/OS, exported build and content/save versions for each result. Automated state checks supplement physical playtests; desktop phone-size rendering does not certify touch or usability.

| Check | Pass condition |
| --- | --- |
| Content boundary | Every selector excludes all linked members and out-of-scope specialties; invalid required media/keys/holds prevent readiness; canonical aliases cannot duplicate rewards |
| Presentation | Fullscreen world, close-up scenery and visible hero; approved dialogue style; dedicated clean question screen; user reviews boss variant |
| Movement | Paths/clearings walkable, obstacles rejected, offscreen reachable ground reachable; panning/recentering does not move hero or start encounters; retargeting does not cross gates |
| Explicit entry | Arriving never starts questions/battles; optional stops remain avoidable; checkpoint state is visible |
| Question gate | Wrong original offers a different recovery; two wrong answers still open passage and record both misses without answer rewards |
| Battle gate | Loss keeps gate closed; victory opens it permanently for this adventure; boss victory completes adventure |
| Cleared review | Passage and explanation/outcome review work; no replay, XP, coins, items or duplicate effects |
| Clinical reading | On actual phones, long stems, choices, tables and exhibits remain readable and reachable; images zoom; safe areas do not hide controls; no explanation leakage |
| Pause | No ordinary attacks or background catch-up during tactics/questions/feedback/menu/background; explicit Continue/resume required |
| Battle loop | Accepted pause counts and potion action cost; ordinary win without questions; boss win with incorrect answers and sensible tactics; loss remains possible |
| Required boss phase | Cannot bypass via high damage, declining optional question, potion, resume or retry; attempt suffices |
| Progression | First eligible correct grants 10/10 XP and 5 coins once; thresholds apply once; beyond-threshold XP retained; battle wins grant no XP |
| Same-adventure miss | A later correct repeat does not prematurely redeem or grant its deferred reward |
| Exhaustion | All-answer/miss/mixed exhausted pools keep required attempts/retries possible; recovery uses a different item; no extra rewards or infinite selection loop |
| Economy | Base rewards, streak increments/cap/reset, purchase price/capacity and one-time treasure checked; failed purchase/write does not lose coins |
| Defeat/recovery | Correct answers/XP/coins retained; health restarts full; only actually spent potions restored once; 2-coin, question, skip and exhaustion fallback paths checked |
| Redemption | Ineligible current-adventure misses excluded; up-to-five batch; no extra recovery after a miss; correct result survives defeat; empty pool safe; recovery uses eligible missed pool/free fallback |
| Offline cold launch | Exported installed package, networking disabled, process ended: launch/play/resume including clinical images, art, feedback, merchant and Redemption without downloads |
| Interruption matrix | Terminate before submit, during commit, after acknowledged feedback, before/during/after combat effect, at victory/gate, purchase and recovery; reload shows exactly one consistent result |
| Position resume | Exit while walking/at arrival, during camera pan, before/after gate and inside encounters; resume at a valid reachable position without bypassing checkpoints |
| Lifecycle | Background/foreground, screen lock and OS termination do not advance paused play, lose committed results or grant catch-up rewards |
| Storage failure | Inject failed/full/interrupted write and damaged latest save; retain all acknowledged results without duplication. If no intact save can recover them, block with an explicit recovery error and preserve evidence rather than silently resuming an older state as current |
| Update/migration | Update during unfinished adventure keeps its content; new content does not reset eligibility; successful schema migration retains state; failed/incompatible migration preserves recoverable save |
| App separation | Existing study answers do not change game state; game activity/reset/testing does not modify study progress or sync |
| Pacing/engagement | User plays the full clinical slice; record reading, travel and battle time separately; 20–30-minute target is evaluated without timers or forced advancement |

Physical Android and desktop are the first validation milestone. iPhone remains required but explicitly pending until Mac access and physical testing are available. Do not call iPhone supported or overall cross-platform acceptance complete before the same applicable checks pass there. Store publication and deployment are outside this plan.

## Agreed implementation defaults

The user accepted these remaining defaults after reviewing the draft. Combat numbers and presentation details remain tunable only within the stated boundaries and visual acceptance requirements.

1. **Route/end state:** put optional question B plus treasure on one branch and optional question C on the other; allow backtracking before the boss. Boss victory finishes the regular adventure. Afterward its map is review-only, and the separate Redemption section is playable. Skipped/unseen questions retain their identities for later regular adventures, but generating another regular adventure is deferred from this slice. Do not mark the sample/specialty complete merely for defeating the boss.
2. **Inventory edge cases:** at full health disable potion use without spending it; at capacity leave treasure unclaimed. Recovery restores only the still-unrecovered amount, respecting capacity; if purchases filled the bag, require making room before charging/attempting recovery. Resolve or explicitly skip a failed-attempt recovery offer before another attempt so outstanding recovery ledgers cannot stack.
3. **Redemption completion/rewards:** require the batch's question attempts before that enemy can be defeated; defeat may end it early. Use the ordinary first-victory base of 10 coins. Keep one challenge identity across retries and reopen; reviewed/won challenges cannot be replayed for coins. Correctly redeemed batch members are never asked again on retry; adapt remaining phases to the eligible remainder. If all were redeemed before a defeat, retain the results and end the challenge without a victory reward. Newly formed challenges require eligible misses, not an empty farming loop.
4. **Engineering defaults:** save the question order/assignment once drawn; choose unseen items in deterministic source order for this tiny test. Use an already-correct item before an ineligible miss when exhaustion forces reuse, always with zero rewards. For new-question consumable recovery the approved free fallback still applies. Apply unlocked stats on the next battle start so a question result cannot unexpectedly heal during combat. Round derived positive HP/damage/healing down to whole points (minimum one damage). Tune exact exchange timing and reduced/stronger base move values within the accepted balance checks and document chosen values with playtest evidence.

## Implementation order for a future handoff

This is ordering, not authorization to execute now. Each stage must preserve the accepted product flow rather than introduce debug controls into it.

1. Confirm the selected local content/media and asset inventory; define the read-only versioned package and isolated game-save identity. No full-bank import.
2. Define question/reward/phase and recovery state transitions; prove transaction/effect idempotency and safe failed writes with isolated state tests. Set the migration/recovery contract before calling saves durable.
3. Export a minimal native reading/save slice to physical Android early. Check long question/table/image reading, touch/safe areas, offline cold launch and answer interruptions before building the full route.
4. Author the bounded area and six encounter locations, movement/camera, explicit interaction, checkpoint state and position resume. Use accepted Kenney presentation; review branch/boss composition with the user.
5. Add the two regular hybrid battles, agreed tactical choices, progression, potion/merchant/recovery/streak rules and boss completion. Tune base combat numbers against stated pass conditions.
6. Add the separate Redemption batch and its eligibility/retry/recovery/empty-pool behavior. Run the complete reward/exhaustion/defeat matrix.
7. Run exported Android and desktop acceptance, update/migration/failure tests and full user playtest. Record failures/limitations rather than claiming prototype evidence as acceptance. Arrange Mac access and repeat applicable export/device checks on iPhone before its support claim.

## Explicitly deferred and known risks

Deferred: other specialty areas/enemies, mixed-area design, regular-adventure regeneration, all linked units, difficulty bonuses, cosmetics, further levels/abilities, creature collection, richer animation sets, unrestricted roaming, random encounters, replay of cleared encounters, endless farming, spaced-review rewards, accounts/cloud sync, browser/PWA, production deployment and full-bank release. Separate Redemption remains included.

Risks: the 12-item pool is small and not a balanced clinical curriculum; its source/media still need final verification. Longer reading may exceed the pacing target. The numerical tuning is unvalidated. Native question/table/exhibit work remains real adaptation. Physical touch, phone interruptions, offline exports, save reliability, migration and iPhone access are unvalidated. Content-version retention requires packaging old resources until unfinished adventures no longer reference them. No engine cost advantage or content redistribution rights are established by prototype success.

## Planning evidence

- [Usable sample and linked-item constraints](https://github.com/marmor123/-question_bank/issues/4#issuecomment-6287406164)
- [Question-to-combat playtest](https://github.com/marmor123/-question_bank/issues/5#issuecomment-6292760232)
- [World presentation and movement](https://github.com/marmor123/-question_bank/issues/10#issuecomment-6294027599)
- [Explicit entry and checkpoint/revisit rules](https://github.com/marmor123/-question_bank/issues/11#issuecomment-6294480238)
- [Technical foundation and integration boundaries](https://github.com/marmor123/-question_bank/issues/6#issuecomment-6322441551)
- Local, uncommitted evidence not included in the specification artifact: `docs/foundation-platform-check.md`, `docs/foundation-reuse-research.md`, `docs/world-map-interface-reuse.md`, and `prototypes/foundation-comparison/README.md`.

