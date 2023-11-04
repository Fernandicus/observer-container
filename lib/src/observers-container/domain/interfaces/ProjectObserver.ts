export interface ProjectObserver<V> {
  update<T>(data: T extends never ? V : T): void;
}
