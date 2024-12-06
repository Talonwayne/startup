# Ultimate Tic Tac Toe

## Startup Service
I added the ultimate tictactoe to play. then I added the api based on simon to get a generik service out. that can be found in index.js. then I updated the about page, added the quote api from 260.click. scores and login call the service endpoints. Service endpoints are there in index.js. 

## Startup React
I modeled my project after the tic tac toe, Updated all of the css, and converted my old code to react. I fixed the Login screen to be able to store login data later on. I got React to work and have the simon game as a placeholder for the play tab. I used react hooks throughout the project and used the react router in the app.jsx file. 

## Explination
This Project will make a simple game called Ultimate Tic Tac Toe.
This is where 2 players will dynamically play 9 games of Tic Tac Toe at the same time, that come together to make one big game of tic tac toe. If one player wins a smaller game of tic tac toe, then their symbol takes over that grid in the larger game of tic tac toe. Whoever win the large game of tic tac toe wins the game. 


## Key Features
The smaller games of tic tac toe are evaluated as a normal game of tic tac toe. If one team moves in the top corner on the small game then the other team must play in the top corner game if possible. The program will have a server that sends data to each of the players who login on the website. They will play games and have a simple history of the games stored. This history will then be used to calculate a player score like elo.

## How Each Technology Will Be Used
### HTML
for this Project I made 4 html pages, 

1 for the home page and login called index.html

2 for Websocket where the players can play the game against each other called play.html

3 for a database display of highscores called scores.html

4 for an explination page with fun quotes added from a 3rd party api called about.html

### CSS
Small animations within the game and improved styling of the webpage. 
### JavaScript
How the users will interact with the game and call the code to run the game. 
### Webservice
The simple code to run the logic of the game and share the information between the people who are playing the game. 
### Authentication
How the players will login and the tags to keep the results of the matches. 
### Database data
Where the match history will be stored.
### WebSocket data
All of the data given from the server to the user.

## Sketch
 ![cover](https://github.com/Talonwayne/startup/blob/main/Sketch.png)
