import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-spec-set3',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatExpansionModule,
    MatButtonModule,
    MatTabsModule,
    HighlightModule
  ],
  templateUrl: './theory-set3.component.html',
})
export class TheorySet3Component {
 readonly ngMockUtilitiesGetTSCode = ` @Injectable()
  export class MyAlfaService {
    foo = 'foo';
  
    getBar(): string {
      return 'bar';
    }
  
    getBaz(): string {
      return 'baz';
    }
  }
  
  @Injectable()
  export class MyBetaService {
    constructor(private readonly myService: MyAlfaService) { }
  
    getFooFromService(): string {
      return this.myService.foo;
    }
  
    getBarFromService(): string {
      return this.myService.getBar();
    }
  
    getBazFromService(): string {
      return this.myService.getBaz();
    }
  }`;
 readonly ngMockUtilitiesGetSPECCode = `  describe('MyBetaService', () => {
    let fixture: MockedComponentFixture<MyBetaService>;
    let service: MyBetaService;

    MockInstance.scope();

    beforeEach(() => {
      MockInstance(MyAlfaService, 'getBar', jest.fn().mockReturnValue('alfa'));
    })

    beforeEach(() => {
      return MockBuilder(MyBetaService)
        .mock(MyAlfaService);
    })

    function setup(): void {
      fixture = MockRender(MyBetaService);
      service = fixture.point.componentInstance;
    }

    it('checking the number of calls on a service', () => {
      const alfaSpy = ngMocks.get(MyAlfaService).getBar;
    
      setup();

      expect(service.getFooFromService()).toBeUndefined();
      expect(service.getBarFromService()).toEqual('alfa');
      expect(service.getBazFromService()).toBeUndefined();
      expect(alfaSpy).toHaveBeenCalledTimes(1);
    })

    it('the same spec without the resetting the mocks', () => {
      const alfaSpy = ngMocks.get(MyAlfaService).getBar;
    
      setup();

      expect(service.getFooFromService()).toBeUndefined();
      expect(service.getBarFromService()).toEqual('alfa');
      expect(service.getBazFromService()).toBeUndefined();
      expect(alfaSpy).toHaveBeenCalledTimes(1);
    })
  })`;

  readonly ngMockUtilitiesGetPart2TSCode = `  @Component({
    selector: 'app-my-component',
    templateUrl: './my-component.html',
    standalone: true,
    providers: [
      MyService
    ]
  })
  export class MyComponent {
    constructor(private readonly elementRef: ElementRef) { }
  }`;
 readonly ngMockUtilitiesGetPart2SPECCode = `  describe('MyComponent', () => {
    let fixture: MockedComponentFixture<MyComponent>;
    let service: MyComponent;

    MockInstance.scope();

    beforeEach(() => {
      return MockBuilder(MyComponent);
    })

    function setup(): void {
      fixture = MockRender(MyComponent);
      service = fixture.point.componentInstance;
    }

    it('should allow for spies to be added', () => {
      setup();
      const elementRefInstance = ngMocks.get(fixture.point, ElementRef)

      expect(elementRefInstance).toBeTruthy();
    })
  })`;

  readonly ngMockUtilitiesFindTSCode = `  @Injectable()
  export class MyService {
    foo = 'foo';
  
    getBar(): string {
      return 'bar';
    }
  
    getBaz(): string {
      return 'baz';
    }
  }
  
  @Component({
    selector: 'app-my-component',
    templateUrl: './my-component.html',
    standalone: true,
    providers: [
      MyService
    ]
  })
  export class MyComponent implements OnInit {
    constructor(private readonly myService: MyService) { }
  
    foo!: string;
    bar!: string;
    baz!: string;
  
    ngOnInit(): void {
      this.foo = this.myService.foo;
      this.bar = this.myService.getBar();
      this.baz = this.myService.getBaz();
    }
  }`;
  readonly ngMockUtilitiesFindHTMLCode = `  <div class="foo-class">{{ foo }}</div>
  <span>{{ bar }}</span>
  `
  readonly ngMockUtilitiesFindSPECCode = `  describe('MyComponent', () => {
    let fixture: MockedComponentFixture<MyComponent>;
    let component: MyComponent;
    let page: Page;

    // This is a pattern recommended by the Angular Docs.
    // We can ignore it and place the queries directly in each spec, but we may end-up with repeated queries.
    class Page {
      constructor(private readonly fixture: MockedComponentFixture<MyComponent>) {}

      getFooText(): string {
        return ngMocks.find('.foo-class').nativeElement.innerHTML;
      }

      getBarText(): string {
        return ngMocks.find('span').nativeElement.innerHTML;
      }
    }
    MockInstance.scope();

    beforeEach(() => {
      MockInstance(MyService, 'getBar', jest.fn().mockReturnValue('alfa'));
    })

    beforeEach(() => {
      return MockBuilder(MyComponent)
        .mock(MyService);
    })

    function setup(): void {
      fixture = MockRender(MyComponent);
      component = fixture.point.componentInstance;
      page = new Page(fixture);
    }

    it('checking the value of all html elements', () => { 
      setup();

      expect(page.getFooText()).toEqual('');
      expect(page.getBarText()).toEqual('alfa');
    })
  })`;

