import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toCents, fromCents, sum } from '../src/money.js';

test('converts between decimal strings and cents', () => {
  assert.equal(toCents('1250.40'), 125040);
  assert.equal(toCents('7.5'), 750);
  assert.equal(toCents('3'), 300);
  assert.equal(fromCents(125040), '1250.40');
  assert.equal(fromCents(-5), '-0.05');
});

test('sums balances without floating point drift', () => {
  const total = sum([{ amount: '0.10', currency: 'EUR' }, { amount: '0.20', currency: 'EUR' }]);
  assert.deepEqual(total, { amount: '0.30', currency: 'EUR' });
});

test('rejects mixed currencies and invalid amounts', () => {
  assert.throws(() => sum([{ amount: '1.00', currency: 'USD' }]));
  assert.throws(() => toCents('1,00'));
});
