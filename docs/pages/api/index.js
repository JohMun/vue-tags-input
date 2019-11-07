import CreateTagsHelper from './create-tags-helper';
import GenericApiPage from '@components/generic-api-page';

const apiRoutes = ['events', 'props', 'slots'].map(type => {
  return {
    path: `/api/${type}`,
    name: `api.${type}`,
    component: GenericApiPage,
    meta: { type },
  };
});

export default [
  ...apiRoutes,
  {
    path: '/api/create-tags-helper',
    name: 'api.create-tags-helper',
    component: CreateTagsHelper,
  },
];
