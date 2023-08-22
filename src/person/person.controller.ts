import { Controller } from '@nestjs/common';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { GrpcMethod } from '@nestjs/microservices';
import { FindOneRequest } from './interfaces/findone.interface';
import { Person } from './interfaces/person.interface';

@Controller()
export class PersonController {
    @GrpcMethod('PersonsService', 'FindOne') // FindOne is optional
    findOne(data: FindOneRequest, metadata: Metadata, call: ServerUnaryCall<any, any>): Person {
        const items = [
            { id: 1, name: 'John alex' },
            { id: 2, name: 'Doe ferg' },
        ];
        return items.find(({ id }) => id === data.id);
    }
}
