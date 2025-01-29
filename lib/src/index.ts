import { buildSubject, observerCreator } from "./observers-container";
import { Prop } from "./observers-container/entities/types/types";

function loadObservers<
  TName extends string,
  TSubjects extends string,
  TObserverTag extends Prop.ExtractObserverTag<
    Prop.SetObserverTags<TName, TSubjects>
  >
>(props: Prop.LoadObserver[]) {
  const build = buildSubject.withObserversLoaders(props);
  return {
    buildSubject: (props: TObserverTag) => build(props),
  };
}

export function createObserver<T>(onUpdate: (data: T) => void) {
  return observerCreator.create(onUpdate);
}

type AddObserverProps<T> = Prop.ExtractObserverTagsArray<T> & {
  observers: ReturnType<typeof createObserver<any>>[];
};
export function setObserverTags<
  TName extends string,
  TSubjects extends string,
  TObserverTag extends Prop.SetObserverTags<TName, TSubjects>
>(observerTags: TObserverTag[]) {
  return {
    loadObservers: (props: AddObserverProps<typeof observerTags>[]) =>
      loadObservers(props),
    addObservers: (props: AddObserverProps<typeof observerTags>[]) => props,
  };
}
