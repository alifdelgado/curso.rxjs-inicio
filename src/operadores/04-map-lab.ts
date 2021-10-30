import { fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const texto = document.createElement('div');
texto.innerHTML = `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex earum molestiae distinctio minima accusantium perspiciatis iure inventore. Nemo, odio quasi non error ex magni at ab dolorem natus doloribus officia.
<br><br>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex earum molestiae distinctio minima accusantium perspiciatis iure inventore. Nemo, odio quasi non error ex magni at ab dolorem natus doloribus officia.
<br><br>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex earum molestiae distinctio minima accusantium perspiciatis iure inventore. Nemo, odio quasi non error ex magni at ab dolorem natus doloribus officia.
<br><br>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex earum molestiae distinctio minima accusantium perspiciatis iure inventore. Nemo, odio quasi non error ex magni at ab dolorem natus doloribus officia.
`;

const body = document.querySelector('body');
const progressBar = document.createElement('div');
body.append(texto);
progressBar.classList.add('progress-bar');
body.append(progressBar);

const scroll$ = fromEvent(document, 'scroll');
// scroll$.subscribe(console.log);
const calcularProcentajeScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target.documentElement;
    return (scrollTop / (scrollHeight - clientHeight)) * 100;
};

const progress = scroll$.pipe(
    map(calcularProcentajeScroll),
    tap(console.log)
);
progress.subscribe(porcentaje => {
    progressBar.style.width = `${porcentaje}%`;
})