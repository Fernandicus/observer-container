import { buildSubject } from "../__mocks__/build-subject";
import { saveUser } from "../__mocks__/save-user";
import { User } from "../__mocks__/types/User";
import { userRepo } from "../__mocks__/user-repo";
import { createObserver } from "../lib/src";
import { Observer } from "../lib/src/observers-container/domain/interfaces/Observer";

describe("On Observer", () => {
  let notifySalesOnSaveUserObserver: Observer<User>;
  let notifySalesOnContactUserObserver: Observer<User>;
  let sendEmailOnSaveUserObserver: Observer<User>;
  let sendEmailOnBuyProductObserver: Observer<User>;
  let buildSaveUserSubject: ReturnType<typeof buildSubject>;

  beforeAll(() => {
    notifySalesOnSaveUserObserver = createObserver(jest.fn());
    notifySalesOnContactUserObserver = createObserver(jest.fn());

    sendEmailOnSaveUserObserver = createObserver(jest.fn());
    sendEmailOnBuyProductObserver = createObserver(jest.fn());

    buildSaveUserSubject = buildSubject({
      notfySales: {
        onSaveUser: [notifySalesOnSaveUserObserver],
        onContactUser: [notifySalesOnContactUserObserver],
      },
      sendEmail: {
        onSaveUser: [sendEmailOnSaveUserObserver],
        onBuyProduct: [sendEmailOnBuyProductObserver],
      },
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`WHEN build a Subject and call Notify Observers, 
  THEN Observer Update method should be called`, async () => {
    await saveUser({
      subject: buildSaveUserSubject({
        name: "User",
        subjectType: "Save",
      }),
      userRepo: userRepo,
    });

    expect(sendEmailOnSaveUserObserver.update).toBeCalled();
    expect(notifySalesOnSaveUserObserver.update).toBeCalled();

    expect(sendEmailOnBuyProductObserver.update).not.toBeCalled();
    expect(notifySalesOnContactUserObserver.update).not.toBeCalled();
  });
});
