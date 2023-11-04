import { SubjectType } from "../domain/types/custom-types";

type LoadObserver = { [key: string]: () => void };

export const setObservers = (allObservers: LoadObserver) => {
  return (subject: SubjectType | string) => {
    if (typeof subject === "string") {
      const observers = allObservers[subject];
      load(observers);
    } else {
      const observers = allObservers[subject.name];
      load(observers);
    }
  };
};

function load(observers: () => void) {
  if (!observers) return;
  const functions = Object.values(observers);
  for (const observer of functions) {
    observer();
  }
}
