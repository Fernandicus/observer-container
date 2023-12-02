import { loadObservers } from "../lib/src";
import { notifySalesDepartmentObservers } from "./observers/test-notify-sales-observers";
import { sendEmailsObservers } from "./observers/test-send-email-observers";

export const observers = loadObservers([
  ...sendEmailsObservers,
  ...notifySalesDepartmentObservers,
]);
