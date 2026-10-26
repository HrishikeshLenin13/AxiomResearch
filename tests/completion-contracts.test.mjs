import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as timer from '../src/course/lib/course-timer.ts';
import * as summary from '../src/course/lib/study-summary.ts';
const progress={completedModuleIds:['a'],moduleScores:{a:{score:.75,passed:true,attempts:2}}};
const modules=[{id:'a',title:'First'},{id:'b',title:'Second'}];

test("duration-normalizes-negative-time", () => {
assert.equal(timer.formatDuration(-1),'0m 0s');assert.equal(timer.getActiveTimerMs({timerAccumulatedMs:-1,timerSessionStartedAt:null},100),0);
});

test("duration-normalizes-nan-time", () => {
assert.equal(timer.formatDuration(NaN),'0m 0s');assert.equal(timer.getActiveTimerMs({timerAccumulatedMs:NaN,timerSessionStartedAt:null},100),0);
});

test("duration-normalizes-infinite-time", () => {
assert.equal(timer.formatDuration(Infinity),'0m 0s');assert.equal(timer.getActiveTimerMs({timerAccumulatedMs:Infinity,timerSessionStartedAt:null},100),0);
});

test("duration-formats-subsecond", () => {
assert.equal(timer.formatDuration(999),"0m 0s");assert.equal(timer.formatDuration(999+0.4),"0m 0s");
});

test("duration-formats-minute-boundary", () => {
assert.equal(timer.formatDuration(60000),"1m 0s");assert.equal(timer.formatDuration(60000+0.4),"1m 0s");
});

test("duration-formats-hour-boundary", () => {
assert.equal(timer.formatDuration(3600000),"1h 0m 0s");assert.equal(timer.formatDuration(3600000+0.4),"1h 0m 0s");
});

test("duration-formats-mixed-units", () => {
assert.equal(timer.formatDuration(3661000),"1h 1m 1s");assert.equal(timer.formatDuration(3661000+0.4),"1h 1m 1s");
});

test("active-time-counts-session-plus-accumulation", () => {
const p={timerAccumulatedMs:25,timerSessionStartedAt:100};assert.equal(timer.getActiveTimerMs(p,150),75);assert.equal(p.timerAccumulatedMs,25);
});

test("clock-rewind-does-not-subtract-earned-time", () => {
assert.equal(timer.getActiveTimerMs({timerAccumulatedMs:25,timerSessionStartedAt:100},50),25);
});

test("missing-session-keeps-accumulated-time", () => {
assert.equal(timer.getActiveTimerMs({timerAccumulatedMs:25,timerSessionStartedAt:null},500),25);
});

test("invalid-start-keeps-accumulated-time", () => {
for(const value of [NaN,Infinity])assert.equal(timer.getActiveTimerMs({timerAccumulatedMs:25,timerSessionStartedAt:value},500),25);
});

test("safe-ceiling-applies-after-session-addition", () => {
assert.equal(timer.getActiveTimerMs({timerAccumulatedMs:Number.MAX_SAFE_INTEGER-1,timerSessionStartedAt:0},5),Number.MAX_SAFE_INTEGER);
});

test("paused-timer-does-not-accrue-between-reads", () => {
const p=timer.pauseCourseTimer({timerAccumulatedMs:0,timerSessionStartedAt:100},150);assert.equal(timer.getActiveTimerMs(p,200),50);assert.equal(timer.getActiveTimerMs(p,1000),50);
});

test("repeated-pause-does-not-double-count", () => {
const p=timer.pauseCourseTimer({timerAccumulatedMs:5,timerSessionStartedAt:100},120);assert.deepEqual(timer.pauseCourseTimer(p,200),p);
});

test("pause-preserves-unrelated-progress-metadata", () => {
const p={timerAccumulatedMs:5,timerSessionStartedAt:100,module:'a'};assert.equal(timer.pauseCourseTimer(p,120).module,'a');assert.equal(p.timerSessionStartedAt,100);
});
