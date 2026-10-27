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

test("csv-roundtrip-quote", () => {
const ms=[{id:'known',title:"A \"B\""}];const p={completedModuleIds:['known'],moduleScores:{known:{score:.875,passed:true,attempts:1}}};const rows=csvRows(summary.studySummaryCsv(p,ms,1234));assert.deepEqual(rows[1],["A \"B\"",'yes','88','1234']);assert.equal(rows.length,2);
});

test("csv-roundtrip-crlf", () => {
const ms=[{id:'known',title:"A\r\nB"}];const p={completedModuleIds:['known'],moduleScores:{known:{score:.875,passed:true,attempts:1}}};const rows=csvRows(summary.studySummaryCsv(p,ms,1234));assert.deepEqual(rows[1],["A\r\nB",'yes','88','1234']);assert.equal(rows.length,2);
});

test("csv-roundtrip-tab", () => {
const ms=[{id:'known',title:"A\tB"}];const p={completedModuleIds:['known'],moduleScores:{known:{score:.875,passed:true,attempts:1}}};const rows=csvRows(summary.studySummaryCsv(p,ms,1234));assert.deepEqual(rows[1],["A\tB",'yes','88','1234']);assert.equal(rows.length,2);
});

test("csv-roundtrip-unicode", () => {
const ms=[{id:'known',title:"Caf\u00e9 \u5b66\u7fd2 \ud83d\udcda"}];const p={completedModuleIds:['known'],moduleScores:{known:{score:.875,passed:true,attempts:1}}};const rows=csvRows(summary.studySummaryCsv(p,ms,1234));assert.deepEqual(rows[1],["Caf\u00e9 \u5b66\u7fd2 \ud83d\udcda",'yes','88','1234']);assert.equal(rows.length,2);
});

test("csv-roundtrip-formula", () => {
const ms=[{id:'known',title:"=SUM(A1:A2)"}];const p={completedModuleIds:['known'],moduleScores:{known:{score:.875,passed:true,attempts:1}}};const rows=csvRows(summary.studySummaryCsv(p,ms,1234));assert.deepEqual(rows[1],["'=SUM(A1:A2)",'yes','88','1234']);assert.equal(rows.length,2);
});

test("csv-roundtrip-plus", () => {
const ms=[{id:'known',title:"+2+3"}];const p={completedModuleIds:['known'],moduleScores:{known:{score:.875,passed:true,attempts:1}}};const rows=csvRows(summary.studySummaryCsv(p,ms,1234));assert.deepEqual(rows[1],["'+2+3",'yes','88','1234']);assert.equal(rows.length,2);
});

test("csv-roundtrip-minus", () => {
const ms=[{id:'known',title:"-2+3"}];const p={completedModuleIds:['known'],moduleScores:{known:{score:.875,passed:true,attempts:1}}};const rows=csvRows(summary.studySummaryCsv(p,ms,1234));assert.deepEqual(rows[1],["'-2+3",'yes','88','1234']);assert.equal(rows.length,2);
});

test("csv-roundtrip-at", () => {
const ms=[{id:'known',title:"@test"}];const p={completedModuleIds:['known'],moduleScores:{known:{score:.875,passed:true,attempts:1}}};const rows=csvRows(summary.studySummaryCsv(p,ms,1234));assert.deepEqual(rows[1],["'@test",'yes','88','1234']);assert.equal(rows.length,2);
});

test("csv-roundtrip-spaced-formula", () => {
const ms=[{id:'known',title:"  =1+2"}];const p={completedModuleIds:['known'],moduleScores:{known:{score:.875,passed:true,attempts:1}}};const rows=csvRows(summary.studySummaryCsv(p,ms,1234));assert.deepEqual(rows[1],["'  =1+2",'yes','88','1234']);assert.equal(rows.length,2);
});

