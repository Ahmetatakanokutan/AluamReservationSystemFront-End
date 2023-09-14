import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ModalModule } from '@coreui/angular';

@Component({
  selector: 'app-add-new-device',
  templateUrl: './add-new-device.component.html',
  styleUrls: ['./add-new-device.component.scss']
})
export class AddNewDeviceComponent {
  file = null
  constructor(private http:HttpClient){}
address
  onFileSelected(event){
    if (!event) return
    else{
    this.file = event.target.files[0]
    }
  }

  onUpload(){

  }
}
