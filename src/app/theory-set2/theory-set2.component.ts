import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { HighlightModule } from 'ngx-highlightjs';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-spec-set2',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatExpansionModule,
    MatButtonModule,
    MatTabsModule,
    HighlightModule,
  ],
  templateUrl: './theory-set2.component.html',
})
export class TheorySet2Component {
  readonly MockBuilderCode = ` // Component mock
  beforeEach(() => {
    return MockBuilder(MyComponent);
  });

  // Service mock
  beforeEach(() => {
    return MockBuilder(MyService);
  });

  // Pipe mock
  beforeEach(() => {
    return MockBuilder(MyPipe);
  });

  // Directive mock
  beforeEach(() => {
    return MockBuilder(MyDirective);
  });
  `;

  readonly MockBuilderTSCode = `  export class MyComponent {
    title = 'My title';
    subtitle = 'A random subtitle...'
  }`;
  readonly MockBuilderHTMLCode = `  <mat-toolbar>{{title}}</mat-toolbar>
  {{subtitle}}
  `;
  readonly MockBuilderSPECCode = `  describe('MyComponent', () => {
    beforeEach(() => {
      return MockBuilder(MyComponent);
    });

    it('should render the HTML', () => {
      expect(MockRender.nativeElement).toEqual(\`
        <my-component>
          <mat-toolbar>
            My title
          </mat-toolbar>
          A random subtitle... 
          <br />
          Some text here... 
        </my-component>
    \`)
    })
  })`;

  readonly MockBuilderKeepTSCode = ` MyService implements OnInit {
    constructor(private fb: FormBuilder) { }
  
    profileForm!: FormGroup;
  
    ngOnInit(): void {
      this.profileForm = this.fb.group({
        firstName: ['My First Name', Validators.required],
        lastName: ['My Last Name'],
        address: this.fb.group({
          street: ['My Stress'],
          city: ['My City'],
          state: ['My State'],
          zip: ['My Zip Code']
        }),
      });
    } `;
  readonly MockBuilderKeepHTMLCode = `  <div formGroupName="address">
    <h2>Address</h2>

    <label for="street">Street: </label>
    <input id="street" type="text" formControlName="street">

    <label for="city">City: </label>
    <input id="city" type="text" formControlName="city">

    <label for="state">State: </label>
    <input id="state" type="text" formControlName="state">

    <label for="zip">Zip Code: </label>
    <input id="zip" type="text" formControlName="zip">
  </div>
  `;
  readonly MockBuilderKeepSPECCode = `  describe('MyComponent', () => {
    let fixture: MockedComponentFixture<MyComponent>;
    const initialForm = { "address": { "city": "My City", "state": "My State", "street": "My Stress", "zip": "My Zip Code" }, "firstName": "My First Name", "lastName": "My Last Name" };
  
    describe('without the .keep', () => {
      beforeEach(() => {
        return MockBuilder(MyComponent)
          .keep(FormBuilder)
      })

      beforeEach(() => {
        fixture = MockRender(MyComponent);
      })
    
      it('should render the initial values of the form', () => {
        /*
         * This spec will produce the error: "TypeError: Cannot read properties of undefined (reading 'getRawValue')"
         * This is because fb will return undefined when called.
         */
        expect(fixture.point.componentInstance.profileForm.getRawValue()).toEqual(initialForm)
      })
    })

    describe('with the .keep', () => {
      beforeEach(() => {
        return MockBuilder(MyComponent)
          .keep(FormBuilder)
      })

      beforeEach(() => {
        fixture = MockRender(MyComponent);
      })
    
      it('should render the initial values of the form', () => {
        // This spec will return true
        expect(fixture.point.componentInstance.profileForm.getRawValue()).toEqual(initialForm)
      })
    })
  })`;

