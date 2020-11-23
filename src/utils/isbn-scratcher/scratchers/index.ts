import * as dree from 'dree';
import * as path from 'path';
import { Scratcher } from '..';

export default function(): Scratcher[] {
    const scratchers: Scratcher[] = [];

    dree.scan(path.join(__dirname, 'scratchers'), { extensions: ['js'] }, file => {
        if (file.name.includes('.scratcher')) {
            scratchers.push(require(file.path).scratcher);
        }
    });

    return scratchers;
}