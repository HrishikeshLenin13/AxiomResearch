import {test} from 'node:test';
import assert from 'node:assert/strict';
import {studyReviewQueueCsv} from '../src/course/lib/study-summary.ts';
test('review CSV exports known units in priority order and escapes formula text',()=>{
 const progress={completedModuleIds:['a'],moduleScores:{a:{score:.5}},account:'secret'};const modules=[{id:'a',title:'=calc'},{id:'b',title:'Pending, "unit"'}];const csv=studyReviewQueueCsv(progress,modules);
 assert.ok(csv.includes(`"'=calc"`));assert.ok(csv.includes('"Pending, ""unit"""'));assert.ok(csv.indexOf('"pending"')<csv.indexOf('"below-target"'));assert.equal(csv.includes('secret'),false);assert.equal(studyReviewQueueCsv(progress,modules,{limit:0}).split('\r\n').length,2);
});
