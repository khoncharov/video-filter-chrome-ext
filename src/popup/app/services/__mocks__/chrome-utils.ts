/* eslint-disable object-curly-newline */
/* eslint-disable no-restricted-syntax */
import { FilterState, SaveName, SessionDescriptor } from '../types';

const dbLocal = new Map<string, string>();
const dbSession = new Map<string, string>();

const getLocal = async (args: string[]) => {
  const result: [string, string][] = [];
  args.forEach((arg) => {
    if (dbLocal.has(arg)) {
      result.push([arg, JSON.parse(dbLocal.get(arg) as string)]);
    }
  });
  return Object.fromEntries(result);
};

const setLocal = async (items: { [key: string]: Array<[SaveName, FilterState]> }) => {
  for (const entry of Object.entries(items)) {
    dbLocal.set(entry[0], JSON.stringify(entry[1]));
  }
};

const getSession = async (args: string[]) => {
  const result: [string, string][] = [];
  args.forEach((arg) => {
    if (dbSession.has(arg)) {
      result.push([arg, JSON.parse(dbSession.get(arg) as string)]);
    }
  });
  return Object.fromEntries(result);
};

const setSession = async (items: { [key: string]: SessionDescriptor }) => {
  for (const entry of Object.entries(items)) {
    dbSession.set(entry[0], JSON.stringify(entry[1]));
  }
};

export { getLocal, setLocal, getSession, setSession };
