import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Machine } from '../../../EntityModels/Machine';
import { AdminService } from '../admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-device',
  templateUrl: './add-new-device.component.html',
  styleUrls: ['./add-new-device.component.scss']
})
export class AddNewDeviceComponent {
  @ViewChild('MachineName') MachineName: ElementRef;
  @ViewChild('MachinePrice') MachinePrice: ElementRef;
  @ViewChild('MachineFeatures') MachineFeatures: ElementRef;
  @ViewChild('UMachineName') UMachineName: ElementRef;
  @ViewChild('UMachinePrice') UMachinePrice: ElementRef;
  @ViewChild('UMachineFeatures') UMachineFeatures: ElementRef;
  file: File = null
  machineName: string;
  machinePrice: number;
  machineFeatures: string;
  form: FormGroup;
  modalOpen = null;
  machines: Machine[] = [];
  machine:Machine = {id:0 ,  name:"" , features:"" , imageUrl:"" , price:""};
  selectedMachine: Machine = { id: 0, name: '', features: '', imageUrl: '', price: '' };

  adminService:AdminService

  constructor(adminService:AdminService,  private activatedRoute:ActivatedRoute){

    this.adminService = adminService
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{

        this.getAll();

    })
  }


  getAll() {
    this.adminService.getAll().subscribe(
      (response: Machine[]) => {
        // HTTP isteği başarıyla tamamlandı, verileri kullanabilirsiniz
        this.machines = response;
        console.log(this.machines[1].imageUrl)
      },
      (error) => {
        // HTTP isteğinde hata oluştu, hata işleme kodunu burada ekleyebilirsiniz
        console.error('HTTP isteği sırasında bir hata oluştu:', error);
      }
    );
  }

  onFileSelected(event){
    console.log(event);
    if (!event) return
    else{
    this.file = <File>event.target.files[0]
    }
  }


  onSubmit() {
    if(this.MachineName.nativeElement.value === '' || this.MachinePrice.nativeElement.value === '' 
      || this.file === null)
    {
      this.adminService.showErrorAlert('Girdiğiniz bilgiler eksik ya da hatalı.')
    }
    else{
    this.machine.name = this.MachineName.nativeElement.value
    this.machine.features = this.MachineFeatures.nativeElement.value
    this.machine.price = this.MachinePrice.nativeElement.value
    const fd = new FormData();
    fd.append('imageFile',this.file, this.file.name)
    
    this.adminService.addNewDevice(fd, this.machine)
  }
  }

onUpdate(machine: Machine) {
  
  this.selectedMachine = machine;
}
deleteMachine(machine: Machine) {
  
  this.adminService.deleteMachine(machine)
}
update() {
  this.selectedMachine.name = this.UMachineName.nativeElement.value;
  this.selectedMachine.price = this.UMachinePrice.nativeElement.value;
  this.selectedMachine.features = this.UMachineFeatures.nativeElement.value;

  console.log( this.selectedMachine.name, this.selectedMachine.price, this.selectedMachine.features)
  console.log( this.UMachineName.nativeElement.value, this.UMachinePrice.nativeElement.value, this.UMachineFeatures.nativeElement.value)
  if(this.file != null){
    const fd = new FormData();
    fd.append('imageFile',this.file, this.file.name)
    this.adminService.updateDeviceWithImg(fd , this.selectedMachine)
  }
  else{
    this.adminService.updateDevice(this.selectedMachine)
  }
}

}