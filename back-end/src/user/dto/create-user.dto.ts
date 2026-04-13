import { IsEmail, IsString, MinLength, IsIn } from "class-validator";

export class CreateUserDto {
  @IsString()
  fullName!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsIn(["admin", "driver", "receiver"]) // ✅ FIX
  role!: "admin" | "driver" | "receiver"; // ✅ FIX
}