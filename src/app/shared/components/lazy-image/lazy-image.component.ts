import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {

  @Input()
  public urlImage!: string ;

  @Input()
  public altImage: string = '';

  public hasLoadedImage: boolean = false;

  ngOnInit(): void {
    if( !this.urlImage ) throw new Error( 'Property urlImage is required' )
  }

  onLoad(): void {
    this.hasLoadedImage = true;
  }
}
