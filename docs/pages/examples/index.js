import ExamplesStyling from './examples-styling';
import ExamplesAutocomplete from './examples-autocomplete';
import ExamplesValidation from './examples-validation';
import ExamplesHooks from './examples-hooks';
import ExamplesTemplates from './examples-templates';

export default [{
  path: '/examples/styling',
  name: 'examples.styling',
  component: ExamplesStyling,
}, {
  path: '/examples/autocomplete',
  name: 'examples.autocomplete',
  component: ExamplesAutocomplete,
}, {
  path: '/examples/validation',
  name: 'examples.validation',
  component: ExamplesValidation,
}, {
  path: '/examples/hooks',
  name: 'examples.hooks',
  component: ExamplesHooks,
}, {
  path: '/examples/templates',
  name: 'examples.templates',
  component: ExamplesTemplates,
}];
