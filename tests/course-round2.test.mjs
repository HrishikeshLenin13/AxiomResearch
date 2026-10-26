import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as summary from '../src/course/lib/study-summary.ts';
import * as timer from '../src/course/lib/course-timer.ts';
const progress={completedModuleIds:['a'],moduleScores:{a:{score:.8,passed:true,attempts:1}}};
const modules=[{id:'a',title:'Foundations'},{id:'b',title:'Writing'}];
test('structured summary excludes identity and preserves known course results', () => { const data=summary.studySummaryData({...progress,email:'private',accessCodeUsed:'secret'},modules,5000); assert.equal(data.schemaVersion,1); assert.equal(data.modules[0].score,.8); assert.ok(!JSON.stringify(data).includes('private')); assert.ok(!JSON.stringify(data).includes('secret')); });
test('malformed saved progress and multiline titles remain exportable', () => { const broken={completedModuleIds:null,moduleScores:null}; assert.equal(summary.studySummaryData(broken,modules,Infinity).modules[0].score,null); const text=summary.studySummary(broken,[{id:'a',title:'Two\nlines'}],0); assert.ok(text.includes('Two lines')); assert.ok(text.includes('Units passed: 0/1')); });
test('timer accumulation remains finite and safely representable', () => { assert.equal(timer.getActiveTimerMs({timerAccumulatedMs:Number.MAX_VALUE,timerSessionStartedAt:0},Number.MAX_VALUE),Number.MAX_SAFE_INTEGER); });
