import { loadObservers } from "../lib/src";
import { notifySalesDepartmentObservers } from "./notify-sales-observers";
import { sendEmailsObservers } from "./send-email-observers";

export const observers = loadObservers([
  ...sendEmailsObservers,
  ...notifySalesDepartmentObservers,
]);
