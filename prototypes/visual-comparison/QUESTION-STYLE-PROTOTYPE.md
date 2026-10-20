# Disposable question-screen comparison

Question: should the adventure question screen use a clean reading panel or a fantasy field journal?

Run from the repository root:

```powershell
python -m http.server 8769 --bind 127.0.0.1 --directory prototypes/visual-comparison
```

Open http://127.0.0.1:8769/question-style-prototype.html?variant=A.

- A: clean reading panel.
- B: fantasy journal with parchment, chapter framing, and a compact answer list.
- Switch with the bottom arrows or keyboard Left/Right. The selected answer and feedback remain intact.
- Both use exactly the same fictional, nonmedical reading fixture. No question-bank content is embedded.
- Select an answer, confirm, expand the explanation, then Continue to the placeholder battle outcome.

This is a presentation comparison, not a game foundation or production UI. It has no persistence, engine integration, real battle animation, or source medical media. Journal styling is a proposal; it does not replace the agreed Kenney pixel-art direction. Neither option has been accepted.

Browser checks covered selecting a wrong answer, explicit confirmation, reduced-effect feedback, switching styles while preserving feedback, Continue, and reset. Clinical readability and physical-phone usability remain unverified.
