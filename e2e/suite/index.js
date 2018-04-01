import Validation from './validation';
import Autocomplete from './autocomplete';
import Hooks from './hooks';
import EditTag from './edit-tag';

export default [{
  path: '/e2e-suite/validation',
  component: Validation,
}, {
  path: '/e2e-suite/autocomplete',
  component: Autocomplete,
}, {
  path: '/e2e-suite/hooks',
  component: Hooks,
}, {
  path: '/e2e-suite/edit-tag',
  component: EditTag,
}];
