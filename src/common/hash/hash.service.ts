import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashService {
  async hashPassword(password: string): Promise<string> {
    const salts = 10;
    const hash = await bcrypt.hash(password, salts);
    return hash;
  }
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
