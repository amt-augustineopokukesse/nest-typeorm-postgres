// admin.service.ts
import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async getAllAdmin(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async getOneAdmin(id: number): Promise<Admin> {
    return this.adminRepository.findOneBy({ id });
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(admin);
  }

  async updateAdmin(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    const admin: Admin = new Admin();
    admin.firstName = updateAdminDto.firstName;
    admin.lastName = updateAdminDto.lastName;
    admin.email = updateAdminDto.email;
    admin.password = updateAdminDto.password;
    admin.role = updateAdminDto.role;
    admin.id = id;
    admin.isActive = updateAdminDto.isActive;
    await this.adminRepository.update(id, admin);
    return this.adminRepository.findOneBy({ id });
  }

  async removeAdmin(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }
}
