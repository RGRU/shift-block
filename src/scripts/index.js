import { Observable } from 'rxjs/Rx'
import shiftBlock from './lib/shift-block'

// Make screen type observable from events
// ready and resize
const load$ = Observable.fromEvent(window, 'load')
const resize$ = Observable.fromEvent(window, 'resize')

// Merge to common observable
const screen$ = Observable
  .merge(
    load$,
    resize$
  )

  // Normalize width value
  .map(event => !event.target.innerWidth ? +window.innerWidth : +event.target.innerWidth)

  // For example, if width more than 768px, type is desktop, else - mobile
  .map(width => width > 800 ? { type: 'desktop' } : { type: 'mobile' })

// Init module
shiftBlock.init({
  screen$
})
