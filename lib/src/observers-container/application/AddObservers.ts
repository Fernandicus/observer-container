import { Observer } from "../domain/interfaces/Observer";
import { ObserverContainer } from "../domain/ObserverContainer";
import {
  ClassType,
  KeyValuePairs,
  SubjectType,
} from "../domain/types/custom-types";

type LinkObserverToSubjectProps = Parameters<
  ObserverContainer["linkObserverToSubject"]
>[number];
type AddObserverProps = {
  subject: SubjectType;
  observers: Observer<unknown>[];
}[];
type LinkObserversProps = Partial<{
  [type: string]: AddObserverProps;
}>;

type AddObserversProps = { type: ClassType; subjectDataList: AddObserverProps };
type Observers = Parameters<ObserverContainer["loadObservers"]>[number];


export class AddObservers {
  constructor(private observerContainer: ObserverContainer) {}

  add(paramsList: AddObserversProps[]) {
    let observers: Observers = {};
    for (const params of paramsList) {
      const { type, subjectDataList } = params;

      const obs = this.sortSubjects({
        [type.name]: subjectDataList,
      });

      observers = { ...observers, ...obs };
    }
    return observers;
  }

  private sortSubjects(props: LinkObserversProps) {
    const observers: KeyValuePairs = {};

    for (const type in props) {
      const subjectDataList = props[type];

      if (!subjectDataList) return;

      for (const subjectData of subjectDataList) {
        subjectData.observers.forEach((observer, i) => {
          const linkObserver = this.linkObserversToSubject({
            name: type,
            subject: subjectData.subject,
            observer,
          });

          observers[subjectData.subject.name] = {
            ...observers[subjectData.subject.name],
            [i]: linkObserver,
          };
        });
      }
    }
    return observers;
  }

  private linkObserversToSubject(props: LinkObserverToSubjectProps) {
    return () => this.observerContainer.linkObserverToSubject(props);
  }
}
