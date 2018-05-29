import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';

const docsFormatter = unformatted => {
  const types = uniq(flatten(
    unformatted.map(i => i.tags.find(t => t.title === 'property').type.name))
  );

  const keyed = mapKeys(types, t => t);
  return mapValues(keyed, k => {
    return unformatted.filter(i => i.tags.find(t => t.title === 'property').type.name === k);
  });
};

export default docsFormatter;
