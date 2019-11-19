import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import appSettings from './appSettings';
const socket = io(appSettings.apiUri);
const client = feathers();

client.configure(feathers.socketio(socket));
client.configure(feathers.authentication({
  storage: window.localStorage
}));

export default client;