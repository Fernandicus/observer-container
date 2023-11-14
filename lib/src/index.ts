import { BuildObservers } from "./observers-container/application/BuildObservers";
import { BuildSubject } from "./observers-container/application/BuildSubject";
import { CreateObserver } from "./observers-container/application/CreateObserver";
import { ObserverContainer } from "./observers-container/domain/ObserverContainer";

type LoadObserversProps = Parameters<BuildObservers["build"]>[number];
type AddObserversProps = Parameters<BuildObservers["build"]>[number];

const observerContainer = new ObserverContainer();
const observerCreator = new CreateObserver(observerContainer);
const buildSubject = new BuildSubject(observerContainer);
const observersBuilder = new BuildObservers();

export const createObserver = <T>(onUpdate: (data: T) => void) => {
  return observerCreator.create(onUpdate);
};

export const loadObservers = (props: LoadObserversProps) => {
  return buildSubject.withObserversLoaders(props);
};

export const addObservers = (props: AddObserversProps) => {
  return observersBuilder.build(props);
};
