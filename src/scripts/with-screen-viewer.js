import { Observable } from 'rxjs/Rx'
import screenViewer from 'screen-viewer'
import shiftBlock from './lib/shift-block'

screenViewer.setup({
  map: {
    '768': 'mobile',
    '990': 'tablet',
    '1260': 'tabletLandscape',
    '1760': 'desktop'
  },
  default: 'desktopFull'
})

const screen$ = screenViewer
  .init$([

    Observable
      .fromEvent(window, 'load')
      .map(() => window.innerWidth),

    Observable
      .fromEvent(window, 'resize')
      .map(event => event.target.innerWidth)

  ])

// Init module
shiftBlock.init({
  screen$
})
