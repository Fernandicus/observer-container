import { Observer } from "./interfaces/Observer";
import { ObserverTags, Param, Prop } from "./types/types";

export class ObserversMap {
  private observers: Param.ObserversMap = new Map();

  addObserver<T>({ name, subject, observer }: Prop.AddObserver<T>) {
    if (!this.hasName(name)) {
      this.addObserversToNewName<T>({ name, subject, observer });
      return;
    }

    if (!this.hasSubject({ name, subject })) {
      this.addObserversToNewSubject<T>({ name, subject, observer });
      return;
    }

    this.addObservers<T>({ name, subject, observer });
  }

  findObservers<T>({ name, subject }: ObserverTags): Observer<T>[] {
    if (this.hasSubject({ name, subject })) {
      const observersFound = this.observers.get(name)!;
      const subjectFound = observersFound.get(subject)!;
      return Array.from(subjectFound);
    }

    return [];
  }

  private hasSubject({ name, subject }: ObserverTags) {
    return this.hasName(name) && this.observers.get(name)!.has(subject);
  }

  private hasName(name: string) {
    return this.observers.has(name);
  }

  private addObserversToNewName<T>(props: Prop.AddObserver<T>) {
    const { name, subject, observer } = props;
    const newObserverMap = new Map();
    newObserverMap.set(subject, new Set([observer]));
    this.observers.set(name, newObserverMap);
  }

  private addObserversToNewSubject<T>(props: Prop.AddObserver<T>) {
    const { name, subject, observer } = props;

    const set = new Set([observer]);
    this.observers.get(name)!.set(subject, set);
  }

  private addObservers<T>(props: Prop.AddObserver<T>) {
    const { name, subject, observer } = props;
    this.observers.get(name)!.get(subject)!.add(observer);
  }
}