test("csv-roundtrip-tab-formula", () => {
const ms=[{id:'known',title:"\t=1"}];const p={completedModuleIds:['known'],moduleScores:{known:{score:.875,passed:true,attempts:1}}};const rows=csvRows(summary.studySummaryCsv(p,ms,1234));assert.deepEqual(rows[1],["'\t=1",'yes','88','1234']);assert.equal(rows.length,2);
});

test("csv-roundtrip-line-leading", () => {
const ms=[{id:'known',title:"\nlabel"}];const p={completedModuleIds:['known'],moduleScores:{known:{score:.875,passed:true,attempts:1}}};const rows=csvRows(summary.studySummaryCsv(p,ms,1234));assert.deepEqual(rows[1],["'\nlabel",'yes','88','1234']);assert.equal(rows.length,2);
});

test("csv-roundtrip-empty", () => {
const ms=[{id:'known',title:""}];const p={completedModuleIds:['known'],moduleScores:{known:{score:.875,passed:true,attempts:1}}};const rows=csvRows(summary.studySummaryCsv(p,ms,1234));assert.deepEqual(rows[1],["",'yes','88','1234']);assert.equal(rows.length,2);
});

test("csv-roundtrip-backslash", () => {
const ms=[{id:'known',title:"A\\B"}];const p={completedModuleIds:['known'],moduleScores:{known:{score:.875,passed:true,attempts:1}}};const rows=csvRows(summary.studySummaryCsv(p,ms,1234));assert.deepEqual(rows[1],["A\\B",'yes','88','1234']);assert.equal(rows.length,2);
});

test("csv-roundtrip-html", () => {
const ms=[{id:'known',title:"<script>title</script>"}];const p={completedModuleIds:['known'],moduleScores:{known:{score:.875,passed:true,attempts:1}}};const rows=csvRows(summary.studySummaryCsv(p,ms,1234));assert.deepEqual(rows[1],["<script>title</script>",'yes','88','1234']);assert.equal(rows.length,2);
});

test("structured-title-comma", () => {
const input={completedModuleIds:['known','stale'],moduleScores:{known:{score:.25,passed:true,attempts:1},stale:{score:1}},account:'secret'};const ms=[{id:'known',title:"A, B"}];const data=summary.studySummaryData(input,ms,1000);assert.deepEqual(data.modules,[{title:"A, B",passed:true,score:.25}]);assert.equal(JSON.stringify(data).includes('secret'),false);assert.equal(summary.studySummaryStats(input,ms).total,1);assert.equal(input.completedModuleIds.length,2);
});

test("structured-title-quote", () => {
const input={completedModuleIds:['known','stale'],moduleScores:{known:{score:.25,passed:true,attempts:1},stale:{score:1}},account:'secret'};const ms=[{id:'known',title:"A \"B\""}];const data=summary.studySummaryData(input,ms,1000);assert.deepEqual(data.modules,[{title:"A \"B\"",passed:true,score:.25}]);assert.equal(JSON.stringify(data).includes('secret'),false);assert.equal(summary.studySummaryStats(input,ms).total,1);assert.equal(input.completedModuleIds.length,2);
});

test("structured-title-crlf", () => {
const input={completedModuleIds:['known','stale'],moduleScores:{known:{score:.25,passed:true,attempts:1},stale:{score:1}},account:'secret'};const ms=[{id:'known',title:"A\r\nB"}];const data=summary.studySummaryData(input,ms,1000);assert.deepEqual(data.modules,[{title:"A\r\nB",passed:true,score:.25}]);assert.equal(JSON.stringify(data).includes('secret'),false);assert.equal(summary.studySummaryStats(input,ms).total,1);assert.equal(input.completedModuleIds.length,2);
});

test("structured-title-tab", () => {
const input={completedModuleIds:['known','stale'],moduleScores:{known:{score:.25,passed:true,attempts:1},stale:{score:1}},account:'secret'};const ms=[{id:'known',title:"A\tB"}];const data=summary.studySummaryData(input,ms,1000);assert.deepEqual(data.modules,[{title:"A\tB",passed:true,score:.25}]);assert.equal(JSON.stringify(data).includes('secret'),false);assert.equal(summary.studySummaryStats(input,ms).total,1);assert.equal(input.completedModuleIds.length,2);
});

