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

  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(WidgetComponent)
      .mock(FacadeService)
      .mock(DataMapperService)
      .mock(GlobalStateService)
  })

  function setup(): void {
    fixture = MockRender(WidgetComponent);
    component = fixture.point.componentInstance;
  }

  describe('when the component is initializing', () => {
    it('should display a loading spinner', () => {
      setup();

      expect(fixture.nativeElement).toMatchSnapshot();
    })
  })

  describe('when the component has finished loading', () => {
    const userDto = createMock<UserDto>({ uid: 'foo' });
    const user = createMock<User>({ uid: 'bar' });
  
    MockInstance.scope();

    beforeEach(() => {
      MockInstance(FacadeService, 'getIsCCExpanded', jest.fn().mockResolvedValue(true));
      MockInstance(FacadeService, 'getUsers', jest.fn().mockResolvedValue([userDto]));
      MockInstance(DataMapperService, 'toUser', jest.fn().mockReturnValue(user));
    })

    async function loadedSetup(): Promise<void> {
      setup();
      await fixture.whenStable();
      fixture.detectChanges();
    }

    it('should display the table with the data', async() => {
      await loadedSetup();

      expect(fixture.nativeElement).toMatchSnapshot();
      expect(component.rowData).toEqual([user]);
    })

    it('should resize the grid columns when the grid ready', async () => {
      const gridReadyEvent = { api: { sizeColumnsToFit: jest.fn() }}
    
      await loadedSetup();

      ngMocks.output('ag-grid-angular', 'gridReady').emit(gridReadyEvent);

      expect(gridReadyEvent.api.sizeColumnsToFit).toHaveBeenCalledTimes(1);
    })

    describe('when a row is clicked', () => {
      it('should store the toggle value when the credit card is toggled', async () => {
        const spy = MockInstance(FacadeService, 'storeIsCCExpanded', jest.fn());

        await loadedSetup();
        
        ngMocks.output('ag-grid-angular', 'rowClicked').emit({ data: user });
        fixture.detectChanges();
        ngMocks.output('app-w-credit-card-details', 'onExpandCollapseChange').emit(true);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(true);
      })

      it('should update the selected user when a row is clicked', async () => {
        const spy = MockInstance(GlobalStateService, 'updateSelectedUser', jest.fn());

        await loadedSetup();
        
        ngMocks.output('ag-grid-angular', 'rowClicked').emit({ data: user });
        fixture.detectChanges();

        expect(fixture.nativeElement).toMatchSnapshot();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(user);
      })
    
      it('should deselect the selected user when the same row is clicked twice', async () => {
        const spy = MockInstance(GlobalStateService, 'updateSelectedUser', jest.fn());
  
        await loadedSetup();
          
        ngMocks.output('ag-grid-angular', 'rowClicked').emit({ data: user });
        fixture.detectChanges();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(user);
  
        ngMocks.output('ag-grid-angular', 'rowClicked').emit({ data: user });
        fixture.detectChanges();
  
        expect(fixture.nativeElement).toMatchSnapshot();
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenCalledWith(null);
      })
    })
  })
})