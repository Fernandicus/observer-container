import { addObservers, createObserver } from "../../../lib/src";
import { productTagsHub, userTagsHub } from "./tags-hub";

export const mockSendEmails = {
  onSignUpUser: jest.fn(),
  onBuyProduct: jest.fn(),
};

export const mockUserSignUp = jest.fn();
export const mockUserContactSales = jest.fn();

export const sendEmailsObservers = addObservers([
  {
    ...userTagsHub.getTagsForSubject("SignUp"),
    observers: [createObserver(mockSendEmails.onSignUpUser)],
  },
  {
    ...productTagsHub.getTagsForSubject("Buy"),
    observers: [createObserver(mockSendEmails.onBuyProduct)],
  },
]);
