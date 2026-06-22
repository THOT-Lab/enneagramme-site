# Ennéagramme - Le chemin vers l'éveil

Site vitrine multilingue en HTML, CSS et JavaScript vanilla, prêt pour GitHub Pages.

## Site publié

- Site public : https://thot-lab.github.io/enneagramme-site/
- Dépôt GitHub : https://github.com/THOT-Lab/enneagramme-site

## Ouvrir le site localement

Ouvrir simplement `index.html` dans un navigateur.

Le site fonctionne aussi avec un petit serveur local, par exemple :

```bash
cd enneagramme-site
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Modifier les formations

Les formations sont dans `data/formations.json`.

Chaque formation contient :

- `id` : identifiant unique
- `date` : date affichée
- `time` : horaire
- `place` : lieu
- `topic` : sujet

Exemple :

```json
{
  "id": "formation-4",
  "date": "20 septembre 2026",
  "time": "09h30 - 17h30",
  "place": "Bordeaux",
  "topic": "Ennéagramme et vie relationnelle"
}
```

## Mode édition local

Un bouton `Mode édition` est disponible dans le footer.

Mot de passe prévu dans le JavaScript : `admin123`.

Ce mode permet :

- de modifier les textes principaux visibles sur la page ;
- de modifier les lignes du tableau des formations ;
- d'ajouter une formation ;
- de supprimer une formation ;
- d'exporter les données modifiées en JSON.

Limite importante : ce mode n'est pas une vraie sécurité et ne modifie pas automatiquement les fichiers du site. Il sert à préparer et exporter des changements localement. Pour rendre les changements permanents, reporter le contenu exporté dans `data/formations.json` et/ou `data/translations.json`.

## Ajouter des images

Placer les images dans `assets/images`.

Pour la carte formateur existante, ajouter :

```text
assets/images/yves-kovacs.jpg
```

Si cette image n'existe pas, le site affiche un placeholder élégant.

Les fichiers de marque sont aussi dans `assets/images` :

- `logo.svg` : logo principal, losange émeraude avec reflet de 7 ;
- `favicon.svg` : icône de navigateur ;
- `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png` : icônes d'onglet navigateur ;
- `apple-touch-icon.png` : icône mobile ;
- `icon-192.png`, `icon-512.png` : icônes d'installation web app ;
- `og-image.png` : image de partage Open Graph et Twitter ;
- `og-image.svg` : source vectorielle de l'image Open Graph.

## Ajouter des vidéos

Placer les vidéos dans `assets/videos`.

Les cartes de témoignages contiennent pour l'instant des emplacements visuels. Pour intégrer une vidéo, remplacer l'emplacement `.video-slot` dans `index.html` par une balise :

```html
<video controls src="assets/videos/nom-de-la-video.mp4"></video>
```

## Modifier les traductions

Les textes français, espagnols et anglais sont dans `data/translations.json`.

Les clés principales sont :

- `fr`
- `es`
- `en`

Le site charge ces traductions automatiquement quand il est servi par GitHub Pages ou par un serveur local. Pour garantir l'ouverture directe de `index.html`, une copie de secours existe aussi dans `js/main.js`.

## Publier sur GitHub Pages

1. Placer le dossier `enneagramme-site` dans un dépôt GitHub.
2. Commiter et pousser les fichiers.
3. Dans GitHub, ouvrir `Settings` puis `Pages`.
4. Choisir la branche de publication, par exemple `main`.
5. Choisir le dossier racine si `index.html` est à la racine du dépôt, ou déplacer le contenu de `enneagramme-site` à la racine avant publication.

GitHub Pages servira automatiquement le site statique.
