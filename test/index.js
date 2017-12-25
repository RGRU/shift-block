import Rx from 'rxjs'
import screenViewer from 'screen-viewer'

describe('Модуль shiftBlock.', () => {
  describe('# Метод getModuleName.', () => {
    it('Получить имя модуля.', () => {
      const shiftBlock = require('../src/scripts/lib/shift-block').default

      expect(shiftBlock.getModuleName()).to.equal('ShiftBlock')
    })
  })

  describe('# Перемещение блоков.', () => {
    const activeAttrLabel = 'data-is-show'

    screenViewer.setup({
      map: {
        '768': 'mobile',
        '990': 'tablet',
        '1260': 'tabletLandscape',
        '1760': 'desktop'
      },
      default: 'desktopFull'
    });

    [
      {
        type: 'mobile',
        screen: 750,
        tmpl: `
            <div id="testUnit" class="shift" data-shift-id="test" data-shift-type="mobile"></div>
            <div class="shift" data-shift-id="test" data-shift-type="tablet desktop"></div>
            <div ${activeAttrLabel} class="shift" data-shift-id="test" data-shift-type="tabletLandscape"></div>
            <div class="shift" data-shift-id="test" data-shift-type="desktopFull"></div>
        `
      },
      {
        type: 'tablet',
        screen: 800,
        tmpl: `
            <div class="shift" data-shift-id="test" data-shift-type="mobile"></div>
            <div id="testUnit" class="shift" data-shift-id="test" data-shift-type="tablet desktop"></div>
            <div ${activeAttrLabel} class="shift" data-shift-id="test" data-shift-type="tabletLandscape"></div>
            <div class="shift" data-shift-id="test" data-shift-type="desktopFull"></div>
        `
      },
      {
        type: 'tabletLandscape',
        screen: 1000,
        tmpl: `
            <div class="shift" data-shift-id="test" data-shift-type="mobile"></div>
            <div class="shift" data-shift-id="test" data-shift-type="tablet desktop"></div>
            <div ${activeAttrLabel} id="testUnit" class="shift" data-shift-id="test" data-shift-type="tabletLandscape"></div>
            <div class="shift" data-shift-id="test" data-shift-type="desktopFull"></div>
        `
      },
      {
        type: 'desktop',
        screen: 1300,
        tmpl: `
            <div class="shift" data-shift-id="test" data-shift-type="mobile"></div>
            <div id="testUnit" class="shift" data-shift-id="test" data-shift-type="tablet desktop"></div>
            <div ${activeAttrLabel} class="shift" data-shift-id="test" data-shift-type="tabletLandscape"></div>
            <div class="shift" data-shift-id="test" data-shift-type="desktopFull"></div>
        `
      },
      {
        type: 'desktopFull',
        screen: 1800,
        tmpl: `
            <div class="shift" data-shift-id="test" data-shift-type="mobile"></div>
            <div class="shift" data-shift-id="test" data-shift-type="tablet desktop"></div>
            <div ${activeAttrLabel} class="shift" data-shift-id="test" data-shift-type="tabletLandscape"></div>
            <div id="testUnit" class="shift" data-shift-id="test" data-shift-type="desktopFull"></div>
        `
      }
    ].forEach(item => {
      let { type, screen, tmpl } = item

      // Определяем тест
      it(`Блок с типом ${type}. По-умолчанию активный tabletLandscape`, () => {
        // Подключаем заново блок, чтобы инициализировать
        const shiftBlock = require('../src/scripts/lib/shift-block').default

        const contentEl = document.createElement('div')

        contentEl.setAttribute('id', 'content')

        document.body.appendChild(contentEl)

        // Добавляем нужный шаблон
        document.getElementById('content').innerHTML = tmpl

        // Инициализируем модуль
        shiftBlock.init({
          screen$: screenViewer.init$([ Rx.Observable.of(screen) ])
        })

        // Проверяем, добавился ли аттрибут активного блока в ожидаемом месте
        expect(document.getElementById('testUnit').hasAttribute(activeAttrLabel)).to.be.true

        // Подчищаем за собой для следующей итерации
        document.body.removeChild(contentEl)
      })
    })

    it('Цепочка перемещений: tablet -> mobile -> desktop', done => {
      const screen$ = screenViewer.init$([
        // Создаем поток, который через определенную задержку выстреливает значения
        Rx.Observable
          .of(null)
          .merge(
            Rx.Observable.timer(100).mapTo(800),
            Rx.Observable.timer(200).mapTo(320),
            Rx.Observable.timer(300).mapTo(1300)
          )
      ])

      const shiftBlock = require('../src/scripts/lib/shift-block').default

      const tmpl = `
        <div class="shift" data-shift-id="test" data-shift-type="mobile"></div>
        <div class="shift" data-shift-id="test" data-shift-type="tablet"></div>
        <div class="shift" data-shift-id="test" data-shift-type="tabletLandscape" ${activeAttrLabel}></div>
        <div class="shift" data-shift-id="test" data-shift-type="desktop"></div>
        <div class="shift" data-shift-id="test" data-shift-type="desktopFull"></div>
        `

      const contentEl = document.createElement('div')

      contentEl.setAttribute('id', 'content')

      document.body.appendChild(contentEl)

      // Добавляем нужный шаблон
      document.getElementById('content').innerHTML = tmpl

      // Инициализируем модуль
      shiftBlock.init({
        screen$
      })

      // Слушаем изменение экрана
      // и проверяем смещение шифтера
      screen$.subscribe(info => {
        const activeElType = document.querySelector(`[${activeAttrLabel}]`).getAttribute('data-shift-type')

        expect(activeElType).to.equal(info.type)

        console.log('Обрабатываем тест цепочки, экран: ' + info.width)

        if (activeElType === 'desktop') {
          done()
        }
      })
    })
  })
})
