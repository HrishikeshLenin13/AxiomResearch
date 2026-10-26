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
