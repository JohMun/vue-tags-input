import ApiProps from './api-props';
import ApiEvents from './api-events';
import ApiClasses from './api-classes';
import ApiSlots from './api-slots';
import ApiCreateTagsHelper from './api-create-tags-helper';

export default [{
  path: '/api/props',
  name: 'api.props',
  component: ApiProps,
}, {
  path: '/api/events',
  name: 'api.events',
  component: ApiEvents,
}, {
  path: '/api/classes',
  name: 'api.classes',
  component: ApiClasses,
}, {
  path: '/api/slots',
  name: 'api.slots',
  component: ApiSlots,
}, {
  path: '/api/create-tags-helper',
  name: 'api.create-tags-helper',
  component: ApiCreateTagsHelper,
}];
