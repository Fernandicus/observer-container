import { CreateObserver } from "../../application/CreateObserver";
import { Subject } from "../Subject";
import { Observer } from "../interfaces/Observer";

export type Prettify<T> = {
  [Key in keyof T]: T[Key];
} & {};

export type ObserverTags = {
  name: string;
  subject: string;
};

export type ObserverLoader = (props: ObserverTags) => void;

export namespace Param {
  export type ObserversMap = Map<string, Map<string, Set<Observer<unknown>>>>;
  export type SubjectsMap = Map<string, Set<Subject<unknown>>>;
}

export namespace Prop {
  export type AddObserver<T> = Prettify<
    ObserverTags & {
      observer: Observer<T>;
    }
  >;

  export type LoadObserver = Prettify<
    ObserverTags & {
      observers: ReturnType<CreateObserver["create"]>[];
    }
  >;

  export type SubjectBuilderHelper = ObserverTags & {
    observersLoader: ObserverLoader;
  };

  export type ExtractObserverTag<T> = {
    [Key in keyof T]: T[Key] extends infer Infer
      ? Infer extends string
        ? Infer
        : Infer extends string[]
        ? Infer[number]
        : never
      : never;
  };

  export type ExtractObserverTagsArray<T> = T extends Array<object>
    ? T extends [...args: infer Infer]
      ? Infer[number] extends infer InnerInfer
        ? InnerInfer extends object
          ? ExtractObserverTag<InnerInfer>
          : InnerInfer extends string[]
          ? InnerInfer[number]
          : never
        : never
      : never
    : never;

  export type SetObserverTags<
    TName extends string,
    TSubjects extends string
  > = {
    name: TName;
    subject: TSubjects[];
  };
}

export namespace Return {
  export type SubjectBuilder<T> = (props: ObserverTags) => Subject<T>;
}
