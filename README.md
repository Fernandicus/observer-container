# 👁️ The Observer Pattern in a Clean, Organized and Flexible way

> One Subject to control them all 👁️

### Overview

```tsx
// use case example

const signUpUser = (user: User) => {
  // Your code here ...

  // Notify the observers and send the required data
  const userTags = userTagsHub.get("SignUp");
  buildSubject(userTags).notifyObservers(user);
};
```

## 🏋️ Motivation

This library is intended to keep related observers well organized in the same place.

The approach is that instead of having multiple Subject instances for the different use cases, to have one subject that imports all the related Observers.

## 🤓 HOW IT WORKS

### 1. Create your observers

Import the `createObserver` method and insert your logic into the callback.

```tsx
// user/observers.ts
const sendUserWelcomeEmailObs = createObserver((user: User) => {
  //your logic here ...
});

// product/observers.ts
const addToPurchaseHistoryObs = createObserver((product: Product) => {
  //your logic here ...
});
```

### 2. Add your observers

- OPTION A: Add your observers to the `addObservers` function. It will link your observers to a specific Subject. Just write the name and the subject of what they will observe 👀

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

- OPTION B: If you do not need that level of granularity you can import your observers directly into the `loadObservers` function.

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

## 3. Load your observers

Import the `loadObservers` method and insert your added observers into it (or apply the step 2.B).

```tsx
// shared/observers.ts
export const { buildSubject } = loadObservers([
  ...emailObservers,
  ...paymentsObservers,
]);
```

Now just export your loaded observers to start notifying them.

## 4. Build a Subject and Notify Observers

Now write your logic and notify the observers whenever you need. The `notifyObservers` will call to all the observers linked to the subject and will pass the required data to them.

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

# 🍌 Tip

Using pure strings into the `name` and `subject` arguments for the methods `buildSubjet` and `addObservers` may cause bugs.

We recommend to use the `ObserverTagHub` class instead.

## 📦 Organize your names and subjects

Create a file where your “tags” will live and export them.

```tsx
// observers/tags-hub.ts

export const userObsTags = new ObserverTagHub({
  name: "User",
  // add all the use cases subjects you need
  subjects: ["SignUp", "CloseAccount"],
});

// create as many ObserverTagHubs you need
export const productObsTags = new ObserverTagHub({
  name: "Product",
  subjects: ["Buy", "Sell"],
});
```

Now when you call the `buildSubjet` or `addObservers` methods just import your “tags” and call the `getTagsForSubject` method, It will show all your subjects for a specific name.

```tsx
// use case example

const signUpUser = (user: User) => {
  // Your code here ...

  const userTags = userObsTags.get("SignUp");
  buildSubject(userTags).notifyObservers(user);
};
```
