import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Machine } from '../../../EntityModels/Machine';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-new-device',
  templateUrl: './add-new-device.component.html',
  styleUrls: ['./add-new-device.component.scss']
})
export class AddNewDeviceComponent {
  @ViewChild('MachineName') MachineName: ElementRef;
  @ViewChild('MachinePrice') MachinePrice: ElementRef;
  @ViewChild('MachineFeatures') MachineFeatures: ElementRef;

  file: File = null
  machineName: string;
  machinePrice: number;
  machineFeatures: string;
  form: FormGroup;
  modalOpen = null;
  machine:Machine = {id:0 ,  name:"" , features:"" , imageUrl:"" , price:""};
  adminService:AdminService

  constructor(adminService:AdminService){

    this.adminService = adminService
  }

  onFileSelected(event){
    console.log(event);
    if (!event) return
    else{
    this.file = <File>event.target.files[0]
    }
  }


  onSubmit() {
    this.machine.name = this.MachineName.nativeElement.value
    this.machine.features = this.MachineFeatures.nativeElement.value
    this.machine.price = this.MachinePrice.nativeElement.value
    const fd = new FormData();
    fd.append('image',this.file, this.file.name)
    
    this.adminService.addNewDevice(fd, this.machine)
  }
}
