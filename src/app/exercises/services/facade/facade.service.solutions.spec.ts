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

  beforeEach(() => {
    return MockBuilder(FacadeService)
      .mock(UsersOpenApiService)
      .mock(CreditCardOpenApiService)
      .mock(TemporaryStoreService)
  });

  function setup(): void {
    service = MockRender(FacadeService).point.componentInstance;
  }

  it('should get all users', async () => {
    const mock = createMock<UserDto>({uid: 'foo'});
    const spy = MockInstance(UsersOpenApiService, 'getUsers', jest.fn().mockReturnValue(of([mock])));
    
    setup();

    const promise = service.getUsers();

    expect(promise).resolves.toEqual([mock]);
    expect(spy).toHaveBeenCalledTimes(1);
  })

  it('should get a user', async () => {
    const mock = createMock<UserDto>({uid: 'foo'});
    const spy = MockInstance(UsersOpenApiService, 'getUser', jest.fn().mockReturnValue(of(mock)));
    
    setup();

    const promise = service.getUserDetails('bar');

    expect(promise).resolves.toEqual(mock);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('bar');
  })

  it('should get the primary credit card', async () => {
    const mock = createMock<CreditCardDto>({uid: 'foo'});
    const spy = MockInstance(CreditCardOpenApiService, 'getPrimaryCreditCard', jest.fn().mockReturnValue(of(mock)));
    
    setup();

    const promise = service.getPrimaryCreditCard('bar');

    expect(promise).resolves.toEqual(mock);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('bar');
  })

  it('should get the available credit cards', async () => {
    const mock = createMock<CreditCardDto>({uid: 'foo'});
    const spy = MockInstance(CreditCardOpenApiService, 'getAvailableCreditCards', jest.fn().mockReturnValue(of([mock])));
    
    setup();

    const promise = service.getAvailableCreditCards('bar');

    expect(promise).resolves.toEqual(mock);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('bar');
  })

  it('should get is credit cards expanded', async () => {
    const spy = MockInstance(TemporaryStoreService, 'getStoredInformation', jest.fn().mockReturnValue(of([true])));
    
    setup();

    const promise = service.getIsCCExpanded();

    expect(promise).resolves.toEqual(true);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('cc_details_expanded')
  })

  it('should store the is credit cards expanded', () => {
    const spy = MockInstance(TemporaryStoreService, 'storeInformation', jest.fn().mockReturnValue(of([true])));
    
    setup();

    service.storeIsCCExpanded(true);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('cc_details_expanded', true)
  })
})