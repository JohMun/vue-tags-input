import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import slots from './slots-data';

export const mergeDocs = (docA, docB) => {
  return docB.map(entry => {
    const replace = docA.find(aEntry => aEntry.name === entry.name);
    return replace ? replace : entry;
  });
};

export const format = unformatted => {
  const types = uniq(flatten(
    unformatted.map(i => i.tags.find(t => t.title === 'property').type.name))
  );

  const keyed = mapKeys(types, t => t);
  const formatted = mapValues(keyed, k => {
    return unformatted.filter(i => i.tags.find(t => t.title === 'property').type.name === k);
  });

  return { ...formatted, slots };
};
