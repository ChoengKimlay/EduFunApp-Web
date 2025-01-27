import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';


@Component({
    selector: 'app-root',
    standalone: true,
    template: `<router-outlet />`,
    imports: [RouterOutlet],
})

export class AppComponent implements OnInit {
    ngOnInit(): void {
        initFlowbite();
    }
}
