import assert from 'assert';
import app from '../../src/app';

describe('\'sketches\' service', () => {
  it('registered the service', () => {
    const service = app.service('sketches');

    assert.ok(service, 'Registered the service');
  });
});
