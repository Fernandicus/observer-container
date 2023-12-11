import { loadObservers } from "./observer-tags";
import { notifySalesDepartmentObservers } from "./observers/notify-sales-observers";
import { sendEmailsObservers } from "./observers/send-email-observers";

export const { buildSubject } = loadObservers([
  ...sendEmailsObservers,
  ...notifySalesDepartmentObservers,
]);
