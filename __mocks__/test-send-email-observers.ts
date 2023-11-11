import { addObservers } from "../lib/src";
import { Observer } from "../lib/src/observers-container/domain/interfaces/Observer";

export const testSendEmailObservers = (observers: {
  saveUser: Observer<unknown>[];
  buyProduct: Observer<unknown>[];
}) =>
  addObservers([
    {
      name: "User",
      subjects: [
        {
          type: "Save",
          observers: observers.saveUser,
        },
      ],
    },
    {
      name: "Product",
      subjects: [
        {
          type: "Buy",
          observers: observers.saveUser,
        },
      ],
    },
  ]);
