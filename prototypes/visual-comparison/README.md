# Disposable visual comparison

Decision: [Choose the visual direction from phone-sized scene comparisons](https://github.com/marmor123/-question_bank/issues/3).

Run from this directory: `python -m http.server 8766 --bind 127.0.0.1`

Open `http://127.0.0.1:8766/?variant=A`. Variants A, B and C share a screen switcher and illustrative content, but use different route structure and battle framing.

This is a standalone mockup because the planned RPG is separate from the existing study app. It uses source-hosted reference previews, not vendored assets or an integrated asset pipeline. Preview access needs a network connection; this is not a validation of the game's offline requirement. External source URLs may change.

No engine, player format, animation quality, or clinical answer is validated here. No storage or production build exists. The floating switcher is only part of this disposable artifact. No prototype code is to be promoted to production.

Credits and limitations appear beside each preview. Wesnoth file-level provenance and licensing remain unresolved before asset import; no Wesnoth asset files are committed. Kenney and KayKit source references are linked in the page.

Human feedback: B rejected; A and C remain undecided. The user requested animated battle examples before choosing.

## Motion comparison

Open `http://127.0.0.1:8766/motion.html?variant=A`. Switch between A and C; Attack and Spell each play a bounded exchange, Question pauses, and Continue returns with a spell. Half speed is available. Nothing auto-plays or persists.

A uses the actual Kenney sprite sheet with authored translation/recoil/effects. C uses embedded skeletal clips in older official KayKit 1.0 character files. Camera, stage geometry, approach motion, and the spell orb are prototype code. No production runtime or player format is selected.

Sources imported unchanged on 2026-10-20:

- Kenney Tiny Dungeon 1.0: `https://kenney.nl/media/pages/assets/tiny-dungeon/f8422efb44-1674742415/kenney_tiny-dungeon.zip`, `Tilemap/tilemap_packed.png` saved as `assets/tiny-dungeon.png`.
- KayKit Adventurers: commit `672074b73ba276876a19e8816ecdc5241817ab47`, `addons/kaykit_character_pack_adventures/Characters/gltf/Knight.glb`.
- KayKit Skeletons: commit `15b62b9bad122f72926c10fb14d622c73819fa54`, `addons/kaykit_character_pack_skeletons/Characters/gltf/Skeleton_Warrior.glb`.

All three source licenses are CC0 and retained in `assets/`. Three.js 0.170.0 (MIT) is loaded from jsDelivr; no library code is vendored. This network dependency belongs to the disposable viewer, not the offline game plan.

Observed clips used: Idle, 1H_Melee_Attack_Slice_Horizontal, 1H_Melee_Attack_Chop, Spellcast_Shoot, Hit_A. These older bundled clips do not verify compatibility of newer separate animation packs.

