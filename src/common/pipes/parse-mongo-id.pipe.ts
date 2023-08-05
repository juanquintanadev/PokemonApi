import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {



  transform(value: string, metadata: ArgumentMetadata) {

    // si no es un valid mongo id
    if( !isValidObjectId(value) ) {
      throw new BadRequestException(`${value} is not a valid mongo id`);
    } 

    // si pasa la validacion entonces es un mongo id y lo retornamos
    return value;
  }


}
