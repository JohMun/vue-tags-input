import Styling from './styling/';
import Autocomplete from './autocomplete/';
import Validation from './validation/';
import Hooks from './hooks/';
import Templates from './templates/';
import Nuxt from './nuxt';

export default [{
  path: '/examples/styling',
  name: 'examples.styling',
  component: Styling,
}, {
  path: '/examples/autocomplete',
  name: 'examples.autocomplete',
  component: Autocomplete,
}, {
  path: '/examples/validation',
  name: 'examples.validation',
  component: Validation,
}, {
  path: '/examples/hooks',
  name: 'examples.hooks',
  component: Hooks,
}, {
  path: '/examples/templates',
  name: 'examples.templates',
  component: Templates,
}, {
  path: '/examples/nuxt',
  name: 'examples.nuxt',
  component: Nuxt,
}];
