export interface User {
  readonly id?: string;
  readonly userId?: string;
  username: string;
  name: string;
  email: string;
  hashedPassword: string;
  roles: string[];
}

export interface UserFormData {
  username: string;
  name?: string;
  roles?: string[];
  email: string;
  password: string;
  confirmPassword: string;
}
