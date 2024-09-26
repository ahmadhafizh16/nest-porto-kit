import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

export class FileHelper {
  /**
   *
   * @param uploadDir upload dir target
   * @returns
   */
  static uploadToDisk(uploadDir?: string) {
    let fileDest = `./${process.env.LOCAL_UPLOAD_PATH || 'uploads'}`;

    if (uploadDir) {
      fileDest = `${fileDest}/${uploadDir}`;
    }

    return {
      storage: diskStorage({
        destination: fileDest,
        filename: this.generateFileName,
      }),
    };
  }

  static getFileLocal(filePath?: string): string {
    return `${process.env.BASE_URL || 'http://localhost:' + process.env.PORT}${filePath}`
  }

  static generateFileName(req, file, cb) {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    cb(null, `${name}-${randomName}${extension}`);
  }

  /**
   *
   * @param fileExt Filter uploaded file extension
   * @param fileSize File size in MB
   * @returns
   */
  static validator(fileExt?: string | RegExp, fileSize: number = 1) {
    return new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: fileExt,
      })
      .addMaxSizeValidator({
        maxSize: 1024 * 1024 * fileSize,
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      });
  }
}
