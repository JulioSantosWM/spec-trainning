import { DisplayName } from "../enums/display-name.enum";
import { PrimaryContact } from "../enums/primary-contact.enum";

export interface StaticParams {
  primaryContactType?: PrimaryContact;
  displayNameType?: DisplayName;
  expandedDetails?: boolean;
}