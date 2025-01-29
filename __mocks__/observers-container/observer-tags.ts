import { setObserverTags } from "../../lib/src";

export const { addObservers, loadObservers } = setObserverTags([
  { name: "User", subject: ["SignUp", "ContactSales"] },
  { name: "Product", subject: ["Buy", "Sell"] },
]);
