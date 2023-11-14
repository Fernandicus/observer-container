import { buildSubject } from "../__mocks__/build-subject";
import { fakeUser } from "../__mocks__/fake-user";
import { saveUser } from "../__mocks__/save-user";
import { mockNotifySalesDepartment } from "../__mocks__/test-notify-sales-observers";
import { mockSendEmails } from "../__mocks__/test-send-email-observers";
import { userRepo } from "../__mocks__/user-repo";
import { ObserverContainer } from "../lib/src/observers-container/domain/ObserverContainer";

describe("On Observer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`Add subjects`, async () => {
    const container = new ObserverContainer();

    container.addSubject({ name: "User", subject: "Save" });
    container.addSubject({ name: "User", subject: "Notify" });
    container.addSubject({ name: "Product", subject: "Buy" });

    expect(container.subjects.has("User")).toBeTruthy();
    expect(container.subjects.has("Product")).toBeTruthy();
  });

  it("Add observers", () => {
    const container = new ObserverContainer();

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
      observer: { update: jest.fn() },
    });

    container.addObserver({
      name: "Product",
      subject: "Buy",
      observer: { update: jest.fn() },
    });

    const userHasSave = container.observers.get("User")?.has("Save");
    const userObservers = container.observers.get("User");
    const userSaveObservers = container.observers.get("User")!.get("Save");
    const userHasNotify = container.observers.get("User")?.has("Notify");
    const productHasBuy = container.observers.get("Product")?.has("Buy");
    const productObserves = container.observers.get("Product");

    expect(userHasSave).toBeTruthy();
    expect(userHasNotify).toBeTruthy();
    expect(userObservers?.size).toBe(2);
    expect(userSaveObservers?.size).toBe(2);
    expect(productHasBuy).toBeTruthy();
    expect(productObserves?.size).toBe(1);
  });

  it("On buildSubject", () => {
    const container = new ObserverContainer();
    const notif = jest.fn();

    container.addObserver({
      name: "User",
      subject: "Save",
      observer: { update: notif },
    });

    const subject = container.buildSubject({
      name: "User",
      subject: "Save",
    });

    subject.notifyObservers({});

    expect(notif).toBeCalled();
  });

  it(`WHEN build a Subject and call Notify Observers, 
  THEN Observer Update method should be called`, async () => {
    await saveUser({
      subject: buildSubject({
        name: "User",
        subject: "SignUp",
      }),
      userRepo: userRepo,
    });

    mockNotifySalesDepartment.onSignUpUser.forEach(observer => {
      expect(observer.update).toBeCalledWith(fakeUser);
    })
    mockNotifySalesDepartment.onUserContactSales.forEach(observer => {
      expect(observer.update).not.toBeCalled();
    })

    mockSendEmails.onSignUpUser.forEach(observer => {
      expect(observer.update).toBeCalledWith(fakeUser);
    })
    mockSendEmails.onBuyProduct.forEach(observer => {
      expect(observer.update).not.toBeCalled();
    })

  });
});