test("structured-title-unicode", () => {
const input={completedModuleIds:['known','stale'],moduleScores:{known:{score:.25,passed:true,attempts:1},stale:{score:1}},account:'secret'};const ms=[{id:'known',title:"Caf\u00e9 \u5b66\u7fd2 \ud83d\udcda"}];const data=summary.studySummaryData(input,ms,1000);assert.deepEqual(data.modules,[{title:"Caf\u00e9 \u5b66\u7fd2 \ud83d\udcda",passed:true,score:.25}]);assert.equal(JSON.stringify(data).includes('secret'),false);assert.equal(summary.studySummaryStats(input,ms).total,1);assert.equal(input.completedModuleIds.length,2);
});

test("structured-title-formula", () => {
const input={completedModuleIds:['known','stale'],moduleScores:{known:{score:.25,passed:true,attempts:1},stale:{score:1}},account:'secret'};const ms=[{id:'known',title:"=SUM(A1:A2)"}];const data=summary.studySummaryData(input,ms,1000);assert.deepEqual(data.modules,[{title:"=SUM(A1:A2)",passed:true,score:.25}]);assert.equal(JSON.stringify(data).includes('secret'),false);assert.equal(summary.studySummaryStats(input,ms).total,1);assert.equal(input.completedModuleIds.length,2);
});

test("structured-title-plus", () => {
const input={completedModuleIds:['known','stale'],moduleScores:{known:{score:.25,passed:true,attempts:1},stale:{score:1}},account:'secret'};const ms=[{id:'known',title:"+2+3"}];const data=summary.studySummaryData(input,ms,1000);assert.deepEqual(data.modules,[{title:"+2+3",passed:true,score:.25}]);assert.equal(JSON.stringify(data).includes('secret'),false);assert.equal(summary.studySummaryStats(input,ms).total,1);assert.equal(input.completedModuleIds.length,2);
});

test("structured-title-minus", () => {
const input={completedModuleIds:['known','stale'],moduleScores:{known:{score:.25,passed:true,attempts:1},stale:{score:1}},account:'secret'};const ms=[{id:'known',title:"-2+3"}];const data=summary.studySummaryData(input,ms,1000);assert.deepEqual(data.modules,[{title:"-2+3",passed:true,score:.25}]);assert.equal(JSON.stringify(data).includes('secret'),false);assert.equal(summary.studySummaryStats(input,ms).total,1);assert.equal(input.completedModuleIds.length,2);
});

test("structured-title-at", () => {
const input={completedModuleIds:['known','stale'],moduleScores:{known:{score:.25,passed:true,attempts:1},stale:{score:1}},account:'secret'};const ms=[{id:'known',title:"@test"}];const data=summary.studySummaryData(input,ms,1000);assert.deepEqual(data.modules,[{title:"@test",passed:true,score:.25}]);assert.equal(JSON.stringify(data).includes('secret'),false);assert.equal(summary.studySummaryStats(input,ms).total,1);assert.equal(input.completedModuleIds.length,2);
});

test("structured-title-spaced-formula", () => {
const input={completedModuleIds:['known','stale'],moduleScores:{known:{score:.25,passed:true,attempts:1},stale:{score:1}},account:'secret'};const ms=[{id:'known',title:"  =1+2"}];const data=summary.studySummaryData(input,ms,1000);assert.deepEqual(data.modules,[{title:"  =1+2",passed:true,score:.25}]);assert.equal(JSON.stringify(data).includes('secret'),false);assert.equal(summary.studySummaryStats(input,ms).total,1);assert.equal(input.completedModuleIds.length,2);
});

