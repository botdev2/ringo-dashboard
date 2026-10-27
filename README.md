# Ringo Dashboard

Live view of the three Ringo Postgres backends: RIngomarket, soittamo, and Telegram Ops Staging.

Charts are queried from those databases. New calls, leads, and sales are recorded locally as they appear and pushed to the browser over server-sent events.

Phone numbers, personal names, emails, addresses, notes, and transcripts are not stored or shown. Seller organizations are listed by company name with their campaign, lead, call, and sale counts. Call centres and operator organizations are listed when a database has them.

## Run

Set `RINGOMARKET_DATABASE_URL`, `SOITTAMO_DATABASE_URL`, and `STAGING_DATABASE_URL`. Optional `DASHBOARD_TOKEN` requires a login cookie. `POLL_MS` defaults to 10000. `DATA_DIR` is the SQLite directory.

```bash
npm install
npm start
```

`GET /health` stays open and does not query the databases.
