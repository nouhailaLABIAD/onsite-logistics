import { Controller, Get, Post, Body, Patch, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";
@UseGuards(AuthGuard("jwt")) // 🔥 IMPORTANT
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
updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {
  return this.userService.updateProfile(req.user.userId, dto);
}
@Patch("password")
changePassword(@Req() req, @Body() dto: UpdatePasswordDto) {
  return this.userService.changePassword(req.user.userId, dto);
}
}