import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { UserRole } from "./entities/user.entity";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import * as bcrypt from "bcrypt";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { UpdatePasswordDto } from "./dto/update-password.dto";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  create(userData: Partial<User>) {
    const user = this.userRepo.create(userData);
    return this.userRepo.save(user);
  }
  findByRole(role: UserRole) {
  return this.userRepo.find({
    where: { role },
  });
}
  findAll() {
    return this.userRepo.find();
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }
  async updateProfile(userId: number, dto: UpdateProfileDto) {
  await this.userRepo.update(userId, dto);
  return this.userRepo.findOne({
    where: { id: userId },
  });
}
async changePassword(userId: number, dto: UpdatePasswordDto) {
  const user = await this.userRepo.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new BadRequestException("User not found");
  }

  const isMatch = await bcrypt.compare(dto.oldPassword, user.password);

  if (!isMatch) {
    throw new UnauthorizedException("Old password incorrect");
  }

  const hashed = await bcrypt.hash(dto.newPassword, 10);

  user.password = hashed;
  await this.userRepo.save(user);

  return {
    message: "Password updated successfully",
  };
}
async savePushToken(userId: number, token: string) {
  const user = await this.userRepo.findOne({ where: { id: userId } });

  if (!user) {
    throw new BadRequestException("User not found");
  }

  user.pushToken = token;
  return this.userRepo.save(user);
}
}