import { addObservers, createObserver } from "../../lib/src";

export const mockSendEmails = {
  onSignUpUser: jest.fn(),
  onBuyProduct: jest.fn(),
};

export const mockUserSignUp = jest.fn();
export const mockUserContactSales = jest.fn();

export const sendEmailsObservers = addObservers([
  {
    name: "User",
    subject: "SignUp",
    observers: [createObserver(mockSendEmails.onSignUpUser)],
  },
  {
    name: "Product",
    subject: "Buy",
    observers: [createObserver(mockSendEmails.onBuyProduct)],
  },
]);
