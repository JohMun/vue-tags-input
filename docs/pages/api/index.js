import Props from './props';
import Events from './events';
import Classes from './classes';
import Slots from './slots';
import CreateTagsHelper from './create-tags-helper';

export default [{
  path: '/api/props',
  name: 'api.props',
  component: Props,
}, {
  path: '/api/events',
  name: 'api.events',
  component: Events,
}, {
  path: '/api/classes',
  name: 'api.classes',
  component: Classes,
}, {
  path: '/api/slots',
  name: 'api.slots',
  component: Slots,
}, {
  path: '/api/create-tags-helper',
  name: 'api.create-tags-helper',
  component: CreateTagsHelper,
}];
