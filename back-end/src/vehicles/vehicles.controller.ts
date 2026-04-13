import { Controller, Post, Get, Body, Param, Patch } from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";

@Controller("vehicles")
export class VehiclesController {
  constructor(private service: VehiclesService) {}

  @Post()
  create(@Body() dto: CreateVehicleDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(":id/assign")
  assignDriver(
    @Param("id") id: number,
    @Body() body: { driverId: number }
  ) {
    return this.service.assignDriver(id, body.driverId);
  }
}