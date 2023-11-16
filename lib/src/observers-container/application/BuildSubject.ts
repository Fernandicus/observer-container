import { loadObservers } from "../..";
import { ObserverContainer } from "../entities/ObserverContainer";

type LoadReturn = ReturnType<ObserverContainer["subjectBuilder"]>;

export class BuildSubject {
  constructor(private container: ObserverContainer) {}

  withObserversLoaders(observers: Prop.LoadObserver[]): LoadReturn {
    const observersLoaded = this.container.loadObservers(observers);
    return this.container.subjectBuilder(observersLoaded);
  }
}
