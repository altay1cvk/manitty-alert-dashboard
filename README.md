# 🚨 Manitty Alert Dashboard

> Test technique - Alternance Développeur Full-Stack

Application web de monitoring d'alertes IoT avec authentification Auth0, visualisation graphique interactive et API REST sécurisée.

## 🚀 Technologies utilisées

### Frontend
- **Next.js 16** (App Router) - Framework React avec SSR
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utility-first
- **Recharts** - Graphiques interactifs
- **@auth0/nextjs-auth0** - Authentification OAuth2
- **Axios** - Client HTTP

### Backend
- **Express** - Framework Node.js
- **TypeScript** - Typage statique
- **express-oauth2-jwt-bearer** - Validation JWT Auth0

### DevOps
- **Docker** - Containerisation
- **docker-compose** - Orchestration multi-conteneurs

## 🏗 Architecture

manitty-alert-dashboard/
├── backend/ # API REST Express + TypeScript
│ ├── src/
│ │ ├── index.ts # Point d'entrée serveur
│ │ ├── middleware/auth.ts # Middleware Auth0 JWT
│ │ ├── routes/alerts.ts # Endpoints API
│ │ ├── types/Alert.ts # Types TypeScript
│ │ └── data/alerts.json # Données (37 alertes)
│ └── Dockerfile
├── frontend/ # Application Next.js
│ ├── app/ # App Router Next.js 14
│ ├── components/ # Composants réutilisables
│ ├── lib/api.ts # Client API
│ └── Dockerfile
└── docker-compose.yml

text

## 📦 Installation

### Prérequis

- **Node.js** 18+ et npm
- **Docker** et **docker-compose**
- Compte **Auth0** (gratuit)

### Cloner le projet

git clone https://github.com/altay1cvk/manitty-alert-dashboard.git
cd manitty-alert-dashboard

text

## 🔐 Configuration Auth0

### 1. Créer une application Auth0

1. Aller sur [auth0.com](https://auth0.com)
2. Créer une application **"Regular Web Application"**
3. Noter : **Domain**, **Client ID**, **Client Secret**

### 2. Configurer les URLs

Dans les paramètres de l'application Auth0 :
- **Allowed Callback URLs** : `http://localhost:3000/api/auth/callback`
- **Allowed Logout URLs** : `http://localhost:3000`
- **Allowed Web Origins** : `http://localhost:3000`

### 3. Créer une API Auth0

1. Applications → APIs → **Create API**
2. **Identifier** : `https://manitty-api`
3. **Signing Algorithm** : RS256

### 4. Variables d'environnement

Copier les fichiers d'exemple
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local

text

Éditer `.env` avec vos credentials Auth0 :

AUTH0_SECRET=$(openssl rand -hex 32)
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret
AUTH0_AUDIENCE=https://manitty-api

text

## 🚀 Lancement

### Option 1 : Docker (Production)

docker-compose up --build

text

Accès :
- **Frontend** : http://localhost:3000
- **Backend** : http://localhost:4000

### Option 2 : Développement local

**Terminal 1 - Backend**

cd backend
npm install
npm run dev

text

**Terminal 2 - Frontend**

cd frontend
npm install
npm run dev

text

Ouvrir [http://localhost:3000](http://localhost:3000)

## ✨ Fonctionnalités implémentées

- ✅ **Authentification Auth0** : Login/logout sécurisé
- ✅ **Dashboard interactif** : Graphique bar chart avec Recharts
- ✅ **Filtrage** : Par subject (subject-1, subject-2, subject-3)
- ✅ **Navigation** : Clic sur barre → liste alertes du mois
- ✅ **Liste paginée** : Toutes les alertes groupées par mois
- ✅ **Page détail** : Informations complètes de chaque alerte
- ✅ **API REST protégée** : JWT Auth0 sur tous les endpoints
- ✅ **Containerisation** : Docker + docker-compose fonctionnel

## 📊 Endpoints API

Tous les endpoints nécessitent un token JWT Auth0 valide.

- `GET /api/alerts` - Liste toutes les alertes (+ filtre `?subject=subject-1`)
- `GET /api/alerts/stats` - Statistiques mensuelles (+ filtre `?subject=subject-1`)
- `GET /api/alerts/month/:year/:month` - Alertes d'un mois spécifique
- `GET /api/alerts/:id` - Détail d'une alerte par ID

## 💡 Choix techniques

### Next.js 16 avec App Router
- **SSR** : Meilleure performance et SEO
- **Layouts imbriqués** : Architecture moderne
- **API Routes** : Gestion Auth0 intégrée

### Recharts pour la visualisation
- Léger et performant (~800KB)
- Interactivité native avec `onClick`
- Responsive avec `ResponsiveContainer`
- Customisable facilement

### Express + TypeScript backend
- Architecture RESTful claire
- Typage fort pour éviter les erreurs
- Middleware Auth0 centralisé
- Séparation des responsabilités

### Docker multi-stage
- Images optimisées (<200MB)
- Build reproductible
- Configuration via environnement
- Orchestration simple avec docker-compose

## 🚧 Améliorations futures

### Court terme
- Tests unitaires (Jest) et e2e (Playwright)
- Pagination côté backend pour grandes quantités
- Filtres avancés (severity, location, deviceId)
- Recherche full-text dans les alertes

### Moyen terme
- WebSocket pour alertes temps réel
- Cache Redis pour stats pré-calculées
- Base de données PostgreSQL
- Export CSV/PDF des alertes

### Long terme
- Dashboard personnalisable (widgets drag-and-drop)
- Notifications push (service workers)
- Multi-tenancy avec isolation
- Mobile app (React Native)

## 🐛 Difficultés rencontrées

### 1. Next.js 16 avec Auth0
**Problème** : Version Next.js 16 trop récente pour `@auth0/nextjs-auth0`  
**Solution** : Utilisation de `--legacy-peer-deps` pour installer les dépendances

### 2. Interaction graphique → navigation
**Problème** : Recharts ne passe pas directement les données au clic  
**Solution** : Handler `onClick` sur `<BarChart>` avec extraction de `data.month`

### 3. Validation JWT côté backend
**Problème** : Configuration CORS avec Auth0  
**Solution** : CORS avec `credentials: true` et `origin` explicite

### 4. Docker multi-stage pour Next.js
**Problème** : Image de production volumineuse (800MB+)  
**Solution** : Build multi-stage avec `output: 'standalone'` → ~150MB

## 📊 Statistiques du projet

- **Lignes de code** : ~1500 (backend + frontend)
- **Composants React** : 6 (Navbar, AlertChart, AlertCard, 3 pages)
- **Endpoints API** : 4 endpoints REST
- **Alertes dans le dataset** : 37 alertes sur 6 mois
- **Temps de développement** : ~12h

## 👤 Auteur

**Altay CEVIK**  
📧 altaycevik@gmail.com  
📱 +33 7 83 65 68 37  
🎓 Master IoT - Université EIPHI, Montbéliard

---

**Merci pour cette opportunité !** 🚀
