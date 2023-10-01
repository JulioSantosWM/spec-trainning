import { DisplayName } from "../../enums/display-name.enum";
import { STATIC_PARAMS } from "../../mocks/static-params.mock";
import { StaticParamsService } from "./static-params.service";
import { MockBuilder, MockInstance, MockRender } from "ng-mocks";

describe('StaticParamsService', () => {


  describe('with no valid static params', () => {

  })

  describe('with valid static params', () => {
    const staticParams = {
      primaryContactType: 'email',
      displayNameType: DisplayName.FirstName,
      expandedDetails: false,
    }
  
  })
})