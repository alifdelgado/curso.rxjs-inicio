import { of } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';
import { catchError, map, pluck } from 'rxjs/operators';

const url = 'https://api.github.com/userXXXs?per_page=5';
const manejaErrores = (response: Response) => {
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
};

const atraparError = (err: AjaxError) => {
    console.warn('error en: ', err.message);
    return of([]);
};

const fetchPromesa = fetch(url);
// fetchPromesa
//     .then(response => response.json())
//     .then(data => console.log('data: ', data))
//     .catch(err => console.warn('error en usuarios: ', err));

// fetchPromesa
//     .then(manejaErrores)
//     .then(response => response.json())
//     .then(data => console.log('data: ', data))
//     .catch(err => console.warn('error en usuarios: ', err));

ajax(url)
    .pipe(
        // map(resp => resp.response)
        pluck('response'),
        catchError(atraparError)
    )
    .subscribe(users => console.log('usuarios: ', users));