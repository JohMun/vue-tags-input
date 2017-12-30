import Vue from 'vue';
import Router from 'vue-router';
import BasicDemo from './pages/basic-demo';
import Gettingstarted from './pages/getting-started';
import ExamplesStyling from './pages/examples-styling';

Vue.use(Router);

const routes = [{
  path: '/',
  name: 'all',
  component: BasicDemo,
}, {
  path: '/start',
  name: 'gettingStarted',
  component: Gettingstarted,
}, {
  path: '/examples/styling',
  name: 'examples.styling',
  component: ExamplesStyling,
}];

const router = new Router({ routes });

export default router;
