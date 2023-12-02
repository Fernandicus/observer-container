import { loadObservers } from "../../lib/src";
import { notifySalesDepartmentObservers } from "./observers/notify-sales-observers";
import { sendEmailsObservers } from "./observers/send-email-observers";

export const observers = loadObservers([
  ...sendEmailsObservers,
  ...notifySalesDepartmentObservers,
]);
