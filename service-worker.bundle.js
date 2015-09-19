/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var loadedFrom = '';
	console.log('im the service worker ok!');

	self.addEventListener('activate', function (event) {
	  console.log('activate event', event);
	});

	self.addEventListener('install', function (event) {
	  console.log('install', event);
	  event.waitUntil(caches.open('static-v1').then(function (cache) {
	    return cache.addAll(['/bggapp/', '/bggapp/main.bundle.js', '/bggapp/css/styles.css', new Request('//storage.googleapis.com/code.getmdl.io/1.0.4/material.indigo-pink.min.css', { mode: 'no-cors' }), new Request('//fonts.googleapis.com/icon?family=Material+Icons', { mode: 'no-cors' }), new Request('//storage.googleapis.com/code.getmdl.io/1.0.4/material.min.js', { mode: 'no-cors' })]);
	  }));
	});

	self.addEventListener('fetch', function (event) {
	  console.log('fetch event', event.request.url);
	  event.respondWith(caches.match(event.request).then(function (response) {
	    return response || fetch(event.request);
	  }));
	});

/***/ }
/******/ ]);