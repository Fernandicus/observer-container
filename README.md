# 👁️ The Observer Pattern in a Clean, Organized and Flexible way

<aside>
📢 One Subject to notify them all

</aside>

### Overview

The library uses a set of tags to link your observers with your subjects

```tsx
// use case example

const signUpUser = (user: User) => {
  // Your code here ...

  // Notify the the observers and send the required data
  buildSubject({
    name: "User",
    subject: "SignUp",
  }).notifyObservers(user);
};
```

## 🏋️ Motivation

This library is intended to avoid creating multiple instances of the different Subjects. The approach is that instead of having multiple Subject instances for the different use cases, to have one subject that uses Tags to link multiple Observers and use cases.

## 🤓 HOW IT WORKS

### 1. Set your Observer Tags

Use the `setObserverTags` function to initialize the library. From here you will set tags to link and identify your observers.

```tsx
export const { addObservers, loadObservers } = setObserverTags([
  { name: "User", subject: ["SignUp", "ContactSales"] },
  { name: "Product", subject: ["Buy", "Sell"] },
]);
```

Extract and export the `addObservers`, `loadObservers` functions.

### 2. Create your observers

Import the `createObserver` function and insert your logic into the callback.

```tsx
// email/observers.ts
const sendUserWelcomeEmailObs = createObserver((user: User) => {
  //your logic here ...
});

// product/observers.ts
const addToPurchaseHistoryObs = createObserver((product: Product) => {
  //your logic here ...
});
```

### 3. Add your observers

- OPTION A: Use the exported `addObservers` function and use it to link your observers to a specific Subject. Just select the name and the subject of what you want to observe 👀

```tsx
// email/observers-container.ts
const emailObservers = addObservers([
  {
    name: "User",
    subject: "SignUp",
    observers: [sendWelcomeEmailObs, notifySalesNewUserSignUpObs],
  },
  {
    name: "Blog",
    subject: "NewPost",
    observers: [sendNewsLetterWithBlogContentObs],
  },
]);

// product/observers-container.ts
const productObservers = addObservers([
  {
    name: "Campaign",
    subject: "BlackFriday",
    observers: [applyDiscountToProductObs],
  },
  {
    name: "Seller",
    subject: "CloseAccount",
    observers: [removeProductsFromSellerObs],
  },
]);
```

- OPTION B: If you do not need that level of granularity you can import your observers directly into the exported `loadObservers` function.

```tsx
// shared/observers.ts
export const { buildSubject } = loadObservers([
  {
    name: "User",
    subject: "SignUp",
    observers: [sendWelcomeEmailObs, notifySalesNewUserSignUpObs],
  },
  {
    name: "Campaign",
    subject: "BlackFriday",
    observers: [applyProductDiscountObs],
  },
]);
```

### 4. Load your observers

Use the exported `loadObservers` function to link your observers with your subjects.

```tsx
// shared/observers.ts
export const { buildSubject } = loadObservers([
  ...emailObservers,
  ...paymentsObservers,
]);
```

Now just extract and export the `buildSubject` function to start notifying your subjects by tag.

### 5. Build a Subject and Notify Observers

Now write your logic and notify the observers whenever you need. The `notifyObservers` method will call all the observers linked to the subject and will pass the required data to them.

```tsx
// use case example

const signUpUser = (user: User) => {
  // Your code here ...

  // Notify the all the observers and send the required data
  buildSubject({
    name: "User",
    subject: "SignUp",
  }).notifyObservers(user);
};
```
