import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoreService } from '../store/store.service';
import { StreamEvent, StreamServiceService } from '../stream-service/stream-service.service';

@Component({
  selector: 'app-form-drawer',
  templateUrl: './form-drawer.component.html',
  styleUrls: ['./form-drawer.component.scss']
})
export class FormDrawerComponent implements OnInit, OnDestroy {

  constructor (
    private streamService: StreamServiceService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.streamService
      .listener(StreamEvent.TOGGLE_ENDNAV)
      .pipe(takeUntil(this.$destroyer))
      .subscribe(res => {
        if (res?.open)
          this.openDrawer(res?.action);
        else
          this.closeDrawer();
      });
  }

  public editMode: boolean = false;
  public open: boolean = false;
  public action: (string | Array <string>) = '';
  public $destroyer: Subject<void> = new Subject<void>();

  public taskForm: FormGroup = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.min(4)
    ]),
    description: new FormControl(null),
    labels: new FormControl([])
  });

  openDrawer(action: any = '') {
    
    if(Array.isArray(action)) {
      
      const {
        title,
        description,
        labels
      } = this.storeService.getTask(action[0], action[1])
      
      this.editMode = true;
      this.taskForm.controls['title'].setValue(title);
      this.taskForm.controls['description'].setValue(description);
      this.taskForm.controls['labels'].setValue(labels);
      this.openDrawer();

    }

    this.open = true;
    this.action = action;
  }

  closeDrawer() {
    this.open = false;
  }

  addChip(evt: any) {
    
    if(!evt?.value)
      return;

    const labels: Array <string> = this.taskForm.controls.labels.value;
    labels.push(evt.value);
    evt.value = null; 

  }

  removeChip(it: number) {
    const labels: any = this.taskForm.controls.labels;
    labels.value = labels.value.filter((node: any, index: number) => index !== it);
  }

  appendTask() {
    
    const { title, description, labels } = this.taskForm.value;
    let newTask: any = {
      title, description, labels,
      date: Date.now(),
      creator: 'Aditya Thakur',
    }

    if(!this.editMode)
      this.storeService.addTask(parseInt(String(this.action)), newTask);
    else {
      this.storeService.updateTask(
        parseInt(String(this.action[0])),
        parseInt(String(this.action[1])),
        newTask
        );
    }
    
    this.taskForm.reset();
    this.taskForm.controls['labels'].setValue([]);
    this.editMode = false;
    this.closeDrawer();
  }

  ngOnDestroy() {
    this.$destroyer.next();
  }
}
