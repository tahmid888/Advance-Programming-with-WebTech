import { Injectable, Session } from "@nestjs/common";
import { EventDTO, EventUpdateDTO, EventLoginDTO, EventLoginfromDTO, EventsDTO } from "./event.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { EventOrganizerEntity } from "./eventorganizer.entity";
import { Repository } from "typeorm";
import { EventSecretEntity } from "src/eventsecret/eventsecret.entity";
import * as bcrypt from 'bcrypt';
import { CreateEventsEntity } from "./eventcreate.entity";




@Injectable()
export class EventService {


    constructor(
        @InjectRepository(EventOrganizerEntity)
        private eventorganizerRepository: Repository<EventOrganizerEntity>,
        @InjectRepository(EventSecretEntity)
        private eventsecretRepository: Repository<EventSecretEntity>,
        @InjectRepository(CreateEventsEntity)
        private createeventsRepository: Repository<CreateEventsEntity>

    ) { }


    async updateevent(username: string, data: EventUpdateDTO): Promise<EventSecretEntity> {
        await this.eventsecretRepository.update({ username: username }, data);
        return this.eventsecretRepository.findOneBy({ id: data.id });
    }

    async updateEventById(id: number, data: EventLoginDTO): Promise<EventSecretEntity> {
        await this.eventsecretRepository.update(id, data);
        return this.eventsecretRepository.findOneBy({ id});
    }
    //update to events;
    async updatecreateEventById(id: number, data: EventsDTO): Promise<EventOrganizerEntity> {
        await this.eventorganizerRepository.update(id, data);
        return this.eventorganizerRepository.findOneBy({ id});
    }



    // add event organizer
    async create(eventorganizer): Promise<EventOrganizerEntity> {
        // console.log(eventorganizer)

        const secretRepositoryData = {

            username: eventorganizer.username,

            password: eventorganizer.password,

        };

        const secretResults = await this.eventsecretRepository.save(

            secretRepositoryData,

        );




        if (secretResults.id) {

            const parentTable = {

                name: eventorganizer.name,

                email: eventorganizer.email,

                dateofbirth: eventorganizer.dateofbirth,

                address: eventorganizer.address,

                phonenumber: eventorganizer.phonenumber,

                photo: eventorganizer.photo,

                eventsecretid: secretResults.id,

            };




            const result = await this.eventorganizerRepository.save(parentTable);

            return { ...result, ...eventorganizer };

        }


        // return this.eventorganizerRepository.save(eventorganizer);
    }

    // add event secret
    async addeventsecret(eventsecret): Promise<EventSecretEntity> {
        return this.eventsecretRepository.save(eventsecret);
    }
    // create events
    async createevents(createevents): Promise<CreateEventsEntity> {
        return this.createeventsRepository.save(createevents);
    }





    // search for the event organizer by id
    async getEventById(id: number): Promise<EventOrganizerEntity> {

        return this.eventorganizerRepository.findOneBy({ id });

    }
    //search by event by id 
    async getEventSearchById(id: number): Promise<CreateEventsEntity> {

        return this.createeventsRepository.findOneBy({ id });

    }
    //search event by id and name
    async getEventbyIDAndName(id, name): Promise<EventOrganizerEntity> {
        return this.eventorganizerRepository.findOneBy({ id: id, name: name });
    }

    // show the all database events organization
    async getAllEventsOrganization(): Promise<EventOrganizerEntity[]> {
        return this.eventorganizerRepository.find();
    }
    // show the all database events
    async getAllEvents(): Promise<CreateEventsEntity[]> {
        return this.createeventsRepository.find();
    }
    //delete the events;
    async deleteorganization(id: number): Promise<EventOrganizerEntity[]> {
        await this.eventorganizerRepository.delete(id);
        return this.eventorganizerRepository.find();
    }
    async deleteEvents(id: number): Promise<EventOrganizerEntity[]> {
        await this.eventorganizerRepository.delete(id);
        return this.eventorganizerRepository.find();
    }

    

    // sign up and in
    async signup(data: EventDTO): Promise<EventOrganizerEntity> {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        return this.eventorganizerRepository.save(data);
    }
    async signIn(data: EventLoginDTO) {
        const userdata = await this.eventsecretRepository.findOneBy({ username: data.username });
        const match: boolean = await bcrypt.compare(data.password, userdata.password);
        return match;

    }



}