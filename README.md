# Service Objects
> A small TypeScript library for defining, looking up and executing user defined service objects.

[![NPM Version][npm-image]][npm-url]
<!-- [![Build Status][travis-image]][travis-url] -->
[![Downloads Stats][npm-downloads]][npm-url]

![](header.png)

A service is a user defined class that implements the IService interface.

```typescript
export interface IService<T, U> {

    execute(context: IServiceContext<T>): U;
}
```

Additionally a service has a constructor interface.

```typescript
export interface IServiceConstructor {

    new(...args: any[]): IServiceInterface; 

    /**
     * Every service class has a static 
     * serviceName property
     */   
    serviceName: string;
}
```
This library defines an API for creating, storing, looking up and executing services. This is achieved with the help of service executors, service repositories and decorators.

```typescript
import { IExecutionContext, IServiceInterface, IServiceConstructor } from "@alstradocs/service-objects";

export interface IServiceExecutor {

    executeService<T, U>(context: IExecutionContext<T>): U
}

export interface IServiceRepository {

    get(serviceName: string): IServiceInterface;

    register(serviceName: string, serviceConstructor: IServiceConstructor): void;
}
```

## Installation

NPM:

```sh
npm install @alstradocs/service-objects --save
```

## Usage example

First you need a service. You can simply annotate a class with the @IsService decorator.

```typescript
import { IsService, IServiceContext } from "@alstradocs/service-objects";

interface BinaryOperands {
    firstOperand: number;
    secondOperand: number;
}

@IsService()
class AdditionService {

    public static serviceName = 'AdditionService';

    execute(context: IServiceContext<BinaryOperands>): number {
        let { firstOperand, secondOperand } = context.data;
        return firstOperand + secondOperand;
    }
}
```
Next you add your shining new service to an instance of IServiceRepository. Yes, you guessed it. It's a service datasource. You can use the default repository 
```typescript
import { ServiceRepository } from "@alstradocs/service-objects";

// Initialize service repo with just a single service ...
let serviceInfo = { 
        serviceName:AdditionService.serviceName, 
        serviceContructor: AdditionService 
};
let repository = new ServiceRepository([serviceInfo]);

// ... or add to existing repo
repository.register(AdditionService.serviceName, AdditionService);
```
Or you can implement your own repository 

```typescript
import { IsServiceRepository } from "@alstradocs/service-objects";

@IsServiceRepository()
export class MyServiceRepository {

    get(serviceName: string): IServiceInterface {
        ...
    }

    register(serviceName: string, serviceConstructor: IServiceConstructor): void {
        ...
    }
}
// ... Instantiate repo and add service
let repository = new MyServiceRepository();
repository.register(AdditionService.serviceName, AdditionService);
```

Finally to execute your service, you need an instance of IServiceExecutor. You pass 
the name of a service and its required params to executor. You can use the default
executor.

```typescript
import { ServiceRepository } from "@alstradocs/service-objects";

let repository = // initialize repo
// instantiate executor with given repo
let serviceExecutor = new ServiceExecutor(repository);
serviceExecutor.executeService(context);
```
Or you can implement your own executor 

```typescript
import { IsServiceExecutor } from "@alstradocs/service-objects";

@IsServiceExecutor()
export class MyServiceExecutor {
    
    executeService<T, U>(context: IExecutionContext<T>): U {
        ...
    }
}
// ... instantiate and execute (context contains all info required to execute a service)
let serviceExecutor = new MyServiceExecutor();
serviceExecutor.executeService(context);
```
Typically all the setup above (apart from the `serviceExecutor.executeService(context) line`) will be done once during app/script inititialization. You can then store the executor app/script wide and
make it available to execute services as needed.

_For more examples and usage, please refer to the source code._

## Release History

* 1.0.0
    * Work in progress

## Meta

AlstraDocs – [@AlstraDocs](https://twitter.com/alstradocs) – alstradocs@gmail.com\
Edward Banfa – [@EdwardBanfa](https://twitter.com/edwardbanfa) – ebanfa@gmail.com

Distributed under the Apache license. See ``LICENSE`` for more information.

[https://github.com/alstradocs/service-objects](https://github.com/alstradocs/)

## Readme Image
<a href='https://pngtree.com/so/robot-clipart'>robot clipart png from pngtree.com</a>
<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/@alstradocs/service-objects
[npm-url]: https://npmjs.org/package/@alstradocs/service-objects
[npm-downloads]: https://img.shields.io/npm/dw/@alstradocs/service-objects
[wiki]: https://github.com/yourname/yourproject/wiki
