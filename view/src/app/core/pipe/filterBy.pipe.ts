import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(collection: Array<'s'>, property: string, val: string): any {
        if (!collection) {
            return null;
        }

        const groupedCollection = collection.reduce((previous, current) => {
            if (!previous[current[property]]) {
                previous[current[property]] = [current];
            } else {
                previous[current[property]].push(current);
            }

            return previous;
        }, {});

        let x: any;
        //console.log('collection', collection);
        if (property !== undefined) {
            x = Object.keys(groupedCollection).map(key => (
                { key, value: groupedCollection[key] }
            ));
            if (val === '') {
                x = x.filter((a) => a.key === val);
            } else {
                x = x.filter((a) => a.key !== '');
            }
        }
       // console.log('filter', x[0].value);
        return x[0].value;
    }
}
