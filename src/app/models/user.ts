import { Role } from "../enums/roleEnum"
import { product } from "./product"

export interface User{

    id:number
    name:string
    surname:string
    email:string
    password:string
    telephone:string
    role:Role
    videoUrl:string
    products:Array<product>
  }