import { MockBuilder, MockInstance, MockRender } from "ng-mocks";
import { DataMapperService } from "./data-mapper.service"
import { StaticParamsService } from "../static-params/static-params.service";
import { createMock } from "@golevelup/ts-jest";
import { UserDto } from "../../models/user.dto";
import { DisplayName } from "../../enums/display-name.enum";
import { PrimaryContact } from "../../enums/primary-contact.enum";
import { CreditCardDto } from "../../models/credit-card.dto";

describe('DataMapperService', () => {
  let service: DataMapperService;

  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(DataMapperService)
      .mock(StaticParamsService)
  })

  function setup(): void {
    service = MockRender(DataMapperService).point.componentInstance;
  }

  describe('when mapping to a user', () => {
    const mock = createMock<UserDto>({
      uid: 'foo',
      first_name: 'bar',
      last_name: 'baz',
      phone_number: 'qux',
      email: 'quux'
    });

  
    MockInstance.scope();

    it('should map a user according to the default mapping', () => {

    })
  
    it('should map a user with the name as first_name', () => {

    })
    it('should map a user with the name as last_name', () => {

    })
    it('should map a user with the primary contact as email', () => {

    })
  })

  describe('when mapping to a credit card', () => {
    const mock = createMock<CreditCardDto>({ uid: 'foo' });
  
    MockInstance.scope();

    it('should map to a credit card', () => {

    })
  })
})