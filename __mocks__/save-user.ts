import { Subject } from "../lib/src/observers-container/domain/interfaces/Subject";
import { fakeUser } from "./fake-user";
import { User } from "./types/User";

export const saveUser = async (props: {
  userRepo: (user: User) => Promise<void>;
  subject: Subject<User>;
}) => {
  const { subject, userRepo } = props;

  await userRepo(fakeUser);
  subject.notifyObservers(fakeUser);
};
