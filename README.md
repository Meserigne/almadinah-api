# 🚀 API Almadinah Boutique

API backend pour l'application e-commerce Almadinah Boutique.

## 📋 Technologies

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification
- **bcryptjs** - Hashage des mots de passe

## 🏗️ Architecture

```
almadinah-api/
├── config/          # Configuration
├── models/          # Modèles Mongoose
├── routes/          # Routes API
├── middleware/      # Middleware Express
├── server.js        # Point d'entrée
└── package.json     # Dépendances
```

## 🚀 Déploiement

### Variables d'environnement

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://almadinah_admin:Almadinah2024@cluster0.nfzpdun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=almadinah_jwt_secret_2024_very_secure_key
FRONTEND_URL=https://almadinah-boutique.com
```

### Installation

```bash
npm install
```

### Démarrage

```bash
npm start
```

## 📊 Endpoints

- `GET /api/health` - Statut de l'API
- `GET /api/products` - Liste des produits
- `POST /api/products` - Créer un produit
- `GET /api/users` - Liste des utilisateurs
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription

## 🔗 URLs

- **API** : https://almadinah-api.onrender.com
- **Frontend** : https://almadinah-boutique.com
- **Base de données** : MongoDB Atlas

## 📞 Support

Pour toute question, contactez l'équipe Almadinah Boutique. 