  readonly ngMockUtilitiesClickTSCode = `  @Injectable()
  export class MyService {
    foo = 'foo';
  
    getBar(): string {
      return 'bar';
    }
  
    getBaz(): string {
      return 'baz';
    }
  }
  
  @Component({
    selector: 'app-my-component',
    templateUrl: './my-component.html',
    standalone: true,
    providers: [
      MyService
    ]
  })
  export class MyComponent implements OnInit {
    constructor(private readonly myService: MyService) { }
  
    foo!: string;
    bar!: string;
    baz!: string;
    private isBar = true;
  
    ngOnInit(): void {
      this.foo = this.myService.foo;
      this.bar = this.myService.getBar();
      this.baz = this.myService.getBaz();
    }
  
    onClick(): void {
      this.bar = this.isBar ? this.myService.getBaz() : this.myService.getBar();
      this.isBar = !this.isBar;
    }
  }`;
  readonly ngMockUtilitiesClickHTMLCode = `  <div class="foo-class">{{ foo }}</div>
  <button (click)="onClick()">{{ bar }}</button>  
  `
  readonly ngMockUtilitiesClickSPECCode = `  describe('MyComponent', () => {
    let fixture: MockedComponentFixture<MyComponent>;
    let component: MyComponent;
    let page: Page;
  
    class Page {
      constructor(private readonly fixture: MockedComponentFixture<MyComponent>) {}
  
      getFooText(): string {
        return ngMocks.find('.foo-class').nativeElement.innerHTML;
      }
  
      getButtonText(): string {
        return ngMocks.find('button').nativeElement.innerHTML;
      }
  
      clickButton(): void {
        ngMocks.click('button');
        this.fixture.detectChanges();
      }
  
    }
    MockInstance.scope();
  
    beforeEach(() => {
      MockInstance(MyService, 'getBar', jest.fn().mockReturnValue('alfa'));
      MockInstance(MyService, 'getBaz', jest.fn().mockReturnValue('beta'));
    })
  
    beforeEach(() => {
      return MockBuilder(MyComponent)
        .mock(MyService);
    })
  
    function setup(): void {
      fixture = MockRender(MyComponent);
      component = fixture.point.componentInstance;
      page = new Page(fixture);
    }
  
    it('checking the value of all html elements', () => { 
      setup();
  
      expect(page.getButtonText()).toEqual('alfa');
  
      page.clickButton();
   
      expect(page.getButtonText()).toEqual('beta');
    })
  })`;