test("structured-title-tab-formula", () => {
const input={completedModuleIds:['known','stale'],moduleScores:{known:{score:.25,passed:true,attempts:1},stale:{score:1}},account:'secret'};const ms=[{id:'known',title:"\t=1"}];const data=summary.studySummaryData(input,ms,1000);assert.deepEqual(data.modules,[{title:"\t=1",passed:true,score:.25}]);assert.equal(JSON.stringify(data).includes('secret'),false);assert.equal(summary.studySummaryStats(input,ms).total,1);assert.equal(input.completedModuleIds.length,2);
});

test("structured-title-line-leading", () => {
const input={completedModuleIds:['known','stale'],moduleScores:{known:{score:.25,passed:true,attempts:1},stale:{score:1}},account:'secret'};const ms=[{id:'known',title:"\nlabel"}];const data=summary.studySummaryData(input,ms,1000);assert.deepEqual(data.modules,[{title:"\nlabel",passed:true,score:.25}]);assert.equal(JSON.stringify(data).includes('secret'),false);assert.equal(summary.studySummaryStats(input,ms).total,1);assert.equal(input.completedModuleIds.length,2);
});

test("structured-title-empty", () => {
const input={completedModuleIds:['known','stale'],moduleScores:{known:{score:.25,passed:true,attempts:1},stale:{score:1}},account:'secret'};const ms=[{id:'known',title:""}];const data=summary.studySummaryData(input,ms,1000);assert.deepEqual(data.modules,[{title:"",passed:true,score:.25}]);assert.equal(JSON.stringify(data).includes('secret'),false);assert.equal(summary.studySummaryStats(input,ms).total,1);assert.equal(input.completedModuleIds.length,2);
});

test("structured-title-backslash", () => {
const input={completedModuleIds:['known','stale'],moduleScores:{known:{score:.25,passed:true,attempts:1},stale:{score:1}},account:'secret'};const ms=[{id:'known',title:"A\\B"}];const data=summary.studySummaryData(input,ms,1000);assert.deepEqual(data.modules,[{title:"A\\B",passed:true,score:.25}]);assert.equal(JSON.stringify(data).includes('secret'),false);assert.equal(summary.studySummaryStats(input,ms).total,1);assert.equal(input.completedModuleIds.length,2);
});

test("structured-title-html", () => {
const input={completedModuleIds:['known','stale'],moduleScores:{known:{score:.25,passed:true,attempts:1},stale:{score:1}},account:'secret'};const ms=[{id:'known',title:"<script>title</script>"}];const data=summary.studySummaryData(input,ms,1000);assert.deepEqual(data.modules,[{title:"<script>title</script>",passed:true,score:.25}]);assert.equal(JSON.stringify(data).includes('secret'),false);assert.equal(summary.studySummaryStats(input,ms).total,1);assert.equal(input.completedModuleIds.length,2);
});

test("pause-resume-contract-paused", () => {
const p={timerAccumulatedMs:5,timerSessionStartedAt:null,metadata:{keep:true}};const copy={...p};const before=timer.getActiveTimerMs(p,12);const paused=timer.pauseCourseTimer(p,12);assert.equal(paused.timerAccumulatedMs,before);assert.equal(paused.timerSessionStartedAt,null);assert.deepEqual(p,copy);const resumed=timer.resumeCourseTimer(paused,12);assert.equal(timer.getActiveTimerMs(resumed,12),before);assert.deepEqual(timer.pauseCourseTimer(paused,12),paused);
});

test("pause-resume-contract-running", () => {
const p={timerAccumulatedMs:5,timerSessionStartedAt:0,metadata:{keep:true}};const copy={...p};const before=timer.getActiveTimerMs(p,12);const paused=timer.pauseCourseTimer(p,12);assert.equal(paused.timerAccumulatedMs,before);assert.equal(paused.timerSessionStartedAt,null);assert.deepEqual(p,copy);const resumed=timer.resumeCourseTimer(paused,12);assert.equal(timer.getActiveTimerMs(resumed,12),before);assert.deepEqual(timer.pauseCourseTimer(paused,12),paused);
});

