import { Observer } from "./interfaces/Observer";
import { Subject } from "./interfaces/Subject";
import {
  SubjectType,
  ObserversMap,
  SubjectsMap,
  ClassType,
} from "./types/custom-types";

export class ObserverContainer {
  readonly observers: ObserversMap = new Map();
  readonly subjects: SubjectsMap = new Map();

  addSubject({ name, type }: AddSubjectProps) {
    const subjectInstance = new Subject({
      observers: new Set([]),
      type,
    });

    if (this.subjects.has(name)) {
      this.subjects.get(name)!.add(subjectInstance);
    } else {
      this.subjects.set(name, new Set([subjectInstance]));
    }
  }

  linkObserverToSubject<T>(props: LinkObserverToSubjectProps<T>) {
    const { name, type, observer } = props;

    if (this.observers.has(name)) {
      this.observers.get(name)!.get(type)!.add(observer);
    } else {
      const newObserverMap = new Map();
      newObserverMap.set(type, new Set([observer]));
      this.observers.set(name, newObserverMap);
    }
  }

  loadObservers(observers: LoadObserversProps) {
    return (subjectType: string) => {
      const observersInSubject = observers[subjectType];
      this.observersLoader(observersInSubject);
    };
  }

  private observersLoader(observersInSubject: () => void) {
    if (observersInSubject) {
      const observers = Object.values(observersInSubject);
      for (const observer of observers) {
        observer();
      }
    }
  }

  buildSubject<T>(
    loadObservers: (subjectType: string) => void
  ): (props: { name: string; subjectType: string }) => Subject<T> {
    return (props: BuildSubjectProps) =>
      this.loadSubject({ ...props, loadObservers });
  }

  private loadSubject(props: LoadSubjectProps) {
    const { name, subjectType, loadObservers } = props;
    loadObservers(subjectType);

    if (!this.subjects.has(name)) {
      this.addSubject({ name, type: subjectType });
      return this.buildFoundSubject({ name, subjectType });
    }

    return this.buildFoundSubject({ name, subjectType });
  }

  private buildFoundSubject(props: BuildSubjectProps) {
    const { name, subjectType } = props;

    const subjectFound = this.findSubject({ name, subjectType });

    if (subjectFound) {
      const observers = this.findObservers({
        name,
        subjectType,
      });
      for (const observer of observers) {
        subjectFound.addObserver(observer);
      }
      return subjectFound;
    }
    return new Subject({
      observers: new Set([]),
      type: subjectType,
    });
  }

  private findSubject({ name, subjectType }: FindProps) {
    const subjectFoundSet = this.subjects.get(name)!;
    const subjectFoundArray = Array.from(subjectFoundSet);
    const subjectFound = subjectFoundArray.find(
      (instance) => instance.type === subjectType
    );
    return subjectFound;
  }

  private findObservers({ name, subjectType }: FindProps) {
    const observersFound = this.observers.get(name);

    if (observersFound && observersFound.has(subjectType)) {
      const subjectFound = observersFound.get(subjectType)!;
      return Array.from(subjectFound);
    }

    return [];
  }
}

type FindProps = {
  name: string;
  subjectType: string;
};
type AddSubjectProps = {
  name: string;
  type: string;
};

type LoadSubjectProps = {
  name: string;
  subjectType: string;
  loadObservers: (subjectType: string) => void;
};
type BuildSubjectProps = { name: string; subjectType: string };
type LinkObserverToSubjectProps<T> = {
  name: string;
  type: string;
  observer: Observer<T>;
};
type LoadObserversProps = { [subjectType: string]: () => void };
