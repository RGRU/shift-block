(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("rxjs/Rx"));
	else if(typeof define === 'function' && define.amd)
		define("shift-block", ["rxjs/Rx"], factory);
	else if(typeof exports === 'object')
		exports["shift-block"] = factory(require("rxjs/Rx"));
	else
		root["shift-block"] = factory(root["rxjs/Rx"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
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
 * @fileOverview Модуль перемещения блоков в зависимости от типа экрана
 *
 * @author Alex
 *//**
 * Имя модуля
 * @type {String}
 */var __name__='ShiftBlock';/**
 * Опции по-умолчанию для модуля
 * @type {Object}
 */var __options__={hot:false,blocksSelector:'.shift',showAttr:'data-is-show',idBlockAttr:'data-shift-id',screenTypeAttr:'data-shift-type'/**
 * Получить имя модуля
 * @return {String} имя модуля
 */};var getModuleName=function getModuleName(){return __name__;};/**
 * Поиск всех блоков для шифтера, по переданному селектору
 *
 * @param {Obejct} param параметры для обработки
 *                       - hot получать ли блоки каждый раз, или добавить их в хранилище
 *                       и забирать потом оттуда
 *                       - selector селектор блоков, которые будем шифтить (они должны иметь определенные оттрибуты)
 *
 * @return {Function} возвращает карированную функцию, с возможностью получения данных из хранилища
 */var findBlocks=function findBlocks(param){// Стор для блоков
// будет всегда пустой, если стоит флаг hot
var store=void 0;// Хелпер получить блоки
var __get__=function __get__(selector){return[].concat(_toConsumableArray(document.querySelectorAll(selector)));};// Если нет флага, получать блоки заново при запуске процесса
// то сохраняем блок в замыкании
if(!param.hot){store=__get__(param.selector);}return function(){return store||__get__(param.selector);};};/**
 * Скрыть все блоки, по переданному id и аттрибуту
 *
 * @param {Object} param параметры для функции
 *                       - blocks блоки, которые надо скрыть
 *                       - showAttr аттрибут для показа элемента
 *
 * @return {void}
 */var hideBlocks=function hideBlocks(param){var blocks=param.blocks,showAttr=param.showAttr;blocks.forEach(function(block){// Удаляем аттрибут, чтобы скрыть блок
block.removeAttribute(showAttr);// Удаляем контент блока
block.innerHTML='';});};/**
 * Перемещение блока
 *
 * @param {Object} param параметры для функции
 *                       - showAttr аттрибут для показа элемента
 *                       - block элемент DOM, который будем перемещать
 *
 * @return {void}
 */var shift=function shift(param){var block=param.block,showAttr=param.showAttr,idBlockAttr=param.idBlockAttr;var blocks=[].concat(_toConsumableArray(document.querySelectorAll('['+idBlockAttr+'='+block.getAttribute(idBlockAttr)+']['+showAttr+']')));// Работаем если только это не один и тот же блок (может быть, при первой инициализации)
if(blocks[0]!==block){// Заполняем контентом
block.innerHTML=blocks[0].innerHTML;// Находим все показанные блоки с таким id и скрываем их
// убирая аттрибут и удаляя контент блока
hideBlocks({blocks:blocks,showAttr:showAttr});// Показываем блок
block.setAttribute(showAttr,'');}};/**
 * Запускаем модуль. Начинают шифтиться блоки, по изменению экрана
 *
 * @param  {Rx} screen$ поток изменения типа экрана
 * @param  {Object} param параметры для работы модуля
 *
 * @return {Rx} вовзращаем поток блоков
 */var run$=function run$(screen$,param){var blocks=param.blocks,screenTypeAttr=param.screenTypeAttr;// При изменении типа экрана
return screen$.switchMap(function(info){// Формируем поток из всех найденных блоков
return _Rx.Observable.from(blocks)// Фильтруем только те, что должны быть обработаны в этом типе экрана
.filter(function(block){return block.getAttribute(screenTypeAttr).split(' ').includes(info.type);});});};/**
 * Инициализация модуля
 *
 * @param  {Object} options параметры для инициалиазции
 *                          - hot получать ли блоки каждый раз, или добавить их в хранилище
 *                          и забирать потом оттуда (если вдруг блок подгрузился ajax-ом потом)
 *                          - blocksSelector селектор блоков, которые и будем шифтить
 *                          - showAttr аттрибут, означающий, что блок активен
 *                          - idBlockAttr аттрибут ID блока
 *                          - screenTypeAttr аттрибут, по которому получаем типы экрана для блока
 *                          - screen$ поток с типами экрана (от ScreenViewer)
 *
 * @return {void}
 */var init=function init(options){var _Object$assign=Object.assign({},__options__,options),screen$=_Object$assign.screen$,hot=_Object$assign.hot,blocksSelector=_Object$assign.blocksSelector,showAttr=_Object$assign.showAttr,idBlockAttr=_Object$assign.idBlockAttr,screenTypeAttr=_Object$assign.screenTypeAttr;// Если был передан поток при инициализации
if(screen$){// Ищем элементы для переменщения по странице
var blocks=findBlocks({hot:hot,selector:blocksSelector})();// Запускаем модуль
run$(screen$,{blocks:blocks,screenTypeAttr:screenTypeAttr}).subscribe(function(block){shift({block:block,showAttr:showAttr,idBlockAttr:idBlockAttr});});}else{// Если мы не получили поток при инициализации
// выдаем ошибку
throw new Error('\u041C\u043E\u0434\u0443\u043B\u044C '+__name__+', \u0434\u043B\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u043D\u0443\u0436\u0435\u043D \u043F\u043E\u0442\u043E\u043A, \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u043E screen$');}};exports.default={getModuleName:getModuleName,init:init};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});