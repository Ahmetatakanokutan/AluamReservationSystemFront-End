import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { UpdateUserService } from './update-user.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
  @ViewChild('UserName') UserName: ElementRef;
  @ViewChild('UserSurname') UserSurname: ElementRef;
  @ViewChild('UserEmail') UserEmail: ElementRef;
  @ViewChild('UserPassword') UserPassword: ElementRef;
  @ViewChild('UserTelephone') UserTelephone: ElementRef;
  @ViewChild('UserUserType') UserUserType: ElementRef;
  @ViewChild('UserCompanyMail') UserCompanyMail: ElementRef;
  @ViewChild('UserPersonalAddress') UserPersonalAddress: ElementRef;


  user: User = {
    id: 0, name: '', surname: '', email: '', password: '',
    telephone: '', role: null, userType: null, companyMail: '', personalAddress: ''
  };

  constructor(private activatedRoute: ActivatedRoute, private updateUser: UpdateUserService){}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{

        this.getUserByEmail();

    })
  }


  getUserByEmail() {
    this.updateUser.getUserByEmail().subscribe(res =>{
      this.user = res
    }
    );
  }

  onUpdate(user: User) {
  
    this.user = user;
  }

  update() {
    this.user.name = this.UserName.nativeElement.value;
    this.user.surname = this.UserSurname.nativeElement.value;
    this.user.email = this.UserEmail.nativeElement.value;
    if(this.user.password === this.UserPassword.nativeElement.value){
      this.showErrorAlert('lütfen şifrenizi değiştirin ya da şifre alanına eski şifrenizi giriniz')
      return 0
    }
    this.user.password = this.UserPassword.nativeElement.value;
    this.user.telephone = this.UserTelephone.nativeElement.value;
    this.user.userType = this.UserUserType.nativeElement.value;
    this.user.companyMail = this.UserCompanyMail.nativeElement.value;
    this.user.personalAddress = this.UserPersonalAddress.nativeElement.value;

  


      this.updateUser.updateUser(this.user)
      return 1
    
  }

  showErrorAlert(errorMessage: string) {
    Swal.fire({
      icon: 'error',
      title: 'hata',
      text: errorMessage,
      showConfirmButton: true,
      confirmButtonText: 'Tamam'
    })
  }
}
