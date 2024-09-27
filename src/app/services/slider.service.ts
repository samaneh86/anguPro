import { HomeSliderResponse } from '../DTOs/slider/homeSliderResponse';
import { Slider } from '../DTOs/slider/slider';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class SliderService {
homeSliders:BehaviorSubject<Slider[]>=new BehaviorSubject<Slider[]>(null as any) ;
constructor(public http:HttpClient) { }

  getSlider():Observable<HomeSliderResponse>{
    return this.http.get<HomeSliderResponse>("/slider/get-active-sliders");
  }
  getCurrentSliders(){
return this.homeSliders;
  }
  setCurrentSliders(sliders:Slider[]){
this.homeSliders.next(sliders)
  }
}
