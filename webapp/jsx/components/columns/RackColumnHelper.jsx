var React = require('react/addons');
var FixedDataTable = require('fixed-data-table');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;
var UserLink = require('../UserLink.jsx');
var TeamLink = require('../TeamLink.jsx');
var Team = require('../../../lib/Team');
var UsersStat = require('../../../lib/UsersStat');
var TeamStat  = require('../../../lib/TeamStat');
var User  = require('../../../lib/User');
var Result = require('../../../lib/Result');
var TeamMatch = require('../../../lib/TeamMatch');
var ColumnConfig = require('./ColumnConfig.jsx');


var renderRackColumn = function (type,render) {
    return (
        <Column
            label={type == 'racksFor' ? 'RW' : 'RL'}
            width={ColumnConfig.racksFor.width}
            cellClassName="racks"
            dataKey={type}
            cellDataGetter={render}
            />
    )
};

var rackStat = function(type) {
    var render = function(cellKey,result) {
        try {
            if (result.stat.hasOwnProperty(type))
                return result.stat[type];
        } catch (e) {
            console.warn(e);
        }
        return 0;
    };
    return renderRackColumn(type,render);
};
var racksAgainstStat = function() {
    return rackStat('racksAgainst');
};
var racksForStat = function() {
    return rackStat('racksFor');
};

var racksTeamMember = function(type,team) {
    var render = function(cellKey,result) {
        try {
            if (result instanceof Result && team instanceof Team) {
                if (type == 'racksFor')
                    return result.getRacks(team.id == result.winnersTeam.id ? result.winner : result.loser);

                return result.getOpponentRacks(team.id == result.winnersTeam.id ? result.loser : result.winner);
            }
        } catch(e) {
            console.warn(e);
        }
        return 0;
    };
    return renderRackColumn(type,render);
};
var racksAgainstTeamMember = function(team) {
    return racksTeamMember('racksFor',team);
};
var racksForTeamMember = function(team) {
    return racksTeamMember('racksFor',team);
};

var racksUser = function(type,user) {
    var render = function(cellKey,result) {
        try {
            if (result instanceof Result) {
                if (type == 'racksFor') {
                    return result.getRacks(user);
                }
                return result.getOpponentRacks(user);
            }
        } catch(e) {
            console.warn(e);
        }
        return 0;
    };
    return renderRackColumn(type,render);
};
var racksForUser = function(user) {
    return racksUser('racksFor',user);
};

var racksAgainstUser = function(user) {
    return racksUser('racksAgainst',user);
};

module.exports = {
    racksForUser: racksForUser,
    racksAgainstUser: racksAgainstUser,
    racksAgainstTeamMember: racksAgainstTeamMember,
    racksForTeamMember: racksForTeamMember,
    racksAgainstStat: racksAgainstStat,
    racksForStat: racksForStat
};
