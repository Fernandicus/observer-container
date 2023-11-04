import { ObserverContainer } from "../domain/ObserverContainer";
import { SubjectType } from "../domain/types/custom-types";

const observerContainer = new ObserverContainer();

export const buildSubjectFromObservers = (props: (subject: SubjectType) => void) => {
  return observerContainer.buildSubject(props);
};
