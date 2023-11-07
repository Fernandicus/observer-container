import { ObserverContainer } from "../domain/ObserverContainer";

type LoadProps = Parameters<ObserverContainer["loadObservers"]>[number];
type LoadReturn = ReturnType<ObserverContainer["buildSubject"]>;

export class BuildSubject {
  constructor(private container: ObserverContainer) {}

  loadObserversAndBuildSubject(observers: LoadProps): LoadReturn {
    const observersLoaded = this.container.loadObservers(observers);
    return this.container.buildSubject(observersLoaded);
  }
}
