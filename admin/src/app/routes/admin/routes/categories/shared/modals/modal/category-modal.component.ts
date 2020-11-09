import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { FormComponent } from 'app/shared/components/form.component';
import { FormComponent as _FormComponent } from '../../form/form.component';
import { Category } from 'app/shared/models/category';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit, AfterViewInit {
  showFormWarning = false;
  submitted = false;
  showSubmit = false;
  

  @ViewChild('categoryForm', { static: false }) categoryFormComponent: _FormComponent;
  

  categoryType: Category;

  constructor(
    private dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) { }

  formComponents: FormComponent[];

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.formComponents = [
      this.categoryFormComponent,
      
    ];
  }

  formsAreValid(): any {
    return this.formComponents.filter(component => component)
      .every((formComponent: FormComponent) => formComponent.formIsValid());
  }

  onFinish(): void {
    this.showFormWarning = false;
    this.submitted = true;
    if (this.formsAreValid()) {
      this.dialogRef.close(this.getCategoryData());
    } else {
      this.showFormWarning = true;
    }
  }

  getCategoryData(): any {
    const data = _.cloneDeep(_.merge(
      this.categoryType,
      this.categoryFormComponent.getFormValue(),
      
    ));
    return data;
  }

} 