test("pause-resume-contract-clock-back", () => {
const p={timerAccumulatedMs:5,timerSessionStartedAt:20,metadata:{keep:true}};const copy={...p};const before=timer.getActiveTimerMs(p,12);const paused=timer.pauseCourseTimer(p,12);assert.equal(paused.timerAccumulatedMs,before);assert.equal(paused.timerSessionStartedAt,null);assert.deepEqual(p,copy);const resumed=timer.resumeCourseTimer(paused,12);assert.equal(timer.getActiveTimerMs(resumed,12),before);assert.deepEqual(timer.pauseCourseTimer(paused,12),paused);
});

test("pause-resume-contract-negative-accum", () => {
const p={timerAccumulatedMs:-5,timerSessionStartedAt:0,metadata:{keep:true}};const copy={...p};const before=timer.getActiveTimerMs(p,12);const paused=timer.pauseCourseTimer(p,12);assert.equal(paused.timerAccumulatedMs,before);assert.equal(paused.timerSessionStartedAt,null);assert.deepEqual(p,copy);const resumed=timer.resumeCourseTimer(paused,12);assert.equal(timer.getActiveTimerMs(resumed,12),before);assert.deepEqual(timer.pauseCourseTimer(paused,12),paused);
});

test("pause-resume-contract-fractional", () => {
const p={timerAccumulatedMs:0.25,timerSessionStartedAt:.5,metadata:{keep:true}};const copy={...p};const before=timer.getActiveTimerMs(p,1.5);const paused=timer.pauseCourseTimer(p,1.5);assert.equal(paused.timerAccumulatedMs,before);assert.equal(paused.timerSessionStartedAt,null);assert.deepEqual(p,copy);const resumed=timer.resumeCourseTimer(paused,1.5);assert.equal(timer.getActiveTimerMs(resumed,1.5),before);assert.deepEqual(timer.pauseCourseTimer(paused,1.5),paused);
});

test("pause-resume-contract-overflow", () => {
const p={timerAccumulatedMs:1e+308,timerSessionStartedAt:0,metadata:{keep:true}};const copy={...p};const before=timer.getActiveTimerMs(p,1e+308);const paused=timer.pauseCourseTimer(p,1e+308);assert.equal(paused.timerAccumulatedMs,before);assert.equal(paused.timerSessionStartedAt,null);assert.deepEqual(p,copy);const resumed=timer.resumeCourseTimer(paused,1e+308);assert.equal(timer.getActiveTimerMs(resumed,1e+308),before);assert.deepEqual(timer.pauseCourseTimer(paused,1e+308),paused);
});

test("pause-resume-contract-epoch", () => {
const p={timerAccumulatedMs:0,timerSessionStartedAt:0,metadata:{keep:true}};const copy={...p};const before=timer.getActiveTimerMs(p,0);const paused=timer.pauseCourseTimer(p,0);assert.equal(paused.timerAccumulatedMs,before);assert.equal(paused.timerSessionStartedAt,null);assert.deepEqual(p,copy);const resumed=timer.resumeCourseTimer(paused,0);assert.equal(timer.getActiveTimerMs(resumed,0),before);assert.deepEqual(timer.pauseCourseTimer(paused,0),paused);
});

test("pause-resume-contract-negative-start", () => {
const p={timerAccumulatedMs:2,timerSessionStartedAt:-20,metadata:{keep:true}};const copy={...p};const before=timer.getActiveTimerMs(p,12);const paused=timer.pauseCourseTimer(p,12);assert.equal(paused.timerAccumulatedMs,before);assert.equal(paused.timerSessionStartedAt,null);assert.deepEqual(p,copy);const resumed=timer.resumeCourseTimer(paused,12);assert.equal(timer.getActiveTimerMs(resumed,12),before);assert.deepEqual(timer.pauseCourseTimer(paused,12),paused);
});

