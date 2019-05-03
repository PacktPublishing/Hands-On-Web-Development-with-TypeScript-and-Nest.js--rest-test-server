import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class NameValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (value.length >= 2) { return value; }

        throw new BadRequestException('Cryptocurrency name should be at least two characters');
    }
}
