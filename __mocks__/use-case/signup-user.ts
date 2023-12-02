import { Subject } from "../../lib/src/observers-container/entities/Subject";
import { fakeUser } from "./fake-user";
import { User } from "../types/User";

export const userRepo = async (user: User) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Saving user ${user.name} . . . .`);
      resolve(() => {});
    }, 2500);
  });
};

export const signUpUser = async (props: {
  userRepo: (user: User) => Promise<void>;
  subject: Subject<User>;
}) => {
  const { subject, userRepo } = props;

  await userRepo(fakeUser);
  subject.notifyObservers(fakeUser);
};
