# Comptes de test — Baraka Shop

## Administration
| URL | Email | Mot de passe |
|-----|-------|-------------|
| /admin | admin@barakashop.fr | admin123 |

## Client (simulation localStorage)
| URL | Email | Mot de passe |
|-----|-------|-------------|
| /connexion | test@exemple.fr | n'importe quoi |
| /connexion | ahmed@exemple.fr | n'importe quoi |

> Les comptes clients sont simulés (localStorage). Tout email + mot de passe fonctionne.

## Codes promo à tester
| Code | Effet |
|------|-------|
| BARAKA10 | -10% sur la commande |
| AID2025 | -15% sur la commande |
| BIENVENUE | -5 € fixe |

## Flux de test complet
1. `/produits` → ajouter des produits au panier
2. `/commande` → remplir nom + email, choisir un créneau, valider
3. `/admin` (admin@barakashop.fr / admin123) → onglet Commandes → voir la commande créée
4. Changer le statut de la commande depuis l'admin

## API Routes disponibles
- `GET /api/produits` — liste des produits (filtres: ?category=, ?search=, ?promo=true)
- `GET /api/commandes` — toutes les commandes
- `POST /api/commandes` — créer une commande
- `POST /api/promo-codes/verifier` — vérifier un code promo
- `GET /api/avis` — avis clients
