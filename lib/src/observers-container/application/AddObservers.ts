import { Observer } from "../domain/interfaces/Observer";
import { ObserverContainer } from "../domain/ObserverContainer";
import { KeyValuePairs, SubjectType } from "../domain/types/custom-types";

type LinkObserverToSubjectProps = Parameters<
  ObserverContainer["linkObserverToSubject"]
>[number];
type AddObserverProps = {
  subjectType: string;
  observers: Observer<unknown>[];
}[];
type LinkObserversProps = Partial<{
  [type: string]: AddObserverProps;
}>;

type AddObserversProps = { name: string; subjectDataList: AddObserverProps };
type Observers = Parameters<ObserverContainer["loadObservers"]>[number];

export class AddObservers {
  constructor(private observerContainer: ObserverContainer) {}

  add(paramsList: AddObserversProps[]) {
    let observers: Observers = {};
    for (const params of paramsList) {
      const { name, subjectDataList } = params;

      const obs = this.sortSubjects({
        [name]: subjectDataList,
      });
      
      observers = { ...observers, ...obs };
    }
    return observers;
  }
  
  private sortSubjects(props: LinkObserversProps) {
    const subjectToObservers: KeyValuePairs = {};

    for (const name in props) {
      const subjectDataList = props[name];

      if (!subjectDataList) return;

      for (const subjectData of subjectDataList) {
        const { observers, subjectType } = subjectData;

        observers.forEach((observer, i) => {
          const linkObserver = this.linkObserversToSubject({
            name,
            type: subjectType,
            observer,
          });

          subjectToObservers[subjectType] = {
            ...subjectToObservers[subjectType],
            [i]: linkObserver,
          };
        });
      }
    }
    return subjectToObservers;
  }

  private linkObserversToSubject(props: LinkObserverToSubjectProps) {
    return () => this.observerContainer.linkObserverToSubject(props);
  }
}
