import { Observer } from "./interfaces/Observer";

export class Subject<T> {
  readonly observers: Set<Observer<T>>;
  readonly subject: string;

  constructor(props: { observers: Set<Observer<T>>; subject: string }) {
    this.observers = props.observers;
    this.subject = props.subject;
  }

  addObserver(observer: Observer<T>): void {
    this.observers.add(observer);
  }

  removeObserver(observer: Observer<T>): void {
    this.observers.delete(observer);
  }

  notifyObservers(data: T): void {
    this.observers.forEach((observer) => {
      observer.update(data);
    });
  }
}
