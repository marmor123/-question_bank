# Study RPG design

## Agreed direction

- The RPG is a separate app with fresh player progress. Existing study-app answers do not grant game progression or populate its redemption pool.
- Share maintained question content and corrections while keeping each app's answer history and progression separate.
- Core gameplay and question practice work fully offline.
- Design and evaluate the interface for phones first, with desktop support. Long clinical questions, answer choices, and battle controls must remain comfortable on small screens.
- Battle questions temporarily use a dedicated question screen with a small indicator of the move or reward at stake. Combat pauses while the player answers and reviews; after the player continues, the battle returns and animates the result.
- Most question practice happens in encounters along the adventure, interspersed with battles, discoveries, and rewards.
- Occasional battle question opportunities supplement that main practice loop.
- The initial adventure uses a route map where players select encounters, with illustrated locations and animated battles.
- Routes have small branching choices that reconnect before continuing toward the boss.
- Target roughly 20–30 minutes per adventure, with saving and resuming at any point. This is a pacing target, not a timer; reading explanations carries no time pressure.
- After each answer, automatically show the result and a short educational takeaway, with the full original explanation and images one tap away. Nothing advances until the player chooses to continue.
- Branches may offer different encounter types, such as battles, treasure, or questions. Question availability is independent of route choice: skipping a question encounter does not permanently hide questions, which remain available in later adventures until completed.
- Free-roaming world exploration is deferred; it may be reconsidered if a suitable reusable game makes it inexpensive.
- An incorrect answer in an adventure question encounter adds that question to the redemption pool and offers one different recovery question from the same specialty.
- A correct recovery answer earns its normal progression reward and allows the route to continue.
- If the recovery answer is also incorrect, that question also enters the redemption pool and the route still continues. Neither incorrect answer awards permanent progression.
- The initial game targets completing the finite question bank, rather than requiring an endless replay loop.
- Completion is interpreted as answering every question correctly at least once, either on the initial attempt or through redemption.
- Each question awards permanent progression once in the initial version, on its first qualifying correct answer. Repeating already-completed questions does not award further permanent progression in this version.
- Persistent character growth through question practice is the foundation.
- Battles incorporate occasional questions rather than requiring one for every attack.
- Question opportunities are optional advantages in ordinary fights.
- Each boss battle includes one required question phase.
- Incorrect battle answers produce a reduced effect rather than a failed move or a punitive counterattack; correct answers grant the stronger effect.
- The required boss question phase requires an attempt, not a correct answer to proceed.
- The player chooses what to study and enters an adventure matching that selection. Mixed adventures support mixed practice.
- Adventure content follows the study selection rather than enemies forcing unrelated question categories.
- Question practice contributes both to overall character progression and to progression in the practiced specialty.
- Overall character progression provides most basic combat strength; specialty progression unlocks distinctive abilities.
- Switching to a less-practiced specialty preserves the character's general strength while providing new specialty abilities to earn.
- Only correct answers award permanent overall and specialty progression. Incorrect answers still produce the agreed reduced battle effect but award no permanent progression.
- A Redemption Adventure provides practice drawn from incorrectly answered questions.
- A question is redeemed after one correct retry in a later session. That answer earns the normal correct-answer progression reward and removes the question from the redemption pool.
- Redemption is a game completion rule, not a claim of medical mastery.
- Redemption Adventures are available by choice, rather than mandatory checkpoints along the route.
- Redemption Adventures are accessed from a separate section, not from nodes or branches on the regular adventure route map.
- Within that section, redemption takes the form of short battle-based challenges that reuse the main game's combat and visuals.
- All study questions within Redemption challenges, including question-powered battle moves, come from the eligible missed-question pool.
- A correct answer redeems the question even if the player subsequently loses the battle. An incorrect answer leaves it in the pool for a future challenge.
- Redemption challenges do not offer an additional recovery question after an incorrect answer.
- After a defeat in Redemption, question-based consumable recovery uses another eligible missed question instead of a new question. Completing the attempt restores supplies regardless of correctness; a correct answer also redeems the question and grants its normal rewards.
- If no eligible missed questions remain for Redemption consumable recovery, restore the spent supplies for free.
- The Redemption section offers a single-specialty selection or "All specialties," showing the eligible missed-question count for each option. Both use the same short battle challenge format.
- A missed question becomes eligible for redemption in a subsequent adventure after the adventure in which it was missed is finished. There is no clock-based cooldown; the player may enter the separate Redemption section immediately afterward.
- Full specialty completion requires clearing both unanswered questions and questions awaiting redemption.
- A question's first qualifying correct answer, including redemption, awards coins alongside permanent progression. Incorrect answers award no answer coins.
- Battle victories award coins.
- In the initial version, each battle awards coins only on its first victory. A victory after earlier losses still earns that reward; replays after a victory do not award additional coins.
- Consecutive victories build a small coin bonus; defeat resets that bonus while preserving earned coins, character growth, and question results. Base victory rewards remain intact.
- The bonus applies only to battles eligible for a first-victory reward. Easy replays must not generate coin rewards.
- After defeat, the player may recover all consumables spent in that failed attempt by paying a small coin fee or completing one new question from the selected study scope. Recovery may also be skipped.
- Completing the recovery-cost question returns the spent supplies regardless of correctness, with its explanation available afterward. A correct answer also earns normal question rewards; an incorrect answer enters the redemption pool.
- This is a narrow exception to correctness-based rewards: restoring spent supplies does not grant new items or permanent progression for an incorrect answer.
- Recovery is charged once for the failed attempt, not separately per item, and cannot return more supplies than were spent in that attempt.
- Qualifying correct answers earn equal base progression and coin rewards, with a modest bonus for harder questions. Questions without difficulty data receive the base reward.
- In the initial version, powerful combat moves do not require questions of a particular difficulty.
- Coins buy cosmetics and limited tactical items, such as potions. They do not replace correct answers as the source of permanent character and specialty growth.
- Purchased items cannot reveal answers, bypass required questions, or mark questions as redeemed. New abilities and major strength increases remain tied to correct answers.

