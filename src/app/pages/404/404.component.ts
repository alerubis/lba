import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-404',
    templateUrl: './404.component.html',
    standalone: true,
    imports: [
        MatButtonModule,
        RouterLink
    ]
})
export class Error404Component {

}
