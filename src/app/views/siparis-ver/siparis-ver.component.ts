import { Component } from '@angular/core';
import { DataService,  } from './siparis-ver.service';
import { loadMessages, locale } from 'devextreme/localization';
import { DxSchedulerModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-siparis-ver',
  templateUrl: './siparis-ver.component.html',
  styleUrls: ['./siparis-ver.component.scss'],
  providers: [DataService]
})
export class SiparisVerComponent {
  dataSource: DataSource;

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

  onAppointmentFormOpening(e: any) {
    const startDate = e.appointmentData.startDate;
    if (!this.isValidAppointmentDate(startDate)) {
      e.cancel = true;
      this.notifyDisableDate();
    }
    this.applyDisableDatesToDateEditors(e.form);
  }

  onAppointmentAdding(e: any) {
    const isValidAppointment = this.isValidAppointment(e.component, e.appointmentData);
    if (!isValidAppointment) {
      e.cancel = true;
      this.notifyDisableDate();
    }
  }

  onAppointmentUpdating(e: any) {
    const isValidAppointment = this.isValidAppointment(e.component, e.newData);
    if (!isValidAppointment ) {
      e.cancel = true;
      this.notifyDisableDate();
    }
  }

  notifyDisableDate() {
    notify('Cannot create or move an appointment/event to disabled time/date regions.', 'warning', 1000);
  }



  isWeekend(date: Date) {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  isDisableDate(date: Date) {
    return this.isWeekend(date);
  }

  isDisabledDateCell(date: Date) {
    return this.isMonthView()
      ? this.isWeekend(date)
      : this.isDisableDate(date);
  }

  isDinner(date: Date) {

    return 0;
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
    let isValid = true;

    this.dataService.getData().forEach(element => {

      if(appointmentData.startDate.getTime() !< element.startDate.getTime() && appointmentData.endDate.getTime() !<=  element.endDate.getTime()
        || appointmentData.startDate.getTime() !>= element.startDate.getTime() && appointmentData.endDate !> element.endDate.getTime())
      {
        isValid = false;
      }
      
    });

    if(!isValid){
        return false
    }
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
    return  !this.isWeekend(date);
  }

  applyDisableDatesToDateEditors(form: any) {

    const startDateEditor = form.getEditor('startDate');


    const endDateEditor = form.getEditor('endDate');

  }
}

function notify(arg0: string, arg1: string, arg2: number) {
  throw new Error('Function not implemented.');
}

