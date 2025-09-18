// @ts-check
"use strict";

/**
 * Les états possibles de l’UI.
 * @typedef {'idle' | 'loading' | 'success' | 'empty' | 'error'} State
 */

/**
 * PokemonDTO.
 * @typedef {{ id: number, name: string, height: number, weight: number, types: string[], spriteUrl: string}} PokemonDTO
 */

/** @type {HTMLInputElement | null} */
const q = document.querySelector('#q');
const result = document.querySelector('#result');
const srStatus = document.querySelector('#sr-status');

if (!q) { console.error('[init] missing #q'); }
if (!result) { console.error('[init] missing #result'); }
if (!srStatus) { console.error('[init] missing #sr-status'); }

render('idle');

/**
 * @param {State} state 
 * @param {*} [data] 
 */
function describeState(state, data) {
    let aria = '', heading = '', body = '';
    switch (state) {
        case 'idle':
            aria = '';
            heading = '';
            body = '';
            break;
        case 'loading':
            aria = 'Chargement...';
            heading = 'Chargement';
            body = '';
            break;
        case 'success':
            aria = `Trouvé : ${data?.name}`;
            heading = 'Résultat';
            body = '';
            break;
        case 'empty':
            aria = 'Aucun résultat';
            heading = 'Aucun résultat';
            body = '';
            break;
        case 'error':
            aria = data?.message ?? 'Erreur';
            heading = 'Erreur';
            body = data?.message ?? 'Erreur réseau';
            break;
    }
    return { aria, heading, body };
}

/**
 * @param {State} state 
 * @param {*} [data] 
 */
function render(state, data) {
    if (!srStatus || !result) return;
    const { aria, heading, body } = describeState(state, data);
    srStatus.textContent = aria;
    result.textContent = '';
    if (heading) {
        const h2 = document.createElement('h2');
        h2.textContent = heading;
        result.appendChild(h2);
    }
    if (body) {
        const p = document.createElement('p');
        p.textContent = body;
        result.appendChild(p);
    }
    result.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
}

/**
 * @param {string} name
 * @param {{ signal?: AbortSignal }=} options
 * @returns {Promise<PokemonDTO>}
 */
function fetchPokemon(name, { signal } = {}) {
    throw new Error('Not implemented');
}