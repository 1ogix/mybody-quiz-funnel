# Debugging: `npm run dev` Issues

## Problem 1 — `--webpack` flag removed from dev script

**Symptom:** `npm run dev` hangs silently with no output and no server ever starts.

**Cause:** The `package.json` `dev` script was changed from `next dev --webpack` to `next dev`. Without the `--webpack` flag, `next dev` on this project hangs indefinitely.

**Fix:** Restore the flag in `package.json`:

```json
"dev": "next dev --webpack"
```

---

## Problem 2 — Stale lock file

**Symptom:** After an interrupted `next dev` run, subsequent starts fail with:

```
Unable to acquire lock, is another instance running?
```

**Cause:** `.next/dev/lock` was left behind by the previously interrupted process.

**Fix:**

```bash
rm -f .next/dev/lock
```

---

## Problem 3 — Corrupted `.next` build cache

**Symptom:** After clearing the lock and restarting, the server starts but the first page load returns "Internal Server Error" with errors like:

```
Cannot find module '.next/dev/server/middleware-manifest.json'
ENOENT pages-manifest.json
```

**Cause:** The `.next` cache directory is in a corrupted or incomplete state from the prior interrupted run.

**Fix:** Wipe the cache entirely and restart:

```bash
rm -rf .next
npm run dev
```
