// @ts-check
"use strict";

/**
 * Les états possibles de l’UI.
 * @typedef {'idle' | 'loading' | 'success' | 'empty' | 'error'} State
 */;

/** @type {HTMLInputElement | null} */
const q = document.querySelector('#q');
const result = document.querySelector('#result');
const srStatus = document.querySelector('#sr-status');

if (!q) { console.error('[init] missing #q'); }
if (!result) { console.error('[init] missing #result'); }
if (!srStatus) { console.error('[init] missing #sr-status'); }