import Vue from 'vue';
import Router from 'vue-router';
import ToDevelop from './pages/to-develop';
import ProjectFeatures from './pages/project-features';
import Gettingstarted from './pages/getting-started';
import ExamplesStyling from './pages/examples-styling';
import ExamplesAutocomplete from './pages/examples-autocomplete';
import ExamplesValidation from './pages/examples-validation';
import ExamplesHooks from './pages/examples-hooks';
import ExamplesTemplates from './pages/examples-templates';

Vue.use(Router);

const routes = [{
  path: '/',
  name: 'features',
  component: ProjectFeatures,
}, {
  path: '/start',
  name: 'gettingStarted',
  component: Gettingstarted,
}, {
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
}, {
  path: '/develop',
  name: 'develop',
  component: ToDevelop,
}];

const router = new Router({ routes });

export default router;
