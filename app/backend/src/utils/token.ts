import * as jwt from 'jsonwebtoken';
import process = require('process');

class Token {
  static build(email: string) {
    return jwt.sign({ email }, `${process.env.JWT_SECRET}`);
  }

  static verifica(token: string) {
    return jwt.verify(token, `${process.env.JWT_SECRET}`);
  }
}

export default Token;
