const nameRegex = new RegExp(`\w{2,10}`);
const emailRegex = "/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,20}/g";
const usernameRegex = "/\b[A-Za-z._%+-@]{5,15}\b/";

export const validName = (value: string) => {
  return value.match(nameRegex) ? false : "Name can only contain letters!";
};
export const validEmail = (value: string) => {
  return value.match(emailRegex) ? false : "Enter a valid email!";
};
export const validUsername = (value: string) => {
  return value.match(usernameRegex) ? false : "Enter a valid username!";
};
