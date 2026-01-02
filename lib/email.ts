export const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const isValidEmail = (email: string) =>
  EMAIL_REGEX.test(email)
