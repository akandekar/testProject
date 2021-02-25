import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormControlName } from '@angular/forms';
import { NgControl } from '@angular/forms';
import { ServiceService } from '../../shared/service/service.service';
import { register } from '../../shared/model/register';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

declare var $: any;
@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {
  bodyText: string;
  title = 'appBootstrap';
  closeResult: string;
  modals: any[] = [];

  show_submit: boolean;
  er: boolean;
  selectedFile: File;
  path: string;
  current_user: any;
  c_user:any;
  f_user:string;
  f_pass:string;
  fb = new FormBuilder();
  entry = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    contact: ['', [Validators.required, Validators.maxLength(10)]],
    dob: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    ph_url: ['']
  })

  entry1 = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    contact: ['', [Validators.required, Validators.maxLength(10)]],
    dob: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    ph_url: ['']
  })

  registration: register[] = [];
  rj: register[] = [];
  constructor(private _service: ServiceService, private rout: Router,private router: Router,private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.bodyText = 'This text can be updated in modal 1';
    console.log("session data",sessionStorage.getItem('user'))
    console.log("object json",JSON.parse(sessionStorage.getItem('user')))
    this.c_user=JSON.parse(sessionStorage.getItem('user'));
    console.log("c user",this.c_user," fold is",this.c_user.username)
    this.fetchRegister();
    this.show_submit = true;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }



  fetchRegister() {
    this.er = true;
    this._service.getRegisters().subscribe(rg => {
      this.registration = rg.map((sd) => {
        return ({ ...sd })
      });
    });
    this.show_submit = true;
  }

  get f() {
    return this.entry.controls;
  }

  register() {
    this.entry.controls['ph_url'].setValue(this.path);
    console.log("form value", this.entry.value)
    if (this.show_submit && !this.entry.invalid) {
      //   $.ajax({
      //     url: "http://localhost:8888/register",
      //     data: this.entry.value,
      //     cache: false,
      //     success: function (d) {
      //         // successCallback(d);
      //         console.log("success data ajax")
      //     },
      //     error: function (d) {
      //         // var errorTitle = "Error in (" + options.url + ")";
      //         // var fullError = JSON.stringify(d);
      //         // console.log(errorTitle);
      //         // console.log(fullError);

      //     }
      // });
      this._service.postRegister(this.entry.value).subscribe(res => {
        this.entry.controls['email'].setValue(null);
        this.entry.controls['name'].setValue(null);
        this.entry.controls['address'].setValue(null);
        this.entry.controls['contact'].setValue(null);
        this.entry.controls['dob'].setValue(null);
        this.entry.controls['ph_url'].setValue(null);
        this.er = false;

        this.path = "";
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Added Contact successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.fetchRegister();
      })
    }

  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    this.path = "../../../assets/image/" + this.selectedFile.name
  }

  update_record() {
    console.log("update register call")
    console.log("this.entry.value", this.entry.value)
    this._service.putRegister(this.entry.value, this.rj['id']).subscribe(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Updated successfully',
        showConfirmButton: false,
        timer: 1500
      })
      this.fetchRegister();
    })
  }

  edit_record(reg: register[]) {
    this.show_submit = false;
    this.rj = reg
    console.log("ids ", this.rj['id'])
    // this.entry.get("id").setValue(this.rj['id'])
    this.entry.get("name").setValue(this.rj['name'])
    this.entry.get("address").setValue(this.rj['address'])
    this.entry.get("dob").setValue(this.rj['dob'])
    this.entry.get("contact").setValue(this.rj['contact'])
    this.entry.get("email").setValue(this.rj['email'])
  }

  delete_record(reg: register) {
    this._service.deleteRegister(reg).toPromise().then(
      () => {
        this.fetchRegister();
      }
    )
  }

  logout() {
    if (confirm("Are you sure to logout ?")) {
      this.router.navigate(['/']);
      this._service.logoutUser();
      
    }
  }

  forget_password(){
    let user = this.f_user
    let pass = this.f_pass
    let data = this.c_user
    if(this.c_user.contact==user){
     this.c_user.password=pass
     this._service.putUser1(this.c_user).subscribe(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Updated successfully',
        showConfirmButton: false,
        timer: 1500
      })
      this.rout.navigate(['/'])
    })
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Invalid details',
        showConfirmButton: false,
        timer: 1500
      })
      
    }
    // let filter_set = this.c_user.filter(d => d.username == user)
    // console.log("filter_set",filter_set)
    // let filter_set1 = filter_set[0]
    // filter_set1.password = pass;
    

  }
}
