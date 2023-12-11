import { buildSubject, observerCreator } from "./observers-container";
import { BuildSubject } from "./observers-container/application/BuildSubject";
import { Prop } from "./observers-container/entities/types/types";

type ReturnObservers = {
  buildSubject: ReturnType<BuildSubject["withObserversLoaders"]>;
};

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
    loadObservers: loadObservers<
      TName,
      TSubjects,
      Prop.ExtractObserverTag<TObserverTag>
    >,
    addObservers: (props: AddObserverProps<typeof observerTags>[]) => props,
  };
}
