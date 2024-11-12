# seab-vteam

Start up system with Docker
---------------------------

To start up the system, follow the steps below:

1. Install Docker/Docker compose. This article might help you with that: https://dbwebb.se/kunskap/installera-virtualiseringsmiljon-docker
2. Download the Docker images that are needed by using these commands:
```
docker pull emelieklund/vteam-client:1.0
```
3. Start the system by entering:
```
docker compose up client
```
4. To stop the system, enter:
```
docker compose down client
```
