// Initializes the `sketches` service on path `/sketches`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Sketches } from './sketches.class';
import hooks from './sketches.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'sketches': Sketches & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/sketches', new Sketches(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sketches'); 

  service.hooks(hooks);
}
