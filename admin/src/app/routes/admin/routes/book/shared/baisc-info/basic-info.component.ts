import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
import { Book } from 'app/shared/models/book';
import { largeSize } from 'app/shared/constants/image';
import { CategoryApiService } from 'app/shared/http/category-api.service';


@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent extends _FormComponent implements OnInit {
  
  @Input() formData: Book;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<Book>();
 
  form: FormGroup;
  imageSize = largeSize;
  categories: any;
  
  constructor(
    private categoryApiService: CategoryApiService,
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {

    this.categoryApiService.getByQuery({ all: true}).subscribe((data: any) => {
       this.categories = data.items;
    });
    
    this.formData.title = this.formData.title || {};
    this.formData.author = this.formData.author || {};
    this.formData.image = this.formData.image || {};
    this.formData.amazonPrice = this.formData.amazonPrice || '';
    this.formData.amazonLink = this.formData.amazonLink || '';
    this.formData.price = this.formData.price || '';
    this.formData.category = this.formData.category || '';

    this.form = this.fb.group({
    title: this.fb.group({
      en: [this.formData.title.en || ''],
      ge: [this.formData.title.ge || ''],
    }),
    author: this.fb.group({
      en: [this.formData.author.en || ''],
      ge: [this.formData.author.ge || ''],
    }), 
    image: this.fb.group({
      url: [this.formData.image.url || '']
    }),
    category: [this.formData.category || ''],
    amazonPrice: [this.formData.amazonPrice || ''],
    amazonLink: [this.formData.amazonLink || ''],
    price: [this.formData.price || ''],
    });
  }

  
  onUploadCompleteImage6(data: any): void {
    this.form.get('image').get('url').markAsTouched();
    this.form.get('image').get('url').setValue(data.url);
  }

  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
