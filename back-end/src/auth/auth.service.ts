// auth/auth.service.ts

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async register(dto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
     console.log('⚙️ Service register:', dto);
    const user = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });
      console.log('🧱 User créé:', user);

    return { message: "User created", user };
  }

  async login(dto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) throw new UnauthorizedException("INVALID_CREDENTIALS");

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch)
      throw new UnauthorizedException("INVALID_CREDENTIALS");

    const token = this.jwtService.sign({
      sub: user.id,
      role: user.role,
      email: user.email,
    });

    return {
      token,
      role: user.role,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
      },
    };
  }
}