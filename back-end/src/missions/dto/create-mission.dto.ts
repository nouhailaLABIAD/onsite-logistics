import { IsString, IsIn, IsNumber, IsOptional } from "class-validator";

export class CreateMissionDto {
  @IsNumber()
  receiverId!: number;

  @IsString()
  pickupLocation!: string;

  @IsString()
  dropoffLocation!: string;

  @IsIn(["low", "medium", "high"])
  priority!: "low" | "medium" | "high";

  // 🚗 AJOUT ICI
  @IsOptional()
  @IsNumber()
  vehicleId?: number;
}