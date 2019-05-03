import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class IdentifyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value._id = uuid();
    return value;
  }
}
