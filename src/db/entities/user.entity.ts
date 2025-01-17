import { BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn, } from 'typeorm';
import { ServiceEntity } from './service.entity';
import { VehicleEntity } from './vehicle.entity';

@Entity({ name: 'USERS', schema: 'dbexcalibur.dbo' })
export class UserEntity extends BaseEntity{

  @PrimaryColumn({
    name: 'ID'
  })
  id: number;

  @Column({ name : 'EMAIL', type: 'varchar' })
  email: string;

  @Column({ name : 'EMAIL', type: 'varchar' })
  password: string;

  @Column({ name : 'NAME', type: 'varchar' })
  name: string;

  @Column({ name : 'SURNAME', type: 'varchar' })
  surName: string;

  @Column({ name : 'PHONE', type: 'varchar' })
  phone: number;

  @Column({ name : 'ROLE', type: 'varchar' })
  role: string;

  @OneToMany(type => ServiceEntity, service => service.worker)
  worker : ServiceEntity;

  @ManyToOne(type => VehicleEntity, service => service.owner)
  ownerVehicle : ServiceEntity;

  static getUsersByPhone(phone : string ){
    return this.createQueryBuilder('users')
        .where('users.phone = :phone', {phone})
        .getMany();
}

static getUsersByRole(role: string, page: number, perPage: number) {
  const skip = (page - 1) * perPage; // Calcular cuántos registros omitir
  console.log(">>>>> hjol");
  
  return this.createQueryBuilder('users')
    .leftJoinAndSelect('users.ownerVehicle', 'vehicle')
    .where('users.role = :role', { role })
    .skip(skip)
    .take(perPage)
    .getMany();
}



}