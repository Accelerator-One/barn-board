import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public visible: boolean = false;
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    passwd: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor() { }

  ngOnInit(): void { }

}
