import { DisplayName } from "../../enums/display-name.enum";
import { STATIC_PARAMS } from "../../mocks/static-params.mock";
import { StaticParamsService } from "./static-params.service";
import { MockBuilder, MockInstance, MockRender } from "ng-mocks";

describe('StaticParamsService', () => {
  let service: StaticParamsService;

  MockInstance.scope();

  beforeEach(() => MockBuilder(StaticParamsService)
    .mock(STATIC_PARAMS, {})
  );

  function setup(): void {
    service = MockRender(StaticParamsService).point.componentInstance;
  }

  describe('with no valid static params', () => {
    MockInstance.scope();

    beforeEach(() => {
      MockInstance(STATIC_PARAMS, () => null);
    })

    it('should throw an error when requesting the static params', () => {
      setup();
      expect(() => service.primaryContact).toThrowError('No primary contact set in StaticParams.')
    })

    it('should return the default display name value', () => {
      setup();
      expect(service.displayName).toEqual(DisplayName.FullName);
    })

    it('should return the default expanded details value', () => {
      setup();
      expect(service.expandedDetails).toEqual(false);
    })
  })

  describe('with valid static params', () => {
    const staticParams = {
      primaryContactType: 'email',
      displayNameType: DisplayName.FirstName,
      expandedDetails: false,
    }
  
    MockInstance.scope();

    beforeEach(() => {
      MockInstance(STATIC_PARAMS, () => staticParams as any);
    })

    it('should return the provided primaryContact', () => {
      setup();
      expect(service.primaryContact).toEqual(staticParams.primaryContactType)
    })

    it('should return the provided displayName', () => {
      setup();
      expect(service.displayName).toEqual(staticParams.displayNameType);
    })

    it('should return the provided expandedDetails', () => {
      setup();
      expect(service.expandedDetails).toEqual(staticParams.expandedDetails);
    })
  })
})