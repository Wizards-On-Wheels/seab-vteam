# seab-vteam

Start up system with docker
---------------------------

To start up the system, follow the steps below:

1. Install docker/docker-compose. This article might help you with that: https://dbwebb.se/kunskap/installera-virtualiseringsmiljon-docker
2. Clone this repo and go to the directory.
3. Download the docker images that are needed by using these commands (just one atm):
```
docker pull emelieklund/vteam-client:1.0
```
4. Start the system by entering:
```
docker compose up client
```
5. To stop the system, enter:
```
docker compose down client
```
