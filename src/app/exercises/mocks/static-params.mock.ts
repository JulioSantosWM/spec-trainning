import { InjectionToken } from "@angular/core";
import { StaticParams } from "../models/static-params.model";
import { DisplayName } from "../enums/display-name.enum";
import { PrimaryContact } from "../enums/primary-contact.enum";

export const STATIC_PARAMS = new InjectionToken<StaticParams | null>('STATIC_PARAMS');

export const STATIC_PARAMS_VALUE: StaticParams = {
  displayNameType: DisplayName.FullName,
  primaryContactType: PrimaryContact.Email,
}