  readonly MockBuilderMockTSCode = `  @Injectable()
  export class MyService {
    
    baz = 'BAZ';

    public fooGenerator(): string {
      return 'FOO';
    }
    
    public barGenerator(): string {
      return 'BAR';
    }
  }
  
  @Component({
    selector: 'my-component',
    standalone: true,
    providers: [
      { provide: CUSTOM_TOKEN, useValue: 'A token value' },
      MyService
    ],
  })
  export class MyComponent {
    constructor(
      @Inject(CUSTOM_TOKEN) public tokenValue: string,
      private readonly myService: MyService,
    ) {}

    getFoo(): string {
      return this.myService.fooGenerator();
    }
  }`;
  readonly MockBuilderMockHTMLCode = `  {{ tokenValue }}`;
  readonly MockBuilderMockSPECCode = `  describe('MyComponent', () => {
    let fixture: MockedComponentFixture<MyComponent>;
    let component: MyComponent;
    const token = 'A mocked token value';
  
    beforeEach(() => {
      return MockBuilder(MyComponent)
        .mock(CUSTOM_TOKEN, token)
        .mock(MyService, () => ({
          fooGenerator: jest.fn().mockReturnValue('ALFA');
          barGenerator: jest.fn();
          baz: 'BAZ';
        }))
    })
  
    beforeEach(() => {
      fixture = MockRender(MyComponent);
      component = fixture.point.componentInstance;
    })
  
    it('should render the initial values of the form', () => {
      expect(fixture.nativeElement.innerHTML).toMatch(/mocked token/)
    })

    it('should return value defined in the service mock', () => {
      expect(component.getFoo()).toEqual('ALFA');
    })
  })`;
  
  readonly MockRenderCode = `  describe('MyComponent', () => {
    let fixture: MockedComponentFixture<MyComponent>;
  
    beforeEach(() => {
      return MockBuilder(MyComponent)
    })
  
    beforeEach(() => {
      fixture = MockRender(MyComponent);
    })
  })
  `;

  readonly MockRenderInputsTSCode = ` export class MyComponent {
    @Input() inputOne = 'foo';
    @Input() inputTwo = 'bar';
    @Input() inputThree = 'baz';
  }
  `;
  readonly MockRenderInputsHTMLCode = `  <div class="input1">{{ inputOne }}</div>
  <div class="input2">{{ inputTwo }}</div>
  <div class="input3">{{ inputThree }}</div>
  `;
  readonly MockRenderInputsSPECCode = ` describe('MyComponent', () => {
    let fixture: MockedComponentFixture<MyComponent, Partial<{ inputOne: string, inputTwo: string, inputThree: string }>>
  
    beforeEach(() => {
      return MockBuilder(MyComponent)
    })
  
    it('should render the initial input values', () => {
      fixture = MockRender(MyComponent, { });
  
      expect(fixture.debugElement.query(By.css('.input1')).nativeElement.innerHTML).toEqual('foo');
      expect(fixture.debugElement.query(By.css('.input2')).nativeElement.innerHTML).toEqual('bar');
      expect(fixture.debugElement.query(By.css('.input3')).nativeElement.innerHTML).toEqual('baz');
  
      // OR
  
      expect(fixture.nativeElement).toMatchSnapshot();
    })
  
    it('should render values has undefined when none are passed to the MockRender', () => {
      fixture = MockRender(MyComponent);
  
      expect(fixture.debugElement.query(By.css('.input1')).nativeElement.innerHTML).toEqual('');
      expect(fixture.debugElement.query(By.css('.input2')).nativeElement.innerHTML).toEqual('');
      expect(fixture.debugElement.query(By.css('.input3')).nativeElement.innerHTML).toEqual('');
  
      // OR
  
      expect(fixture.nativeElement).toMatchSnapshot();
    })
  })`;

  readonly MockRenderInputsChangeTSCode = ` export class MyComponent {
    @Input() inputOne = 'foo';
    @Input() inputTwo = 'bar';
    @Input() inputThree = 'baz';
  }
  `;
  readonly MockRenderInputsChangeHTMLCode = `  <div class="input1">{{ inputOne }}</div>
  <div class="input2">{{ inputTwo }}</div>
  <div class="input3">{{ inputThree }}</div>
  `;
  readonly MockRenderInputsChangeSPECCode = ` describe('MyComponent', () => {
    let fixture: MockedComponentFixture<MyComponent, Partial<{ inputOne: string, inputTwo: string, inputThree: string }>>;
  
    beforeEach(() => {
      return MockBuilder(MyComponent)
    })
  
    it('should update the input value', () => {
      fixture = MockRender(MyComponent, { });
  
      expect(fixture.debugElement.query(By.css('.input1')).nativeElement.innerHTML).toEqual('foo');
  
      fixture.componentInstance.inputOne = 'alfa';
      // We run a new change detection cycle
      fixture.detectChanges();
  
      expect(fixture.debugElement.query(By.css('.input1')).nativeElement.innerHTML).toEqual('alfa');
    })
  })`;

