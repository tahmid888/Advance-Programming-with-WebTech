import {IsEmail, IsEmpty, IsNotEmpty, IsString, Matches, IsNumber,Equals} from'class-validator';

export class EventDTO{
    // id:number;
    id:number;
   @IsString({message:"invalid name"})
   @Matches( /^[a-zA-Z]+$/, {message:"Enter a proper name"})
    name: string;
    @IsEmail({}, {message:"Invalid email"})
    email: string;
    dateofbirth:string;
    address:string;
    phonenumber:string;
    photo:string;
    username:string;
    password: string;
    
}
export class EventsDTO{
    // id:number;
    id:number;
//    @IsString({message:"invalid name"})
//    @Matches( /^[a-zA-Z]+$/, {message:"Enter a proper name"})
    name: string;
    // @IsEmail({}, {message:"Invalid email"})
    email: string;
    dateofbirth:string;
    address:string;
    phonenumber:string;
    photo:string;
   
}

export class EventUpdateDTO{
    id:number;
    @IsString({message:"invalid name"})
    @Matches( /^[a-zA-Z]+$/, {message:"enter a proper name"})
    username: string;
    email:string;
     password: string;
 }


// Event LOGIN DTO
 export class EventLoginDTO{

   username:string;
    password:string;
}
export class EventLoginfromDTO{
    @IsString()
    username:String;
    id:number;
    number:number;
    email:string;




}


