import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

// transform pipe
@Injectable()
export class IdentifyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // add a ID property to the object value passed to the route handler
    value._id = uuid();
    return value;
  }
}
