import { ObserverTagHub } from "../../lib/src/observers-container/application/ObserverTagHub";

export const userTagsHub = new ObserverTagHub({
  name: "User",
  subjects: ["SignUp", "ContactSales"],
});

export const productTagsHub = new ObserverTagHub({
  name: "Product",
  subjects: ["Buy", "Sell"],
});
