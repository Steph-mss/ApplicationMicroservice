[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# 🚀 Plateforme d’Orchestration de Rendez-vous Distribuée — **Orchestréa**

## Description

**Orchestréa** est une solution de réservation et d’optimisation de rendez-vous (conseils, démonstrations, ateliers), reposant sur une architecture distribuée basée sur des microservices.  
La plateforme gère en temps réel les disponibilités, synchronise les calendriers et envoie des notifications aux utilisateurs.

👉 [Lien du dépôt GitHub](https://github.com/Steph-mss/ApplicationMicroservice)

---

## Fonctionnalités clés

- **Service de réservation**  
  - Réservation, modification et annulation de rendez-vous  
  - Synchronisation avec un calendrier interactif

- **Gestion des calendriers**  
  - Intégration avec les agendas des intervenants pour afficher les disponibilités en temps réel

- **Service de notifications**  
  - Envoi d’alertes (email/SMS) pour confirmer ou rappeler les rendez-vous

- **Interface administrative**  
  - Tableau de bord pour la gestion des plannings, l’analyse de l’historique et la génération de rapports

---

## Architecture et approches techniques

- **Microservices**  
  Chaque fonctionnalité est déployée sous forme de microservice indépendant pour faciliter la scalabilité et la maintenance.

- **Bases de données multiples**  
  Utilisation de trois systèmes de bases de données :  
  - **MySQL** pour les opérations relationnelles  
  - **PostgreSQL** pour les transactions robustes et les requêtes complexes  
  - **MongoDB** pour la gestion flexible des données non structurées

- **Docker & orchestration**  
  - Création de Dockerfiles individuels pour chaque service  
  - Utilisation d’un fichier `docker-compose.yml` pour faciliter la communication entre les conteneurs  
  - Gestion des réseaux Docker et des volumes pour la persistance des données

- **API Gateway & sécurité**  
  - Centralisation des appels aux microservices via une API Gateway  
  - Mise en place de l’authentification et de l’autorisation (JWT)

- **Intégration continue avec GitLab**  
  - Versionnement du code sur GitLab  
  - Pipelines CI/CD automatisés pour la construction des images, les tests et le déploiement progressif

---

## Répartition des rôles

- **Développeur Front-end**  
  - Création d’une interface en **Angular 19** avec un composant calendrier interactif

- **Développeur Back-end**  
  - Conception des microservices en **Java Spring Boot** (architecture DDD et hexagonale)  
  - Conteneurisation avec Docker

---

## Prérequis et installation

### Prérequis

- Node.js  
- Java Spring Boot  
- Angular 19  
- Docker et Docker Compose  
- GitLab pour la gestion du versionnage et CI/CD  
- Bases de données : MySQL, PostgreSQL et MongoDB

### Installation

1. **Cloner le dépôt**  
   ```bash
   git clone https://github.com/Steph-mss/ApplicationMicroservice.git
   cd ApplicationMicroservice

2. **Lancer les services Docker**
   ```bash
   docker-compose up --build
3. **Accéder à l’application**

Interface utilisateur : http://localhost:4200

API Gateway : http://localhost:8080


---

## 📜 Licence

Ce projet est distribué sous les termes de la [Licence CeCILL v2.1](https://cecill.info/licences/Licence_CeCILL_V2.1-fr.html).  
Pour consulter le texte complet, veuillez consulter le fichier [LICENSE](./LICENSE).
