# VTeam - Frontend repo

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Wizards-On-Wheels/seab-vteam/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/Wizards-On-Wheels/seab-vteam/?branch=main)

Start up system
---------------
Either use Docker Compose (see README.md in main repo) or start client repo with ```npm run dev```

Use application
---------------
### User
Go to http://localhost:3000 where you can register a new account and sign in. When logged in you can restock your account balance and see your current debt. You can also see your rental, payment and transaction history. When ready to rent a bike you can go to http://localhost:3000/mobileapp, or http://localhost:3000/user/map (two different versions). 

### Admin
Login with admin account. Here you can navigate between users, bikes and cities pages. To see a map that shows all parking stations and bikes, go to http://localhost:3000/simulation. Here you can also simulate bikes in movement.
