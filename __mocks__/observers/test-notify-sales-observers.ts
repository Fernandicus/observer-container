import { addObservers, createObserver } from "../../lib/src";


export const mockNotifySalesDepartment = {
  onSignUpUser: jest.fn(),
  onUserContactSales: jest.fn(),
}

export const notifySalesDepartmentObservers = addObservers([
  {
    name: "User",
    subject: "SignUp",
    observers: [createObserver(mockNotifySalesDepartment.onSignUpUser)]
  },
  {
    name: "User",
    subject: "ContactSales",
    observers: [createObserver(mockNotifySalesDepartment.onUserContactSales)]
  },
]);
