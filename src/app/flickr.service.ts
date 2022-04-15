import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";


@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  private flickrArgs = {
    params: {
      api_key : '74b7b5c466ae19657e02c498831ee397',
      sort: "relevance",
      privacy_filter : '1',
      safe_search : '1',
      content_type : '1',
      media: 'photos',
      format : 'json',
      nojsoncallback: '1',
      per_page : '20'
    }
  }

  private flickrUrl = "https://www.flickr.com/services/rest/";

  constructor(private http : HttpClient) { }

  getImages(pageNumber : number, queryString : string) : Observable<any> {
    const API_URL = this.flickrUrl;
    this.flickrArgs.params['method'] = 'flickr.photos.search';
    this.flickrArgs.params['tags'] = queryString;
    this.flickrArgs.params['text'] = queryString;
    this.flickrArgs.params['page'] = pageNumber.toString();
    return this.http.get<any>(API_URL,this.flickrArgs);
  }

  getImageInfo(imageId : number): Observable<any> {
    const API_URL = this.flickrUrl;
    this.flickrArgs.params['method'] = 'flickr.photos.getInfo';
    this.flickrArgs.params['photo_id'] = imageId;
    return this.http.get<any>(API_URL,this.flickrArgs);
  }

  displayImage(input:any): string {
    return 'http://farm'+input.farm+'.static.flickr.com/'+input.server+'/'+input.id+'_'+input.secret+'.jpg';
  }
}