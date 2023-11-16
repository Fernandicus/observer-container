import { buildSubject, observerCreator } from "./observers-container";
import { BuildSubject } from "./observers-container/application/BuildSubject";
import { ObserverTags, Prop } from "./observers-container/entities/types/types";

type AddObserver<T> = ObserverTags & {
  observers: ReturnType<typeof createObserver<T>>[];
};
type LoadObservers = Prop.LoadObserver[];
type ReturnObservers = ReturnType<BuildSubject["withObserversLoaders"]>;

export function createObserver<T>(onUpdate: (data: T) => void) {
  return observerCreator.create(onUpdate);
}

export function loadObservers(props: LoadObservers): ReturnObservers {
  return buildSubject.withObserversLoaders(props);
}

export function addObservers<T>(observers: AddObserver<T>[]): AddObserver<T>[] {
  return observers;
}