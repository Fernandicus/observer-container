import { Observer } from "./Observer";

export interface Subject<T> {
  observers: Set<Observer<T>>;
  addObserver(observer: Observer<T>): void;
  removeObserver(observer: Observer<T>): void;
  notifyObservers(data: T): void;
}
