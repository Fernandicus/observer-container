import { loadObservers } from "../lib/src";
import { Observer } from "../lib/src/observers-container/domain/interfaces/Observer";
import { testCreateUserObservers } from "./observers";

export const buildSubject = (observers: Observer<unknown>[]) =>
  loadObservers({
    ...testCreateUserObservers(observers),
  });
