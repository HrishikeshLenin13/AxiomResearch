import {test} from 'node:test';
import assert from 'node:assert/strict';
import {studyReviewQueue} from '../src/course/lib/study-summary.ts';
test('pending units precede low-scoring completed units without leaking unknown records',()=>{
 const p={completedModuleIds:['a','b'],moduleScores:{a:{score:.6},b:{score:.9},unknown:{score:0}},email:'secret'};
 const modules=[{id:'a',title:'A'},{id:'b',title:'B'},{id:'c',title:'C'}];const copy=JSON.stringify([p,modules]);
 assert.deepEqual(studyReviewQueue(p,modules).map(x=>x.id),['c','a']);assert.equal(studyReviewQueue(p,modules,{limit:1})[0].reason,'pending');assert.deepEqual(studyReviewQueue(p,modules,{limit:0}),[]);assert.equal(JSON.stringify([p,modules]),copy);assert.equal(JSON.stringify(studyReviewQueue(p,modules)).includes('secret'),false);
 for(const options of [{limit:-1},{limit:1.5},{minimumScore:NaN},{minimumScore:2}])assert.throws(()=>studyReviewQueue(p,modules,options),RangeError);
});
