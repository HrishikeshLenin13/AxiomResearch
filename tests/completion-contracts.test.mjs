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

test("resume-preserves-an-already-active-start", () => {
const p={timerAccumulatedMs:5,timerSessionStartedAt:100};assert.deepEqual(timer.resumeCourseTimer(p,999),p);assert.notEqual(timer.resumeCourseTimer(p,999),p);
});

test("resume-starts-a-paused-session-at-the-explicit-time", () => {
const p={timerAccumulatedMs:5,timerSessionStartedAt:null};assert.equal(timer.resumeCourseTimer(p,999).timerSessionStartedAt,999);assert.equal(p.timerSessionStartedAt,null);
});

test("invalid-resume-times-do-not-mutate-input", () => {
const p={timerAccumulatedMs:5,timerSessionStartedAt:null};for(const time of [NaN,Infinity,-Infinity])assert.throws(()=>timer.resumeCourseTimer(p,time));assert.equal(p.timerSessionStartedAt,null);
});

test("invalid-pause-times-do-not-clear-a-session", () => {
const p={timerAccumulatedMs:5,timerSessionStartedAt:10};for(const time of [NaN,Infinity,-Infinity])assert.throws(()=>timer.pauseCourseTimer(p,time));assert.equal(p.timerSessionStartedAt,10);
});

test("structured-summary-ignores-unknown-completed-ids", () => {
const r=summary.studySummaryData({...progress,completedModuleIds:['missing']},modules,0);assert.equal(r.modules[0].passed,false);assert.equal(r.modules.length,2);
});

test("structured-summary-retains-course-order", () => {
const r=summary.studySummaryData(progress,[...modules].reverse(),0);assert.deepEqual(r.modules.map(m=>m.title),['Second','First']);
});

test("structured-summary-bounds-negative-scores", () => {
const r=summary.studySummaryData({...progress,moduleScores:{a:{score:-2}}},modules,0);assert.equal(r.modules[0].score,0);assert.equal(r.modules[1].score,null);
});

test("structured-summary-bounds-overfull-scores", () => {
const r=summary.studySummaryData({...progress,moduleScores:{a:{score:2}}},modules,0);assert.equal(r.modules[0].score,1);
});

test("structured-summary-does-not-export-nonfinite-scores", () => {
for(const score of [NaN,Infinity,-Infinity])assert.equal(summary.studySummaryData({...progress,moduleScores:{a:{score}}},modules,0).modules[0].score,null);
});

test("structured-summary-excludes-account-metadata", () => {
const r=summary.studySummaryData({...progress,email:'hidden',volunteerId:'hidden',accessCodeUsed:'hidden'},modules,0);assert.ok(!JSON.stringify(r).includes('hidden'));
});

test("structured-summary-does-not-export-unknown-module-records", () => {
const r=summary.studySummaryData({...progress,moduleScores:{secret:{score:1}}},modules,0);assert.ok(!JSON.stringify(r).includes('secret'));assert.equal(r.modules[0].score,null);
});
