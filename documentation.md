https://docs.nestjs.com/techniques/database

## main.ts no point d entree 

# Un Module est un conteneur logique qui regroupe toutes les classes d'une même fonctionnalité et indique à Nest comment elles sont reliées.C'est exactement le même rôle qu'un package bien organisé en Java, sauf que Nest utilise explicitement un @Module pour déclarer les dépendances entre ces groupes.

# Le décorateur dit "quoi". Le Guard, l'Interceptor ou le framework décide "comment".le rôle du décorateur est uniquement d'ajouter des métadonnées, tandis que le Guard les lit et applique la logique correspondante

# Un DTO est une classe qui définit la forme des données échangées via HTTP (entrantes ou sortantes).


## https://docs.nestjs.com/first-steps
- nest g module auth
- nest g controller auth
- nest g service auth
- nest g module users
- nest g service users

- npm run start:dev

## creer une ressource ( [module] + [entities] + [dto])
- nest g res ressource_name

## REMARQUE
[] Izay zavatra ampiasaina anaty module iray dia verifiena hoe efa importer ao anatin'ilay module mapisa ve ..ex: services (providers), dependences, ...

## Postgres CLI
- brew services start postgresql@18
- psql -U postgres
-  \c glivraison

## Docker [chartdb]
- open -a Docker 
- docker images                 # voir les images
- docker ps -a                  # voir les conteneurs

- docker run -d --name chartdb -p 8080:80 ghcr.io/chartdb/chartdb:latest  # créer + démarrer
- conteneur : chartdb
- docker start chartdb          # démarrer
=> [http://localhost:8080/]
- docker stop chartdb           # arrêter
- docker restart chartdb        # redémarrer

- docker rm chartdb             # supprimer le conteneur
- docker rmi ghcr.io/chartdb/chartdb:latest  # supprimer l’image

## pour tester les api directement dans vsc
- install [plugin] vsc Rest client
- creer un fichier requests.http 

## install class dependency ?
[class-transformer]
- npm i --save class-validator class-transformer
[mailer]
- npm i --save-dev @types/nodemailer   
- npm i --save @nestjs-modules/mailer nodemailer
mampiasa [HandlebarsAdapter] mila config -> nest-cli.json & app.module -> MailerModule => dir: join(__dirname, "common/mail/templates"),
in nest-cli : 
      "assets": [{
            "include": "common/mail/templates/*",
            "watchAssets": true
            }],


[ORM]
- npm install @nestjs/typeorm typeorm pg
[JWT]
- npm install --save @nestjs/jwt 
- verifier JWT => npm list @nestjs/jwt
[CONFIG]
- npm i --save @nestjs/config => creer .env file

## Synchrone
Commander
   ↓
Attendre 5 minutes
   ↓
Recevoir café

## Asynchrone 
Commander café
      ↓
On te donne un ticket
      ↓
Tu fais autre chose
      ↓
On t'appelle quand c'est prêt

=> rehefa misy operation qui prend du temps dia async ny fonction

## Design = Typo , Color, Logo
- fontswipe
- colorgen
- faviconmaker

## Configuration SMTP GMAIL
- google account -> gerer mon compte -> securité -> activer la [Validation en deux étapes] -> ... -> data & privacy -> Mots de passe des applications ->


## Seeders
- npm uninstall typeorm
- npm install typeorm@0.3.25
- npm install typeorm-extension
{
  "scripts": {
    "seed": "typeorm-extension seed:run -d dist/database/data-source.js"
  }
}
- npm run seed

## GIT
- git config --global user.name
- git config --global user.email
- git config --global --list 
- brew install gh
- gh auth login
[Tu peux supprimer les credentials GitHub enregistrés :]
- printf "protocol=https\nhost=github.com\n\n" | git credential-osxkeychain erase
[puis]
- gh auth setup-git
- gh auth status
- git config --global --get credential.helper
- git remote -v
## Probleme de permission 
- ls -ld ~/.config
[si le root est proprietaire]
- sudo chown -R "$(whoami)":staff ~/.config