test("pause-resume-contract-invalid-start", () => {
const p={timerAccumulatedMs:2,timerSessionStartedAt:NaN,metadata:{keep:true}};const copy={...p};const before=timer.getActiveTimerMs(p,12);const paused=timer.pauseCourseTimer(p,12);assert.equal(paused.timerAccumulatedMs,before);assert.equal(paused.timerSessionStartedAt,null);assert.deepEqual(p,copy);const resumed=timer.resumeCourseTimer(paused,12);assert.equal(timer.getActiveTimerMs(resumed,12),before);assert.deepEqual(timer.pauseCourseTimer(paused,12),paused);
});

test("pause-resume-contract-infinite-start", () => {
const p={timerAccumulatedMs:2,timerSessionStartedAt:Infinity,metadata:{keep:true}};const copy={...p};const before=timer.getActiveTimerMs(p,12);const paused=timer.pauseCourseTimer(p,12);assert.equal(paused.timerAccumulatedMs,before);assert.equal(paused.timerSessionStartedAt,null);assert.deepEqual(p,copy);const resumed=timer.resumeCourseTimer(paused,12);assert.equal(timer.getActiveTimerMs(resumed,12),before);assert.deepEqual(timer.pauseCourseTimer(paused,12),paused);
});

test("pause-resume-contract-invalid-accum", () => {
const p={timerAccumulatedMs:NaN,timerSessionStartedAt:0,metadata:{keep:true}};const copy={...p};const before=timer.getActiveTimerMs(p,12);const paused=timer.pauseCourseTimer(p,12);assert.equal(paused.timerAccumulatedMs,before);assert.equal(paused.timerSessionStartedAt,null);assert.deepEqual(p,copy);const resumed=timer.resumeCourseTimer(paused,12);assert.equal(timer.getActiveTimerMs(resumed,12),before);assert.deepEqual(timer.pauseCourseTimer(paused,12),paused);
});

test("pause-resume-contract-infinite-accum", () => {
const p={timerAccumulatedMs:Infinity,timerSessionStartedAt:0,metadata:{keep:true}};const copy={...p};const before=timer.getActiveTimerMs(p,12);const paused=timer.pauseCourseTimer(p,12);assert.equal(paused.timerAccumulatedMs,before);assert.equal(paused.timerSessionStartedAt,null);assert.deepEqual(p,copy);const resumed=timer.resumeCourseTimer(paused,12);assert.equal(timer.getActiveTimerMs(resumed,12),before);assert.deepEqual(timer.pauseCourseTimer(paused,12),paused);
});

test("pause-resume-contract-safe-cap", () => {
const p={timerAccumulatedMs:9007199254740990,timerSessionStartedAt:0,metadata:{keep:true}};const copy={...p};const before=timer.getActiveTimerMs(p,100);const paused=timer.pauseCourseTimer(p,100);assert.equal(paused.timerAccumulatedMs,before);assert.equal(paused.timerSessionStartedAt,null);assert.deepEqual(p,copy);const resumed=timer.resumeCourseTimer(paused,100);assert.equal(timer.getActiveTimerMs(resumed,100),before);assert.deepEqual(timer.pauseCourseTimer(paused,100),paused);
});

test("pause-resume-contract-future", () => {
const p={timerAccumulatedMs:200,timerSessionStartedAt:1000,metadata:{keep:true}};const copy={...p};const before=timer.getActiveTimerMs(p,10);const paused=timer.pauseCourseTimer(p,10);assert.equal(paused.timerAccumulatedMs,before);assert.equal(paused.timerSessionStartedAt,null);assert.deepEqual(p,copy);const resumed=timer.resumeCourseTimer(paused,10);assert.equal(timer.getActiveTimerMs(resumed,10),before);assert.deepEqual(timer.pauseCourseTimer(paused,10),paused);
});

