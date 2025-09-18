TESTS PAPIER — fetchPokemon(name, {signal}) → Promise<PokemonDTO>

Convention d'erreurs (quand on branchera le réseau) :
- 200 OK        → résout (PokemonDTO)
- 404 Not Found → rejette FetchPokemonError.reason = 'empty'
- Abort         → rejette FetchPokemonError.reason = 'aborted' (message: "Requête annulée")
- Réseau autre  → rejette FetchPokemonError.reason = 'network' (message: "Erreur réseau")

Mapping UI attendu (pseudocode try/catch unique) :
try {
  const dto = await fetchPokemon(name, { signal });
  render('success', dto);
} catch (e) {
  if (e instanceof FetchPokemonError) {
    switch (e.reason) {
      case 'empty':   render('empty'); break;
      case 'aborted': render('error', { message: 'Requête annulée' }); break;
      case 'network': render('error', { message: 'Erreur réseau' }); break;
    }
  } else {
    render('error', { message: 'Erreur inconnue' }); // garde-fou
  }
}
 *
--- SCÉNARIOS ---
 *
1) SUCCESS — "pikachu"
GIVEN  : name = "pikachu", signal actif
WHEN   : fetchPokemon('pikachu', {signal})
THEN   : Promise résolue avec DTO minimal :
         { id:number, name:'pikachu', height:number, weight:number, types:string[], spriteUrl:string }
UI     : render('success', dto)
ARIA   : "Trouvé : pikachu"  (TODO: vérifie que describeState('success', dto) produit bien ce message)
HEAD   : "Résultat"
BODY   : "Nom : pikachu" (ou équivalent selon ton describeState)
 *
2) EMPTY — "nope" (404)
GIVEN  : name = "nope", le Pokémon n'existe pas
WHEN   : fetchPokemon('nope', {signal})
THEN   : Promise rejetée avec FetchPokemonError.reason = 'empty'
UI     : render('empty')
ARIA   : "Aucun résultat"
HEAD   : "Aucun résultat"
BODY   : "" (ou texte court, selon describeState)
 *
3) ABORT — requête annulée
GIVEN  : une frappe rapide remplace la recherche courante → AbortController.abort()
WHEN   : fetchPokemon(name, {signal}) est annulée
THEN   : Promise rejetée avec FetchPokemonError.reason = 'aborted', message "Requête annulée"
UI     : render('error', { message: 'Requête annulée' })
ARIA   : "Requête annulée"
HEAD   : "Erreur"
BODY   : "Requête annulée"
 *
4) (Optionnel) NETWORK — erreur réseau générique
GIVEN  : coupure réseau / DNS / CORS etc.
WHEN   : fetchPokemon('pikachu', {signal})
THEN   : Promise rejetée avec FetchPokemonError.reason = 'network', message "Erreur réseau"
UI     : render('error', { message: 'Erreur réseau' })
ARIA   : "Erreur réseau"
HEAD   : "Erreur"
BODY   : "Erreur réseau"
 *
NOTES D’INTÉGRATION (TODO quand on fera l’Issue 5) :
- Un seul try/catch centralise tout → pas de duplication de logique d’erreur.
- Les messages ARIA/HEAD/BODY proviennent exclusivement de describeState().
- Le submit et l’input (debounce) déclenchent ce flux, mais ne modifient jamais le DOM directement.
