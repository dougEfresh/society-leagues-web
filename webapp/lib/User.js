var Status = require('./Status');
var DivisionType = require('./DivisionType');
var Stat = require('./Stat');

function User(id,first_name,last_name,challenges) {
    this.id = id;
    this.userId = id;
    this.fName = first_name;
    this.lName = last_name;
    this.name = first_name + ' ' + last_name;
    this.seasons = [];
    this.teamMatches = [];
    this.results = [];
    this.stats = [];
    this.teams = [];
    this.challenges = challenges;
}

User.prototype.getUserId = function () { return this.id ; };
User.prototype.userId = function () { return this.userId ; };
User.prototype.id = function () { return this.id ; };
User.prototype.lName = function () { return this.lName ; };
User.prototype.fName = function () { return this.fName ; };
User.prototype.sName = function() {return this.lName + ' ' + this.lName.substr(0,1);};
User.prototype.name = function () { return this.name ; };
User.prototype.challenges = function () { return this.challenges ; };
User.prototype.setStats = function(s) {this.stats = s;};
User.prototype.isChallenge = function() {
    var challenge = false;
    this.seasons.forEach(function(s){
        if (s.division.type  == DivisionType.EIGHT_BALL_CHALLENGE ) {
            challenge = true;
        }
        if (s.division.type  == DivisionType.NINE_BALL_CHALLENGE ) {
            challenge = true;
        }
    });
    return challenge;
};

User.prototype.getCurrentTeams = function() {
    var activeTeams = [];
    this.teams.forEach(function(t) {
        if (t.isActive()) {
            activeTeams.push(t);
        }
    });

    var userActiveTeams = [];
    activeTeams.forEach(function(t){
        this.getCurrentSeasons().forEach( function(s){
            if (t.getSeason().id == s.id) {
                userActiveTeams.push(t);
            }
        });
    }.bind(this));
    return userActiveTeams;
};

User.prototype.getCurrentSeasons = function() {
    var seasons = [];
    this.seasons.forEach(function(s){
        if (s.isActive()) {
            seasons.push(s);
        }
    });
    return seasons;
};
User.prototype.getPastSeason = function() {
    var seasons = [];
    this.seasons.forEach(function(s){
        if (!s.isActive()) {
            seasons.push(s);
        }
    });
    return seasons;
};

User.prototype.getSeasons = function() {
    return this.seasons;
};
User.prototype.addSeason = function(season) {
    if (season == null || season == undefined)
        return;
    this.seasons.push(season);
};
User.prototype.addTeam = function(team) {
    if (team == undefined || team == null)
        return ;
    this.teams.push(team);
};
User.prototype.addResult= function(r) {
    if (r == undefined || r == null)
        return ;
    this.results.push(r);
};

User.prototype.getResults = function() {
    return this.results;
};
User.prototype.addStats = function(stats) {
    if (stats == undefined)
        return;

    this.stats.push(stats);
};
User.prototype.getStats = function() {
    for(var i =0 ; i < this.stats.length; i++) {
        if (this.stats[i].type != undefined && this.stats[i].type != null) {
            if (this.stats[i].type == 'all') {
                return this.stats[i];
            }
        }
    }
    return Stat.DEFAULT;
};
User.prototype.getSeasonStats = function(seasonId) {
    var stats = [];
    for(var i =0 ; i < this.stats.length; i++) {
        if (this.stats[i].season != null && this.stats[i].season != undefined) {
            if (seasonId != undefined && seasonId != null && this.stats[i].season.id == seasonId) {
                return this.stats[i];
            }
            stats.push(this.stats[i]);
        }
    }
    return stats;
};
User.prototype.getHandicapStats = function() {
    var stats = [];
    for(var i =0 ; i < this.stats.length; i++) {
        if (this.stats[i].type != undefined && this.stats[i].type != undefined) {
            if (this.stats[i].type.indexOf('handicap') >= 0) {
                stats.push(this.stats[i]);
            }
        }
    }
    return stats;
};

User.DEFAULT_USER = new User(0,'unknown','',{});

module.exports = User;