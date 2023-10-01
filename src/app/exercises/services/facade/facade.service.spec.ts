import { MockBuilder, MockInstance, MockRender } from "ng-mocks";
import { FacadeService } from "./facade.service"
import { CreditCardOpenApiService, TemporaryStoreService, UsersOpenApiService } from "../../mocks/facade.mock";
import { createMock } from "@golevelup/ts-jest";
import { UserDto } from "../../models/user.dto";
import { of } from "rxjs";
import { CreditCardDto } from "../../models/credit-card.dto";

describe('FacadeService', () => {
  let service: FacadeService;

  MockInstance.scope();

  function setup(): void {
    service = MockRender(FacadeService).point.componentInstance;
  }

  it('should get all users', async () => {

  })

  it('should get a user', async () => {

  })

  it('should get the primary credit card', async () => {

  })

  it('should get the available credit cards', async () => {

  })

  it('should get is credit cards expanded', async () => {

  })

  it('should store the is credit cards expanded', () => {

  })
})