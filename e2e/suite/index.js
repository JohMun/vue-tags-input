import Validation from './validation';
import Autocomplete from './autocomplete';
import Hooks from './hooks';

export default [{
  path: '/e2e-suite/validation',
  component: Validation,
}, {
  path: '/e2e-suite/autocomplete',
  component: Autocomplete,
}, {
  path: '/e2e-suite/hooks',
  component: Hooks,
}];
