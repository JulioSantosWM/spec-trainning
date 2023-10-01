import { Injectable } from "@angular/core";
import { UsersOpenApiService, CreditCardOpenApiService, TemporaryStoreService } from "../../mocks/facade.mock";
import { firstValueFrom, map } from "rxjs";
import { UserDto } from "../../models/user.dto";
import { CreditCardDto } from "../../models/credit-card.dto";

@Injectable()
export class FacadeService {

  constructor(
    private readonly userOpenApiService: UsersOpenApiService,
    private readonly creditCardOpenApiService: CreditCardOpenApiService,
    private readonly temporaryStoreService: TemporaryStoreService,
  ) {
  }

  public getUsers(): Promise<UserDto[]> {
    return firstValueFrom(this.userOpenApiService.getUsers());
  }

  public getUserDetails(uid: string): Promise<UserDto> {
    return firstValueFrom(this.userOpenApiService.getUser(uid));
  }

  public getPrimaryCreditCard(uid: string): Promise<CreditCardDto> {
    return firstValueFrom(this.creditCardOpenApiService.getPrimaryCreditCard(uid));
  }

  public getAvailableCreditCards(uid: string): Promise<CreditCardDto[]> {
    return firstValueFrom(this.creditCardOpenApiService.getAvailableCreditCards(uid));
  }

  public getIsCCExpanded(): Promise<boolean> {
    return firstValueFrom(
      this.temporaryStoreService.getStoredInformation<boolean>('cc_details_expanded')
        .pipe(map(val => !!val))
    );
  }

  public storeIsCCExpanded(isExpanded: boolean): Promise<void> {
    return this.temporaryStoreService.storeInformation('cc_details_expanded', isExpanded);
  }

}