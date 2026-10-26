import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as timer from '../src/course/lib/course-timer.ts';
import * as summary from '../src/course/lib/study-summary.ts';
const progress={completedModuleIds:['a'],moduleScores:{a:{score:.8,passed:true,attempts:1}}};
const modules=[{id:'a',title:'First'},{id:'b',title:'Next'}];
test('formatted durations share the safely representable timer ceiling',()=>{assert.equal(timer.formatDuration(Number.MAX_VALUE),timer.formatDuration(Number.MAX_SAFE_INTEGER));assert.equal(timer.formatDuration(Infinity),'0m 0s');});
test('CSV retains elapsed study milliseconds alongside module results',()=>{const rows=summary.studySummaryCsv(progress,modules,12345).split('\r\n');assert.ok(rows[0].includes('Study time (ms)'));assert.ok(rows[1].endsWith('"12345"'));});