  readonly ngMockUtilitiesTriggerTSCode = `  @Injectable()
  export class MyService {
    foo = 'foo';
  
    getBar(): string {
      return 'bar';
    }
  
    getBaz(): string {
      return 'baz';
    }
  }
  
  @Component({
    selector: 'app-my-component',
    templateUrl: './my-component.html',
    standalone: true,
    providers: [
      MyService
    ]
  })
  export class MyComponent implements OnInit {
    constructor(private readonly myService: MyService) { }
  
    foo!: string;
    bar!: string;
    baz!: string;
    private isBar = true;
  
    ngOnInit(): void {
      this.foo = this.myService.foo;
      this.bar = this.myService.getBar();
      this.baz = this.myService.getBaz();
    }
  
    onClick(): void {
      this.bar = this.isBar ? this.myService.getBaz() : this.myService.getBar();
      this.isBar = !this.isBar;
    }
  }`;
  readonly ngMockUtilitiesTriggerHTMLCode = `  <div class="foo-class">{{ foo }}</div>
  <button (click)="onClick()">{{ bar }}</button>  
  `
  readonly ngMockUtilitiesTriggerSPECCode = `  describe('MyComponent', () => {
  let fixture: MockedComponentFixture<MyComponent>;
  let component: MyComponent;
  let page: Page;

  class Page {
    constructor(private readonly fixture: MockedComponentFixture<MyComponent>) {}

    getFooText(): string {
      return ngMocks.find('.foo-class').nativeElement.innerHTML;
    }

    getButtonText(): string {
      return ngMocks.find('button').nativeElement.innerHTML;
    }

    clickButton(): void {
      ngMocks.trigger('button', 'click');
      this.fixture.detectChanges();
    }

  }
  MockInstance.scope();

  beforeEach(() => {
    MockInstance(MyService, 'getBar', jest.fn().mockReturnValue('alfa'));
    MockInstance(MyService, 'getBaz', jest.fn().mockReturnValue('beta'));
  })

  beforeEach(() => {
    return MockBuilder(MyComponent)
      .mock(MyService);
  })

  function setup(): void {
    fixture = MockRender(MyComponent);
    component = fixture.point.componentInstance;
    page = new Page(fixture);
  }

  it('checking the value of all html elements', () => { 
    setup();

    expect(page.getButtonText()).toEqual('alfa');

    page.clickButton();
 
    expect(page.getButtonText()).toEqual('beta');
  })
  })`;

  readonly ngMockUtilitiesOutputTSCode = `  @Component({
    selector: 'app-my-component',
    templateUrl: './my-component.html',
    standalone: true,
    imports: [
      MatSlideToggleModule
    ]
  })
  export class MyComponent {
    foo: string = 'bar';
  
    onToggleChange(event: MatToggleChange): void {
      this.foo = event.checked ? 'bar : 'baz;
    }
  }`;
  readonly ngMockUtilitiesOutputHTMLCode = `  <div class="foo-class">{{ foo }}</div>
  <mat-slide-toggle (change)="onToggleChange($event)"></mat-slide-toggle> 
  `
  readonly ngMockUtilitiesOutputSPECCode = `  describe('MyComponent', () => {
    let fixture: MockedComponentFixture<MyComponent>;
    let component: MyComponent;
    let page: Page;

    class Page {
      constructor(private readonly fixture: MockedComponentFixture<MyComponent>) {}

      getFooText(): string {
        return ngMocks.find('.foo-class').nativeElement.innerHTML;
      }
    
      toggleSlider(value: boolean): void {
        ngMocks.output('mat-slide-toggle', 'change').emit(value);
      }

    }
    MockInstance.scope();

    beforeEach(() => {
      return MockBuilder(MyComponent));
    })

    function setup(): void {
      fixture = MockRender(MyComponent);
      component = fixture.point.componentInstance;
      page = new Page(fixture);
    }

    it('should change the value according to the slide toggle', () => { 
      setup();

      expect(page.getFooText()).toEqual('bar');

      page.toggleSlider(false);
  
      expect(page.getFooText()).toEqual('baz');
    })
  })`;

  readonly ngMockUtilitiesWhenStableTSCode = `  @Injectable()
  export class MyService {
  
    async getFoo(): Promise<string> {
      return new Promise((resolves) => {
        resolves('alfa')
      })
    }
  }
  
  @Component({
    selector: 'app-my-component',
    templateUrl: './my-component.html',
    standalone: true,
    providers: [
      MyService
    ]
  })
  export class MyComponent implements OnInit {
    constructor(private readonly myService: MyService) { }
  
    foo!: string;
  
    async ngOnInit(): Promise<void> {
      try {
        this.foo = await this.myService.getFoo();
      } catch {
        this.foo = 'Oops... Error...'
      }
    }
  }`;
  readonly ngMockUtilitiesWhenStableHTMLCode = `  <div class="foo-class">{{ foo }}</div>
  `
  readonly ngMockUtilitiesWhenStableSPECCode = `  describe('MyComponent', () => {
    let fixture: MockedComponentFixture<MyComponent>;
    let component: MyComponent;
    let page: Page;
  
    class Page {
      constructor(private readonly fixture: MockedComponentFixture<MyComponent>) {}
  
      getFooText(): string {
        this.fixture.detectChanges();
        return ngMocks.find('.foo-class').nativeElement.innerHTML;
      }
    }
    MockInstance.scope();
  
    beforeEach(() => {
      return MockBuilder(MyComponent)
        .mock(MyService);
    })
  
    function setup(): void {
      fixture = MockRender(MyComponent);
      component = fixture.point.componentInstance;
      page = new Page(fixture);
    }
  
    it('while the promise is pending', () => { 
      setup();
      expect(page.getFooText()).toEqual('');
    })
  
    it('when the promise is resolved successfully', async () => { 
      MockInstance(MyService, 'getFoo', jest.fn().mockResolvedValue('alfa'));
  
      setup();
      await fixture.whenStable();
  
      expect(page.getFooText()).toEqual('alfa');
    })
  
    it('when the promise is rejected', async () => { 
      MockInstance(MyService, 'getFoo', jest.fn().mockRejectedValue('alfa'));
  
      setup();
      await fixture.whenStable();
  
      expect(page.getFooText()).toEqual('Oops... Error...');
    })
  })`;

