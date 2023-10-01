import { MockBuilder, MockInstance, MockRender, MockedComponentFixture, ngMocks } from "ng-mocks"
import { WidgetComponent } from "./widget.component"
import { DataMapperService } from "./services/data-mapper/data-mapper.service";
import { FacadeService } from "./services/facade/facade.service";
import { GlobalStateService } from "./mocks/global-state.service";
import { createMock } from "@golevelup/ts-jest";
import { User } from "./models/user.model";
import { UserDto } from "./models/user.dto";

describe('WidgetComponent', () => {
  let fixture: MockedComponentFixture<WidgetComponent>;
  let component: WidgetComponent;

  function setup(): void {
  }

  describe('when the component is initializing', () => {
    it('should display a loading spinner', () => {

    })
  })

  describe('when the component has finished loading', () => {
    const userDto = createMock<UserDto>({ uid: 'foo' });
    const user = createMock<User>({ uid: 'bar' });
  
    async function loadedSetup(): Promise<void> {

    }

    it('should display the table with the data', async() => {

    })

    it('should resize the grid columns when the grid ready', async () => {
      const gridReadyEvent = { api: { sizeColumnsToFit: jest.fn() }}
    

    })

    describe('when a row is clicked', () => {
      it('should store the toggle value when the credit card is toggled', async () => {

      })

      it('should update the selected user when a row is clicked', async () => {

      })
    
      it('should deselect the selected user when the same row is clicked twice', async () => {

      })
    })
  })
})