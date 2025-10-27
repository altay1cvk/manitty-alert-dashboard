# 🚨 Manitty Alert Dashboard

Application web de monitoring d'alertes IoT développée dans le cadre du test technique pour le poste d'alternant Développeur Full-Stack chez MANITTY.

Le projet implémente une solution complète avec authentification sécurisée Auth0, dashboard interactif avec graphiques temps réel, et API REST TypeScript.

## 🚀 Stack Technique

**Frontend**
- Next.js 16 (App Router) avec Server-Side Rendering
- TypeScript pour la robustesse du code
- Tailwind CSS pour un design moderne et responsive
- Recharts pour les visualisations interactives
- Auth0 pour l'authentification OAuth2

**Backend**
- Express.js avec TypeScript
- Validation JWT Auth0 pour la sécurité
- Architecture REST avec séparation des responsabilités

**Infrastructure**
- Docker & docker-compose pour la containerisation
- Configuration multi-environnement
- Images optimisées (<200MB)

## 📁 Architecture du Projet

manitty-alert-dashboard/
├── backend/
│ ├── src/
│ │ ├── index.ts # Serveur Express
│ │ ├── middleware/auth.ts # Protection JWT
│ │ ├── routes/alerts.ts # Endpoints REST
│ │ ├── types/Alert.ts # Interfaces TypeScript
│ │ └── data/alerts.json # 37 alertes de test
│ ├── Dockerfile
│ └── package.json
├── frontend/
│ ├── app/ # Next.js App Router
│ │ ├── dashboard/ # Page dashboard
│ │ ├── alerts/ # Liste et détails
│ │ └── api/auth/ # Routes Auth0
│ ├── components/ # Composants réutilisables
│ ├── lib/api.ts # Client HTTP
│ └── Dockerfile
└── docker-compose.yml


## 🔧 Installation

### Prérequis

- Node.js 20+ et npm
- Docker et docker-compose
- Compte Auth0 (gratuit sur auth0.com)

### 1. Cloner le repository

git clone https://github.com/altay1cvk/manitty-alert-dashboard.git
cd manitty-alert-dashboard



### 2. Configuration Auth0

#### Créer l'application

