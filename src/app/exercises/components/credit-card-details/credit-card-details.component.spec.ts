import { MockBuilder, MockInstance, MockRender, MockedComponentFixture, ngMocks } from "ng-mocks"
import { CreditCardDetailsComponent } from "./credit-card-details.component"
import { FacadeService } from "../../services/facade/facade.service";
import { GlobalStateService } from "../../mocks/global-state.service";
import { createMock } from "@golevelup/ts-jest";
import { User } from "../../models/user.model";
import { of } from "rxjs";
import { CreditCardDto } from "../../models/credit-card.dto";
import { fakeAsync, tick } from "@angular/core/testing";

interface Config { expanded?: boolean, onExpandCollapseChange?: jest.Mock };

describe('CreditCardDetailsComponent', () => {
  let fixture: MockedComponentFixture<CreditCardDetailsComponent, Config>;
  let component: CreditCardDetailsComponent;
  
  const mockUser = { uid: 'foo' } as User;
  const mockCreditCardDetails = {
    credit_card_type: 'bar', credit_card_number: 'baz', credit_card_expiry_date: 'qux'
  } as CreditCardDto;

  MockInstance.scope();

  describe('when initializing the component', () => {
    MockInstance.scope();

    it('should not view the spinner if the card is collapsed', () => {

    })
    it('should view the spinner if the card is expanded', () => {

    })
  })

  describe('when the component has loaded', () => {
    MockInstance.scope();

    it('should not view the credit card details if the card is collapsed', fakeAsync(async () => {

    }))

    it('should view the credit card details if the card is expanded', fakeAsync(async () => {

    }))

    it('should the information to its parent when the expand/collapse button is clicked', fakeAsync(async () => {

    }))
  })
})