import { Injectable } from '@angular/core';
import { DialogService } from './dialog/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public dialogService: DialogService) { }

  show() {
    this.dialogService.openDialog('loader');
  }

  hide() {
    this.dialogService.closeDialog();
  }

}
