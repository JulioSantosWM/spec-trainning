import { Component, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { FacadeService } from "./services/facade/facade.service";
import { AgGridModule } from "ag-grid-angular";
import { COL_DEF } from "./constants/col-def";
import { User } from "./models/user.model";
import { DataMapperService } from "./services/data-mapper/data-mapper.service";
import { StaticParamsService } from "./services/static-params/static-params.service";
import { STATIC_PARAMS, STATIC_PARAMS_VALUE } from "./mocks/static-params.mock";
import { CreditCardOpenApiService, TemporaryStoreService, UsersOpenApiService } from "./mocks/facade.mock";
import { CommonModule } from "@angular/common";
import { GridReadyEvent, RowClickedEvent } from "ag-grid-community";
import { UserFocusComponent } from "./components/user-focus/user-focus.component";
import { CreditCardDetailsComponent } from "./components/credit-card-details/credit-card-details.component";
import { GlobalStateService } from "./mocks/global-state.service";

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AgGridModule,
    MatCardModule,
    MatProgressSpinnerModule,
    UserFocusComponent,
    CreditCardDetailsComponent,
  ],
  providers: [
    FacadeService,
    DataMapperService,
    StaticParamsService,
    /** MOCKS */
    { provide: STATIC_PARAMS, useValue: STATIC_PARAMS_VALUE },
    TemporaryStoreService,
    UsersOpenApiService,
    CreditCardOpenApiService,
    GlobalStateService
  ],
})
export class WidgetComponent implements OnInit {
  public columnDefs = COL_DEF;

  public rowData: User[] = [];
  public isLoading = true;
  public selectedUser: User | null = null;
  public ccDetailsExpanded = false;

  constructor(
    private facadeService: FacadeService,
    private dataMapperService: DataMapperService,
    private globalStateService: GlobalStateService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.ccDetailsExpanded = await this.facadeService.getIsCCExpanded();
      const usersDto = await this.facadeService.getUsers();
      this.rowData = usersDto.map(userDto => this.dataMapperService.toUser(userDto));
    } catch (error) {
      throw new Error('An error occured: ' + error); 
    } finally {
      this.isLoading = false;
    }
  }

  public onGridReady(event: GridReadyEvent<User[]>): void {
    event.api.sizeColumnsToFit();
  }

  public onRowClicked(event: RowClickedEvent<User>): void {
    if (event.data === this.selectedUser) {
      this.selectedUser = null;
    } else {
      this.selectedUser = event.data as User; 
    }
    this.globalStateService.updateSelectedUser(this.selectedUser);
  }

  public async onCCDetailsToggle(event: boolean): Promise<void> {
    await this.facadeService.storeIsCCExpanded(event);
  }
}