## Open decisions

- Whether the player develops one hero, a creature team, or a card collection. The user wants to choose this based on suitable existing open-source game foundations rather than commit before examining them.
- How specialty abilities differ and relate to combat actions.
- Question selection within the chosen study scope.
- Reward amounts and difficulty handling.
- Victory bonus size and cap, replay effects on the bonus, coin amounts, item prices, and tactical item limits.
- Consumable recovery fee and fallback when no new question remains in the selected scope.

## Future direction

- Optional account backup and synchronization can follow offline gameplay. Shared sign-in is a possibility, not a requirement; it must not merge study progress between apps.
- The user supports rewarding previously completed questions again when they become due for review. Review intervals and repeat rewards are deferred beyond the initial bank-completion goal.

## Provisional choices to playtest

- Each Redemption challenge contains up to five missed questions, or fewer if fewer remain eligible. Large pools are split into manageable challenges; players may stop after a challenge without losing progress. Five is an initial tuning value, not a permanent limit.
- The user is open to all visual styles, including pixel art and illustrated/mobile-RPG presentation. Do not narrow the art style before comparing concrete reusable sources.
- Prioritize reuse of visual design, assets, and selected features from ordinary open-source games; do not restrict research to educational games or require adopting a whole game's engine or mechanics. The user sees visual design as the main development challenge.
- Compare reusable visual material before choosing the final game format. Borrowing selected aspects from several games is acceptable, with attention to compatible asset licenses and a coherent visual style.
- Prefer an easier recovery question when difficulty data is available. This preference is provisional; difficulty selection and fallback rules remain open.
- Start with hybrid combat: automatic ordinary attacks and pauses for occasional tactical choices, including question opportunities.
- The user is uncertain about this format and wants the option to change it after playing. Keep combat pacing replaceable without redefining question rewards or persistent character progression.
- Revisit manual, automatic, and hybrid combat after a playable prototype; hybrid is not a final commitment.

The detailed battle loop and numerical tuning remain proposals, not settled requirements.
