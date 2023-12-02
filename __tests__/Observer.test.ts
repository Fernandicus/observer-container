import { observers } from "../__mocks__/observers-container/loaded-observers";
import { fakeUser } from "../__mocks__/use-case/fake-user";
import { signUpUser, userRepo } from "../__mocks__/use-case/signup-user";
import { mockNotifySalesDepartment } from "../__mocks__/observers-container/observers/notify-sales-observers";
import { mockSendEmails } from "../__mocks__/observers-container/observers/send-email-observers";
import { ObserverContainer } from "../lib/src/observers-container/entities/ObserverContainer";
import { SubjectsMap } from "../lib/src/observers-container/entities/SubjectsMap";
import { ObserversMap } from "../lib/src/observers-container/entities/ObserversMap";

describe("On Observer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`Add subjects`, async () => {
    const subjectsMap = new SubjectsMap();
    const observersMap = new ObserversMap();
    const container = new ObserverContainer({ subjectsMap, observersMap });

    container.addSubject({ name: "User", subject: "Save" });
    container.addSubject({ name: "User", subject: "Notify" });
    container.addSubject({ name: "Product", subject: "Buy" });

    expect(subjectsMap.hasName("User")).toBeTruthy();
    expect(subjectsMap.hasName("Product")).toBeTruthy();
  });

  it("Add observers", () => {
    const subjectsMap = new SubjectsMap();
    const observersMap = new ObserversMap();
    const container = new ObserverContainer({ subjectsMap, observersMap });

    container.addObserver({
      name: "User",
      subject: "Save",
      observer: { update: () => {} },
    });

    container.addObserver({
      name: "User",
      subject: "Save",
      observer: { update: () => {} },
    });

    container.addObserver({
      name: "User",
      subject: "Notify",
      observer: { update: () => {} },
    });

    container.addObserver({
      name: "Product",
      subject: "Buy",
      observer: { update: () => {} },
    });

    const userSaveObservers = observersMap.findObservers({
      name: "User",
      subject: "Save",
    });
    const userNotifyObservers = observersMap.findObservers({
      name: "User",
      subject: "Notify",
    });
    const userProductObservers = observersMap.findObservers({
      name: "Product",
      subject: "Buy",
    });

    expect(userSaveObservers.length).toBe(2);
    expect(userNotifyObservers.length).toBe(1);
    expect(userProductObservers.length).toBe(1);
  });

  it("Add subject", () => {
    const subjectsMap = new SubjectsMap();
    const observersMap = new ObserversMap();
    const container = new ObserverContainer({ subjectsMap, observersMap });

    const notif = jest.fn();
    const observerTag = {
      name: "User",
      subject: "Save",
    };

    container.addObserver({
      ...observerTag,
      observer: { update: notif },
    });

    container.addSubject(observerTag);

    const subject = container.buildSubject(observerTag);

    subject.notifyObservers({});

    expect(notif).toBeCalled();
  });

  it("NOT Add Observer after adding subject", () => {
    const subjectsMap = new SubjectsMap();
    const observersMap = new ObserversMap();
    const container = new ObserverContainer({ subjectsMap, observersMap });

    const notif = jest.fn();
    const observerTag = {
      name: "User",
      subject: "Save",
    };

    container.addSubject(observerTag);
    
    container.addObserver({
      ...observerTag,
      observer: { update: notif },
    });

    const subject = container.buildSubject(observerTag);
    
    subject.notifyObservers({});

    expect(notif).toBeCalled();
  });

  it(`Notify Observers`, async () => {
    await signUpUser({
      subject: observers.build({
        name: "User",
        subject: "SignUp",
      }),
      userRepo: userRepo,
    });

    expect(mockNotifySalesDepartment.onSignUpUser).toBeCalledWith(fakeUser);
    expect(mockSendEmails.onSignUpUser).toBeCalledWith(fakeUser);

    expect(mockNotifySalesDepartment.onUserContactSales).not.toBeCalled();
    expect(mockSendEmails.onBuyProduct).not.toBeCalled();
  });
});
