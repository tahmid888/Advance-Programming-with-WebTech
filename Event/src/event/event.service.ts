import { Injectable, Session } from "@nestjs/common";
import { EventDTO, AdminUpdateDTO, EventLoginDTO,AdminLoginfromDTO } from "./event.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { EventOrganizerEntity} from "./eventorganizer.entity";
import { Repository } from "typeorm";
import { EventSecretEntity } from "src/eventsecret/eventsecret.entity";
import * as bcrypt from 'bcrypt';
 


@Injectable()
export class EventService{
   
   
    constructor(
        @InjectRepository(EventOrganizerEntity)
        private eventorganizerRepository: Repository<EventOrganizerEntity>,
         @InjectRepository(EventSecretEntity)
        private eventsecretRepository: Repository<EventSecretEntity>
    ){}
   
// add event organizer
   async create(eventorganizer): Promise<EventOrganizerEntity>{
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


// search for the event by id
    async getEventById(id: number): Promise<EventOrganizerEntity> {
      
        return this.eventorganizerRepository.findOneBy({ id });
  
}
//search event by id and name
     async getEventbyIDAndName(id, name): Promise<EventOrganizerEntity> {
        return this.eventorganizerRepository.findOneBy({ id: id, name: name });
    }

// show the all database events
async getAllEvents(): Promise<EventOrganizerEntity[]> {
    return this.eventorganizerRepository.find();
}
//delete the events;
async deleteUser(id: number): Promise<EventOrganizerEntity[]> {
            await this.eventorganizerRepository.delete(id);
            return this.eventorganizerRepository.find();
        }



// sign up and in
async signup(data: EventDTO): Promise<EventOrganizerEntity> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password,salt);
   return this.eventorganizerRepository.save(data);
}
async signIn(data: EventLoginDTO) {
const userdata= await this.eventsecretRepository.findOneBy({username:data.username});
const match:boolean = await bcrypt.compare(data.password, userdata.password);
return match;

}
    

// -------------------------------------------------------------------------
    // async getIndex(): Promise<adminEntity[]> {
    //     return this.adminRepo.find();
    // }
    // async getAdminById(id: number): Promise<adminEntity> {
      
    //         return this.adminRepo.findOneBy({ id });
      
    // }

    // async getAdminbyIDAndName(id, name): Promise<adminEntity> {
    //     return this.adminRepo.findOneBy({ id: id, name: name });
    // }

    // async addAdmin(data: AdminDTO): Promise<adminEntity> {
    //     return this.adminRepo.save(data);
    // }

    // async updateAdmin(email:string,data: AdminUpdateDTO): Promise<adminEntity> {
    //     await this.adminRepo.update({email:email}, data);
    //     return this.adminRepo.findOneBy({ id: data.id });
    // }
    // async updateAdminById(id: number, data: AdminDTO): Promise<adminEntity> {
    //     await this.adminRepo.update(id, data);
    //     return this.adminRepo.findOneBy({ id });
    // }

    // async deleteUser(id: number): Promise<adminEntity[]> {
    //     await this.adminRepo.delete(id);
    //     return this.adminRepo.find();
    // }


//     async getAdminById(id: number): Promise<adminEntity> {
      
//         return this.adminRepository.findOneBy({ id });
  
// }
// async getsearchmanagerById(id: number): Promise<ManagerEntity> {
      
//     return this.managerRepository.findOneBy({ id });

// }

// getManager(id):Promise<adminEntity[]>
// {
//     return this.adminRepository.find({
//         where:{id:id},
//         relations: {
//             managers: true,
//         },
//     });
// } 

// async getAllManagers(): Promise<ManagerEntity[]> {// show the all database manager
//     return this.managerRepository.find();
// }


//  -------------------------------------------------------------
// async getAlladmins(): Promise<ManagerEntity[]> {// show the all 
//     return this.managerRepository.find();
// }
// ---------------------------------------------------------------

//    async create(admin): Promise<adminEntity>{
//         return this.adminRepository.save(admin);
//     }
//     async addManager(manager): Promise<ManagerEntity> {
//         return this.managerRepository.save(manager);
//     }



//     async deleteUser(id: number): Promise<adminEntity[]> {
//         await this.adminRepository.delete(id);
//         return this.adminRepository.find();
//     }

// ---------------------------------------------------------------
    // async getAllManagers(): Promise<ManagerEntity[]> {
    //     return this.managerRepo.find();
    // }
    // async getManagersByAdmin(adminid: number): Promise<adminEntity[]> {
    //     return this.adminRepo.find({
    //         where: { id: adminid },
    //         relations: {
    //             managers: true,
    //         },
    //     });
    // }
// -------------------------------------------------------------------------


  


}