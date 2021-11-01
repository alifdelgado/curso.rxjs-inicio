import { from } from 'rxjs';
import { reduce, scan, map } from 'rxjs/operators';

const numeros = [1,2,3,4,5];
const totalAcumulador = (acc, cur) => acc + cur;

from(numeros)
    .pipe(
        reduce(totalAcumulador, 0)
    )
    .subscribe(console.log);

from(numeros)
    .pipe(
        scan(totalAcumulador, 0)
    )
    .subscribe(console.log);

interface Usuario {
    id?: string;
    autenticado?: boolean;
    token?: string;
    edad?: number;
};

const user: Usuario[] = [
    { id: 'spike', autenticado: false, token: null },
    { id: 'spike', autenticado: true, token: 'ABC' },
    { id: 'spike', autenticado: true, token: 'ABC123' },
];

const state$ = from(user).pipe(
            scan((acc, cur) => {
                return {...acc, ...cur}
            }, {edad:33})
        );

const id$ = state$.pipe(
    map(state => state)
);

id$.subscribe(console.log);