  public readonly ngMockUtilitiesFakeAsyncTSCode = `  @Injectable()
  export class MyService {
  
    getFoo(): Observable<string> {
      return of('alfa');
    }
  }
  
  @Component({
    selector: 'app-my-component',
    templateUrl: './my-component.html',
    standalone: true,
    providers: [
      MyService
    ]
  })
  export class MyComponent implements OnInit {
    constructor(private readonly myService: MyService) { }
  
    foo!: string;
  
    async ngOnInit(): Promise<void> {
      try {
        this.foo = await firstValueFrom(this.myService.getFoo());
      } catch {
        this.foo = 'Oops... Error...'
      }
    }
  }`;
  public readonly ngMockUtilitiesFakeAsyncHTMLCode = `  <div class="foo-class">{{ foo }}</div>`;
  public readonly ngMockUtilitiesFakeAsyncSPECCode = `  describe('MyComponent', () => {
    let fixture: MockedComponentFixture<MyComponent>;
    let component: MyComponent;
    let page: Page;
  
    class Page {
      constructor(private readonly fixture: MockedComponentFixture<MyComponent>) {}
  
      getFooText(): string {
        this.fixture.detectChanges();
        return ngMocks.find('.foo-class').nativeElement.innerHTML;
      }
    }
    MockInstance.scope();
  
    beforeEach(() => {
      return MockBuilder(MyComponent)
        .mock(MyService);
    })
  
    function setup(): void {
      fixture = MockRender(MyComponent);
      component = fixture.point.componentInstance;
      page = new Page(fixture);
    }
  
    it('while the promise from an observable is pending', () => { 
      setup();
      expect(page.getFooText()).toEqual('');
    })
  
    it('when the promise from an observable is resolved successfully', fakeAsync(async () => { 
      MockInstance(MyService, 'getFoo', jest.fn().mockReturnValue(of('alfa')));
  
      setup();
      await fixture.whenStable();
  
      expect(page.getFooText()).toEqual('alfa');
    }))
  
    it('when the promise from an observable is rejected', fakeAsync(async () => { 
      MockInstance(MyService, 'getFoo', jest.fn().mockRejectedValue(of('alfa')));
  
      setup();
      await fixture.whenStable();
  
      expect(page.getFooText()).toEqual('Oops... Error...');
    }))
  })`;
  
  public readonly ngMockUtilitiesNativeElementTSCode = `  @Component({
    selector: 'my-component',
    templateUrl: './my-component.html',
    standalone: true,
  })
  export class MyComponent implements OnInit {
    text = 'foo';
  
    ngOnInit(): void {
      this.text = 'bar'
    }
  };
  `;
  public readonly ngMockUtilitiesNativeElementHTMLCode = `  <div class="text">{{ text }}</div>`;
  public readonly ngMockUtilitiesNativeElementSPECCode = `  describe('MyComponent', () => {
    let fixture: MockedComponentFixture<MyComponent>;
    let component: MyComponent;
  
    beforeEach(() => {
      return MockBuilder(MyComponent)
    })
  
    function setup(): void {
      fixture = MockRender(MyComponent, undefined, false);
      component = fixture.point.componentInstance;
      fixture.detectChanges();
    }
    it('should render the initial input values', () => {
      setup();
      
      expect(fixture.nativeElement).toMatchSnapshot();
    })
  })`;
}
