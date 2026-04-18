import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Mission } from "./entities/mission.entity";
import { CreateMissionDto } from "./dto/create-mission.dto";

import { User } from "../user/entities/user.entity";
import { NotificationService } from "../notification/notification.service";

@Injectable()
export class MissionsService {
  constructor(
    @InjectRepository(Mission)
    private repo: Repository<Mission>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    private notificationService: NotificationService
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

  // 🔥 STATUS FLOW + NOTIFICATION
  async updateStatus(
    id: number,
    status: "accepted" | "in_progress" | "completed"
  ) {
    const mission = await this.findOne(id);
    if (!mission) throw new Error("Mission not found");

    // 🚨 règles métier
    if (status === "in_progress") {
      if (!mission.driverId) {
        throw new Error("No driver assigned");
      }

      if (!mission.vehicleId) {
        throw new Error("No vehicle assigned");
      }
    }

    // update status
    mission.status = status;
    await this.repo.save(mission);

    // 🔔 NOTIFICATION SI COMPLETED
    if (status === "completed") {
      const receiver = await this.userRepo.findOne({
        where: { id: mission.receiverId },
      });

      if (receiver?.pushToken) {
        await this.notificationService.sendNotification(
          receiver.pushToken,
          "Mission Completed ✅",
          "Votre colis a été livré 📦"
        );
      } else {
        console.log("No pushToken for receiver");
      }
    }

    return mission;
  }
}