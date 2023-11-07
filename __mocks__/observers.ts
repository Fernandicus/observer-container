import { addObservers } from "../lib/src";
import { Observer } from "../lib/src/observers-container/domain/interfaces/Observer";

export const testCreateUserObservers = (observers: Observer<unknown>[]) =>
  addObservers([
    {
      name: "User",
      subjectDataList: [
        {
          subjectType: "Create",
          observers,
        },
      ],
    },
  ]);
