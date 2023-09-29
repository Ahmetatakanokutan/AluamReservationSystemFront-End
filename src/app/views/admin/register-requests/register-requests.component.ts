import { Component , NgModule} from '@angular/core';
import { RegisterRequest } from 'src/app/models/tempUser';
import { AdminService } from '../admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-requests',
  templateUrl: './register-requests.component.html',
  styleUrls: ['./register-requests.component.scss']
})
export class RegisterRequestsComponent {

  users: RegisterRequest[] = [];
  user: RegisterRequest = {
    id: 0, name: '', surname: '', email: '', password: '',
    telephone: '', role: null, userType: null, companyMail: '', personalAddress: ''
  };

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
    this.adminService.getAllTempUsers().subscribe(
      (response: RegisterRequest[]) => {
        // HTTP isteği başarıyla tamamlandı, verileri kullanabilirsiniz
        this.users = response;
      },
      (error) => {
        // HTTP isteğinde hata oluştu, hata işleme kodunu burada ekleyebilirsiniz
        console.error('HTTP isteği sırasında bir hata oluştu:', error);
      }
    );
  }

  confirm(user:RegisterRequest){

    this.adminService.deleteTempUserAfterAddingUser(user);
  }
  delete(user:RegisterRequest){

    this.adminService.deleteTempUser(user);
  }
}
