import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupBy' })
export class GroupByPipe implements PipeTransform {
    transform(collection: Array<'s'>, property: string): Array<'s'> {
        // prevents the application from breaking if the array of objects doesn't exist yet
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

        // this will return an array of objects, each object containing a group of objects
      //  console.log('collection', collection);
        let x: any;
        if (property !== undefined) {
            x = Object.keys(groupedCollection).map(key => (
                { key, value: groupedCollection[key] }
            ));
           // x = x.filter((a) => a.key !== '' && a.key !== 'undefined');
           // x = x.filter((a) => a.key !== '' && a.key !== 'undefined');
        }
        // return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
     //  console.log('collection group by', x);
        return x;
    }
}
