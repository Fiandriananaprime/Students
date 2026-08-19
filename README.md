# 🎓 Student Backend API

> Une API RESTful robuste et performante développée en **TypeScript** pour la gestion des étudiants et la prise en charge de l'authentification.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

---

## 📌 À propos

Ce projet fournit une architecture backend complète pour la gestion d'étudiants. Il intègre des fonctionnalités d'authentification sécurisées ainsi qu'un CRUD complet pour manipuler les données des étudiants.

* **Dépôt d'origine :** [Fiandrinanaprime/Student](https://github.com/Fiandrinanaprime/Student)

---

## 🚀 Démarrage rapide

### Prérequis
Assurez-vous d'avoir **Node.js** (version LTS recommandée) et **npm** installés sur votre machine.

### Installation
Installez l'ensemble des dépendances du projet :
```bash
npm install
```

### Compilation & Lancement
Pour compiler le projet TypeScript et démarrer le serveur :
```bash
# Compilation TypeScript
npm run build

# Lancement de l'application
npm start
```

---

## 🛣️ API Endpoints

### 🔐 Authentification (`/auth`)

| Méthode | Route | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/signup` | Création d'un nouveau compte |
| `POST` | `/auth/login` | Connexion de l'utilisateur |
| `POST` | `/auth/verify-email` | Vérification de l'adresse email |
| `POST` | `/auth/resend-verification` | Renvoyer le code/lien de vérification |

---

### 👨‍🎓 Gestion des Étudiants (`/Student`)

| Méthode | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/Student` | Récupérer la liste de tous les étudiants |
| `POST` | `/Student` | Ajouter un nouvel étudiant |
| `GET` | `/Student/:id` | Récupérer les détails d'un étudiant par son ID |
| `PUT` | `/Student/:id` | Mettre à jour complètement les informations d'un étudiant |
| `PATCH` | `/Student/:id` | Modifier partiellement les données d'un étudiant |
| `DELETE` | `/Student/:id` | Supprimer un étudiant |

---

## 👥 Contributeurs

* **[Fiandrinanaprime](https://github.com/Fiandrinanaprime)** — *Auteur principal*
