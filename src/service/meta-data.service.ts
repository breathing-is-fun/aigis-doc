import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MetaDataProps {
  config: any;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class MetaDataService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get<MetaDataProps>('../assets/json/template.json');
  }
}
