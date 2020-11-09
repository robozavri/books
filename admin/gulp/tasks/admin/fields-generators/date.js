import * as _ from 'lodash';
import { 
  buildCheckFormElementEmpty,
  buildForModalEmpty
} from '../fields-helper';

export function dateBuilder(key, nested = null) {
  return {
    formComponentClassOnInitBodyArea: buildCheckFormElementEmpty(key, nested,"''"),
    emptyObjectsForOpenModal:  buildForModalEmpty(key,"''"),
    formComponentFormGroupArea: buildFormGroup(key, nested),
    formComponentHtmlArea: buildHtml(key),
  }
}

function buildFormGroup(key, nested = null) {
  if (nested === null) {
    nested = key;
  } else {
    nested += key;
  }
  return `
    ${key}: [this.formData.${nested} || new Date()],`;
}

function buildHtml(key) {
  return `
    <div fxLayout="row" fxLayoutAlign="space-between">
      <mat-form-field appearance="outline" fxFlex="100">
        <mat-label> ${_.lowerCase(key)} </mat-label>
        <input matInput [matDatepicker]="startDatePicker" formControlName="${key}">
        <mat-datepicker-toggle matSuffix [for]="startDatePicker"></mat-datepicker-toggle>
        <mat-datepicker #startDatePicker></mat-datepicker>
      </mat-form-field>
    </div>
`;
}