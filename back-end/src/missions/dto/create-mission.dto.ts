import { IsString, IsIn, IsNumber } from "class-validator";

export class CreateMissionDto {

  @IsNumber()
  receiverId!: number;

  @IsString()
  pickupLocation!: string;

  @IsString()
  dropoffLocation!: string;

  @IsIn(['low', 'medium', 'high'])
  priority!: 'low' | 'medium' | 'high';
}