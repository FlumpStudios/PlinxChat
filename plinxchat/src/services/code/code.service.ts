// Initializes the `code` service on path `/code`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Code } from './code.class';
import createModel from '../../models/code.model';
import hooks from './code.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'code': Code & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/code', new Code(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('code');

  service.hooks(hooks);
}
