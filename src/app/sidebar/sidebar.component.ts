import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {

    isOpen = true;
    isExpanded = true;

    onToggle() {
        this.isOpen = !this.isOpen;
    }
}
