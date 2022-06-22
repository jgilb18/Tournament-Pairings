Tournament: 

This program seeks to mimic the pairing system of a chess tournament 
using the Swiss System tournament style. When I was younger, I use to play chess at the tournaments
and always wondered how the pairing system worked. I thought it would be fun to try and recreate
a simpler version of the pairing system.

At the start of the program, the player is prompted to enter the names of the players, and then
click "Start Tournament" once all of the player names have been added. Each player begins with 0 points.
Once the tournament has begun, the program takes all of the players and pairs them such that:
1) Beginning with the highest score, all players with that score will be randomly assigned an opponent
    from the pool of other players with that score.
2) If there is a player left over, that player will be paired with a randomly chosen member of the second
    highest score group.
3) If there are an odd number of total players, the player with the lowest score (or one person among
    the group of players with the lowest score) will receive a "Bye". The player that receives the Bye will
    not be paired with anyone that round and will earn a free point.

After the players have been paired, an option will appear to select the result on each board. 
Results can either be a White Victory, Black Victory, or draw. If White wins, the player playing
white earns a point. If Black wins, the player playing black earns a point. In the event of a draw,
both players earn half of a point.

Once the results of the round have all been entered, the user can select "Next Round"
to start a new round or "Complete" to end the tournament. If the user selects "Next Round", 
the program will make new pairings based on the updated stores. If the user selects "Complete", 
a record of all the players and their scores will be printed at the bottom of the screen.

Potential Additional Features to add:
A) Pairing Collision avoidance - An effort is made to prevent the same two players from 
    playing each other if possible
B) Equal Turns of White and Black: Balance the number of times each player is white or black
    (prevent a player from being assigned white 5 times in a row)
C) Features to Edit Player Scores/Names once the tournament has begun
D) Adding a check to make sure two players don't have the same name when beginning the tournament.