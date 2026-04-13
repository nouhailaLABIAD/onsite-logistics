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

  async create(dto: CreateMissionDto) {
    const mission = this.repo.create({
      ...dto,
      status: 'pending',
    });

    return this.repo.save(mission);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async assignDriver(id: number, driverId: number) {
    await this.repo.update(id, { driverId });
    return this.findOne(id);
  }

async updateStatus(
  id: number,
  status: 'pending' | 'accepted' | 'in_progress' | 'completed'
) {
  await this.repo.update(id, { status });
  return this.findOne(id);
}
}