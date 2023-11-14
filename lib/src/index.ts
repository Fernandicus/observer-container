import { AddObservers } from "./observers-container/application/AddObservers";
import { BuildSubject } from "./observers-container/application/BuildSubject";
import { ObserverContainer } from "./observers-container/domain/ObserverContainer";
import { Observer } from "./observers-container/domain/interfaces/Observer";

type LoadObserversProps = Parameters<
  BuildSubject["withObserversLoaders"]
>[number];
type AddObserversProps = Parameters<AddObservers["add"]>[number];

const observerContainer = new ObserverContainer();
const buildSubject = new BuildSubject(observerContainer);
const observersAdder = new AddObservers(observerContainer);

export const createObserver = <T>(onUpdate: (data: T) => void): Observer<T> => {
  return {
    update: onUpdate,
  };
};

export const loadObservers = (props: LoadObserversProps) => {
  return buildSubject.withObserversLoaders(props);
};

export const addObservers = (props: AddObserversProps) => {
  return observersAdder.add(props);
};
