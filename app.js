"use strict";

/** @type {HTMLInputElement | null} */
const q = document.querySelector('#q');
const result = document.querySelector('#result');
const srStatus = document.querySelector('#sr-status');

if (!q) { console.error('[init] missing #q'); }
if (!result) { console.error('[init] missing #result'); }
if (!srStatus) { console.error('[init] missing #sr-status'); }