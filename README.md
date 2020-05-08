# LoL Finder
Statistics and profile information finder for popular MOBA League of Legends.

List of Riot API's used:  
* Champion
* Champion Mastery v4
* Match v4
* Summoner v4

BackEnd Routes (Used GET method for all routes)
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
3. Match
   * `/match-history/:summonerName`
     * Get matchlist for specified summoner
   * `/match-history/:matchId `
     * Get match by match ID
4. Summoner
   * `/summoner/:summonerName`
     * Get summoner by summoner name

FrontEnd Routes  
1. Home Page (`/`)
2. Profile Page (`/profile`)
3. Summoner Page (`/summoner/:summonerName`)
4. Mastery Page (`/summoner/:summonerName/mastery`)
