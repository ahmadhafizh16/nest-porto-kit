import { HttpException, HttpStatus } from '@nestjs/common';

export class ParentTransformer {
  private response: Object = {}
  transform(data: any): any {}

  transformArray(data: Array<any>, transformerClass): Array<ParentTransformer> | Array<Object> {
    this.checkInstanceOfTransformerClass(transformerClass)

    return data.map((item) => transformerClass.transform(item));
  }

  loadHasMany(data, relationName: string, transformerClass: any): void {
    this.checkInstanceOfTransformerClass(transformerClass)

    if (data[relationName]) {
      this.response[relationName] = this.transformArray(data[relationName], transformerClass);
    }
  }

  loadHasOne(data, relationName: string, transformerClass: any): void {
    this.checkInstanceOfTransformerClass(transformerClass)

    if (data[relationName]) {
      this.response[relationName] = transformerClass.transform(data[relationName]);
    }
  }

  buildResponse (dataToTransform: object): object {
    return {
      ...dataToTransform,
      ...this.response,
    };
  }

  private checkInstanceOfTransformerClass(transformerClass) {
    if (!(transformerClass instanceof ParentTransformer)) {
      throw new HttpException('Invalid transformer class', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
