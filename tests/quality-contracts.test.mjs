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
