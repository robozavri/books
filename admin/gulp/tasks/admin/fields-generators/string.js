import * as _ from 'lodash';
import {
  buildCheckFormElementEmpty,
  buildForModalEmpty
} from '../fields-helper';

export function stringBuilder(key, nested = null) { 
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
    ${key}: [this.formData.${nested} || ''],`;
}

function buildHtml(key) {
  return `
    <div fxLayout="row" fxLayoutAlign="space-between">
      <mat-form-field appearance="outline" floatLabel="always" fxFlex="100">
        <mat-label> ${_.lowerCase(key)} </mat-label>
        <input matInput placeholder="${_.lowerCase(key)}" formControlName="${key}">
      </mat-form-field>
    </div>
`;
}