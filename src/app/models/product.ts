import { User } from "./user"

export interface product{

    id:number
    name:string
    surname:string
    startTime:Date
    endTime:Date
    image:string
    users:Array<User>
  }