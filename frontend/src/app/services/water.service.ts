import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Water } from '../models/water';

@Injectable({
  providedIn: 'root'
})
export class WaterService {

  constructor(private http: HttpClient) { }

  getFreshWater(): Observable<Water> {
      return this.http.get<Water>(`/v1/water/fresh`);
  }
}
