import { buildSubject } from "../__mocks__/build-subject";
import { fakeUser } from "../__mocks__/fake-user";
import { signUpUser, userRepo } from "../__mocks__/sign-up-user";
import { mockNotifySalesDepartment } from "../__mocks__/observers/test-notify-sales-observers";
import { mockSendEmails } from "../__mocks__/observers/test-send-email-observers";
import { ObserverContainer } from "../lib/src/observers-container/domain/ObserverContainer";
import { SubjectsMap } from "../lib/src/observers-container/domain/SubjectsMap";

describe("On Observer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`Add subjects`, async () => {
    const subjectsMap = new SubjectsMap();
    const container = new ObserverContainer({ subjectsMap });

    container.addSubject({ name: "User", subject: "Save" });
    container.addSubject({ name: "User", subject: "Notify" });
    container.addSubject({ name: "Product", subject: "Buy" });

    expect(subjectsMap.hasName("User")).toBeTruthy();
    expect(subjectsMap.hasName("Product")).toBeTruthy();
  });

  it("Add observers", () => {
    const subjectsMap = new SubjectsMap();
    const container = new ObserverContainer({ subjectsMap });

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

  it("Add subject", () => {
    const subjectsMap = new SubjectsMap();
    const container = new ObserverContainer({ subjectsMap });
    const notif = jest.fn();

    container.addObserver({
      name: "User",
      subject: "Save",
      observer: { update: notif },
    });

    const subject = container.addSubject({
      name: "User",
      subject: "Save",
    });

    subject.notifyObservers({});

    expect(notif).toBeCalled();
  });

  it(`Notify Observers`, async () => {
    await signUpUser({
      subject: buildSubject({
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
