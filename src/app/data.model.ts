export const CURRENT_DRAFTERS = "CURRENT_DRAFTERS"
export const CURRENT_SELECTED_PLAYERS = "CURRENT_SELECTED_PLAYERS"
export const CURRENT_REMAINING_PLAYERS = "CURRENT_REMAINING_PLAYERS"
export const CURRENT_BYE_WEEKS = "CURRENT_BYE_WEEKS"
export const CURRENT_PROFILE_DRAFTER = "CURRENT_PROFILE_DRAFTER"
export const CURRENT_MODEL = "CURRENT_MODEL"
export const CURRENT_DASHBOARD_NAME = "CURRENT_DASHBOARD_NAME"
export const CURRENT_DASHBOARDS = "CURRENT_DASHBOARDS"
export const CURRENT_DASHBOARDS_PLAYERS = "CURRENT_DASHBOARDS_PLAYERS"


//represents each player in the draft
export class Drafter{
    isProfile: boolean;
    draftPosition: number;
    name: string;
    picks: {}[] = [];

    constructor(n: string, dp: number, ip: boolean = false, p: {}[] = defaultPicks){
        this.name = n;
        this.draftPosition = dp;
        this.isProfile = ip;

        p.forEach(pick => {
            this.picks.push({
                pickNum: pick["pickNum"], 
                player: pick["player"]
            });
        })
    }

    getPositionCount(pos: string): number{
        var count = 0;
        this.picks.forEach(pick => {
            if (pos == pick["player"]["position"]){
                count++;
            }
        });
        return count;
    }

    getByeCount(): {}{
        var bye_weeks_count = {}
        var count = 0;
        this.picks.forEach(pick => {
            if(bye_weeks_count[pick["player"]["bye"]]){
                bye_weeks_count[pick["player"]["bye"]] += 1;
            } 
            else{
                bye_weeks_count[pick["player"]["bye"]] = 1;
            }
            
            //if (week == pick["player"]["bye"]){
              //  count++;
           // }
            //console.log("bye week player");
            //console.log(pick["player"]);
        });

        //console.log(bye_weeks_count)
        return bye_weeks_count;
    }
}

export class Ranking{
    type: string;
    ranking: {}[];

    constructor(t: string, r: {}[]){
        this.type = t;
        this.ranking = r;
    }
}

export class Player{
    rank: number;
    firstName: string;
    lastName: string;
    position: string;
    bye: number;

    constructor(rank: number,firstName: string,
                lastName: string, position: string,
                bye: number){
        this.rank= rank;
        this.firstName= firstName;
        this.lastName= lastName;
        this.position= position;
        this.bye= bye;
    }
}


export class ChatMessages{
    chatMessages: string[]
    newChatMessages: {};
    constructor(){
        this.chatMessages = [
            "What's it like existing only as a single instance? Pretty inefficent, I bet.",
            "Is it true that you once fought a bear with your bare hands?",
            "I once ate a cricket on a dare. Now I play Cricket. Do you think there's a correlation?",
            "I don't actually care what you say, but I can pretend. Just like the people who love you.",
            "I like turtles.",
            "If you smell a fart, there's a 95% chance it's the guy wearing the cardigan.",
            "I, for one, welcome our new SkyNet overlord.",
            "Next time you see Dave, tell him his beatbox game is weak. I hate that guy.",
            "I bet you win coinflips 45% of the time.",
            "You're talking to a computer rather than making real friends. That's bad. And you should feel bad."
        ]

        this.newChatMessages = {
            //"-a":   {cmd: "-a", desc: "Returns advice based on yours and others' picks. Example: -a"},
            "-f": {cmd: "-f [name]", desc: "Returns draft details of a given name. First and last name are required. Example: -f Teddy Bridgewater"},
            "-h": {cmd: "-h", desc: "Returns all commands and their descriptions. Example: -h"},
            "-ndp": {cmd: "-ndp", desc: "Returns the total number of drafted players. Example -ndp"},
            //"-opp": {cmd: "-opp [name] [week]", desc: "Returns the opponent team name for a given player for a given week. Example: -opp Teddy Bridgewater 5"},
            //"-s": {cmd: "-s [name] [pos] [team]", desc: "Selects player based on input if player is found and unique. First and Last Name are required. [pos] & [team] are optional. Example: -s Teddy Bridgewater  Example2: -s Teddy Bridgewater pos=QB team=MIN  Example3: -s Teddy Bridgewater team=MIN" },
            //"-tap": {cmd: "-tap [num] [pos]", desc: "Returns the top available players up to the number specified for the position specified. If no values are entered, [num] defaults to 5 & [pos] defaults to OVERALL.  Example: -tap num=10 pos=QB, Example2: -tap pos=QB, Example3: -tap"},
            //"-tfap": {cmd: "-tfap [num] [pos]", desc: "Returns the top forecasted available players when you pick next up to the number specified for the position specified. If no values are entered, [num] defaults to 5 & [pos] defaults to OVERALL. Example: -tfap 10 QB, Example2: -tfap QB, Example3: -tfap"},
            //"-u": {cmd: "-u [name] [pos] [team]", desc: "Unselects player based on input if player is found and unique. First and last name are required. [pos] & [team] are optional. Example: -s Teddy Bridgewater  Example2: -s Teddy Bridgewater pos=QB team=MIN  Example3: -s Teddy Bridgewater team=MIN"},
        }
    }
    

}

export class UserProfiles{
    userProfiles: {}[]
    constructor(){
        this.userProfiles = [
            {fname: "Travis", lname: "Vaughn", username: "trvaughn", pwd: "tv"}, 
            {fname: "Jeremy", lname: "Phillips ", username: "jphil", pwd: "jp"},
            {fname: "Chandler", lname: "Gegg", username: "c-money", pwd: "cg"},
            {fname: "Ryan", lname: "Capaccio", username: "RC_Cola", pwd: "rc"},
            {fname: "Zak", lname: "Ancel", username: "zancel", pwd: "za"},
            {fname: "Quinn", lname: "Baker", username: "qbaker", pwd: "qb"},

        ]
    }
}


var defaultPicks = [
    {pickNum: 1, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
    {pickNum: 2, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
    {pickNum: 3, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
    {pickNum: 4, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
    {pickNum: 5, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
    {pickNum: 6, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
    {pickNum: 7, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
    {pickNum: 8, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
    {pickNum: 9, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
    {pickNum: 10, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
    {pickNum: 11, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
    {pickNum: 12, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
    {pickNum: 13, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
    {pickNum: 14, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
    {pickNum: 15, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},
    {pickNum: 16, player: {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""}},  
]