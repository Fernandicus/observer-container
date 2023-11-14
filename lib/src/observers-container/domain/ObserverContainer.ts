import { Subject } from "./Subject";
import { SubjectsMap } from "./SubjectsMap";

export class ObserverContainer {
  readonly observers: Param.ObserversMap = new Map();
  private subjectsMap: SubjectsMap;

  constructor({ subjectsMap }: { subjectsMap: SubjectsMap }) {
    this.subjectsMap = subjectsMap;
  }

  addObserver<T>(props: Prop.AddObserver<T>): void {
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

  addSubject({ name, subject }: ObserverTags): Subject<unknown> {
    if (!this.subjectsMap.hasName(name)) {
      this.addSubjectHelper({ name, subject });
      return this.buildFoundSubject({ name, subject });
    }

    return this.buildFoundSubject({ name, subject });
  }

  loadObservers(observers: Prop.LoadObserver[]): ObserverLoader {
    return (props: ObserverTags) => {
      this.observersLoaderHelper({
        loadObserversProps: observers,
        observersLoaderProps: props,
      });
    };
  }

  subjectBuilder<T>(observersLoader: ObserverLoader): Return.SubjectBuilder<T> {
    return (props: ObserverTags) => {
      return this.subjectBuilderHelper({ ...props, observersLoader });
    };
  }

  private addSubjectHelper({ name, subject }: ObserverTags): void {
    const subjectInstance = new Subject({
      observers: new Set([]),
      subject,
    });

    this.subjectsMap.addSubject({
      name,
      subject: subjectInstance,
    });
  }

  private observersLoaderHelper(props: {
    observersLoaderProps: ObserverTags;
    loadObserversProps: Prop.LoadObserver[];
  }) {
    const { loadObserversProps, observersLoaderProps } = props;
    const { name, subject } = observersLoaderProps;

    return loadObserversProps.forEach((load) => {
      const match = load.name === name && load.subject === subject;

      if (!match) return;

      load.observers.forEach((observer) => {
        observer.addObserverToContainer({ name, subject });
      });
    });
  }

  private subjectBuilderHelper(props: Prop.SubjectBuilderHelper) {
    const { name, subject, observersLoader } = props;

    observersLoader({ name, subject });

    if (!this.subjectsMap.hasName(name)) {
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
    const subjectFoundArray = this.subjectsMap.getArrayFromName(name);
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
