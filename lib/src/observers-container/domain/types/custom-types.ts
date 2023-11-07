import { Observer } from "../interfaces/Observer";
import { Subject } from "../interfaces/Subject";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SubjectProps = {
  observers: Set<Observer<any>>,
  type:string,
}
export type SubjectType = new (props: SubjectProps) => Subject<any>;
export type ClassType = abstract new (...args: unknown[]) => unknown;
export type KeyValuePairs = {
  [key: string]: any;
};
export type ObserversMap = Map<
  string,
  Map<string, Set<Observer<unknown>>>
>;
export type SubjectsMap = Map<string, Set<Subject<unknown>>>;
