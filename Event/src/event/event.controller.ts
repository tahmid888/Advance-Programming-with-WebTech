import { Body, Controller, Get, Param, Post, Put, Query, Request, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, ParseIntPipe, ParseArrayPipe, Delete, HttpStatus, NotFoundException, Session } from "@nestjs/common";
import {  EventService } from "./event.service";
import { EventDTO, AdminUpdateDTO, EventLoginDTO, AdminLoginfromDTO } from "./event.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { EventOrganizerEntity } from "./eventorganizer.entity";
import { EventSecretEntity } from "src/eventsecret/eventsecret.entity";


@Controller('event')
export class EventController{

    constructor(private readonly eventService: EventService){}





// // add event organizer
//  @Post('/addeventorganizer')  
//     create(@Body() eventorganizer) {
//         // console.log(admin);
//         return this.adminService.create(eventorganizer);
//     }
    // add event secret
      @Post('/addeventsecret')
    addeventsecret(@Body() eventsecret) {
        console.log(eventsecret);
        return this.eventService.addeventsecret(eventsecret);
    }

// search for the event
 @Get('/eventorgaizersearch/:id') 
    async getEventById(@Param('id', ParseIntPipe) id: number): Promise<EventOrganizerEntity> {

        const res = await this.eventService.getEventById(id)
        if (res !== null) {
            console.log(res);
            return res;
        }
        else {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: "Event not found"
            });
        }
    }
// search for the event by id and name 
    @Get('/eventorgaizersearch/:id/name') 
    async getEventbyIDAndName(@Param('id', ParseIntPipe) @Param('name', ParseIntPipe) id: number, name:any): Promise<EventOrganizerEntity> {

        const res = await this.eventService.getEventbyIDAndName(id,name)
        if (res !== null) {
            console.log(res);
            return res;
        }
        else {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: "Event not found"
            });
        }
    }
//shows all events in database
     @Get('/getallevents') 
    async getAllEvents(): Promise<EventOrganizerEntity[]> {
      return this.eventService.getAllEvents(); 
    }

//file uploads
@Post('/addeventsphoto')

    @UseInterceptors(FileInterceptor('photo',

        { fileFilter: (req, file, cb) => {

        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))

        cb(null, true);

        else {

        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);

        }

        },

        limits: { fileSize: 300000 },

        storage:diskStorage({

        destination: './uploads',

        filename: function (req, file, cb) {

        cb(null,Date.now()+file.originalname)

        },

        })

        }))

    @UsePipes(new ValidationPipe())

    async addeventsphoto(@Body() events:EventOrganizerEntity,@UploadedFile() photo: Express.Multer.File):Promise<EventOrganizerEntity>{

        events.photo=photo.filename

        return this.eventService.create(events)

    }

//view the uploaded photos
    @Get('/getphoto/:name')
getbyphotos(@Param('name') name, @Res() res) {
 res.sendFile(name,{ root: './uploads' })
 }

 @UsePipes(new ValidationPipe)
 signup(@Body() mydata: EventDTO, @UploadedFile() photo: Express.Multer.File) {
     console.log(mydata);
     console.log(photo.filename);
     mydata.photo = photo.filename;
     return this.eventService.signup(mydata);

 }

 @Post('/signin')
 signIn(@Body() data: EventDTO, @Session() session) {

     if (this.eventService.signIn(data)) {
         session.username = data.username;
         return true;
     }
     else {

         return false;
     }
     // return this.adminService.signIn(data);
 }
 // delete
     @Delete('/eventdelete/:id')
  async deleteUser(@Param('id') id: number): Promise<EventOrganizerEntity[]> {
   return this.eventService.deleteUser(id); 
    // return this.adminService.getAlladmins();
  }


// ------------------------------------------------------------------------------------------
    // @Get('/adminsearch/:id') // search for the admin
    // async getAdminById(@Param('id', ParseIntPipe) id: number): Promise<adminEntity> {

    //     const res = await this.adminService.getAdminById(id)
    //     if (res !== null) {
    //         console.log(res);
    //         return res;
    //     }
    //     else {
    //         throw new NotFoundException({
    //             status: HttpStatus.NOT_FOUND,
    //             message: "Admin not found"
    //         });
    //     }
    // }
    // @Get('/managersearch/:id')  //search for the manager
    // async getsearchmanagerById(@Param('id', ParseIntPipe) id: number): Promise<ManagerEntity> {

    //     const res = await this.adminService.getsearchmanagerById(id)
    //     if (res !== null) {
    //         console.log(res);
    //         return res;
    //     }
    //     else {
    //         throw new NotFoundException({
    //             status: HttpStatus.NOT_FOUND,
    //             message: "Manager not found"
    //         });
    //     }
    // }


    // @Post('/addadmin')
    // create(@Body() admin) {
    //     // console.log(admin);
    //     return this.adminService.create(admin);
    // }



    // @Post('/addmanager')
    // addManagers(@Body() manager) {
    //     console.log(manager);
    //     return this.adminService.addManager(manager);
    // }

    // @Get('/getmanager/:adminid') //not working
    // getManagers(@Param('adminid', ParseIntPipe) adminid: number) {

    //     return this.adminService.getManager(adminid);
    // }

    // @Get('/getallthemanager') //shows all managers in database
    // async getAllManagers(): Promise<ManagerEntity[]> {
    //   return this.adminService.getAllManagers(); // 
    // }


//     @Delete('/admindel/:id') //delete the admin 
//   async deleteUser(@Param('id') id: number): Promise<adminEntity[]> {
//    return this.adminService.deleteUser(id); 
//     // return this.adminService.getAlladmins();
//   }
   






  // -----------------------------------------old code below---------------------------------------------------------//
    // @Get('/index')
    // getIndex(): any {
    // return this.adminService.getIndex();
    // }

//     @Post('/login')
// @UsePipes(new ValidationPipe ())
// login(@Body() fromdata:AdminLoginDTO):string{
//     return this.adminService.login(fromdata)
// }



// @Get('/search/:id')
// getAdminById(@Param() data:AdminDTO): any {
// return this.adminService.getAdminById(data);
// }

// @Delete('/delete/:id')
// getAdminByDelete(@Param('id',ParseIntPipe) id:number):string{
//     return this.adminService.getAdminByDelete(id);
// }




}




