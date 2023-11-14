import { Observer } from "./interfaces/Observer";
import { Subject } from "./interfaces/Subject";
import {
  SubjectType,
  ObserversMap,
  SubjectsMap,
  ClassType,
  ObserverTags,
} from "./types/custom-types";

export class ObserverContainer {
  readonly observers: ObserversMap = new Map();
  readonly subjects: SubjectsMap = new Map();

  addSubject({ name, subject }: ObserverTags): void {
    const subjectInstance = new Subject({
      observers: new Set([]),
      subject,
    });

    if (this.subjects.has(name)) {
      this.subjects.get(name)!.add(subjectInstance);
    } else {
      this.subjects.set(name, new Set([subjectInstance]));
    }
  }

  addObserver<T>(props: AddObserverProps<T>): void {
    const { name, subject, observer } = props;

    if (this.observers.has(name)) {
      if (this.observers.get(name)!.has(subject)) {
        this.observers.get(name)!.get(subject)!.add(observer);
      } else {
        this.observers.get(name)!.set(subject, new Set([observer]));
      }
    } else {
      const newObserverMap = new Map();
      newObserverMap.set(subject, new Set([observer]));
      this.observers.set(name, newObserverMap);
    }
  }

  buildSubject({ name, subject }: ObserverTags): Subject<unknown> {
    if (!this.subjects.has(name)) {
      this.addSubject({ name, subject });
      return this.buildFoundSubject({ name, subject });
    }

    return this.buildFoundSubject({ name, subject });
  }

  loadObservers(observers: LoadObserversProps[]): ObserversLoader {
    return (props: ObserverTags) => {
      this.observersLoaderHelper({
        loadObserversProps: observers,
        observersLoaderProps: props,
      });
    };
  }

  private observersLoaderHelper(props: {
    observersLoaderProps: ObserverTags;
    loadObserversProps: LoadObserversProps[];
  }) {
    const { loadObserversProps, observersLoaderProps } = props;
    const { name, subject } = observersLoaderProps;
    
    return loadObserversProps.forEach((load) => {
      const match = load.name === name && load.subject === subject;

      if (!match) return;

      load.observers.forEach((observer) => {
        observer();
      });
    });
  }

  subjectBuilder<T>(observersLoader: ObserversLoader): SubjectBuilder<T> {
    return (props: ObserverTags) => {
      return this.subjectBuilderHelper({ ...props, observersLoader });
    };
  }

  private subjectBuilderHelper(
    props: ObserverTags & { observersLoader: ObserversLoader }
  ) {
    const { name, subject, observersLoader } = props;

    observersLoader({ name, subject });

    if (!this.subjects.has(name)) {
      this.addSubject({ name, subject });
      return this.buildFoundSubject({ name, subject });
    }

    return this.buildFoundSubject({ name, subject });
  }

  private buildFoundSubject({ name, subject }: ObserverTags) {
    const subjectFound = this.findSubject({ name, subject });

    if (subjectFound) {
      const observers = this.findObservers({
        name,
        subject,
      });
      for (const observer of observers) {
        subjectFound.addObserver(observer);
      }
      return subjectFound;
    }
    return new Subject({
      observers: new Set([]),
      subject,
    });
  }

  private findSubject({ name, subject }: ObserverTags) {
    const subjectFoundSet = this.subjects.get(name)!;
    const subjectFoundArray = Array.from(subjectFoundSet);
    const subjectFound = subjectFoundArray.find(
      (instance) => instance.subject === subject
    );
    return subjectFound;
  }

  private findObservers({ name, subject }: ObserverTags) {
    const observersFound = this.observers.get(name);

    if (observersFound && observersFound.has(subject)) {
      const subjectFound = observersFound.get(subject)!;
      return Array.from(subjectFound);
    }

    return [];
  }
}

type AddObserverProps<T> = ObserverTags & {
  observer: Observer<T>;
};
type LoadObserversProps = ObserverTags & {
  observers: (() => void)[];
};
type ObserversLoader = (props: ObserverTags) => void;
type SubjectBuilder<T> = (props: ObserverTags) => Subject<T>;
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
