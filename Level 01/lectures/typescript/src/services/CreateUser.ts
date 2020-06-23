interface CreateUserDate {
  name?: string,
  email: string,
  password: string

}

export default function createUser({ name, email, password }: CreateUserDate) {
  const user = {
    name,
    email,
    password
  }
  return user;
};