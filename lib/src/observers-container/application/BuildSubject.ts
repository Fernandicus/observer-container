import { ObserverContainer } from "../domain/ObserverContainer";

type LoadProps = Parameters<ObserverContainer["loadObservers"]>[number];
type LoadReturn = ReturnType<ObserverContainer["subjectBuilder"]>;

export class BuildSubject {
  constructor(private container: ObserverContainer) {}

  withObserversLoaders(observers: LoadProps): LoadReturn {
    const observersLoaded = this.container.loadObservers(observers);
    return this.container.subjectBuilder(observersLoaded);
  }
}
