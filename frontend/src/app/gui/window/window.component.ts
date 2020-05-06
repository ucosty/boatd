import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {
    @Input() title: string;
    @Input() width: number;
    @Input() top: number;
    @Input() left: number;
    
    constructor() { }
    
    ngOnInit(): void {
    }
    
}
