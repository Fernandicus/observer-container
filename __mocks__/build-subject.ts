import { loadObservers } from "../lib/src";
import { Observer } from "../lib/src/observers-container/domain/interfaces/Observer";
import { testNotifySalesDepObservers } from "./test-notify-sales-observers";
import { testSendEmailObservers } from "./test-send-email-observers";

type Props = {
  notfySales: {
    onContactUser: Observer<unknown>[];
    onSaveUser: Observer<unknown>[];
  };
  sendEmail: {
    onSaveUser: Observer<unknown>[];
    onBuyProduct: Observer<unknown>[];
  };
};

export const buildSubject = ({ notfySales, sendEmail }: Props) =>
  loadObservers({
    ...testSendEmailObservers({
      buyProduct: sendEmail.onBuyProduct,
      saveUser: sendEmail.onSaveUser,
    }),
    ...testNotifySalesDepObservers({
      contactUser: notfySales.onContactUser,
      saveUser: notfySales.onSaveUser,
    }),
  });