  readonly MockRenderOutputsTSCode = `  export class MyComponent {
    @Output() clickChange = new EventEmitter<string>();
  
    onClick(): void {
      this.clickChange.emit('A click ocurred');
    }
  }
  `;
  readonly MockRenderOutputsHTMLCode = `   <button (click)="onClick()"></button>`;
  readonly MockRenderOutputsSPECCode = `  describe('MyComponent', () => {
    let fixture: MockedComponentFixture<MyComponent, { clickChange: any }>;
  
    beforeEach(() => {
      return MockBuilder(MyComponent)
    })
  
    it('should update the input value', () => {
      const clickSpy = jest.fn();
      fixture = MockRender(MyComponent, { clickChange: clickSpy });
  
      fixture.point.componentInstance.onClick();
  
      expect(clickSpy).toHaveBeenCalledTimes(1);
      expect(clickSpy).toHaveBeenCalledWith('A click ocurred');
    })
  })`;

  readonly MockRenderChangeDetectionTSCode = `  @Component({
    selector: 'my-component',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class MyComponent implements OnInit {
    text = 'foo';
  
    ngOnInit(): void {
      this.text = 'bar'
    }
  }`;
  readonly MockRenderChangeDetectionHTMLCode = `  <div class="text">{{ text }}</div>`;
  readonly MockRenderChangeDetectionSPECCode = `  describe('MyComponent', () => {
    let fixture: MockedComponentFixture<MyComponent>;
  
    beforeEach(() => {
      return MockBuilder(MyComponent)
    })
  
    it('should render the initial input values', () => {
      fixture =  MockRender(MyComponent, undefined, false);
  
      // We don't find any text since without change detection the HTML is not filled
      expect(fixture.debugElement.query(By.css('.text')).nativeElement.innerHTML).toEqual('');
      
      fixture.detectChanges();
  
      expect(fixture.debugElement.query(By.css('.text')).nativeElement.innerHTML).toEqual('bar');
    })
  })`;

  readonly MockInstanceTSCode = `  @Injectable()
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
    constructor(private readonly myService: MyAlfaService) {}
  
    getFooFromService(): string {
      return this.myService.foo;
    }
  
    getBarFromService(): string {
      return this.myService.getBar();
    }
  
    getBazFromService(): string {
      return this.myService.getBaz();
    }
  }
  `;
  readonly MockInstanceSPECCode = `  describe('MyBetaService', () => {
    let fixture: MockedComponentFixture<MyBetaService>;
    let service: MyBetaService;
  
    beforeEach(() => {
      return MockBuilder(MyBetaService)
        .mock(MyAlfaService);
    })
  
    function setup(): void {
      fixture = MockRender(MyBetaService);
      service = fixture.point.componentInstance;
    }
   
    it('sets a mock on a specific method', () => {
      MockInstance(MyAlfaService, 'getBar', jest.fn().mockReturnValue('alfa'));
  
      setup();
  
      expect(service.getFooFromService()).toBeUndefined();
      expect(service.getBarFromService()).toEqual('alfa');
      expect(service.getBazFromService()).toBeUndefined();
    })
  
    it('sets mocks on specific methods without losing past mocks a specific property', () => {
      MockInstance(MyAlfaService, 'getBar', jest.fn().mockReturnValue('alfa'));
      MockInstance(MyAlfaService, 'getBaz', jest.fn().mockReturnValue('beta'));
  
      setup();
  
      expect(service.getFooFromService()).toBeUndefined();
      expect(service.getBarFromService()).toEqual('alfa');
      expect(service.getBazFromService()).toEqual('beta');
    })
  })`;

