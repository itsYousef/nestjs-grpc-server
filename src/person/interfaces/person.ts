/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "person";

/** person/person.proto */

export interface FindOneRequest {
  id: number;
}

export interface Person {
  id: number;
  name: string;
}

export interface HelloRequest {
  greeting: string;
}

export interface HelloResponse {
  reply: string;
}

export const PERSON_PACKAGE_NAME = "person";

export interface PersonsServiceClient {
  findOne(request: FindOneRequest, metadata: Metadata, ...rest: any): Observable<Person>;

  bidiHello(request: Observable<HelloRequest>, metadata: Metadata, ...rest: any): Observable<HelloResponse>;

  lotsOfGreetings(request: Observable<HelloRequest>, metadata: Metadata, ...rest: any): Observable<HelloResponse>;
}

export interface PersonsServiceController {
  findOne(request: FindOneRequest, metadata: Metadata, ...rest: any): Promise<Person> | Observable<Person> | Person;

  bidiHello(request: Observable<HelloRequest>, metadata: Metadata, ...rest: any): Observable<HelloResponse>;

  lotsOfGreetings(
    request: Observable<HelloRequest>,
    metadata: Metadata,
    ...rest: any
  ): Promise<HelloResponse> | Observable<HelloResponse> | HelloResponse;
}

export function PersonsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("PersonsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["bidiHello", "lotsOfGreetings"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("PersonsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PERSONS_SERVICE_NAME = "PersonsService";
