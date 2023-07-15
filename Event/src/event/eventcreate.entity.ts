

import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EventOrganizerEntity } from './eventorganizer.entity';
@Entity('createevents')
export class CreateEventsEntity{
@PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    location:string;
    @Column()
    time:string;
    @Column()
    ticketprice:string;
    @Column()
    availability:string;
    @Column()
    address:string;
    @Column()
    type:string;
    @Column()
    description:string;

    @ManyToOne(() => EventOrganizerEntity, createevents =>createevents.creates)
    createevents: EventOrganizerEntity;


}

