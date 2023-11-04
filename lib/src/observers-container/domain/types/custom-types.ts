import { Observer } from "../interfaces/Observer";
import { Subject } from "../interfaces/Subject";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SubjectType = new (props: Set<Observer<any>>) => Subject<any>;
export type ClassType = abstract new (...args: unknown[]) => unknown;
export type KeyValuePairs = {
  [key: string]: any;
};
export type ObserversMap = Map<
  string,
  Map<Subject<unknown>, Set<Observer<unknown>>>
>;
export type SubjectsMap = Map<string, Set<Subject<unknown>>>;
