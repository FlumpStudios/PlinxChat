import assert from 'assert';
import app from '../../src/app';

describe('\'code\' service', () => {
  it('registered the service', () => {
    const service = app.service('code');

    assert.ok(service, 'Registered the service');
  });
});
