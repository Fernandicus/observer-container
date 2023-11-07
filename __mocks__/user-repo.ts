import { User } from "./types/User";

export const userRepo = async (user: User) => {
    
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Saving user ${user.name} . . . .`);
      resolve(() => {});
    }, 2500);
  });

};
