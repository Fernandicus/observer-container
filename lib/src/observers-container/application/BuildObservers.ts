import { CreateObserver } from "./CreateObserver";

type AddProps = ObserverTags & {
  observers: ReturnType<CreateObserver["create"]>[];
};
export class BuildObservers {
  constructor() {}

  build(paramsList: AddProps[]): AddProps[] {
    return paramsList;
  }
}
