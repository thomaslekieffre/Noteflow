# Noteflow

Application de **prise de notes collaborative** : éditeur riche, édition à plusieurs en temps réel, tags, filtres et partage par lien.

> ⚠️ **Projet archivé** — réalisé fin 2024 (assisté par IA), il n'est plus maintenu et la version en ligne n'est plus fonctionnelle. Le code reste disponible à titre de référence.

![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tiptap](https://img.shields.io/badge/Tiptap-2-6A00F5)
![Yjs](https://img.shields.io/badge/Yjs-CRDT-30BCED)

## Fonctionnalités

- **Éditeur riche** basé sur Tiptap : titres, listes, blocs de code avec coloration syntaxique, images
- **Collaboration en temps réel** avec curseurs partagés (Yjs + WebSocket)
- **Invitations** de collaborateurs avec expiration automatique
- **Tags et filtres** pour organiser ses notes
- **Partage en lecture seule** via un lien public
- **Export PDF** des notes (rendu avec Puppeteer)
- **Tableau de bord** : notes récentes et statistiques
- Thème clair / sombre

## Stack

- **Next.js 14** (App Router) + React 18 + TypeScript
- **Tiptap** + **Yjs** / y-prosemirror pour l'édition collaborative
- **Socket.IO** pour le temps réel
- **Clerk** pour l'authentification
- **Vercel Postgres** pour les données
- **Tailwind CSS** + shadcn/ui + Framer Motion

## Lancer en local

```bash
git clone https://github.com/thomaslekieffre/Noteflow.git
cd Noteflow
npm install
npm run dev   # application Next.js
npm run ws    # serveur WebSocket de collaboration
```

L'application nécessite un projet Clerk et une base Postgres, à renseigner dans un fichier `.env.local`.

## Structure

```
src/
├── app/
│   ├── (authenticated)/   # tableau de bord et éditeur de notes
│   ├── api/               # notes, tags, collaboration, partage, export, upload
│   └── shared/            # page publique d'une note partagée
├── components/            # éditeur, navigation, tableau de bord, UI
├── lib/                   # authentification, base de données, constantes
└── server/                # serveur WebSocket
```
