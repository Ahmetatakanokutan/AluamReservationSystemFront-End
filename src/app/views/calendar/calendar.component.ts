import { Component } from '@angular/core';
import { DataService,  } from '../calendar/calendar.service';
import { loadMessages, locale ,} from 'devextreme/localization';
import { DxSchedulerModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { months } from 'moment';

import turkish from './tr.json'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DateInterval } from 'src/app/models/DateInterval';
import { ReservationRequest } from 'src/app/models/ReservationRequests'
import { JwtHelperService } from '@auth0/angular-jwt';
import { ResourceAssignedEvent } from 'devextreme/ui/gantt';


var additionalData: DateInterval[] = [];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DataService]
})


export class CalendarComponent {
 
  dataSource: DataSource;
  control: false | undefined;
  selectedStartDate: Date | undefined;
  selectedEndDate: Date | undefined;
  reservationRequest:ReservationRequest
  resourcesData: DateInterval[];

  views = ['workWeek', 'month'];

  id:number

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // :id parametresini al
      console.log('Received ID:', this.id);
      // Burada parametreyi istediğiniz şekilde kullanabilirsiniz
    });
  }


  currentView = this.views[0];
  private baseUrl = 'http://localhost:8080/api/user';
  constructor(private router: Router,public dataService: DataService, private http: HttpClient, private route: ActivatedRoute) {
    loadMessages(turkish);

    this.dataSource = new DataSource({
      
      load: () => {
        const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.tokenParser(localStorage.getItem('auth-token'))}` 
      });
      const options = { headers };

      return this.http.get<DateInterval[]>(`${this.baseUrl}/get-all-appointment/${this.id}`, options).toPromise()    .then((httpData: DateInterval[]) => {
        // HTTP verilerine eklemek istediğiniz başka verileri burada ekleyin

  
        // HTTP verileriyle ek verileri birleştirin
        const mergedData = httpData.concat(additionalData);
  
        // Birleştirilmiş verileri dönün
        return mergedData;
      })
      .catch(error => {
        // Hata işleme
      });
    },
      
      
      
      insert: (values) =>{

        additionalData = [
          values
          ];
          
        return null
      },
      update:(key,values) =>{
        additionalData = [
          values
          ];

        return null
      }
    });
    
    locale(navigator.language);
    
  }
  
  tokenParser(token: string): string {
    const regex = /{"token":"(.*?)"}/;
    const match = token.match(regex);

    if (match) {
      const jsonData = match[1];
      return jsonData;
    } else {
      console.log("Eşleşen veri bulunamadı.");
      return token;
    }
  }

  onOptionChanged(e: any) {
    if (e.name === 'currentView') {
      this.currentView = e.value;
    }
  }
  Notification(status:string, message:string,type:SweetAlertIcon) {
    Swal.fire(status, message, type);
  }

  onAppointmentFormCreated(e:any){
    const formItems = e.form.option('items');

    // Formdaki gereksiz alanları filtrele ve sadece başlangıç ve bitiş tarihleri kalsın
    const filteredFormItems = formItems.filter((item: any) => {
      const itemName = item.dataField;
      
      return itemName === 'startDate' || itemName === 'endDate';

    });
  
    // Formdaki gereksiz alanları kaldır
    e.form.option('items', filteredFormItems);
  
    // Kaydet ve Kapat düğmelerini ayarla
    const buttons = e.component._popup.option('buttons');
    buttons[0].options = { visible: false };
    buttons[1].options = { text: 'Close' };
    e.component._popup.option('buttons', buttons);
  }
  getAdditionalDataCellColor(): string {
    // additionalData içindeki hücreyi her zaman kırmızı yap
    return 'red';
  }

  onAppointmentFormOpening(e: any) {
    const startDate = e.appointmentData.startDate;
    const endDate = e.appointmentData.endDate;
    const isThereMoreThanOneAppointment = this.isThereMoreThanOneAppointment(startDate, endDate);
    if ((!this.isValidAppointmentDate(startDate) || isThereMoreThanOneAppointment) && !this.control) {
      e.cancel = true;
      this.Notification('hata','geçmiş tarihte, öğle arasında ya da aynı hücreye birden fazla rezervasyon yapılamaz','error');

    }
    
    this.applyDisableDatesToDateEditors(e.form);
  }

  onAppointmentAdding(e: any) {
    const isValidAppointment = this.isValidAppointment(e.component, e.appointmentData);
    const startDate = new Date(e.appointmentData.startDate);
    const endDate = new Date(e.appointmentData.endDate);
    const isThereMoreThanOneAppointment = this.isThereMoreThanOneAppointment(startDate, endDate);
    if ((!isValidAppointment || isThereMoreThanOneAppointment) && !this.isDinnerControl(startDate, endDate)) {
      e.cancel = true;
      this.Notification('hata','geçmiş tarihte, öğle arasında ya da aynı hücreye birden fazla rezervasyon yapılamaz','error');
    }
    else{
      this.Notification('başarılı','seçiminiz gereksinimlere uyumludur.','success');
      console.log(e);
      this.selectedStartDate = startDate;
      this.selectedEndDate = endDate;
    }
  }



  sendReservationRequest(){
     this.reservationRequest = {id:0, startDate:additionalData[0].startDate, endDate:additionalData[0].endDate,
    machineId:this.id,text:additionalData[0].text, userMail:this.getJsonData(localStorage.getItem('auth-token')).sub}
    this.dataService.sendReservationRequest(this.reservationRequest).subscribe(
      (res) =>{
        this.showSuccessAlert('seçiminiz gereksinimlere uyumludur.')
      },
    (error) =>{
      this.Notification('hata','geçmiş tarihte, öğle arasında ya da aynı hücreye birden fazla rezervasyon yapılamaz','error');
    }
    )

    


  }
  isDinnerControl(startDate: Date, endDate: Date) {
    const Starthours = startDate.getHours();
    const Endhours = endDate.getHours();
    const dinnerTime = this.dataService.getDinnerTime();
    return (Starthours <= dinnerTime.to && Endhours >= dinnerTime.from);
  }
  

  onAppointmentUpdating(e: any) {
    const isValidAppointment = this.isValidAppointment(e.component, e.newData);
    console.log(e)
    const startDate = new Date(e.newData.startDate);
    const endDate = new Date(e.newData.endDate);
    const isThereMoreThanOneAppointment = this.isThereMoreThanOneAppointment(startDate, endDate);
    if (!isValidAppointment || isThereMoreThanOneAppointment) {
      e.cancel = true;
      this.Notification('hata','güncelleştirmede bir çakışma oluşmuştur.','error'); 
    }
    else{
      this.Notification('başarılı','güncelleştirmeniz gereksinimlere uyumludur.','success');
      this.selectedStartDate = startDate;
      this.selectedEndDate = endDate;
    }
  }

  isThereMoreThanOneAppointment(startDate: any, endDate: any) {
    const appointments = this.dataService.getData();
  
    for (let i = 0; i < appointments.length; i++) {
      const element = appointments[i];
      if (
        (startDate  >= element.startDate && endDate <= element.endDate) ||
        (startDate <= element.startDate && endDate >= element.endDate)
      ) {
        return true;
      } 
    }
    return false;
  }

  isHoliday(date: Date) {
    const localeDate = date.toLocaleDateString();
    const holidays = this.dataService.getHolidays();
    return holidays.filter((holiday) => holiday.toLocaleDateString() === localeDate).length > 0;
  }

  isWeekend(date: Date) {
    const day = date.getDay();
    return day === 0 || day === 6 || date.getTime() < Date.now();
  }

  isDisableDate(date: Date) {
    return this.isHoliday(date) || this.isWeekend(date);
  }

  isDisabledDateCell(date: Date) {
    return this.isMonthView()
      ? this.isWeekend(date)
      : this.isDisableDate(date);
  }

  isDinner(date: Date ) {
    const hours = date.getHours();
    const dinnerTime = this.dataService.getDinnerTime();
    return hours >= dinnerTime.from && hours < dinnerTime.to;
  }

  hasCoffeeCupIcon(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dinnerTime = this.dataService.getDinnerTime();

    return hours === dinnerTime.from && minutes === 0;
  }

  isMonthView() {
    return this.currentView === 'month';
  }

  isValidAppointment(component: any, appointmentData: any) {
    const startDate = new Date(appointmentData.startDate);
    const endDate = new Date(appointmentData.endDate);
    const cellDuration = component.option('cellDuration');
    return this.isValidAppointmentInterval(startDate, endDate, cellDuration);
  }

  isValidAppointmentInterval(startDate: Date, endDate: Date, cellDuration: number) {
    const edgeEndDate = new Date(endDate.getTime() - 1);

    if (!this.isValidAppointmentDate(edgeEndDate)) {
      return false;
    }

    const durationInMs = cellDuration * 60 * 1000;
    const date = startDate;
    while (date <= endDate) {
      if (!this.isValidAppointmentDate(date)) {
        return false;
      }
      const newDateTime = date.getTime() + durationInMs - 1;
      date.setTime(newDateTime);
    }

    return true;
  }

  getJsonData(authToken:string){
    const token = new JwtHelperService();
    
      return token.decodeToken(authToken)

  }
  isValidAppointmentDate(date: Date) {
    return !this.isHoliday(date) && !this.isDinner(date) && !this.isWeekend(date);
  }

  applyDisableDatesToDateEditors(form: any) {
    const holidays = this.dataService.getHolidays();
    const startDateEditor = form.getEditor('startDate');
    startDateEditor.option('disabledDates', holidays);

    const endDateEditor = form.getEditor('endDate');
    endDateEditor.option('disabledDates', holidays);
  }

  showSuccessAlert(successMessage: string) {
    Swal.fire({
      icon: 'success',
      title: 'Başarılı',
      text: successMessage,
      showConfirmButton: true,
      confirmButtonText: 'Tamam'
    }).then((result) => {
      if (result.isConfirmed) {
        // OK tuşuna basıldığında sayfayı yeniden yükleyin
        this.router.navigate(['/anasayfa']);
      }
    });
  }
}



