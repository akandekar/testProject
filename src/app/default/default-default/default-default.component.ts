import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormControlName } from '@angular/forms';
import { NgControl } from '@angular/forms';
import { ServiceService } from '../../shared/service/service.service';
import { Login } from '../../shared/model/login';
import { newuser } from '../../shared/model/newuser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { filter } from 'minimatch';



@Component({
  selector: 'app-default-default',
  templateUrl: './default-default.component.html',
  styleUrls: ['./default-default.component.scss']
})
export class DefaultDefaultComponent implements OnInit {
  log: newuser[] = [];
  fb = new FormBuilder();
  show: boolean;
  new_u: boolean;
  frag: boolean;
  sear: string;
  password_: string;
  lg = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  n_user = this.fb.group({
    name: ['', Validators.required],
    user_n: ['', Validators.required],
    pass: ['', Validators.required],
    phone: ['', Validators.required]
  })



  constructor(private service_login: ServiceService, private rout: Router) { }

  ngOnInit(): void {
    this.show = false;
    this.new_u = this.frag = true;
    this.fechLogin()
  }
  fechLogin() {
    this.service_login.getUserLogins().subscribe(res => {
      this.log = res.map((sd) => {
        return ({ ...sd });
      })
      console.log("this.log", this.log)
    })

  }

  login() {
    this.show = false;
    this.new_u = true;
    this.frag = true;
    let user = this.lg.controls['username'].value;
    let pass = this.lg.controls['password'].value;
    let data = this.log
    let isLogin = data.some(d => d.username == user && d.password == pass)
    let data1=this.n_user;
    let filter_set = data.filter(d => d.username == user)
    console.log("filter_set",filter_set)
    if(filter_set){
      if (isLogin) {
        sessionStorage.setItem('user',JSON.stringify(filter_set[0]));
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'login successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.rout.navigate(['/crud/operation'],{ state: { example: filter_set } });
      }else{
        Swal.fire({
          // position: 'top-end',
          icon: 'warning',
          title: 'Invalis details check again',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }else{
      Swal.fire({
        // position: 'top-end',
        icon: 'warning',
        title: 'Invalis details check again',
        showConfirmButton: false,
        timer: 1500
      })

    }
    
  }

  new_user() {
    this.show = true;
    this.new_u = false;
    this.frag = true;

    if (this.n_user.valid) {
      this.service_login.postLogin(this.n_user.value).subscribe(res => {
        this.fechLogin()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'New user added successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.show = false;
        this.new_u = true;
        this.frag = true;
      })
    } else {

    }
  }

  forget_user() {
    this.show = true;
    this.new_u = true;
    this.frag = false;
  }

  forget(event) {
    let user = this.sear
    let pass = this.password_
    let data = this.log
    let filter_set = data.filter(d => d.username == user)
    let filter_set1 = filter_set[0]
    filter_set1.password = pass;
    this.service_login.putUser1(filter_set1).subscribe(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Updated successfully',
        showConfirmButton: false,
        timer: 1500
      })
      this.show = false;
      this.new_u = true;
      this.frag = true;
    })
  }

}
