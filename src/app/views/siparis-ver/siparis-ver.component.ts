import { Component } from '@angular/core';
import { DataService,  } from '../calendar/calendar.service';
import { loadMessages, locale } from 'devextreme/localization';
import { DxSchedulerModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-siparis-ver',
  templateUrl: './siparis-ver.component.html',
  styleUrls: ['./siparis-ver.component.scss'],
  providers: [DataService]
})
export class SiparisVerComponent {
}

