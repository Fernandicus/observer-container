import { buildSubject, observerCreator } from "./observers-container";
import { BuildSubject } from "./observers-container/application/BuildSubject";
import { ObserverTags, Prop } from "./observers-container/entities/types/types";

type AddObserver<T> = ObserverTags & {
  observers: ReturnType<typeof createObserver<T>>[];
};
type LoadObservers = Prop.LoadObserver[];
type ReturnObservers = {
  build: ReturnType<BuildSubject["withObserversLoaders"]>;
};

export { ObserverTagHub } from "./observers-container/index";

export function createObserver<T>(onUpdate: (data: T) => void) {
  return observerCreator.create(onUpdate);
}

export function loadObservers(props: LoadObservers): ReturnObservers {
  return {
    build: buildSubject.withObserversLoaders(props),
  };
}

export function addObservers<T>(observers: AddObserver<T>[]): AddObserver<T>[] {
  return observers;
}
