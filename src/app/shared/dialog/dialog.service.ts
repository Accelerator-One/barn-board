import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(code: string) {
    this.dialog.open(DialogComponent, {
      disableClose: true,
      data: code
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

}
