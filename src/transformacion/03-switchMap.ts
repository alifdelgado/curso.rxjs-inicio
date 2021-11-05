import { Observable, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, debounceTime, pluck, mergeMap, switchMap } from 'rxjs/operators';
import { GithubUser } from '../interfaces/github-user.interface';
import { GithubUsersResp } from '../interfaces/github-users.interface';

const body = document.querySelector('body');
const textInput = document.createElement('input');
const orderList = document.createElement('ol');
body.append(textInput, orderList);

const mostrarUsuarios = (usuarios: GithubUser[]) => {
    orderList.innerHTML = '';
    for(const usuario of usuarios) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const anchor = document.createElement('a');
        img.src = usuario.avatar_url;
        anchor.href = usuario.html_url;
        anchor.text = 'Ver página';
        anchor.target = '_blank';
        li.append(img);
        li.append(`${usuario.login} ' '`);
        li.append(anchor);
        orderList.append(li);
    }
};

const input$ = fromEvent<KeyboardEvent>(textInput, 'keyup');
input$
    .pipe(
        debounceTime<KeyboardEvent>(500),
        // pluck('target', 'value'),
        map<KeyboardEvent, string>(evento => evento.target['value']),
        mergeMap<string, Observable<GithubUsersResp>>(texto => ajax.getJSON(`https://api.github.com/search/users?q=${texto}`)),
        map<GithubUsersResp, GithubUser[]>(data => data.items)
    );
    // .subscribe(mostrarUsuarios);
const url = 'https://httpbin.org/delay/1?arg=';
input$
    .pipe(
        pluck('target', 'value'),
        switchMap(texto => ajax.getJSON(`${url}${texto}`))
    ).subscribe(console.log);