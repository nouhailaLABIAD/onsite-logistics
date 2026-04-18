// auth/auth.module.ts
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { JwtStrategy } from "./jwt.strategy";
import { NotificationModule } from "../notification/notification.module"; // ✅ AJOUT

@Module({
  imports: [
    UserModule,
    NotificationModule,          // ✅ indispensable pour AuthController
    JwtModule.register({
      secret: "SECRET_KEY",
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}