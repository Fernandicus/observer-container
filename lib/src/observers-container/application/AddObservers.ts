import { Observer } from "../domain/interfaces/Observer";
import { ObserverContainer } from "../domain/ObserverContainer";
import { ObserverTags } from "../domain/types/custom-types";

type AddProps = ObserverTags & {
  observers: Observer<unknown>[];
};
type AddObserverLoader = ObserverTags & {
  observer: Observer<unknown>;
};
type ObserversLoaders = ObserverTags & {
  observers: (() => void)[];
};

export class AddObservers {
  constructor(private observerContainer: ObserverContainer) {}

  add(paramsList: AddProps[]): ObserversLoaders[] {
    const observers = this.observersToLoaders(paramsList);
    return observers;
  }

  private observersToLoaders(paramsList: AddProps[]) {
    return paramsList.map((props): ObserversLoaders => {
      const { name, subject } = props;

      const observersLoaders = this.loadObserversLoader(props);

      return {
        name,
        subject,
        observers: observersLoaders,
      };
    });
  }

  private loadObserversLoader({ name, subject, observers }: AddProps) {
    return observers.map((observer) => {
      return this.addObserverLoader({
        name,
        subject,
        observer,
      });
    });
  }

  private addObserverLoader({ name, subject, observer }: AddObserverLoader) {
    return () =>
      this.observerContainer.addObserver({ name, subject, observer });
  }
}
