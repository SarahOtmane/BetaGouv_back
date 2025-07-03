
## 🚀 Lancement avec Docker

### 1. Cloner le projet

```bash
git clone https://github.com/SarahOtmane/BetaGouv_back.git
cd BetaGouv_back
```

### 2. Installer les dépendances
```bash
docker run -ti --rm -v $PWD:/app -w /app node:20.17-slim /bin/sh
cd api
npm install
exit
```
### 3. Lancer le build
```bash
docker compose -f compose-dev.yml up --build
```

### 4. Gestion des dépendances
Les dépendances sont installées dans l’image Docker. Si tu ajoutes de nouvelles dépendances :
```bash
docker exec -it front-web-dev-1 sh
npm install <nom-du-paquet>
```