type Prettify<T> = {
  [Key in keyof T]: T[Key];
} & {};

type ObserverTags = {
  name: string;
  subject: string;
};

type ObserverLoader = (props: ObserverTags) => void;

namespace Param {
  type ObserversMap = Map<string, Map<string, Set<Observer<unknown>>>>;
  type SubjectsMap = Map<string, Set<Subject<unknown>>>;
}

namespace Prop {
  type AddObserver<T> = Prettify<
    ObserverTags & {
      observer: Observer<T>;
    }
  >;

  type LoadObserver = Prettify<
    ObserverTags & {
      observers: ReturnType<CreateObserver["create"]>[];
    }
  >;

  type SubjectBuilderHelper = ObserverTags & {
    observersLoader: ObserverLoader;
  };
}

namespace Return {
  type SubjectBuilder<T> = (props: ObserverTags) => Subject<T>;
}
