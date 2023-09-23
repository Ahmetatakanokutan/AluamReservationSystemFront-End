import { Role } from "../enums/roleEnum"
import { UserType } from "../enums/userEnum"
import { product } from "./product"

export interface RegisterRequest{

    id:number
    name:string
    surname:string
    email:string
    password:string
    telephone:string
    userType:UserType
    role:Role
    companyMail:string
    personalAddress:string
    
  }