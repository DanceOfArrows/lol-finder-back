# LoL Finder
LoL Finder allows users to find profile data of players in the popular MOBA game "League of Legends".  The data can normally be found within
the client's search function, but is inaccessible while in-game or not on a desktop.  This goal of this app is to alleviates this issue and to 
also display player data in an easy to read manner.

Feature List:  
* Displays the current free champion rotation on the home page
* Search for player profile which returns:
  * Champion Mastery
  * Current rank
  * Match history
* Use of back end to hide API key and to filter return data

List of Riot API's used:  
* Champion
* Champion Mastery v4
* League v4
* Match v4
* Summoner v4

BackEnd Routes
1. Champion
   * `/champion/rotation`
     * Get current free champion rotation
2. Champion Mastery
   * `/mastery/:summonerName`
     * Get all champion mastery for specified summoner
   * `/mastery/:summonerName/:championName`
     * Get champion mastery of a specific champion for specified summoner
   * `/mastery/:summonerName/score`
     * Get total mastery score for specified summoner
3. League 
   * `/league/:summonerName`
     * Get the rank of the summoner
4. Match
   * `/match-history/:summonerName`
     * Get matchlist for specified summoner
   * `/match-history/:matchId `
     * Get match by match ID
5. Summoner
   * `/summoner/:summonerName`
     * Get summoner by summoner name

FrontEnd Routes  
1. Home Page (`/`)
2. Summoner Page (`/summoner/:summonerName`)
3. Mastery Page (`/summoner/:summonerName/mastery`)
