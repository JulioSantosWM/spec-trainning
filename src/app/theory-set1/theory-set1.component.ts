import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { HighlightModule } from 'ngx-highlightjs';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-spec-set1',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatExpansionModule,
    MatTabsModule,
    MatButtonModule,
    HighlightModule,
  ],
  templateUrl: './theory-set1.component.html',
})
export class TheorySet1Component {
  readonly JestMatchersToBeToEqualTSCode = `export class MyClass {
    object1 = {
      alfa: 'foo',
      beta: 'bar',
      gamma: {
        one: 'baz',
        two: 'qux'
      }
    };
  
    object2 = {
      alfa: 'foo',
      beta: 'bar',
      gamma: {
        one: 'baz',
        two: 'qux'
      }
    };
  
    object3 = {
      alfa: 'foo',
      beta: 'bar',
      gamma: {
        one: 'baz',
        two: 'qux'
      },
      theta: undefined
    };

    primitive1 = 'This is a raw string';
    primitive2 = 'This is a raw string';
  }`;
  readonly JestMatchersToBeToEqualSPECCode = `  describe('MyClass', () => {
    let instance: MyClass;
  
    beforeEach(() => {
      instance = new MyClass();
    })
    it('should confirm Object1 is different from Object2', () => {
      expect(instance.object1).not.toBe(instance.object2);
    })
  
    it('should confirm primitive1 is primitive2', () => {
      expect(instance.primitive1).toBe(instance.primitive2);
      expect(instance.primitive1).toEqual(instance.primitive1);
    })
  
    it('should confirm Object1 is different from Object2', () => {
      expect(instance.object1).toEqual(instance.object2);
    })
  
    it('should confirm Object1 is not strictly equal to Object2', () => {
      expect(instance.object1).toEqual(instance.object3);
      expect(instance.object1).not.toStrictEqual(instance.object3);
    })
  })`;

  readonly JestMatchersToMatchTSCode = `  export class MyClass {
    primitive1 = 'This is a raw string';
    primitive2 = 'This is a raw string';
  }`;
  readonly JestMatchersToMatchSPECCode = `  describe('MyClass', () => {
    let instance: MyClass;
  
    beforeEach(() => {
      instance = new MyClass();
    })
    it('should confirm primitive1 contains the word "string"', () => {
      expect(instance.primitive1).toMatch(/string/);
    })
  })`;

  readonly JestMatchersToContainTSCode = `  export class MyClass {
    object1 = {
      alfa: 'foo',
      beta: 'bar',
      gamma: {
        one: 'baz',
        two: 'qux'
      }
    };
  
    object2 = {
      alfa: 'foo',
      beta: 'bar',
      gamma: {
        one: 'baz',
        two: 'qux'
      }
    };
  
    object3 = {
      alfa: 'foo',
      beta: 'bar',
      gamma: {
        one: 'baz',
        two: 'qux'
      },
      theta: undefined
    };

    objects = [
      this.object1, this.object2, this.object3
    ];
  }`;
  readonly JestMatchersToContainSPECCode = `  describe('MyClass', () => {
    let instance: MyClass;
  
    beforeEach(() => {
      instance = new MyClass();
    })
    it('should confirm that the array contains object3', () => {
      expect(instance.objects).toContain(instance.object3);
    })
  })`;

  readonly JestMatchersExceptionTSCode = `  export class MyClass {
    throwExceptionMethod(): void {
      throw new Error('An Error');
    }
  }`;
  readonly JestMatchersExceptionSPECCode = `  describe('MyClass', () => {
    let instance: MyClass;
  
    beforeEach(() => {
      instance = new MyClass();
    })
    it('should thrown an error when calling a method that throws an error', () => {
      expect(() => instance.throwExceptionMethod()).toThrow('An Error')
      expect(() => instance.throwExceptionMethod()).toThrow(/Error/)
    })
  })`;

