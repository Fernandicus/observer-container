import { addObservers, createObserver } from "../../../lib/src";
import { userTagsHub } from "./tags-hub";


export const mockNotifySalesDepartment = {
  onSignUpUser: jest.fn(),
  onUserContactSales: jest.fn(),
}

export const notifySalesDepartmentObservers = addObservers([
  {
    ...userTagsHub.getTagsForSubject("SignUp"),
    observers: [createObserver(mockNotifySalesDepartment.onSignUpUser)]
  },
  {
    ...userTagsHub.getTagsForSubject("ContactSales"),
    observers: [createObserver(mockNotifySalesDepartment.onUserContactSales)]
  },
]);
