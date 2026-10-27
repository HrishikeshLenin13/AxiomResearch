import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as timer from '../src/course/lib/course-timer.ts';
import * as summary from '../src/course/lib/study-summary.ts';
const progress={completedModuleIds:['a'],moduleScores:{a:{score:.75,passed:true,attempts:2}}};
const modules=[{id:'a',title:'First'},{id:'b',title:'Second'}];

function csvRows(source){const rows=[];let row=[],cell='',quoted=false;for(let i=0;i<source.length;i++){const c=source[i];if(c==='"'){if(quoted&&source[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}else if(c===','&&!quoted){row.push(cell);cell='';}else if(c==='\r'&&source[i+1]==='\n'&&!quoted){row.push(cell);rows.push(row);row=[];cell='';i++;}else cell+=c;}assert.equal(quoted,false);return rows;}

test("elapsed-export-subsecond", () => {
const p={completedModuleIds:[],moduleScores:{}};const ms=999;assert.equal(timer.formatDuration(ms),"0m 0s");assert.ok(summary.studySummary(p,[],ms).includes("Study time: 0m 0s"));assert.ok(summary.studySummaryMarkdown(p,[],ms).includes("Study time: 0m 0s"));assert.equal(summary.studySummaryData(p,[],ms).studyTimeMs,ms);
});

test("elapsed-export-first-second", () => {
const p={completedModuleIds:[],moduleScores:{}};const ms=1001;assert.equal(timer.formatDuration(ms),"0m 1s");assert.ok(summary.studySummary(p,[],ms).includes("Study time: 0m 1s"));assert.ok(summary.studySummaryMarkdown(p,[],ms).includes("Study time: 0m 1s"));assert.equal(summary.studySummaryData(p,[],ms).studyTimeMs,ms);
});

test("elapsed-export-before-minute", () => {
const p={completedModuleIds:[],moduleScores:{}};const ms=59999;assert.equal(timer.formatDuration(ms),"0m 59s");assert.ok(summary.studySummary(p,[],ms).includes("Study time: 0m 59s"));assert.ok(summary.studySummaryMarkdown(p,[],ms).includes("Study time: 0m 59s"));assert.equal(summary.studySummaryData(p,[],ms).studyTimeMs,ms);
});

test("elapsed-export-minute", () => {
const p={completedModuleIds:[],moduleScores:{}};const ms=60000;assert.equal(timer.formatDuration(ms),"1m 0s");assert.ok(summary.studySummary(p,[],ms).includes("Study time: 1m 0s"));assert.ok(summary.studySummaryMarkdown(p,[],ms).includes("Study time: 1m 0s"));assert.equal(summary.studySummaryData(p,[],ms).studyTimeMs,ms);
});

test("elapsed-export-minute-second", () => {
const p={completedModuleIds:[],moduleScores:{}};const ms=61000;assert.equal(timer.formatDuration(ms),"1m 1s");assert.ok(summary.studySummary(p,[],ms).includes("Study time: 1m 1s"));assert.ok(summary.studySummaryMarkdown(p,[],ms).includes("Study time: 1m 1s"));assert.equal(summary.studySummaryData(p,[],ms).studyTimeMs,ms);
});

test("elapsed-export-before-hour", () => {
const p={completedModuleIds:[],moduleScores:{}};const ms=3599999;assert.equal(timer.formatDuration(ms),"59m 59s");assert.ok(summary.studySummary(p,[],ms).includes("Study time: 59m 59s"));assert.ok(summary.studySummaryMarkdown(p,[],ms).includes("Study time: 59m 59s"));assert.equal(summary.studySummaryData(p,[],ms).studyTimeMs,ms);
});

test("elapsed-export-hour", () => {
const p={completedModuleIds:[],moduleScores:{}};const ms=3600000;assert.equal(timer.formatDuration(ms),"1h 0m 0s");assert.ok(summary.studySummary(p,[],ms).includes("Study time: 1h 0m 0s"));assert.ok(summary.studySummaryMarkdown(p,[],ms).includes("Study time: 1h 0m 0s"));assert.equal(summary.studySummaryData(p,[],ms).studyTimeMs,ms);
});

test("elapsed-export-hour-second", () => {
const p={completedModuleIds:[],moduleScores:{}};const ms=3601000;assert.equal(timer.formatDuration(ms),"1h 0m 1s");assert.ok(summary.studySummary(p,[],ms).includes("Study time: 1h 0m 1s"));assert.ok(summary.studySummaryMarkdown(p,[],ms).includes("Study time: 1h 0m 1s"));assert.equal(summary.studySummaryData(p,[],ms).studyTimeMs,ms);
});

test("elapsed-export-hour-minute", () => {
const p={completedModuleIds:[],moduleScores:{}};const ms=3660000;assert.equal(timer.formatDuration(ms),"1h 1m 0s");assert.ok(summary.studySummary(p,[],ms).includes("Study time: 1h 1m 0s"));assert.ok(summary.studySummaryMarkdown(p,[],ms).includes("Study time: 1h 1m 0s"));assert.equal(summary.studySummaryData(p,[],ms).studyTimeMs,ms);
});

test("elapsed-export-day", () => {
const p={completedModuleIds:[],moduleScores:{}};const ms=86400000;assert.equal(timer.formatDuration(ms),"24h 0m 0s");assert.ok(summary.studySummary(p,[],ms).includes("Study time: 24h 0m 0s"));assert.ok(summary.studySummaryMarkdown(p,[],ms).includes("Study time: 24h 0m 0s"));assert.equal(summary.studySummaryData(p,[],ms).studyTimeMs,ms);
});

test("elapsed-export-day-second", () => {
const p={completedModuleIds:[],moduleScores:{}};const ms=86401000;assert.equal(timer.formatDuration(ms),"24h 0m 1s");assert.ok(summary.studySummary(p,[],ms).includes("Study time: 24h 0m 1s"));assert.ok(summary.studySummaryMarkdown(p,[],ms).includes("Study time: 24h 0m 1s"));assert.equal(summary.studySummaryData(p,[],ms).studyTimeMs,ms);
});

test("elapsed-export-fractional", () => {
const p={completedModuleIds:[],moduleScores:{}};const ms=12345.9;assert.equal(timer.formatDuration(ms),"0m 12s");assert.ok(summary.studySummary(p,[],ms).includes("Study time: 0m 12s"));assert.ok(summary.studySummaryMarkdown(p,[],ms).includes("Study time: 0m 12s"));assert.equal(summary.studySummaryData(p,[],ms).studyTimeMs,ms);
});

test("elapsed-export-zero", () => {
const p={completedModuleIds:[],moduleScores:{}};const ms=0;assert.equal(timer.formatDuration(ms),"0m 0s");assert.ok(summary.studySummary(p,[],ms).includes("Study time: 0m 0s"));assert.ok(summary.studySummaryMarkdown(p,[],ms).includes("Study time: 0m 0s"));assert.equal(summary.studySummaryData(p,[],ms).studyTimeMs,ms);
});

test("elapsed-export-week", () => {
const p={completedModuleIds:[],moduleScores:{}};const ms=604800000;assert.equal(timer.formatDuration(ms),"168h 0m 0s");assert.ok(summary.studySummary(p,[],ms).includes("Study time: 168h 0m 0s"));assert.ok(summary.studySummaryMarkdown(p,[],ms).includes("Study time: 168h 0m 0s"));assert.equal(summary.studySummaryData(p,[],ms).studyTimeMs,ms);
});

test("elapsed-export-safe-limit", () => {
const p={completedModuleIds:[],moduleScores:{}};const ms=9007199254740991;assert.equal(timer.formatDuration(ms),"2501999792h 59m 0s");assert.ok(summary.studySummary(p,[],ms).includes("Study time: 2501999792h 59m 0s"));assert.ok(summary.studySummaryMarkdown(p,[],ms).includes("Study time: 2501999792h 59m 0s"));assert.equal(summary.studySummaryData(p,[],ms).studyTimeMs,ms);
});

test("csv-roundtrip-comma", () => {
const ms=[{id:'known',title:"A, B"}];const p={completedModuleIds:['known'],moduleScores:{known:{score:.875,passed:true,attempts:1}}};const rows=csvRows(summary.studySummaryCsv(p,ms,1234));assert.deepEqual(rows[1],["A, B",'yes','88','1234']);assert.equal(rows.length,2);
});
