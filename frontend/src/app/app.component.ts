import { Component, OnInit, OnDestroy } from '@angular/core';
import { WaterService } from './services/water.service';
import { Water } from './models/water';
import { Observable, timer, Subscribable, Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [WaterService]
})
export class AppComponent implements OnInit, OnDestroy {
    public freshWater: Water;
    public wasteWater: Water;
    private updateTimer: Subscription;
    
    constructor(private waterService: WaterService) {
    }
    
    ngOnInit() {
        this.wasteWater = this.updateWaterValue({
            level: 100,
            voltage: 6.7,
            maxVoltage: 6.7
        })

        this.updateTimer = timer(0, 5000)
            .subscribe(i => this.updateValues())
    }

    ngOnDestroy() {
        this.updateTimer.unsubscribe();
    }

    updateValues() {
        this.waterService.getFreshWater()
            .subscribe(res => this.freshWater = this.updateWaterValue(res));
    }

    updateWaterValue(value: Water): Water {
        value.level = Math.min(((value.voltage / value.maxVoltage) * 100), 100);
        return value;
    }
}