test("pause-resume-contract-resumed", () => {
const p={timerAccumulatedMs:1,timerSessionStartedAt:null,metadata:{keep:true}};const copy={...p};const before=timer.getActiveTimerMs(p,0);const paused=timer.pauseCourseTimer(p,0);assert.equal(paused.timerAccumulatedMs,before);assert.equal(paused.timerSessionStartedAt,null);assert.deepEqual(p,copy);const resumed=timer.resumeCourseTimer(paused,0);assert.equal(timer.getActiveTimerMs(resumed,0),before);assert.deepEqual(timer.pauseCourseTimer(paused,0),paused);
});

test("known-score-stats-zero", () => {
const p={completedModuleIds:[],moduleScores:{a:{score:0,passed:false,attempts:1},unknown:{score:1}}};const ms=[{id:'a',title:'A'}];const stats=summary.studySummaryStats(p,ms);assert.equal(stats.scored,1);assert.equal(stats.averageScore,0);assert.equal(summary.studySummaryData(p,ms,0).modules[0].score,0);
});

test("known-score-stats-one", () => {
const p={completedModuleIds:[],moduleScores:{a:{score:1,passed:false,attempts:1},unknown:{score:1}}};const ms=[{id:'a',title:'A'}];const stats=summary.studySummaryStats(p,ms);assert.equal(stats.scored,1);assert.equal(stats.averageScore,1);assert.equal(summary.studySummaryData(p,ms,0).modules[0].score,1);
});

test("known-score-stats-quarter", () => {
const p={completedModuleIds:[],moduleScores:{a:{score:.25,passed:false,attempts:1},unknown:{score:1}}};const ms=[{id:'a',title:'A'}];const stats=summary.studySummaryStats(p,ms);assert.equal(stats.scored,1);assert.equal(stats.averageScore,0.25);assert.equal(summary.studySummaryData(p,ms,0).modules[0].score,0.25);
});

test("known-score-stats-half", () => {
const p={completedModuleIds:[],moduleScores:{a:{score:.5,passed:false,attempts:1},unknown:{score:1}}};const ms=[{id:'a',title:'A'}];const stats=summary.studySummaryStats(p,ms);assert.equal(stats.scored,1);assert.equal(stats.averageScore,0.5);assert.equal(summary.studySummaryData(p,ms,0).modules[0].score,0.5);
});

test("known-score-stats-three-quarter", () => {
const p={completedModuleIds:[],moduleScores:{a:{score:.75,passed:false,attempts:1},unknown:{score:1}}};const ms=[{id:'a',title:'A'}];const stats=summary.studySummaryStats(p,ms);assert.equal(stats.scored,1);assert.equal(stats.averageScore,0.75);assert.equal(summary.studySummaryData(p,ms,0).modules[0].score,0.75);
});

test("known-score-stats-negative", () => {
const p={completedModuleIds:[],moduleScores:{a:{score:-1,passed:false,attempts:1},unknown:{score:1}}};const ms=[{id:'a',title:'A'}];const stats=summary.studySummaryStats(p,ms);assert.equal(stats.scored,1);assert.equal(stats.averageScore,0);assert.equal(summary.studySummaryData(p,ms,0).modules[0].score,0);
});

test("known-score-stats-above-one", () => {
const p={completedModuleIds:[],moduleScores:{a:{score:2,passed:false,attempts:1},unknown:{score:1}}};const ms=[{id:'a',title:'A'}];const stats=summary.studySummaryStats(p,ms);assert.equal(stats.scored,1);assert.equal(stats.averageScore,1);assert.equal(summary.studySummaryData(p,ms,0).modules[0].score,1);
});

test("known-score-stats-nan", () => {
const p={completedModuleIds:[],moduleScores:{a:{score:NaN,passed:false,attempts:1},unknown:{score:1}}};const ms=[{id:'a',title:'A'}];const stats=summary.studySummaryStats(p,ms);assert.equal(stats.scored,0);assert.equal(stats.averageScore,null);assert.equal(summary.studySummaryData(p,ms,0).modules[0].score,null);
});
