import { Observer } from "../domain/interfaces/Observer";
import { ObserverContainer } from "../domain/ObserverContainer";
import { KeyValuePairs } from "../domain/types/custom-types";

type LinkObserverToSubjectProps = Parameters<
  ObserverContainer["linkObserverToSubject"]
>[number];
type AddObserverProps = {
  type: string;
  observers: Observer<unknown>[];
}[];
type LinkObserversProps = Partial<{
  [type: string]: AddObserverProps;
}>;

type AddObserversProps = { name: string; subjects: AddObserverProps };
type Observers = Parameters<ObserverContainer["loadObservers"]>[number];

export class AddObservers {
  constructor(private observerContainer: ObserverContainer) {}

  add(paramsList: AddObserversProps[]) {
    let observers: Observers = {};
    for (const params of paramsList) {
      const { name, subjects } = params;

      const obs = this.sortSubjects({
        [name]: subjects,
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
        const { observers, type } = subjectData;

        observers.forEach((observer, i) => {
          const linkObserver = this.linkObserversToSubject({
            name,
            type: type,
            observer,
          });

          subjectToObservers[type] = {
            ...subjectToObservers[type],
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
