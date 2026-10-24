import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getActiveTimerMs, formatDuration } from '../src/course/lib/course-timer.ts';

test('active course time handles epoch zero, paused sessions and clock rollback', () => {
  assert.equal(getActiveTimerMs({timerAccumulatedMs:10, timerSessionStartedAt:0}, 100), 110);
  assert.equal(getActiveTimerMs({timerAccumulatedMs:10, timerSessionStartedAt:200}, 100), 10);
  assert.equal(getActiveTimerMs({timerAccumulatedMs:10, timerSessionStartedAt:null}, 100), 10);
  assert.equal(getActiveTimerMs({timerAccumulatedMs:NaN, timerSessionStartedAt:Infinity}, 100), 0);
});
test('normal course durations remain readable', () => {
  assert.equal(formatDuration(3_661_000), '1h 1m 1s');
  assert.equal(formatDuration(61_999), '1m 1s');
});

test('malformed durations render zero rather than negative or NaN labels', () => {
  for (const value of [-1, -60_000, NaN, Infinity]) assert.equal(formatDuration(value), '0m 0s');
});
