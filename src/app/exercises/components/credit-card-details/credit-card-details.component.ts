import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CreditCardDto } from "../../models/credit-card.dto";
import { FacadeService } from "../../services/facade/facade.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { GlobalStateService } from "../../mocks/global-state.service";
import { filter, map } from "rxjs";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-w-credit-card-details',
  templateUrl: './credit-card-details.component.html',
  styleUrls: ['./credit-card-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class CreditCardDetailsComponent implements OnInit{
  @Input() expanded!: boolean;
  @Output() onExpandCollapseChange = new EventEmitter<boolean>();

  public creditCardDetails: CreditCardDto | null = null;
  public isLoading = true;

  constructor(
    private facadeService: FacadeService,
    private globalStateService: GlobalStateService,
  ) { }

  public async ngOnInit(): Promise<void> {
    this.globalStateService.selectedUser$
      .pipe(map(selectedUser => selectedUser?.uid || null), filter(val => typeof val === 'string'))
      .subscribe(async uid => {
        this.isLoading = true;
        this.creditCardDetails = await this.facadeService.getPrimaryCreditCard(uid as string);
        this.isLoading = false;
    })
  }

  public toggleExpandCollapse(): void {
    this.expanded = !this.expanded;
    this.onExpandCollapseChange.emit(this.expanded);
  }
}