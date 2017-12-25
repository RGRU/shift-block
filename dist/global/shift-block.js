window["shift-block"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _Rx=__webpack_require__(1);function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}/**
 * @fileOverview Module for auto shift of elements for adaptive sites
 *
 * @author Alex | RG team
 *//**
 * Module name
 * Имя модуля
 * @type {String}
 */var __name__='ShiftBlock';/**
 * Options as default for module
 * Параметры по-умолчанию
 *
 * @type {Object}
 */var __options__={// Find processed blocks every time
// or once on first init
//
// Ищем обрабатываемые блоки каждый раз, при измененнии экрана
// или только раз при инициализации
hot:false,// selector for processing block
//
// селектор для обрабатываемых блоков
blocksSelector:'.shift',// attribute for active block
// (module add it for block)
//
// аттрибут, который добавляется к активному, для данного типа экрана, блоку
showAttr:'data-is-show',// ID for searching blocks of the same type
//
// аттрибут в который передается идентификатор для одного типа блока
idBlockAttr:'data-shift-id',// store list screen type current block
//
// в значении аттрибута хранится список типов экранов для блока,
// где его нужно показывать
screenTypeAttr:'data-shift-type'/**
 * Get module name
 * Получить имя модуля
 * @return {String} module name
 */};var getModuleName=function getModuleName(){return __name__;};/**
 * Find all blocks for module of passed selector
 * Поиск всех блоков для шифтера, по переданному селектору
 *
 * @param {Obejct} param param for processing (параметры для обработки)
 *                       - hot (see options)
 *                       - selector (see options)
 *
 * @return {Function} return cyrring function with element store (возвращает карированную функцию, с возможностью получения данных из хранилища)
 */var findBlocks=function findBlocks(param){// Store for blocks
// if hot - enable, then empty everything
//
// Стор для блоков
// будет всегда пустой, если включен флаг hot
var store=void 0;// Helper function - get all blocks
//
// Хелпер получить блоки
var __get__=function __get__(selector){return[].concat(_toConsumableArray(document.querySelectorAll(selector)));};// If hot disable, then store elements as buffer
//
// Если нет флага, получать блоки заново при запуске процесса
// то сохраняем блок в замыкании
if(!param.hot){store=__get__(param.selector);}return function(){return store||__get__(param.selector);};};/**
 * Hide all blocks at passed id and attr
 * Скрыть все блоки, по переданному id и аттрибуту
 *
 * @param {Object} param param for function (параметры для функции)
 *                       - blocks for hide (блоки, которые надо скрыть)
 *                       - showAttr for show element (аттрибут для показа элемента)
 *
 * @return {void}
 */var hideBlocks=function hideBlocks(param){var blocks=param.blocks,showAttr=param.showAttr;blocks.forEach(function(block){// remove attribute for hide block
//
// Удаляем аттрибут, чтобы скрыть блок
block.removeAttribute(showAttr);// remove block content
//
// Удаляем контент блока
block.innerHTML='';});};/**
 * Shift block
 *
 * Перемещение блока
 *
 * @param {Object} param param for function (параметры для функции)
 *                       - showAttr for show element (аттрибут для показа элемента)
 *                       - block for shift (элемент DOM, который будем перемещать)
 *
 * @return {void}
 */var shift=function shift(param){var block=param.block,showAttr=param.showAttr,idBlockAttr=param.idBlockAttr;var blocks=[].concat(_toConsumableArray(document.querySelectorAll('['+idBlockAttr+'='+block.getAttribute(idBlockAttr)+']['+showAttr+']')));// work if block no itself (it may happen with first init)
//
// Работаем если только это не один и тот же блок (может быть, при первой инициализации)
if(blocks[0]!==block){// add content
//
// Заполняем контентом
block.innerHTML=blocks[0].innerHTML;// find all showed blocks with target ID and hide it
// remove arrtibute and remove content
//
// Находим все показанные блоки с таким id и скрываем их
// убирая аттрибут и удаляя контент блока
hideBlocks({blocks:blocks,showAttr:showAttr});// show block
//
// Показываем блок
block.setAttribute(showAttr,'');}};/**
 * Run module. Begin shifting blocks when screen is change
 * Запускаем модуль. Начинают шифтиться блоки, по изменению экрана
 *
 * @param  {Rx} screen$ observable screen changes (поток изменения типа экрана)
 * @param  {Object} param param for module (параметры для работы модуля)
 *
 * @return {Rx} return observable of blocks (вовзращаем поток блоков)
 */var run$=function run$(screen$,param){var blocks=param.blocks,screenTypeAttr=param.screenTypeAttr;// if screen type changed
//
// При изменении типа экрана
return screen$.switchMap(function(info){// create observable from finded blocks
//
// Формируем поток из всех найденных блоков
return _Rx.Observable.from(blocks)// filter blocks only for current screen type
//
// Фильтруем только те, что должны быть обработаны в этом типе экрана
.filter(function(block){return block.getAttribute(screenTypeAttr).split(' ').includes(info.type);});});};/**
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
 */var init=function init(options){var _Object$assign=Object.assign({},__options__,options),screen$=_Object$assign.screen$,hot=_Object$assign.hot,blocksSelector=_Object$assign.blocksSelector,showAttr=_Object$assign.showAttr,idBlockAttr=_Object$assign.idBlockAttr,screenTypeAttr=_Object$assign.screenTypeAttr;// if screen observable pass for init
//
// Если был передан поток при инициализации
if(screen$){// find blocks for process
//
// Ищем элементы для перемещения по странице
var blocks=findBlocks({hot:hot,selector:blocksSelector})();// run module
//
// Запускаем модуль
run$(screen$,{blocks:blocks,screenTypeAttr:screenTypeAttr}).subscribe(function(block){shift({block:block,showAttr:showAttr,idBlockAttr:idBlockAttr});});}else{// if screen observable not pass, throw error
//
// Если мы не получили поток при инициализации
// выдаем ошибку
throw new Error('\u041C\u043E\u0434\u0443\u043B\u044C '+__name__+', \u0434\u043B\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u043D\u0443\u0436\u0435\u043D \u043F\u043E\u0442\u043E\u043A, \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u043E screen$');}};exports.default={getModuleName:getModuleName,init:init};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function() { module.exports = window["rxjs/Rx"]; }());

/***/ })
/******/ ])["default"];