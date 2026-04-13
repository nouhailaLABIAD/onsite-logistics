import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vehicle } from "./entities/vehicle.entity";

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private repo: Repository<Vehicle>
  ) {}

  create(data: Partial<Vehicle>) {
    const vehicle = this.repo.create(data);
    return this.repo.save(vehicle);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async assignDriver(id: number, driverId: number) {
    await this.repo.update(id, { driverId });
    return this.findOne(id);
  }
}