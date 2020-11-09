import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileApiService } from '../../http/files-api.service';

@Component({
  selector: 'app-images-upload',
  templateUrl: './images-upload.component.html',
  styleUrls: ['./images-upload.component.scss']
})
export class ImagesUploadComponent {
  @Input() image: any;
  @Input() images: any;
  @Input() imageHeight: any;
  @Input() imageWidth: any;
  @Output() uploadComplete = new EventEmitter<any>();
  @Output() removeImage = new EventEmitter<any>();

  selectedImage: any;
  multiple = 'multiple';
  filesToDestroy = [];
  filesToCreate = [];

  createdFiles = [];

  constructor(
    private fileApiService: FileApiService
  ) {
  }

  removeImageItem(index): void {
    this.removeImage.emit(index);
  }

  onImageSelected(selectedImage): void {
    this.selectedImage = selectedImage;
    const filesToCreate = [];
    filesToCreate.push(selectedImage.file);

    this.fileApiService.createFiles(filesToCreate, [], { height: this.imageHeight, width: this.imageWidth })
      .subscribe((data) => {
        this.uploadComplete.emit({ url: data[0] });
        }, () => {
        this.uploadComplete.next({ url: selectedImage.file.name });
      });
  }

}
