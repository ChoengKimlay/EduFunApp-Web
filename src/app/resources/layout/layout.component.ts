import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "./sidebar/component";
import { HeaderComponent } from "./header/component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'layout-comp',
    templateUrl: 'layout.component.html',
    standalone: true,
    imports: [
        SidebarComponent, 
        HeaderComponent,
        RouterOutlet,
        CommonModule
    ]
})

export class LayoutComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}