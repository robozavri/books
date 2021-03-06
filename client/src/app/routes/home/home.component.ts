import { Component, OnInit } from '@angular/core';
import { BooksApiService } from 'src/app/shared/http/books-api.service';
import { Book } from '../../shared/models/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: Book[];
  dialogRef: any;

  constructor(
    private booksApiService: BooksApiService,
  ) { }

  ngOnInit(): void {
    // this.booksApiService.getByQuery({ all: true }).subscribe(books => {
    //   this.books = books.items;
    // });
    this.booksApiService.getByGroupedCategories({ all: true }).subscribe(books => {
      this.data = books.items;
    });
  }

}
