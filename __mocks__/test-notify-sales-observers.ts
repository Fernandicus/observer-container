import { addObservers, createObserver } from "../lib/src";
import { Observer } from "../lib/src/observers-container/domain/interfaces/Observer";

export const mockNotifySalesDepartment = {
  onSignUpUser: [createObserver(jest.fn())],
  onUserContactSales: [createObserver(jest.fn())],
} satisfies { [key: string]: Observer<unknown>[] };

export const notifySalesDepartmentObservers = addObservers([
  {
    name: "User",
    subject: "SignUp",
    observers: mockNotifySalesDepartment.onSignUpUser,
  },
  {
    name: "User",
    subject: "ContactSales",
    observers: mockNotifySalesDepartment.onUserContactSales,
  },
]);
