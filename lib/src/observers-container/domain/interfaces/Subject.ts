import { Observer } from "./Observer";

export class Subject<T> {
  readonly observers: Set<Observer<T>>;
  readonly type: string;
  
  constructor(props: { observers: Set<Observer<T>>; type: string }) {
    this.observers = props.observers;
    this.type = props.type;
  }

  addObserver(observer: Observer<T>): void {
    this.observers.add(observer);
  }

  removeObserver(observer: Observer<T>): void {
    this.observers.delete(observer);
  }

  notifyObservers(data: T): void {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}
