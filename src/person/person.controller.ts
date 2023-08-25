import { Controller } from '@nestjs/common';
import { Metadata, ServerDuplexStream, ServerUnaryCall } from '@grpc/grpc-js';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { FindOneRequest, HelloRequest, HelloResponse, Person, PersonsServiceController } from './interfaces/person';
import { Observable, Subject } from 'rxjs';

@Controller()
export class PersonController implements PersonsServiceController {

  @GrpcStreamMethod('PersonsService', 'BidiHello')
  bidiHello(messages: Observable<HelloRequest>, metadata: Metadata, call: ServerDuplexStream<any, any>): Observable<any> {
    const subject = new Subject();

    const onNext = message => {
      console.log(message);
      subject.next({
        reply: 'Hello, world!'
      });
    };
    const onComplete = () => subject.complete();
    messages.subscribe({
      next: onNext,
      complete: onComplete,
    });


    return subject.asObservable();
  }

  lotsOfGreetings(request: Observable<HelloRequest>, metadata: Metadata, call: ServerDuplexStream<any, any>): HelloResponse | Observable<HelloResponse> | Promise<HelloResponse> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod('PersonsService', 'FindOne') // FindOne is optional
  findOne(data: FindOneRequest, metadata: Metadata, call: ServerUnaryCall<any, any>): Person {
    const items = [
      { id: 1, name: 'John alex' },
      { id: 2, name: 'Doe ferg' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
