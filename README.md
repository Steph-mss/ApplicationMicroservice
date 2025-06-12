# Plateforme d’Orchestration de Rendez-vous Distribuée Orchestréa

## Description
Cette plateforme est une solution de réservation et d’optimisation de rendez-vous (conseils, démonstrations, ateliers) reposant sur une architecture distribuée par microservices.
La solution gère en temps réel les disponibilités, synchronise les calendriers et envoie des notifications aux utilisateurs.

## Fonctionnalités Clés
- **Service de Réservation**  
  - Réservation, modification et annulation de rendez-vous  
  - Synchronisation d’un calendrier interactif

- **Gestion des Calendriers**  
  - Intégration avec les agendas des différents intervenants pour afficher les disponibilités en temps réel

- **Service de Notifications**  
  - Envoi d’alertes (email/SMS) pour confirmer ou rappeler les rendez-vous

- **Interface Administrative**  
  - Tableau de bord pour la gestion des plannings, l’analyse de l’historique et la génération de rapports

## Architecture et Approches Techniques
- **Microservices**  
  Chaque fonctionnalité est déployée sous forme de microservices indépendants pour faciliter la scalabilité et la maintenance.

- **Bases de Données Multiples**  
  Utilisation de trois systèmes de bases de données :
  - **MySQL** pour certaines opérations relationnelles
  - **PostgreSQL** pour des transactions robustes et des requêtes complexes
  - **MongoDB** pour une gestion flexible des données non structurées

- **Docker & Orchestration**  
  - Création de Dockerfiles individuels pour chaque service  
  - Utilisation de `docker-compose.yml` pour faciliter la communication entre les conteneurs  
  - Gestion des réseaux Docker et des volumes pour la persistance des données

- **API Gateway & Sécurité**  
  - Centralisation des appels aux microservices via un API Gateway  
  - Mise en place de l’authentification et de l’autorisation (avec JWT)

- **Intégration avec GitLab**  
  - Versionnement du code sur GitLab  
  - Pipelines CI/CD automatisés pour la construction des images, les tests et le déploiement progressif

## Répartition en Binôme
- **Développeur Front-end**  
  - Création d’une interface en **Angular 19** avec un composant calendrier interactif

- **Développeur Back-end**  
  - Conception des microservices en **Java Spring Boot** (en respectant DDD et l’architecture hexagonale)  
  - Conteneurisation avec Docker

## Prérequis et Installation

### Prérequis
- Node.js, Java Spring Boot et Angular 19 (pour les différents services)
- Docker et Docker Compose
- GitLab pour la gestion du versionnage et CI/CD
- Bases de données : MySQL, PostgreSQL et MongoDB

### Installation
1. **Cloner le dépôt**  
   ```bash
   git clone https://gitlab.com/nom-utilisateur/orchestrea.git A CHANGER
   cd orchestrea
2. **Lancer les services Docker**
   ```bash
   docker-compose up --build
3. **Accéder à l’application**

Interface utilisateur : http://localhost:4200

API Gateway : http://localhost:8080


## Licence

Ce projet est distribué sous les termes de la [Licence CeCILL v2.1](https://cecill.info/licences/Licence_CeCILL_V2.1-fr.html).  
Pour consulter le texte complet, veuillez consulter le fichier [LICENSE](./LICENSE).
