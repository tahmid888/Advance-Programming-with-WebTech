import {IsEmail, IsEmpty, IsNotEmpty, IsString, Matches, IsNumber,Equals} from'class-validator';

export class EventDTO{
    // id:number;
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

    // phone:number;
    // @IsString({message:"invalid address"})
    // address:string;
    

}





export class AdminUpdateDTO{
    id:number;
    @IsString({message:"invalid name"})
    @Matches( /^[a-zA-Z]+$/, {message:"enter a proper name"})
    name: string;
    @IsEmail({}, {message:"invalid email"})
     email: string;
     password: string;
 }


// ADMIN LOGIN DTO
 export class EventLoginDTO{

   username:string;
    password:string;
}
export class AdminLoginfromDTO{
    @IsString()
    username:String;
    id:number;
    number:number;
    email:string;




}


