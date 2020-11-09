import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
import { Category } from 'app/shared/models/category';
import { largeSize } from 'app/shared/constants/image';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends _FormComponent implements OnInit {
  
  @Input() formData: Category;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<Category>();

  form: FormGroup;
  imageSize = largeSize;
  

  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
  
    this.formData.title = this.formData.title || {};

    this.form = this.fb.group({ 
    title: this.fb.group({
        
      en: [this.formData.title.en || ''],
      ge: [this.formData.title.ge || ''],
    }),
    });
  }
  
  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
