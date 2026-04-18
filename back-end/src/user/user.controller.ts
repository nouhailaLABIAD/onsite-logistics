import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get("receivers")
  findReceivers() {
    return this.userService.findByRole("receiver");
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch("profile")
  updateProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
    return this.userService.updateProfile(req.user.userId, dto);
  }

  @Patch("password")
  changePassword(@Req() req: any, @Body() dto: UpdatePasswordDto) {
    return this.userService.changePassword(req.user.userId, dto);
  }

  @Patch("push-token")
  async savePushToken(@Req() req: any, @Body() body: { token: string }) {
    console.log("🔔 push-token endpoint HIT");
    console.log("   req.user complet:", JSON.stringify(req.user));
    console.log("   userId extrait:", req.user?.userId);
    console.log("   token reçu:", body?.token);

    if (!req.user?.userId) {
      console.log("❌ userId est undefined ou null !");
    }

    if (!body?.token) {
      console.log("❌ token body est undefined ou null !");
    }

    const result = await this.userService.savePushToken(req.user.userId, body.token);
    console.log("✅ savePushToken result:", JSON.stringify(result));
    return result;
  }
}