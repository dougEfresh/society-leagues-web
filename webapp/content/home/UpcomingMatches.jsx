var React = require('react');
var UserContextMixin = require('../../jsx/mixins/UserContextMixin.jsx');
var UserLink= require('../../jsx/components/links/UserLink.jsx');
var TeamLink= require('../../jsx/components/links/TeamLink.jsx');
var moment = require('moment');
var Util = require('../../jsx/util.jsx');

var UpcomingMatches = React.createClass({
    mixins: [UserContextMixin],
    getInitialState: function() {
         return {
             data: []
        }
    },
    componentWillMount: function() {
    },
    componentWillUnmount: function() {
    },
    componentDidMount: function() {
        Util.getSomeData(
            {
                url: '/api/teammatch/user/' + this.getUser().id + '/current',
                callback : function(d){this.setState({data: d});}.bind(this),
                module: 'UpComingMatches'
            }
        );
    },
    render: function() {
        var user = this.getUser();
        var rows = [];
        var now = moment().subtract(1,'days');
        if (this.state.data.length == 0) {
            return null;
        }
        this.state.data = this.state.data.sort(function(a,b){
            return a.matchDate.localeCompare(b.matchDate);
        });
        var cnt = 0;
        this.state.data.forEach(function(m){
            var md = moment(m.matchDate);
            if (md.isBefore(now)) {
                return;
            }
            cnt++;
            if (cnt > 3) {
                return;
            }
            rows.push (
                    <tr key={m.id}>
                        <td><span> {Util.formatDateTime(m.matchDate)}</span></td>
                        <td><TeamLink team={m.opponentTeam} /></td>
                    </tr>
            );
        });
        if (rows.length == 0){
            return null;
        }

        return (
            <div className="col-xs-12 col-md-3">
                <div className="table-responsive">
                <table className="table table-condensed table-striped table-bordered table-responsive" >
                    <tbody>{rows}</tbody>
                </table>
                </div>
            </div>
        );
        /*
        var teams = this.getUser().getCurrentTeams();
        var yesterday = moment().subtract(1,'day');
        var upComingMatches = [];

        teams.forEach(function(t){
            var matches = t.getMatches();
            matches.forEach(function(m) {
                var mDate = moment(m.matchDate);
                if (mDate.isAfter(yesterday)) {
                    upComingMatches.push(m);
                }
            });
        });

        upComingMatches = upComingMatches.sort(function(a,b){
            return b.matchDate.localeCompare(a.matchDate);
        });
        var matches = [];
        for (var i=0; i < upComingMatches.length && i < 3; i++) {
            var match = upComingMatches[i];
            var m = moment(match.matchDate);
                matches.push(
                    <span key={i} className="next-match">
                        {m.format('ddd MMM Do ') }
                        <TeamLink team={match.winner} seasonId={match.season.id}/>
                        {' vs. '}
                        <TeamLink team={match.loser} seasonId={match.season.id}/>
                    </span>
                );
        }
        if (matches.length == 0) {
            return (
                <div id={'upcoming-matches'} className="panel panel-default">
                    <div className="panel-heading" >Upcoming Matches</div>
                        <div className="panel-body" >
                            <span id="no-matches">You have no matches scheduled</span>
                        </div>
                </div>
            );
        }
        return (
            <div id={'upcoming-matches'} className="panel panel-default">
                <div className="panel-heading" >Upcoming Matches</div>
                <div className="panel-body" >
                    {matches}
                </div>
            </div>
        )
        */
    }
});

module.exports = UpcomingMatches;
