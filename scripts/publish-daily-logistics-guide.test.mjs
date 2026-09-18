import assert from "node:assert/strict"
import test from "node:test"
import { editorialArticles } from "./logistics-editorial-library.mjs"
import {
  addDays,
  chooseIntervalDays,
  scheduleDecision,
  validateArticle,
} from "./publish-daily-logistics-guide.mjs"

test("date arithmetic stays on calendar days", () => {
  assert.equal(addDays("2026-09-18", 1), "2026-09-19")
  assert.equal(addDays("2026-12-31", 3), "2027-01-03")
})

test("schedule waits until the persisted random date", () => {
  const state = { nextPublishOn: "2026-09-20" }
  assert.deepEqual(scheduleDecision("2026-09-19", state, null), {
    due: false,
    reason: "waiting",
    nextPublishOn: "2026-09-20",
  })
  assert.equal(scheduleDecision("2026-09-20", state, null).due, true)
})

test("first run becomes due one day after the latest managed post", () => {
  assert.equal(scheduleDecision("2026-09-18", null, "2026-09-17").due, true)
  assert.equal(scheduleDecision("2026-09-17", null, "2026-09-17").due, false)
})

test("manual interval override accepts only one to three days", () => {
  const previous = process.env.DAILY_POST_INTERVAL_DAYS
  try {
    process.env.DAILY_POST_INTERVAL_DAYS = "2"
    assert.equal(chooseIntervalDays(), 2)
    process.env.DAILY_POST_INTERVAL_DAYS = "4"
    assert.throws(() => chooseIntervalDays(), /must be 1, 2, or 3/)
  } finally {
    if (previous === undefined) delete process.env.DAILY_POST_INTERVAL_DAYS
    else process.env.DAILY_POST_INTERVAL_DAYS = previous
  }
})

test("every curated article passes the publication quality gate", () => {
  for (const article of editorialArticles) {
    const research = article.sourceIds.map((id) => ({
      id,
      name: id,
      url: `https://example.com/${id}`,
      text: "independent authority source material ".repeat(50),
    }))
    assert.doesNotThrow(
      () => validateArticle({ ...article }, research, { skipPublishedSimilarity: true }),
      article.key,
    )
  }
})

test("formulaic copy is rejected", () => {
  const base = editorialArticles[0]
  const research = base.sourceIds.map((id) => ({
    id,
    name: id,
    url: `https://example.com/${id}`,
    text: "independent authority source material ".repeat(50),
  }))
  assert.throws(
    () => validateArticle({ ...base, summary: `本文基于权威资料。${base.summary}` }, research, { skipPublishedSimilarity: true }),
    /formulaic/,
  )
})
