import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  form: FormGroup;


  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   fullName: [''],
    //   email: ['', [Validators.required, Validators.email]],
    //   phoneNumber: ['', [Validators.required]],
    //   subject: [null, [Validators.required]],
    //   language: [''],
    //   forWho: ['', [Validators.required]],
    //   courseType: ['', [Validators.required]],
    //   price: [''],
    //   additionalNote: [''],
    // });
  }

}
