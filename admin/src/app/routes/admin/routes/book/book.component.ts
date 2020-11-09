import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { FormComponent } from 'app/shared/components/form.component';
import { BasicInfoComponent } from './shared/baisc-info/basic-info.component';
import { BookApiService } from 'app/shared/http/book-api.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  animations: fuseAnimations
})
export class BookComponent implements OnInit, AfterViewInit {
  formComponents: FormComponent[] = [];
  loadpage: boolean;
  mainData: any;
  editMode: boolean;
  

  @ViewChild('basicInfoForm', { static: false }) basicInfoForm: BasicInfoComponent;
  

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackBarService,
    private api: BookApiService,
    
  ) { }

  ngOnInit(): void {

    setTimeout(() => { this.loadpage = true; });

    this.loadData();
  }

  loadData(): void  {
    if (this.activatedRoute.snapshot.params.id && this.activatedRoute.snapshot.params.id !== 'new') {
      this.editMode = true;
      this.api.getByQuery({ _id: this.activatedRoute.snapshot.params.id }).subscribe((data: any) => {
        this.mainData = data.items[0] || {}; 
        
      });
    } else {
      this.editMode = false;
      this.mainData = {};
    }
  }

  ngAfterViewInit(): void  {
    this.formComponents = [
      this.basicInfoForm,
      
    ];
  }

  formsAreValid(): any  {
    return this.formComponents.filter(component => component)
      .every((formComponent: FormComponent) => formComponent.formIsValid());
  }

  save(): void  {
    if (this.formsAreValid()) {
      if (this.editMode) {
        this.api.update({ _id: this.activatedRoute.snapshot.params.id, ...this.getFormData() })
          .subscribe(
            () => this.snackBarService.open('Updated Successfully'),
            () => this.snackBarService.open('Update Failed'),
            () => this.router.navigate(['/admin/books']),
          );
      } else {
        this.api.create(this.getFormData())
          .subscribe(
            () => this.snackBarService.open('Created Successfully'),
            () => this.snackBarService.open('Creation Failed'),
            () => this.router.navigate(['/admin/books']),
          );
      }
    } else {
      this.snackBarService.open('Form fields validation failed');
    }
  }

  getFormData(): any {
    return _.cloneDeep(_.merge(
      this.basicInfoForm.getFormValue(),
      
    ));
  }
}
