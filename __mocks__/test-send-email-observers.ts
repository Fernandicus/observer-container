import { addObservers, createObserver } from "../lib/src";
import { Observer } from "../lib/src/observers-container/domain/interfaces/Observer";

export const mockSendEmails = {
  onSignUpUser: [createObserver(jest.fn())],
  onBuyProduct: [createObserver(jest.fn())],
} satisfies { [key: string]: Observer<unknown>[] };

export const sendEmailsObservers = 
  addObservers([
    {
      name: "User",
      subject: "SignUp",
      observers: mockSendEmails.onSignUpUser,
    },
    {
      name: "Product",
      subject: "Buy",
      observers: mockSendEmails.onBuyProduct
    },
  ]);
