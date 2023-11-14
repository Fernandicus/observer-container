import { loadObservers } from "../lib/src";
import { notifySalesDepartmentObservers } from "./test-notify-sales-observers";
import { sendEmailsObservers } from "./test-send-email-observers";

export const buildSubject = loadObservers([
  ...sendEmailsObservers,
  ...notifySalesDepartmentObservers,
]);
