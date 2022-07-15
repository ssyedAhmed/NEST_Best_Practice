import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// @Injectable()
// export class FileImageInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> | any {
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//       return next(new Error('Only image files are allowed!'), false);
//     }
//     return next(null);
//   }
// }
export const FileImageTypeInterceptor = (req, file, callback) => {
  console.log('image => ', file);
  
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException('Only image files are allowed!', HttpStatus.FORBIDDEN),
      false,
    );
  }
  callback(null, true);
};

export const FilePDFTypeInterceptor = (req, file, callback) => {
  console.log('pdf => ', file);
  if (!file.originalname.match(/\.(pdf)$/)) {
    return callback(
      new HttpException('Only pdf files are allowed!', HttpStatus.FORBIDDEN),
      false,
    );
  }
  callback(null, true);
};
