import { AddObservers } from "./observers-container/application/AddObservers";
import { BuildSubject } from "./observers-container/application/BuildSubject";
import { ObserverContainer } from "./observers-container/domain/ObserverContainer";

type LoadObserversProps = Parameters<
  BuildSubject["loadObserversAndBuildSubject"]
>[number];
type AddObserversProps = Parameters<
  AddObservers["add"]
>[number];


const observerContainer = new ObserverContainer();
const subjectsBuilder = new BuildSubject(observerContainer);
const observersAdder = new AddObservers(observerContainer);

export const loadObservers = (props: LoadObserversProps) => {
  return subjectsBuilder.loadObserversAndBuildSubject(props);
};

export const addObservers = (props: AddObserversProps) => {
  return observersAdder.add(props);
};
