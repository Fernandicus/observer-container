import { buildSubject } from "../__mocks__/build-subject";
import { saveUser } from "../__mocks__/save-user";
import { User } from "../__mocks__/types/User";
import { userRepo } from "../__mocks__/user-repo";
import { Observer } from "../lib/src/observers-container/domain/interfaces/Observer";

describe("On Observer", () => {
  let observer: Observer<User>;

  beforeAll(() => {
    observer = {
      update: jest.fn(),
    };
  });

  beforeEach(()=>{
    jest.clearAllMocks()
  })

  it(`WHEN build a Subject and call Notify Observers, 
  THEN Observer Update method should be called`, async () => {
    const createUserSubject = buildSubject([observer]);

    await saveUser({
      subject: createUserSubject({
        name: "User",
        subjectType: "Create",
      }),
      userRepo: userRepo,
    });

    expect(observer.update).toBeCalledWith({
      email: "bond@james.com",
      name: "james bond",
      role: "secret-agent",
    });
  });
});
