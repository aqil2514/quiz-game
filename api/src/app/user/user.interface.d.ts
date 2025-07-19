export interface User {
  readonly id?: string;
  username: string;
  email: string;
  hashedPassword: string;
  roles: string[];
}

export interface UserFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
