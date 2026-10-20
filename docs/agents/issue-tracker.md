# Issue tracker: GitHub

Issues and PRDs live in https://github.com/marmor123/-question_bank/issues.
Use the authenticated gh CLI. Use --repo marmor123/-question_bank explicitly until the local checkout's remote is verified.

## Conventions

- Create: gh issue create --repo marmor123/-question_bank --title "..." --body-file <file>
- Read: gh issue view <number> --repo marmor123/-question_bank --comments
- List: gh issue list --repo marmor123/-question_bank --state open --json number,title,body,labels,assignees
- Comment: gh issue comment <number> --repo marmor123/-question_bank --body-file <file>
- Label: gh issue edit <number> --repo marmor123/-question_bank --add-label "..." or --remove-label "..."
- Close: gh issue close <number> --repo marmor123/-question_bank

Use UTF-8 files with actual newlines for multiline issue bodies and comments.
When a skill says to publish to the tracker, create a GitHub issue.
When a skill says to fetch a ticket, read the issue and its comments.

## Pull requests as a triage surface

PRs as a request surface: no.

GitHub shares one number space between issues and pull requests. Resolve ambiguous references before acting.

## Wayfinding operations

- Map: a single issue labelled wayfinder:map. Its body contains Destination, Notes, Decisions so far, Not yet specified, and Out of scope.
- Child tickets: link issues to the map using GitHub native sub-issues. Use labels wayfinder:research, wayfinder:prototype, wayfinder:grilling, or wayfinder:task.
- Create tickets before wiring dependencies.
- To attach a child: POST repos/marmor123/-question_bank/issues/<map-number>/sub_issues with issue_id equal to the child's numeric database ID.
- Blocking: use native GitHub issue dependencies. POST repos/marmor123/-question_bank/issues/<blocked-number>/dependencies/blocked_by with issue_id equal to the blocker's numeric database ID, not its issue number or node ID.
- Retrieve numeric database IDs with gh api repos/marmor123/-question_bank/issues/<number> --jq .id.
- If native sub-issues are unavailable, maintain a task list of children in the map and a Part of reference in each child. If native dependencies are unavailable, use explicit Blocked by references in ticket bodies.
- Frontier: query the map's children, then select open, unassigned tickets with no open blockers. Preserve child order. Check dependency summaries or resolve fallback references; do not treat every open repository issue as a child.
- Claim: assign the selected ticket to the driving developer before working on it, using gh issue edit <number> --repo marmor123/-question_bank --add-assignee @me.
- Resolve: post a resolution comment, close the ticket, and append its linked title and a short gist to Decisions so far. The detailed decision remains in its ticket.
- Refer to maps and tickets by linked titles in user-facing text, not bare issue numbers.
