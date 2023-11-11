import { addObservers } from "../lib/src";
import { Observer } from "../lib/src/observers-container/domain/interfaces/Observer";

export const testNotifySalesDepObservers = (observers: {
  saveUser: Observer<unknown>[];
  contactUser: Observer<unknown>[];
}) =>
  addObservers([
    {
      name: "User",
      subjects: [
        {
          type: "Save",
          observers: observers.saveUser,
        },
        {
          type: "Contact",
          observers: observers.contactUser,
        },
      ],
    },
  ]);
