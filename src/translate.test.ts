import test from 'node:test';
import assert from 'node:assert/strict';

import { translate } from './translate';

test('translate', async (_t) => {
    const res = await translate('tenho um gato sentado ao meu lado.', 'pt', 'en');
    assert.equal(res, `I have a cat sitting next to me.`);
});
