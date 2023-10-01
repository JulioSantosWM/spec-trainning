import { Component, Input } from "@angular/core";
import { User } from "../../models/user.model";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-w-user-focus',
  templateUrl: './user-focus.component.html',
  styleUrls: ['./user-focus.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class UserFocusComponent {
  @Input() user!: User;

}