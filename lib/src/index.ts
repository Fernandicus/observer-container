import { AddObservers } from "./observers-container/application/AddObservers";
import { BuildSubject } from "./observers-container/application/BuildSubject";
import { ObserverContainer } from "./observers-container/domain/ObserverContainer";
import { Observer } from "./observers-container/domain/interfaces/Observer";

type LoadObserversProps = Parameters<
  BuildSubject["loadObserversAndBuildSubject"]
>[number];
type AddObserversProps = Parameters<AddObservers["add"]>[number];

const observerContainer = new ObserverContainer();
const subjectsBuilder = new BuildSubject(observerContainer);
const observersAdder = new AddObservers(observerContainer);

export const createObserver = <T>(onUpdate: (data: T) => void): Observer<T> => {
  return {
    update: onUpdate,
  };
};

export const loadObservers = (props: LoadObserversProps) => {
  return subjectsBuilder.loadObserversAndBuildSubject(props);
};

export const addObservers = (props: AddObserversProps) => {
  return observersAdder.add(props);
};
