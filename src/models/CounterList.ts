import { types } from 'mobx-state-tree';

export const House = types.model('House', {
  address: types.string,
  id: types.identifier,
  fias_addrobjs: types.array(types.string),
});

export const Area = types.model('Area', {
  id: types.identifier,
  number: types.maybe(types.number),
  str_number: types.maybe(types.string),
  str_number_full: types.maybe(types.string),
  house: types.maybe(House),
});

export const Meter = types.model('Meter', {
  id: types.identifier,
  _type: types.array(types.string),
  area: Area,
  is_automatic: types.maybeNull(types.boolean),
  communication: types.string,
  description: types.union(types.string, types.null),
  serial_number: types.string,
  installation_date: types.string,
  brand_name: types.maybeNull(types.string),
  model_name: types.maybeNull(types.string),
  initial_values: types.array(types.number),
});
