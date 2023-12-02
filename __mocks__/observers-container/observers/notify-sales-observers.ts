import { addObservers, createObserver } from "../../../lib/src";
import { userTagsHub } from "./tags-hub";


export const mockNotifySalesDepartment = {
  onSignUpUser: jest.fn(),
  onUserContactSales: jest.fn(),
}

export const notifySalesDepartmentObservers = addObservers([
  {
    name: userTagsHub.getName(),
    subject: userTagsHub.getSubject("SignUp"),
    observers: [createObserver(mockNotifySalesDepartment.onSignUpUser)]
  },
  {
    name: userTagsHub.getName(),
    subject: userTagsHub.getSubject("ContactSales"),
    observers: [createObserver(mockNotifySalesDepartment.onUserContactSales)]
  },
]);
