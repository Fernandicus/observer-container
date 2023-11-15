import { ObserversMap } from "./ObserversMap";
import { Subject } from "./Subject";
import { SubjectsMap } from "./SubjectsMap";

type Props = {
  subjectsMap: SubjectsMap;
  observersMap: ObserversMap;
};

export class ObserverContainer {
  private subjectsMap: SubjectsMap;
  private observersMap: ObserversMap;

  constructor({ subjectsMap, observersMap }: Props) {
    this.subjectsMap = subjectsMap;
    this.observersMap = observersMap;
  }

  addObserver<T>(props: Prop.AddObserver<T>): void {
    this.observersMap.addObserver(props);

    if (!this.subjectsMap.hasName(props.name)) {
      this.addSubjectHelper(props);
    }
  }

  addSubject({ name, subject }: ObserverTags): void {
    if (this.subjectsMap.hasName(name)) return;

    this.addSubjectHelper({ name, subject });
  }

  buildSubject(props: ObserverTags) {
    return this.buildFoundSubject(props);
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
    const subjectFound = this.subjectsMap.findSubject({ name, subject });

    if (!subjectFound)
      return new Subject({
        observers: new Set([]),
        subject,
      });

    const observers = this.observersMap.findObservers({
      name,
      subject,
    });

    observers.forEach((observer) => {
      subjectFound.addObserver(observer);
    });

    return subjectFound;
  }
}
