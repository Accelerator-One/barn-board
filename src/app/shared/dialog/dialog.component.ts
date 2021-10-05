import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from './dialog.service';
import { StoreService } from '../store/store.service';
import { Board } from 'src/app/interfaces';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public code: string,
    public dialog: DialogService,
    public store: StoreService
  ) { }

  ngOnInit(): void { }
  public color: ThemePalette = 'accent';

  public boardName: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required])
  });

  public closeDialog() {
    this.dialog.closeDialog();
  }

  public appendNewBoard() {
    this.store.addBoard(this.boardName.get('name')?.value);
    this.closeDialog();
  }

}
