# Closeboard

Sports market research desk. Not a tipster site.

The product shows model vs market, best available number, PLAY/PASS at a 3.0pp threshold, and a public ledger graded on closing-line value.

## What this MVP is

A working front-end with realistic simulated slate and ledger data. It is not a live odds feed and not a profitable model. Plug The Odds API into `src/lib/data.ts` when you have a key.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

- `/` landing
- `/board` today's disagreement
- `/ledger` public track record
- `/brief/[id]` match brief + analyst that refuses parlays

## Next wiring

1. Replace `SLATE` with a live odds pull + your model output.
2. Persist every published lean (odds + timestamp) at publish time.
3. Capture the closing line at kickoff. Never edit after that.
4. Add auth and billing for Desk / Pro.
5. Geo-gate marketing. Keep copy as research, not advice.

18+. You place your own bets at licensed operators.
