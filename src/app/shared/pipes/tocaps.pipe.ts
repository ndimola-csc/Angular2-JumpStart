import { Pipe } from 'angular2/core';

@Pipe({ name: 'tocaps' })
export class CapitalizeAllPipe {

  transform(value: any) {
	  if (value) {
      	return value.toUpperCase();
	  }
	  return value;
  }

}