export interface ReservationRequest{
    id:number
    machineId:number
    userMail:string
    startDate:Date
    endDate:Date
    text:string
}