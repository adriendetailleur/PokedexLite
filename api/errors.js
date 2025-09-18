/** @typedef {'empty' | 'aborted' | 'network'} FetchPokemonErrorReason */

export class FetchPokemonError extends Error {
    /** @type {import('./types').FetchPokemonErrorReason | 'empty' | 'aborted' | 'network'} */
    reason;

    /**
     * @param {FetchPokemonErrorReason} reason
     * @param {string} message
     * @param {unknown} [options]
     */
    constructor(reason, message, options) {
        super(message);
        this.name = 'FetchPokemonError';
        this.reason = reason;
        if (options && typeof options === 'object' && 'cause' in options) this.cause = options.cause;
    }

    /** Erreur "vide" correspondant à un 404 (pas de résultat) */
    static empty() {
        return new FetchPokemonError('empty', 'Aucun résultat');
    }

    /** Erreur suite à AbortController.abort() */
    static aborted() {
        return new FetchPokemonError('aborted', 'Requête annulée');
    }

    /** Erreur réseau générique (timeout, offline, DNS…) */
    static network(message = 'Erreur réseau') {
        return new FetchPokemonError('network', message);
    }
}