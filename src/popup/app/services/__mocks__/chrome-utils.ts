/* eslint-disable no-restricted-syntax */
import { FilterState, SaveName } from '../types';

const db = new Map<string, string>();

const load = async (args: string[]) => {
  const result: [string, string][] = [];
  args.forEach((arg) => {
    if (db.has(arg)) {
      result.push([arg, JSON.parse(db.get(arg) as string)]);
    }
  });
  return Object.fromEntries(result);
};

const save = async (items: {
  [key: string]: string | FilterState | Array<[SaveName, FilterState]>;
}) => {
  for (const entry of Object.entries(items)) {
    db.set(entry[0], JSON.stringify(entry[1]));
  }
};

export { load, save };
