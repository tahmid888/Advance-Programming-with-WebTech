import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {  EventOrganizerEntity } from "./eventorganizer.entity";
import { EventSecretEntity} from "src/eventsecret/eventsecret.entity";
import { CreateEventsEntity } from "./eventcreate.entity";



@Module({
   
    imports: [TypeOrmModule.forFeature([EventOrganizerEntity,EventSecretEntity,CreateEventsEntity]),],
    controllers: [EventController],
    providers: [EventService],
  })
  export class EventModule {}