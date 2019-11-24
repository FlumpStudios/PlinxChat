import { Application } from '../declarations';
import users from './users/users.service';
import messages from './messages/messages.service';
import sketches from './sketches/sketches.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(messages);
  app.configure(sketches);
}
