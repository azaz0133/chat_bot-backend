import bcrypt from "bcryptjs";

export function decrypt(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function encrypt(password: string): string {
  return bcrypt.hashSync(password, 12);
}
