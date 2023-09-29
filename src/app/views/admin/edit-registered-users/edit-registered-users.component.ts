import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-registered-users',
  templateUrl: './edit-registered-users.component.html',
  styleUrls: ['./edit-registered-users.component.scss']
})
export class EditRegisteredUsersComponent {
  @ViewChild('UserName') UserName: ElementRef;
  @ViewChild('UserSurname') UserSurname: ElementRef;
  @ViewChild('UserEmail') UserEmail: ElementRef;
  @ViewChild('UserPassword') UserPassword: ElementRef;
  @ViewChild('UserTelephone') UserTelephone: ElementRef;
  @ViewChild('UserUserType') UserUserType: ElementRef;
  @ViewChild('UserCompanyMail') UserCompanyMail: ElementRef;
  @ViewChild('UserPersonalAddress') UserPersonalAddress: ElementRef;
  users:User[] = []
  user: User = {
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
    this.adminService.getAllUsers().subscribe(
      (response: User[]) => {
        // HTTP isteği başarıyla tamamlandı, verileri kullanabilirsiniz
        this.users = response;
        console.log(this.users[1])
      },
      (error) => {
        // HTTP isteğinde hata oluştu, hata işleme kodunu burada ekleyebilirsiniz
        console.error('HTTP isteği sırasında bir hata oluştu:', error);
      }
    );
  }

  onUpdate(user: User) {
  
    this.user = user;
  }
  delete(user: User) {
    
    this.adminService.deleteUser(user)
  }
  update() {
    this.user.name = this.UserName.nativeElement.value;
    this.user.surname = this.UserSurname.nativeElement.value;
    this.user.email = this.UserEmail.nativeElement.value;
    this.user.password = this.UserPassword.nativeElement.value;
    this.user.telephone = this.UserTelephone.nativeElement.value;
    this.user.userType = this.UserUserType.nativeElement.value;
    this.user.companyMail = this.UserCompanyMail.nativeElement.value;
    this.user.personalAddress = this.UserPersonalAddress.nativeElement.value;

  
    console.log( this.user.name)
    console.log(this.UserName.nativeElement.value)

      this.adminService.updateUser(this.user)
    
  }
}
