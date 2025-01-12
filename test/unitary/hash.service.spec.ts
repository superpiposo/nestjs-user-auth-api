import { HashService } from 'src/common/hash/hash.service';
import { describe, expect, it } from 'vitest';

describe('Test of hashing and compare', () => {
  const hashService = new HashService();
  const planeText = 'ETCmtk34332';
  const hashed = hashService.hashPassword(planeText);
  it('Shold hash the password', async () => {
    expect(await hashed).toBeDefined();
  });
  it('shold compare and get success in password comparing', async () => {
    expect(
      await hashService.comparePassword(planeText, await hashed),
    ).toBeTruthy();
  });
  it('shold compare end return false on password comparing', async () => {
    expect(
      await hashService.comparePassword('ETmkt2222111', await hashed),
    ).toBeFalsy();
  });
});