  readonly MockInstanceMultipleTSCode = `  import { Component, Injectable, OnInit } from "@angular/core";

  @Injectable()
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
    constructor(private readonly myService: MyAlfaService) {}
  
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
  readonly MockInstanceMultipleSPECCode = `  describe('MyBetaService', () => {
    let fixture: MockedComponentFixture<MyBetaService>;
    let service: MyBetaService;
  
    MockInstance.scope();
  
    beforeEach(() => {
      MockInstance(MyAlfaService, () => ({
        getBar: jest.fn().mockReturnValue('alfa'),
        getBaz: jest.fn().mockReturnValue('beta'),
      }));
    })
  
    beforeEach(() => {
      return MockBuilder(MyBetaService)
        .mock(MyAlfaService);
    })
  
    function setup(): void {
      fixture = MockRender(MyBetaService);
      service = fixture.point.componentInstance;
    }
  
    it('with the default mock', () => {
      setup();
  
      expect(service.getFooFromService()).toBeUndefined();
      expect(service.getBarFromService()).toEqual('alfa');
      expect(service.getBazFromService()).toEqual('beta');
    })
  
    it('overrides part of the default mock', () => {
      MockInstance(MyAlfaService, 'getBaz', jest.fn().mockReturnValue('gamma'));
  
      setup();
  
      expect(service.getFooFromService()).toBeUndefined();
      expect(service.getBarFromService()).toEqual('alfa');
      expect(service.getBazFromService()).toEqual('gamma');
    })
  })`;


  readonly MockInstanceScopeTSCode = `  @Injectable()
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
    constructor(private readonly myService: MyAlfaService) {}
  
    getFooFromService(): string {
      return this.myService.foo;
    }
  
    getBarFromService(): string {
      return this.myService.getBar();
    }
  
    getBazFromService(): string {
      return this.myService.getBaz();
    }
  }
  `;
  readonly MockInstanceScopeSPECCode = `  describe('MyBetaService', () => {
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
  
    it('with the default mock', () => {
      setup();
  
      expect(service.getFooFromService()).toBeUndefined();
      expect(service.getBarFromService()).toEqual('alfa');
      expect(service.getBazFromService()).toBeUndefined();
    })
  
    it('adds a new mock without losing the default mock', () => {
      MockInstance(MyAlfaService, 'getBaz', jest.fn().mockReturnValue('beta'));
  
      setup();
  
      expect(service.getFooFromService()).toBeUndefined();
      expect(service.getBarFromService()).toEqual('alfa');
      expect(service.getBazFromService()).toEqual('beta');
    })
  
    it('overriding the default mock', () => {
      MockInstance(MyAlfaService, 'getBar', jest.fn().mockReturnValue('gamma'));
      setup();
  
      expect(service.getFooFromService()).toBeUndefined();
      expect(service.getBarFromService()).toEqual('gamma');
      expect(service.getBazFromService()).toBeUndefined();
    })
  })`;

  readonly MockInstanceMultipleScopeTSCode = `  @Injectable()
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
    constructor(private readonly myService: MyAlfaService) {}
  
    getFooFromService(): string {
      return this.myService.foo;
    }
  
    getBarFromService(): string {
      return this.myService.getBar();
    }
  
    getBazFromService(): string {
      return this.myService.getBaz();
    }
  }
  `;
  readonly MockInstanceMultipleScopeSPECCode = `  describe('MyBetaService', () => {
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
  
    describe('with foo mocked', () => {
      MockInstance.scope();
  
      beforeEach(() => {
        MockInstance(MyAlfaService, 'foo', 'theta');
      })
  
      it('with chained scopes', () => {
        setup();
    
        expect(service.getFooFromService()).toEqual('theta');
        expect(service.getBarFromService()).toEqual('alfa');
        expect(service.getBazFromService()).toBeUndefined();
      })
    })
  
    describe('with foo undefined', () => {
      it('with chained scopes', () => {
        setup();
    
        expect(service.getFooFromService()).toBeUndefined();
        expect(service.getBarFromService()).toEqual('alfa');
        expect(service.getBazFromService()).toBeUndefined();
      })
    })
  })`;
}

