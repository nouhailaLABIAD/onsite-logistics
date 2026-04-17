// src/tracking/dto/create-mission-location.dto.ts

import { IsNumber } from "class-validator";

export class CreateMissionLocationDto {
  @IsNumber()
  missionId!: number;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;
}