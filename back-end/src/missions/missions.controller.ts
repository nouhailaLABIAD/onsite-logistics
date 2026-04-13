import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { MissionsService } from "./missions.service";
import { CreateMissionDto } from "./dto/create-mission.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("missions")
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Post()
  create(@Body() dto: CreateMissionDto) {
    return this.missionsService.create(dto);
  }

  @Get()
  findAll() {
    return this.missionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.missionsService.findOne(id);
  }

  // 👨‍✈️ DRIVER accepte mission
  @Patch(":id/assign")
  assignDriver(
    @Param("id") id: number,
    @Body() body: { driverId: number },
  ) {
    return this.missionsService.assignDriver(id, body.driverId);
  }

  // 🚚 STATUS FLOW DRIVER
  @Patch(":id/status")
  updateStatus(
    @Param("id") id: number,
    @Body() body: {
      status: "accepted" | "in_progress" | "completed";
    },
  ) {
    return this.missionsService.updateStatus(id, body.status);
  }

  // 🚗 ADMIN assigne véhicule (juste endpoint, service inchangé)
  @Patch(":id/vehicle")
  assignVehicle(
    @Param("id") id: number,
    @Body() body: { vehicleId: number },
  ) {
    return this.missionsService.assignVehicle(id, body.vehicleId);
  }
}