import { IsString, IsOptional, IsIn } from "class-validator";

export class CreateVehicleDto {
  @IsString()
  plateNumber: string;

  @IsOptional()
  @IsIn(["active", "maintenance"])
  status?: "active" | "maintenance";

  @IsOptional()
  driverId?: number;
}