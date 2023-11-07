import { Subject } from "../lib/src/observers-container/domain/interfaces/Subject";
import { User } from "./types/User";

export const saveUser = async (props: {
  userRepo: (user: User) => Promise<void>;
  subject: Subject<User>;
}) => {
  const { subject, userRepo } = props;

  const newUser: User = {
    email: "bond@james.com",
    name: "james bond",
    role: "secret-agent",
  };

  await userRepo(newUser);
  subject.notifyObservers(newUser);
};
