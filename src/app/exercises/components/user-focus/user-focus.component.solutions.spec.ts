import { MockBuilder, MockInstance, MockRender, MockedComponentFixture } from "ng-mocks"
import { UserFocusComponent } from "./user-focus.component"
import { User } from "../../models/user.model";
import { createMock } from "@golevelup/ts-jest";

describe('UserFocusComponent', () => {
  let fixture: MockedComponentFixture<UserFocusComponent, { user: User }>;
  let component: UserFocusComponent;

  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(UserFocusComponent)
  })

  function setup(user: User): void {
    fixture = MockRender(UserFocusComponent, { user: user } );
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  }

  it('should match the snapshot', async () => {
    const mock = createMock<User>({
      name: 'foo',
      date_of_birth: '1970/01/01',
      avatar: 'http://foo.com',
      address: {
        street_name: 'foo',
        city: 'bar',
        zip_code: 'baz',
        state: 'qux',
        country: 'quux'
      }
    })

    setup(mock);
    await fixture.whenStable();

    expect(fixture.nativeElement).toMatchSnapshot();
  })
})