import { ObserverContainer } from "../domain/ObserverContainer";
import { BuildObservers } from "./BuildObservers";

type LoadProps = Parameters<BuildObservers["build"]>[number];
type LoadReturn = ReturnType<ObserverContainer["subjectBuilder"]>;

export class BuildSubject {
  constructor(private container: ObserverContainer) {}

  withObserversLoaders(observers: LoadProps): LoadReturn {
    const observersLoaded = this.container.loadObservers(observers);
    return this.container.subjectBuilder(observersLoaded);
  }
}
