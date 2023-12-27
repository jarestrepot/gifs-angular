import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.services';

@Component({
  selector: 'gifs-search-box',
  template:`
    <h5 class="text-lg my-3">Search: </h5>
    <input
      type="text"
      placeholder="Search gifs..."
      class="bg-transparent p-1 focus:outline-none border-b w-2/3 focus:border-b-blue-600"
      (keyup.enter)="searchTag()"
      #textTagInput
    >
  `
})

export class SearchBoxComponent  {

  @ViewChild( 'textTagInput' )
  public tagInput!: ElementRef<HTMLInputElement>;
  constructor( private gifsService: GifsService ) { }

  searchTag():void {

    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTags( newTag );
    this.tagInput.nativeElement.value = '';

  }
}
