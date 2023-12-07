# 👁️ The Observer Pattern in a Clean, Simple and Maintainable way

Just write your code and notify the observers whenever you want.

```tsx
// users/signup-user.ts

const signUpUser = (user: User) => {
  // Your sign up logic ...
  // After sing up succed ...

  const subscriber = observers.buildSubject({
    ...userTagsHub.getTagsForSubject("SignUp"),
  });

  // Pass the required data through the notifyObserver
  subscriber.notifyObservers(user);
};
```

The `notifyObservers` will call and send the required data to all the observers that are linked to the “SignUp” subject

---

## 🤓 HOW IT WORKS

### 1. Create your observers

Import the `createObserver` method and insert your logic into the callback

```tsx
const sendUserWelcomeEmailObserver = createObserver((user: User) => {
  //your logic here
});

const notifySalesNewUserSignUpObserver = createObserver((user: User) => {
  //your logic here
});

const addProductHistorialObserver = createObserver((product: Product) => {
  //your logic here
});
```

### 2. Add your observers to a Subject

Import the `addObservers` method.

It will link your observers to a specific Subject. Just write a name and a subject that they will observe 👀

```tsx
const myObservers = addObservers([
  {
    name: "User",
    subject: "SignUp",
    observers: [sendWelcomeEmailObserver, notifySalesNewUserSignUpObserver],
  },
  {
    name: "Product",
    subject: "Buy",
    observers: [addProductHistorialObserver],
  },
]);
```

In case that you need more granularity you can use multiple `addObservers` methods

```tsx
const sendUserEmailObservers = addObservers([
  {
    name: "User",
    subject: "SignUp",
    observers: [sendWelcomeEmailObserver],
  },
  {
    name: "Product",
    subject: "CreateDiscount",
    observers: [sendEmailToUsersWithDiscountObserver],
  },
]);

const notifySalesDptObservers = addObservers([
  {
    name: "User",
    subject: "SignUp",
    observers: [notifySalesNewUserSignUpObserver],
  },
  {
    name: "Product",
    subject: "Issue",
    observers: [notifySalesWithProductIssueObserver],
  },
]);
```

## 3. Load your observers

Import the `loadObservers` method and insert your added observers into it

```tsx
export const observers = loadObservers([
  ...sendUserEmailObservers,
  ...notifySalesDptObservers,
]);
```

Now just export your loaded observers to start notifying them.

## 4. Build a Subject and Notify Observers

Just write your code and notify the observers whenever you want.

```tsx
const signUpUser = (user: User) => {
  // Your sign up code ...

  // After singup success ...
  const subject = observers.buildSubject({
    name: "User",
    subject: "SignUp",
  });

  // Pass your User object through the notifyObserver
  subscriber.notifyObservers(user);
};
```

The `notifyObservers` will call to all the observers linked to the subject and will pass the user object to them.

---

# ⚠️ Advise

Using pure strings into the `name` and `subject` arguments for the methods `buildSubjet` and `addObservers` may cause typo bugs.

We recommend to use the `ObserverTagHub` class instead.

## 🎯 Centralize your names and subjects

Create a file where your “tags” will live and export them.

```tsx
// observers/tags-hub.ts

export const userTagsHub = new ObserverTagHub({
  name: "User",
  subjects: ["SignUp", "ContactSales"], // add all the subjects you need for a User
});

// create as many ObserverTagHubs you need
export const productTagsHub = new ObserverTagHub({
  name: "Product",
  subjects: ["Buy", "Sell"],
});
```

Now when you call the `buildSubjet` or `addObservers` methods just import your “tags” and call the `getTagsForSubject` method, It will show all your subjects for a specific name.

```tsx
// users/signup-user.ts

const signUpUser = (user: User) => {
  // Your sign up code ...

  // After singup success ...

  const subscriber = observers.buildSubject({
    ...userTagsHub.getTagsForSubject("SignUp"),
  });

  // Pass your User object through the notifyObserver
  subscriber.notifyObservers(user);
};
```
