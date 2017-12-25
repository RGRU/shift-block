import shiftBlock from './lib/shift-block'
import { Observable } from 'rxjs/Rx'

const sc$ = Observable
  .fromEvent(window, 'resize')
  .map(event => +event.target.innerWidth > 800 ? { type: 'desktop' } : { type: 'mobile' })

shiftBlock.init({
  screen$: sc$
})