1. Se connecter sur [auth0.com](https://auth0.com)
2. Créer une **Regular Web Application**
3. Noter le **Domain**, **Client ID** et **Client Secret**

#### Configurer les URLs autorisées

Dans les paramètres de l'application :

- **Allowed Callback URLs** : `http://localhost:3000/api/auth/callback`
- **Allowed Logout URLs** : `http://localhost:3000`
- **Allowed Web Origins** : `http://localhost:3000`

#### Créer l'API

1. Aller dans **Applications → APIs → Create API**
2. **Identifier** : `https://manitty-api`
3. **Signing Algorithm** : RS256

### 3. Variables d'environnement

Créer le fichier `backend/.env` :

```env
PORT=4000
AUTH0_AUDIENCE=https://manitty-api
AUTH0_ISSUER_BASE_URL=https://votre-tenant.auth0.com/
NODE_ENV=development
FRONTEND_URL=http://localhost:3000


Créer le fichier frontend/.env.local :


AUTH0_SECRET=<générer avec: openssl rand -hex 32>
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://votre-tenant.auth0.com
AUTH0_CLIENT_ID=<votre_client_id>
AUTH0_CLIENT_SECRET=<votre_client_secret>
AUTH0_AUDIENCE=https://manitty-api
NEXT_PUBLIC_API_URL=http://localhost:4000



## 🚀 Démarrage

### Option 1 : Docker (Recommandé)

docker-compose up --build


✅ **Frontend** : http://localhost:3000  
✅ **Backend** : http://localhost:4000

### Option 2 : Mode Développement

**Terminal 1 - Backend**

cd backend
npm install
npm run dev



**Terminal 2 - Frontend**

cd frontend
npm install
npm run dev



Ouvrir http://localhost:3000 dans le navigateur.

## ✨ Fonctionnalités

- ✅ **Authentification complète** : Connexion/déconnexion sécurisée avec Auth0
- ✅ **Dashboard temps réel** : Graphiques interactifs avec Recharts
- ✅ **Filtrage intelligent** : Par subject (subject-1, subject-2, subject-3)
- ✅ **Navigation intuitive** : Clic sur une barre → alertes du mois
- ✅ **Vue détaillée** : Informations complètes pour chaque alerte
- ✅ **API REST sécurisée** : Tous les endpoints protégés par JWT
- ✅ **Production-ready** : Containerisation Docker complète

## 📊 API Endpoints

Tous les endpoints requièrent un **Bearer Token JWT** valide.

| Méthode | Endpoint | Description | Query Params |
|---------|----------|-------------|--------------|
| GET | `/api/alerts` | Liste toutes les alertes | `?subject=subject-1` |
| GET | `/api/alerts/stats` | Statistiques par mois | `?subject=subject-1` |
| GET | `/api/alerts/month/:year/:month` | Alertes d'un mois | - |
| GET | `/api/alerts/:id` | Détail d'une alerte | - |

**Exemple de réponse `/api/alerts/stats` :**

{
"success": true,
"data": [
{
"month": "2024-05",
"count": 8,
"subjects": {
"subject-1": 3,
"subject-2": 3,
"subject-3": 2
}
}
]
}



## 💡 Décisions Techniques

### Pourquoi Next.js 16 ?

J'ai choisi Next.js 16 avec l'App Router pour ses performances supérieures grâce au Server-Side Rendering, son système de layouts imbriqués qui facilite la structure du projet, et son intégration native avec les API Routes pour gérer l'authentification Auth0.

### Pourquoi Recharts ?

Recharts offre un excellent compromis entre légèreté (~800KB), interactivité native et facilité de customisation. La propriété `onClick` permet de créer une navigation fluide entre le dashboard et les détails.

### Architecture Backend

L'architecture Express + TypeScript garantit un code robuste avec typage fort, une séparation claire des responsabilités via les middlewares, et une facilité de maintenance.

### Docker Multi-stage

Les builds multi-stage permettent d'obtenir des images optimisées (<200MB) tout en gardant un environnement de développement confortable et un déploiement reproductible.

## 🐛 Défis Rencontrés

### Next.js 16 et Auth0

**Défi** : La version Next.js 16 est trop récente pour `@auth0/nextjs-auth0` qui supporte officiellement jusqu'à Next.js 15.

**Solution** : Installation avec `--legacy-peer-deps` et adaptation du code d'authentification avec `NextResponse` pour gérer correctement les cookies.

### Navigation Graphique Interactive

**Défi** : Recharts ne transmet pas directement les données lors du clic sur une barre.

**Solution** : Implémentation d'un handler `onClick` personnalisé sur `<BarChart>` qui extrait les informations du mois et navigue vers la page correspondante.

### CORS et JWT

**Défi** : Configuration CORS entre frontend et backend avec validation JWT.

**Solution** : CORS configuré avec `credentials: true` et origin explicite, plus envoi du token via interceptor Axios.

### Optimisation Docker

**Défi** : Image Next.js de production volumineuse (>800MB).

**Solution** : Build multi-stage avec `output: 'standalone'` dans la configuration Next.js, réduisant l'image finale à ~150MB.

## 📊 Métriques du Projet

| Métrique | Valeur |
|----------|--------|
| **Lignes de code** | ~1500 (backend + frontend) |
| **Composants React** | 6 (Navbar, AlertChart, AlertCard, pages) |
| **Endpoints API** | 4 routes REST |
| **Dataset** | 37 alertes sur 6 mois |
| **Temps de développement** | ~8 heures |
| **Coverage TypeScript** | 100% |

## 🎓 Contexte Académique

Ce projet a été développé dans le cadre d'un test technique pour une alternance en développement Full-Stack chez MANITTY, entreprise spécialisée dans les solutions IoT médicales.

Il démontre mes compétences en :
- Architecture full-stack moderne (Next.js + Express)
- Sécurisation d'applications (Auth0 JWT)
- Visualisation de données temps réel
- DevOps et containerisation (Docker)
- Développement TypeScript end-to-end

## 👤 Contact

**Altay CEVIK**  
📧 altaycevik@gmail.com  
📱 +33 7 83 65 68 37  
🎓 Master IoT & Systèmes Embarqués - Université de Franche-Comté  
🔗 [LinkedIn](https://www.linkedin.com/in/altay-cevik) | [GitHub](https://github.com/altay1cvk)

---

*Développé avec ❤️ pour MANITTY - Octobre 2025*
