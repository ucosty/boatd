import { Component, OnInit } from '@angular/core';
import { WaterService } from './services/water.service';
import { Water } from './models/water';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [WaterService]
})
export class AppComponent implements OnInit {
    public freshWater: Water;
    public wasteWater: Water;
    
    constructor(private waterService: WaterService) {
    }
    
    ngOnInit() {
        this.wasteWater = this.updateWaterValue({
            level: 100,
            voltage: 6.7
        })
        this.waterService.getFreshWater()
            .subscribe(res => this.freshWater = this.updateWaterValue(res));
    }

    updateWaterValue(value: Water): Water {
        value.level = Math.max(((value.voltage / 6.70) * 100), 100);
        return value;
    }
}
