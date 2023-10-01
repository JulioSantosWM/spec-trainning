import { Inject, Injectable } from "@angular/core";
import { STATIC_PARAMS } from "../../mocks/static-params.mock";
import { StaticParams } from "../../models/static-params.model";
import { DisplayName } from "../../enums/display-name.enum";
import { PrimaryContact } from "../../enums/primary-contact.enum";

@Injectable()
export class StaticParamsService {

  constructor(@Inject(STATIC_PARAMS) private readonly staticParams: StaticParams) {}

  get primaryContact(): PrimaryContact {
    if (this.staticParams?.primaryContactType !== undefined && Object.values(PrimaryContact).includes(this.staticParams.primaryContactType)) {
      return this.staticParams.primaryContactType;
    }
    throw new Error('No primary contact set in StaticParams.')
  }

  get displayName(): DisplayName {
    if (this.staticParams?.displayNameType !== undefined && Object.values(DisplayName).includes(this.staticParams.displayNameType)) {
      return this.staticParams.displayNameType;
    }
    return DisplayName.FullName;
  }

  get expandedDetails(): boolean {
    if (this.staticParams?.expandedDetails !== undefined) {
      return this.staticParams.expandedDetails;
    }
    return false;
  }
}