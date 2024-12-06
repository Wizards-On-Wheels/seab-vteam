# seab-vteam

Start up system with Docker
---------------------------

To start up the system, follow the steps below:

1. Install docker/docker-compose. This article might help you with that: https://dbwebb.se/kunskap/installera-virtualiseringsmiljon-docker
2. Start the Docker Desktop application.
3. Clone this repo and go to the directory.
4. Download the docker images that are needed by using these commands:
```
docker pull emelieklund/vteam-server:1.0
```
```
docker pull emelieklund/vteam-client:1.0
```
5. Start the system by entering:
```
docker compose up -d server client
```
6. Open up http://localhost:3000
7. To stop the system, enter:
```
docker compose down client server
```
