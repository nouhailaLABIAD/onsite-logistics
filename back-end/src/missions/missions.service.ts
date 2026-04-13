import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Mission } from './entities/mission.entity';
import { CreateMissionDto } from './dto/create-mission.dto';

@Injectable()
export class MissionsService {
  constructor(
    @InjectRepository(Mission)
    private repo: Repository<Mission>,
  ) {}

  // 🟢 CREATE
  async create(dto: CreateMissionDto) {
    const mission = this.repo.create({
      ...dto,
      status: "pending",
    });

    return this.repo.save(mission);
  }

  // 🟢 GET ALL
  async findAll() {
    return this.repo.find();
  }

  // 🟢 GET ONE
  async findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  // 🟡 DRIVER ACCEPT
  async assignDriver(id: number, driverId: number) {
    const mission = await this.findOne(id);
    if (!mission) throw new Error("Mission not found");

    mission.driverId = driverId;
    mission.status = "accepted";

    return this.repo.save(mission);
  }

  // 🚗 ADMIN ASSIGN VEHICLE
  async assignVehicle(id: number, vehicleId: number) {
    const mission = await this.findOne(id);
    if (!mission) throw new Error("Mission not found");

    mission.vehicleId = vehicleId;

    return this.repo.save(mission);
  }

  // 🔥 STATUS FLOW CONTROL
  async updateStatus(
    id: number,
    status: "accepted" | "in_progress" | "completed",
  ) {
    const mission = await this.findOne(id);

    if (!mission) throw new Error("Mission not found");

    // 🚨 START BLOCK
    if (status === "in_progress") {
      if (!mission.driverId) {
        throw new Error("No driver assigned");
      }

      if (!mission.vehicleId) {
        throw new Error("No vehicle assigned");
      }
    }

    mission.status = status;

    return this.repo.save(mission);
  }
}