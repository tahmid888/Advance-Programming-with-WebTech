import { EventOrganizerEntity } from '../event/eventorganizer.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity("eventsecret")
export class EventSecretEntity{
@PrimaryGeneratedColumn()
id:number;
@Column({name:'username',type: "varchar",length: 150})
username:string;
@Column({name:'password',type: "varchar",length: 150})
password:string;



@OneToOne(() => EventOrganizerEntity,  eventorganizer => eventorganizer. eventsecret)
eventorganizer:EventOrganizerEntity;


}