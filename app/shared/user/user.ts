var validator = require("email-validator");

export class User {
  email: string;
  password: string;
  confirmPassword: string;
  isValidEmail() {
    return validator.validate(this.email);
  }
}