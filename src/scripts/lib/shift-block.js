// @flow

/**
 * @fileOverview Module for auto shift of elements for adaptive sites
 *
 * @author Alex | RG team
 */

import { Observable } from 'rxjs/Rx'

/**
 * Module name
 * Имя модуля
 * @type {String}
 */
const __name__: string = 'ShiftBlock'

/**
 * Options as default for module
 * Параметры по-умолчанию
 *
 * @type {Object}
 */
const __options__: {
    hot: boolean,
    blocksSelector: string,
    showAttr: string,
    idBlockAttr: string,
    screenTypeAttr: string,
} = {

  // Find processed blocks every time
  // or once on first init
  //
  // Ищем обрабатываемые блоки каждый раз, при измененнии экрана
  // или только раз при инициализации
  hot: false,

  // selector for processing block
  //
  // селектор для обрабатываемых блоков
  blocksSelector: '.shift',

  // attribute for active block
  // (module add it for block)
  //
  // аттрибут, который добавляется к активному, для данного типа экрана, блоку
  showAttr: 'data-is-show',

  // ID for searching blocks of the same type
  //
  // аттрибут в который передается идентификатор для одного типа блока
  idBlockAttr: 'data-shift-id',

  // store list screen type current block
  //
  // в значении аттрибута хранится список типов экранов для блока,
  // где его нужно показывать
  screenTypeAttr: 'data-shift-type'
}

/**
 * Get module name
 * Получить имя модуля
 * @return {String} module name
 */
const getModuleName = ():string => __name__

/**
 * Find all blocks for module of passed selector
 * Поиск всех блоков для шифтера, по переданному селектору
 *
 * @param {Obejct} param param for processing (параметры для обработки)
 *                       - hot (see options)
 *                       - selector (see options)
 *
 * @return {Function} return cyrring function with element store (возвращает карированную функцию, с возможностью получения данных из хранилища)
 */
const findBlocks = (param: {
    hot: ?boolean,
    selector: string
}): Function => {
  // Store for blocks
  // if hot - enable, then empty everything
  //
  // Стор для блоков
  // будет всегда пустой, если включен флаг hot
  let store

  // Helper function - get all blocks
  //
  // Хелпер получить блоки
  let __get__: Function = (selector: string): Array<any> => [...document.querySelectorAll(selector)]

  // If hot disable, then store elements as buffer
  //
  // Если нет флага, получать блоки заново при запуске процесса
  // то сохраняем блок в замыкании
  if (!param.hot) {
    store = __get__(param.selector)
  }

  return (): Array<any> => store || __get__(param.selector)
}

/**
 * Hide all blocks at passed id and attr
 * Скрыть все блоки, по переданному id и аттрибуту
 *
 * @param {Object} param param for function (параметры для функции)
 *                       - blocks for hide (блоки, которые надо скрыть)
 *                       - showAttr for show element (аттрибут для показа элемента)
 *
 * @return {void}
 */
const hideBlocks = (param: {
    blocks: Array<any>,
    showAttr: string
}): void => {
  let { blocks, showAttr } = param

  blocks
    .forEach(block => {
      // remove attribute for hide block
      //
      // Удаляем аттрибут, чтобы скрыть блок
      block.removeAttribute(showAttr)

      // remove block content
      //
      // Удаляем контент блока
      block.innerHTML = ''
    })
}

/**
 * Shift block
 *
 * Перемещение блока
 *
 * @param {Object} param param for function (параметры для функции)
 *                       - showAttr for show element (аттрибут для показа элемента)
 *                       - block for shift (элемент DOM, который будем перемещать)
 *
 * @return {void}
 */
const shift = (param: {
    showAttr: string,
    idBlockAttr: string,
    block: Object
}): void => {
  let { block, showAttr, idBlockAttr } = param

  let blocks = [...document.querySelectorAll(`[${idBlockAttr}=${block.getAttribute(idBlockAttr)}][${showAttr}]`)]

  // work if block no itself (it may happen with first init)
  //
  // Работаем если только это не один и тот же блок (может быть, при первой инициализации)
  if (blocks[0] !== block) {
    // add content
    //
    // Заполняем контентом
    block.innerHTML = blocks[0].innerHTML

    // find all showed blocks with target ID and hide it
    // remove arrtibute and remove content
    //
    // Находим все показанные блоки с таким id и скрываем их
    // убирая аттрибут и удаляя контент блока
    hideBlocks({
      blocks,
      showAttr
    })

    // show block
    //
    // Показываем блок
    block.setAttribute(showAttr, '')
  }
}

/**
 * Run module. Begin shifting blocks when screen is change
 * Запускаем модуль. Начинают шифтиться блоки, по изменению экрана
 *
 * @param  {Rx} screen$ observable screen changes (поток изменения типа экрана)
 * @param  {Object} param param for module (параметры для работы модуля)
 *
 * @return {Rx} return observable of blocks (вовзращаем поток блоков)
 */
const run$ = (screen$: Object, param: {
      blocks: Array<any>,
      screenTypeAttr: string
  }): Object => {
  let { blocks, screenTypeAttr } = param

  // if screen type changed
  //
  // При изменении типа экрана
  return screen$
    .switchMap(info => {
      // create observable from finded blocks
      //
      // Формируем поток из всех найденных блоков
      return Observable.from(blocks)

        // filter blocks only for current screen type
        //
        // Фильтруем только те, что должны быть обработаны в этом типе экрана
        .filter(block => block.getAttribute(screenTypeAttr).split(' ').includes(info.type))
    })
}

/**
 * Module init
 * Инициализация модуля
 *
 * @param  {Object} options параметры для инициалиазции
 *                          - hot (see options)
 *                          - blocksSelector (see options)
 *                          - showAttr (see options)
 *                          - idBlockAttr (see options)
 *                          - screenTypeAttr (see options)
 *                          - screen$ observable screen types (поток с изменениями типа экрана)
 *
 * @return {void}
 */
const init = (options: {
      hot?: boolean,
      blocksSelector?: string,
      showAttr?: string,
      idBlockAttr?: string,
      screenTypeAttr?: string,
      screen$: Object
  }): void => {
  let { screen$, hot, blocksSelector, showAttr, idBlockAttr, screenTypeAttr } = Object.assign({}, __options__, options)

  // if screen observable pass for init
  //
  // Если был передан поток при инициализации
  if (screen$) {
    // find blocks for process
    //
    // Ищем элементы для перемещения по странице
    let blocks = findBlocks({
      hot: hot,
      selector: blocksSelector
    })()

    // run module
    //
    // Запускаем модуль
    run$(
      screen$,
      {
        blocks,
        screenTypeAttr
      }
    ).subscribe(block => {
      shift({
        block,
        showAttr,
        idBlockAttr
      })
    })
  } else {
    // if screen observable not pass, throw error
    //
    // Если мы не получили поток при инициализации
    // выдаем ошибку
    throw new Error(`Модуль ${__name__}, для инициализации нужен поток, свойство screen$`)
  }
}

export default {
  getModuleName,
  init
}
