import { Injectable } from "@angular/core";
import { UserDto } from "../../models/user.dto";
import { User } from "../../models/user.model";
import { CreditCardDto } from "../../models/credit-card.dto";
import { StaticParamsService } from "../static-params/static-params.service";
import { DisplayName } from "../../enums/display-name.enum";
import { PrimaryContact } from "../../enums/primary-contact.enum";

@Injectable()
export class DataMapperService {

  constructor(private staticParamsService: StaticParamsService) {}

  toUser(userDto: UserDto): User {
    const user: User = {
      id: userDto.id,
      uid: userDto.uid,
      username: userDto.username,
      name: this.getName(userDto),
      date_of_birth: new Date(userDto.date_of_birth),
      primary_contact: this.getPrimaryContact(userDto),
      avatar: userDto.avatar,
      address: {
        ...userDto.address
      }
    }
    return user;
  }

  toCreditCard(creditCardDto: CreditCardDto): CreditCardDto {
    return creditCardDto;
  }

  private getName(userDto: UserDto): string {
    switch (this.staticParamsService.displayName) {
      case DisplayName.FirstName: 
        return userDto.first_name;
      case DisplayName.LastName:
        return userDto.last_name;
      default:
        return userDto.first_name + ' ' + userDto.last_name;
    }
  }

  private getPrimaryContact(userDto: UserDto): string {
    if (this.staticParamsService.primaryContact === PrimaryContact.Email) {
      return userDto.email;
    }
    return userDto.phone_number;
  }
}