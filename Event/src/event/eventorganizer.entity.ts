
import { EventSecretEntity } from "src/eventsecret/eventsecret.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";



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
   
}
   

 
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
}

