import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.services';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private gifsService: GifsService ){}

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  setTags( textSearch:string ):void{
    this.gifsService.searchTags( textSearch )
  }

}
