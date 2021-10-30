import { asyncScheduler, of, range, observeOn } from 'rxjs';

// const src$ = range(1,6, asyncScheduler);
const src$ = range(1,6).pipe(observeOn(asyncScheduler));

console.log('inicio');
src$.subscribe(console.log);
console.log('fin');