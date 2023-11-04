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

  addSubject({ forAggregate, subject }: AddSubjectProps) {
    const subjectInstance = new subject(new Set([]));

    if (this.subjects.has(forAggregate.name)) {
      this.subjects.get(forAggregate.name)!.add(subjectInstance);
    } else {
      this.subjects.set(forAggregate.name, new Set([subjectInstance]));
    }
  }

  linkObserverToSubject<T>(props: LinkObserverToSubjectProps<T>) {
    const { name, subject, observer } = props;

    if (this.observers.has(name)) {
      this.observers.get(name)!.get(subject.prototype)!.add(observer);
    } else {
      const newObserverMap = new Map();
      newObserverMap.set(subject.prototype, new Set([observer]));
      this.observers.set(name, newObserverMap);
    }
  }

  loadObservers(observers: LoadObserversProps) {
    return (subject: SubjectType | string) => {
      if (typeof subject === "string") {
        const observersInSubject = observers[subject];
        this.observersLoader(observersInSubject);
      } else {
        const observersInSubject = observers[subject.name];
        this.observersLoader(observersInSubject);
      }
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
    loadObservers: (subject: SubjectType) => void
  ): (props: LoadSubjectProps) => Subject<T> {
    return (props: BuildSubjectProps) =>
      this.loadSubject({ ...props, loadObservers });
  }

  private loadSubject(props: LoadSubjectProps) {
    const { forAggregate, subject, loadObservers } = props;
    loadObservers(subject);

    if (!this.subjects.has(forAggregate.name)) {
      this.addSubject({ forAggregate, subject });
      return this.buildFoundSubject({ forAggregate, subject });
    }

    return this.buildFoundSubject({ forAggregate, subject });
  }

  private buildFoundSubject(props: BuildSubjectProps) {
    const { forAggregate, subject } = props;

    const subjectFound = this.findSubject({ name: forAggregate.name, subject });

    if (subjectFound) {
      const observers = this.findObservers({
        name: forAggregate.name,
        subject,
      });
      for (const observer of observers) {
        subjectFound.addObserver(observer);
      }
      return subjectFound;
    }
    return new subject(new Set([]));
  }

  private findSubject({ name, subject }: FindProps) {
    const subjectFoundSet = this.subjects.get(name)!;
    const subjectFoundArray = Array.from(subjectFoundSet);
    const subjectFound = subjectFoundArray.find(
      (instance) => instance instanceof subject
    );
    return subjectFound;
  }

  private findObservers({ name, subject }: FindProps) {
    const observersFound = this.observers.get(name);
    if (observersFound && observersFound.has(subject.prototype)) {
      const subjectFound = observersFound.get(subject.prototype)!;
      return Array.from(subjectFound);
    }
    return [];
  }
}

type FindProps = {
  name: string;
  subject: SubjectType;
};
type AddSubjectProps = {
  forAggregate: ClassType;
  subject: SubjectType;
};

type LoadSubjectProps = {
  forAggregate: ClassType;
  subject: SubjectType;
  loadObservers: (subject: SubjectType) => void;
};
type BuildSubjectProps = { forAggregate: ClassType; subject: SubjectType };
type LinkObserverToSubjectProps<T> = {
  name: string;
  observer: Observer<T>;
  subject: SubjectType;
};
type LoadObserversProps = { [subjectName: string]: () => void };
