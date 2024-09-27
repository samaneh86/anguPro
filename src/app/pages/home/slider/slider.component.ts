import { DomainName } from './../../../utilities/pathtool';
declare var $: any;

import { Component } from '@angular/core';
import { SliderService } from '../../../services/slider.service';
import { Slider } from '../../../DTOs/slider/slider';
import { CommonModule } from '@angular/common';

declare function homeSlider(): any;

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {

  public sliders: Slider[] = null as any;
  public domain=DomainName;
  constructor(public sliderService: SliderService) { }
  ngOnInit() {

    this.sliderService.getCurrentSliders().subscribe(sliders => {
 
      if (sliders == null) {
        this.sliderService.getSlider().subscribe(res => {
          if (res.status == "Success") {
            this.sliderService.setCurrentSliders(res.data)

          }
        })
      }
      else {
        this.sliders = sliders;
       console.log(sliders);
       
        setInterval(() => {
          homeSlider();
        }, 300)
      }
    })

  }


}
