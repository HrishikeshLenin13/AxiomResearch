import { test } from 'node:test';
import assert from 'node:assert/strict';
import { studySummary } from '../src/course/lib/study-summary.ts';
test('summary includes known units and scores but excludes identity and access data', () => {
  const progress = {completedModuleIds:['a','a','unknown'], moduleScores:{a:{score:.8,passed:true,attempts:1}}, email:'private@example.org', accessCodeUsed:'secret', volunteerId:'private-id'};
  const text = studySummary(progress, [{id:'a',title:'Foundations'},{id:'b',title:'Writing'}], 61000);
  assert.ok(text.includes('Units passed: 1/2'));
  assert.ok(text.includes('[passed] Foundations — 80%'));
  assert.ok(text.includes('[pending] Writing'));
  for (const hidden of ['private@example.org','secret','private-id','unknown']) assert.ok(!text.includes(hidden));
  assert.ok(text.includes('not a certificate'));
});
