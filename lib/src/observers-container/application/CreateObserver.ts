import { ObserverContainer } from "../entities/ObserverContainer";
import { Observer } from "../entities/interfaces/Observer";
import { ObserverTags } from "../entities/types/types";

type AddObserver<T> = ObserverTags & { onUpdate: (data: T) => void };

type LoadObserver = {
  addObserverToContainer: (props: ObserverTags) => void;
};

export class CreateObserver {
  constructor(private observerContainer: ObserverContainer) {}

  create<T>(onUpdate: (data: T) => void): LoadObserver {
    return {
      addObserverToContainer: ({ name, subject }: ObserverTags) => {
        this.addObserver({ name, subject, onUpdate });
      },
    };
  }

  private addObserver<T>({ name, subject, onUpdate }: AddObserver<T>) {
    const observer = this.createObserver(onUpdate);
    this.observerContainer.addObserver({ name, subject, observer });
  }

  private createObserver<T>(onUpdate: (data: T) => void): Observer<T> {
    return {
      update: onUpdate,
    };
  }
}
