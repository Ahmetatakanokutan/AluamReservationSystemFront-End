import { Component } from '@angular/core';
import { DataService,  } from './siparis-ver.service';
import { loadMessages, locale } from 'devextreme/localization';
import { DxSchedulerModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-siparis-ver',
  templateUrl: './siparis-ver.component.html',
  styleUrls: ['./siparis-ver.component.scss'],
  providers: [DataService]
})
export class SiparisVerComponent {
  dataSource: DataSource;
  control: false | undefined;
  currentDate = new Date(2021, 3, 27);

  views = ['workWeek', 'month'];

  currentView = this.views[0];

  constructor(public dataService: DataService) {
    this.dataSource = new DataSource({
      store: dataService.getData(),
    });
  }

  onOptionChanged(e: any) {
    if (e.name === 'currentView') {
      this.currentView = e.value;
    }
  }
  Notification(status:string, message:string,type:SweetAlertIcon) {
    Swal.fire(status, message, type);
  }


  onAppointmentFormOpening(e: any) {
    const startDate = e.appointmentData.startDate;
    const endDate = e.appointmentData.endDate;
    const isThereMoreThanOneAppointment = this.isThereMoreThanOneAppointment(startDate, endDate);
    if ((!this.isValidAppointmentDate(startDate) || isThereMoreThanOneAppointment) && !this.control) {
      e.cancel = true;
      this.Notification('hata','aynı hücreye birden fazla rezervasyon ya da öğle arasında rezervasyon yapılamaz','error');

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
      this.Notification('hata','aynı hücreye birden fazla rezervasyon ya da öğle arasında rezervasyon yapılamaz','error');
    }
    else{
      this.Notification('başarılı','seçiminiz gereksinimlere uyumludur.','success');
    }
  }
  isDinnerControl(startDate: Date, endDate: Date) {
    const Starthours = startDate.getHours();
    const Endhours = endDate.getHours();
    const dinnerTime = this.dataService.getDinnerTime();
    return (Starthours <= dinnerTime.to && Endhours >= dinnerTime.from);
  }
  

  onAppointmentUpdating(e: any) {
    const isValidAppointment = this.isValidAppointment(e.component, e.newData);
    const startDate = new Date(e.appointmentData.startDate);
    const endDate = new Date(e.appointmentData.endDate);
    const isThereMoreThanOneAppointment = this.isThereMoreThanOneAppointment(startDate, endDate);
    if (!isValidAppointment) {
      e.cancel = true;
      this.Notification('hata','güncelleştirmede bir çakışma oluşmuştur.','error'); 
    }
    else{
      this.Notification('başarılı','güncelleştirmeniz gereksinimlere uyumludur.','success');
    }
  }

  notifyDisableDate() { 
    notify("Cannot create or move an appointment/event to disabled time/date regions.", 'warning', 1000)
      alert("Cannot create or move an appointment/event to disabled time/date regions.");
    
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
    return day === 0 || day === 6;
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
}

function notify(arg0: string, arg1: string, arg2: number) {
  throw new Error('Function not implemented.');
}

function isTehereMoreThanOneAppoitment(startDate: any, endDate: any): boolean {
  throw new Error('Function not implemented.');
}

