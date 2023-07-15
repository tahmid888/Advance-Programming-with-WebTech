
import { EventSecretEntity } from "src/eventsecret/eventsecret.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateEventsEntity } from "./eventcreate.entity";



@Entity('eventorganizer')
export class EventOrganizerEntity{
@PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    email:string;
    @Column()
    dateofbirth:string;
    @Column()
    address:string;
    @Column()
    phonenumber:string;
    @Column()
    photo:string;
    // @Column()
    // password:string;

   
    
   
    @OneToOne(() => EventSecretEntity, eventsecret => eventsecret.eventorganizer, { cascade: true
    })
    @JoinColumn()
    eventsecret: EventSecretEntity;
   


    @OneToMany(() => CreateEventsEntity, create => create.createevents, { cascade: true })
creates: CreateEventsEntity[];



}
   

 
