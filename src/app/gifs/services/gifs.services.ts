
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey: string = 'jH3CCLsyWrFvXhSPJwCYvjQxbP0DQo6E';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  public gifList: Gif[] = [];

  constructor( private http: HttpClient ) {
    this.loadLocalStorage(); // Effect solo lo llama cuando empieza el componente.
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory( tag:string ){
    tag = tag.toLowerCase().trim();

    if(this._tagsHistory.includes(tag)){
      // Remove tag
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag );
    }
    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0, 10); // Restinged 10 items

    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem( 'history', JSON.stringify(this._tagsHistory) );
  }

  private loadLocalStorage():void {
    if( !localStorage.getItem('history') ) return;
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if (this._tagsHistory.length === 0) return;

    const [firstValue, ...params] = this._tagsHistory;
    this.searchTags(firstValue);
  }

  searchTags( tag:string ): void {
    if( tag.length < 1 ) return;

    this.organizeHistory( tag );

    const params = new HttpParams()
      .set( 'api_key', this.apiKey )
      .set( 'limit', '20' )
      .set( 'q', tag )

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe(
        {
          next: ({ data, meta, pagination }) => {
            this.gifList = data;
          },
          error: ( e ) => {
            console.log( e );
          }
        }
      )

  }
}
