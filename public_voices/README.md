
# Public Voices

Millions of public domain audiobooks are available online, but accessing them through a user-friendly and personalized interface is often difficult. Public Voices solves this by integrating with the LibriVox API to deliver a clean, responsive web application where users can search, stream, and save their favorite audiobooks. The result is a seamless listening experience with personalized features, all built on modern, open technologies.

## 🧰 Tool Box


![mysql badge](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![doctrine badge](https://img.shields.io/badge/Doctrine-E37400?style=for-the-badge&logo=Doctrine&logoColor=white)

![php badge](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![symfony badge](https://img.shields.io/badge/Symfony-000000?style=for-the-badge&logo=Symfony&logoColor=white)


![html badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![javascript badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

![docker badge](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![visual studio code](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)



## 🎯 Core Features


### 👤 User Accounts
- Secure user registration and login
- Email confirmation with redirect to login page
- Password reset with email link
- Personal dashboard with favorite audiobooks

### 🔐 Security
- Role-based route protection (`ROLE_USER`)
- CSRF protection and input validation
- Authentication handled by Symfony’s security component

### 🔗 APIs
  - Public: LibriVox API (audiobook data)
  - Private: Internal REST API (user accounts)


### 📚 Audiobook Catalog
- Lazy-loading
- Search by author 
- Live data fetched from the LibriVox API

### ▶️ Audiobook Player
- Built-in player for streaming audiobooks
- Option to add/remove books from favorites


### 📱 Responsive UI
- Clean and mobile-friendly design
- Compatible across modern browsers


## 📷 Screenshots

**Catalog**
![App Screenshot](./00_readme/screenshots_02.jpg)

**Player**
![App Screenshot](./00_readme/screenshots_03.jpg)

**Authentication**
![App Screenshot](./00_readme/screenshots_04.jpg)

**Favorites**
![App Screenshot](./00_readme/screenshots_01.jpg)




## 🚀 Getting Started (Local Development)

### Prerequisites

- Git
- Docker & Docker Compose
- Symfony

---

### 🔧 Installation 

1. **Clone the repository**

```bash
git clone https://github.com/madame-r/symfony_public_voices.git
cd symfony_public_voices
```

2. **Update the .env file**

Use your database credentials and Mailer DSN if needed.


3. **Start Docker containers**

```bash
docker-compose up --build -d
```

4. **Install PHP dependencies**

```bash
docker exec php composer install

```

5. **Create the database**

```bash
docker exec php bin/console doctrine:database:create

```

6. **Run migrations**

```bash
docker exec php bin/console doctrine:migrations:migrate

```



## 📌 Roadmap

 - Admin panel (ROLE_ADMIN)

 - Bookmarks & resume playback

 - Offline listening (PWA support)

 - UI/UX enhancements




## ❤️ Acknowledgements

 - [Librivox and their volunteers for their amazing work ](https://librivox.org/)

 - [Public Domain Review for their inspiring work ](https://publicdomainreview.org/)




## 📜 License


![CREATIVE COMMONS](./00_readme/badge_cc.png)

