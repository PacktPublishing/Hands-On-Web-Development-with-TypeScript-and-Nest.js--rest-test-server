import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

// transform pipe
@Injectable()
export class IdentifyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // do not transform like this or will conflict with Mongoose
    // value._id = uuid();
    return value;
  }
}
