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

const observerContainer = new ObserverContainer();

const linkObserverToSubject = (
  props: LinkObserverToSubjectProps
): (() => void) => {
  return () => observerContainer.linkObserverToSubject(props);
};

const linkObservers = (props: LinkObserversProps) => {
  const observers: KeyValuePairs = {};

  for (const type in props) {
    const subjectDataList = props[type];

    if(!subjectDataList) return;

    for (const subjectData of subjectDataList) {
      subjectData.observers.forEach((observer, i) => {
        
        const linkObserver = linkObserverToSubject({
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
};

type AddObserversProps = { type: ClassType; subjectDataList: AddObserverProps };
export const addObservers = (paramsList: AddObserversProps[]) => {
  let observers = {};
  for (const params of paramsList) {
    const { type, subjectDataList } = params;
    const obs = linkObservers({
      [type.name]: subjectDataList,
    });

    observers = { ...observers, ...obs };
  }
  return observers;
};

class AddObservers {
  constructor(private observerContainer: ObserverContainer) {}
}