  readonly JestMatchersSnapshotTSCode = `  export class MyClass {
    object1 = {
      alfa: 'foo',
      beta: 'bar',
      gamma: {
        one: 'baz',
        two: 'qux'
      }
    };
  
    object2 = {
      alfa: 'foo',
      beta: 'bar',
      gamma: {
        one: 'baz',
        two: 'qux'
      }
    };
  
    object3 = {
      alfa: 'foo',
      beta: 'bar',
      gamma: {
        one: 'baz',
        two: 'qux'
      },
      theta: undefined
    };
  
    objects = [
      this.object1, this.object2, this.object3
    ];
  }`;
  readonly JestMatchersSnapshotSPECCode = `  describe('MyClass', () => {
    let instance: MyClass;
  
    beforeEach(() => {
      instance = new MyClass();
    })
    it('should match the snapshot for all objects', () => {
      expect(instance.objects).toMatchSnapshot()
    })
  })`;

  readonly JestMatchersSnapshotFileCode = ` exports['MyClass should match the snapshot for all objects 1'] = '
  [
    {
      "alfa": "foo",
      "beta": "bar",
      "gamma": {
        "one": "baz",
        "two": "qux",
      },
    },
    {
      "alfa": "foo",
      "beta": "bar",
      "gamma": {
        "one": "baz",
        "two": "qux",
      },
    },
    {
      "alfa": "foo",
      "beta": "bar",
      "gamma": {
        "one": "baz",
        "two": "qux",
      },
      "theta": undefined,
    },
  ]
  ';
  `;

  readonly JestMatchersSpyOnTSCode = `  export class MyService {
    methodFromService(arg: string): string {
      return arg + ' World';
    }
  }
  
  export class MyClass {
    constructor(private readonly myService: MyService) {}
  
    method(arg = 'Hello'): string {
      return this.myService.methodFromService(arg);
    }
  }`;
  readonly JestMatchersSpyOnSPECCode = `  describe('MyClass', () => {
    let instance: MyClass;
    let dependency: MyService;
  
    beforeEach(() => {
      dependency = new MyService();
      instance = new MyClass(dependency);
    })
  
    it('setting a spy on a method', () => {
      expect(instance.method()).toEqual('Hello World');
  
      jest.spyOn(dependency, 'methodFromService').mockReturnValue('Hi there');
      
      expect(instance.method()).toEqual('Hi there');
      expect(instance.method()).toEqual('Hi there');
    })
  })`;

  readonly JestMatchersFnTSCode = `  export class MyService {
    methodFromService(arg: string): string {
      return arg + ' World';
    }
  }

  export class MyClass {
    constructor(private readonly myService: MyService) {}

    method(arg = 'Hello'): string {
      return this.myService.methodFromService(arg);
    }
  }`;
  readonly JestMatchersFnSPECCode = `  describe('MyClass', () => {
    let instance: MyClass;
    let dependency: MyService;
  
    beforeEach(() => {
      dependency = new MyService();
      instance = new MyClass(dependency);
    })
  
    it('replacing a method implementation with a spy', () => {
      expect(instance.method()).toEqual('Hello World');
  
      dependency.methodFromService = jest.fn().mockReturnValue('Hi there');
      
      expect(instance.method()).toEqual('Hi there');
      expect(instance.method()).toEqual('Hi there');
    })
  })`;

