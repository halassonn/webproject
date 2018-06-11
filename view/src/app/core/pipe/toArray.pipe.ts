import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toArray' })
// tslint:disable-next-line:class-name
export class toArrayPipe implements PipeTransform {
    transform(value, args: string[]): any {
        let keys = [];
        // tslint:disable-next-line:forin
        for (let key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    }
}
