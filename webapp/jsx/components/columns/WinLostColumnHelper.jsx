var React = require('react/addons');
var FixedDataTable = require('fixed-data-table');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;
var UserLink = require('../links/UserLink.jsx');
var TeamLink = require('../links/TeamLink.jsx');
var Team = require('../../../lib/Team');
var User  = require('../../../lib/User');
var Result = require('../../../lib/Result');
var UserMatch = require('../../../lib/UserMatch');
var TeamMatch = require('../../../lib/TeamMatch');
var ColumnConfig = require('./ColumnConfig.jsx');

var renderWinLost = function(render) {
    return (
        <Column
            label={'W/L'}
            cellClassName="win-lost"
            width={ColumnConfig.winLost.width}
            dataKey={'wl'}
            cellDataGetter={render}
            />
    );
};

var winLostUser = function(user) {
    var render = function(cellKey,result) {
        try {
            if (result instanceof UserMatch) {
                return result.match.isWinner(result.user) ? 'W' : 'L';
            }
            if (result instanceof Result && user instanceof User) {
                return result.isWinner(user) ? 'W' : 'L';
            }
        } catch(e){
            console.log(e);
        }
        return 'N/A';
    };
    return renderWinLost(render);
};

var winLostTeam = function(team) {
    var render = function(cellKey,result) {
        try {
            if (result instanceof Result && team instanceof Team) {
                return result.winnersTeam.id == team.id ? 'W' : 'L';
            }
        } catch(e){
            console.log(e);
        }
        return 'N/A';
    };
    return renderWinLost(render);
};

var winLostTeamMatch = function(team) {
    var render = function(cellKey,result) {
        try {
            if (result instanceof TeamMatch) {
                return result.isWinner(team) ? 'W' :'L';
            }
        } catch(e){
            console.log(e);
        }
        return 'N/A';
    };
    return renderWinLost(render);
};


module.exports = {
    winLostUser:winLostUser,
    winLostTeamMatch: winLostTeamMatch,
    winLostTeam: winLostTeam
};