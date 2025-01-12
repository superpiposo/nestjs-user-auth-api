import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { HashModule } from 'src/common/hash/hash.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, { provide: 'APP_GUARD', useClass: AuthGuard }],
  imports: [
    UserModule,
    HashModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_HASH,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