  readonly JestMatchersAsyncTSCode = `  export class MyService {
    async methodFromService(arg: string): Promise<string> {
      return new Promise((resolve) => {
        resolve(arg + ' World')
      });
    }
  }
  
  export class MyClass {
    constructor(private readonly myService: MyService) {}
  
    async method(arg = 'Hello'): Promise<string> {
      return await this.myService.methodFromService(arg);
    }
  }`;
  readonly JestMatchersAsyncSPECCode = `  describe('MyClass', () => {
    let instance: MyClass;
    let dependency: MyService;
  
    beforeEach(() => {
      dependency = new MyService();
      instance = new MyClass(dependency);
    })
  
    it('successfully resolving a promise', async () => {
      await expect(instance.method()).resolves.toEqual('Hello World');
  
      dependency.methodFromService = jest.fn().mockResolvedValue('Hi there');
      
      await expect(instance.method()).resolves.toEqual('Hi there');
      await expect(instance.method()).resolves.toEqual('Hi there');
    })
  
    it('failure resolving a promise', async () => {
      await expect(instance.method()).resolves.toEqual('Hello World');
  
      dependency.methodFromService = jest.fn().mockRejectedValue('Oops... Failure...');
      
      await expect(instance.method()).rejects.toEqual('Oops... Failure...');
      await expect(instance.method()).rejects.toEqual('Oops... Failure...');
    })
  })`;

  readonly JestMatchersCountingCallsTSCode = `  export class MyService {
    methodFromService(arg: string): string {
      return arg + ' World';
    }
  }

  export class MyClass {
    constructor(private readonly myService: MyService) {}

    method(arg = 'Hello'): string {
      return this.myService.methodFromService(arg);
    }
  }`;
  readonly JestMatchersCountingCallsSPECCode = `  describe('MyClass', () => {
    let instance: MyClass;
    let dependency: MyService;
  
    beforeEach(() => {
      dependency = new MyService();
      instance = new MyClass(dependency);
    })
  
    it('counting the number of calls on a spied method', () => {
      expect(instance.method()).toEqual('Hello World');
  
      const spy = jest.spyOn(dependency, 'methodFromService');
      
      expect(instance.method()).toEqual('Hello World');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(instance.method()).toEqual('Hello World');
      expect(spy).toHaveBeenCalledTimes(2);
    })
  })`;

  readonly JestMatchersVerifyArgTSCode = `  export class MyService {
    methodFromService(arg: string): string {
      return arg + ' World';
    }
  }

  export class MyClass {
    constructor(private readonly myService: MyService) {}

    method(arg = 'Hello'): string {
      return this.myService.methodFromService(arg);
    }
  }`;
  readonly JestMatchersVerifyArgSPECCode = `  describe('MyClass', () => {
    let instance: MyClass;
    let dependency: MyService;
  
    beforeEach(() => {
      dependency = new MyService();
      instance = new MyClass(dependency);
    })
  
    it('verifying the arguments passed to a spied spied method', () => {
      expect(instance.method()).toEqual('Hello World');
  
      const spy = jest.spyOn(dependency, 'methodFromService');
      
      expect(instance.method('Bye')).toEqual('Bye World');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('Bye');
      expect(instance.method('Salut')).toEqual('Salut World');
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith('Salut');
    })
  })`;

  readonly JestMatchersResettingTSCode = `  export class MyService {
    methodFromService(arg: string): string {
      return arg + ' World';
    }
  }

  export class MyClass {
    constructor(private readonly myService: MyService) {}

    method(arg = 'Hello'): string {
      return this.myService.methodFromService(arg);
    }
  }`;
  readonly JestMatchersResettingSPECCode = `  describe('MyClass', () => {
    let instance: MyClass;
    const dependency = new MyService();
    let spy: jest.SpyInstance<string, [arg: string], any>;
  
    beforeEach(() => {
      spy = jest.spyOn(dependency, 'methodFromService').mockReturnValue('Foo Bar Baz again...')
      instance = new MyClass(dependency);
      jest.clearAllMocks();
    })
  
    it('one spec with everything being checked', () => {    
      expect(instance.method('Bye')).toEqual('Foo Bar Baz again...');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('Bye');
      expect(instance.method('Salut')).toEqual('Foo Bar Baz again...');
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith('Salut');
    })
  
    it('another spec with everything being checked', () => {  
      expect(instance.method('Bye')).toEqual('Foo Bar Baz again...');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('Bye');
      expect(instance.method('Salut')).toEqual('Foo Bar Baz again...');
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith('Salut');
    })
  })`;
}

