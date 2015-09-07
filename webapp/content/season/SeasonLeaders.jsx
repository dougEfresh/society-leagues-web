var React = require('react/addons');
var Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    , Link = Router.Link;

var UserContextMixin = require('../../jsx/mixins/UserContextMixin.jsx');
var Stat =  require('../../lib/Stat');
var UserLink = require('../../../webapp/jsx/components/links/UserLink.jsx');
var Util = require('../../jsx/util.jsx');

var SeasonLeaders = React.createClass({
    mixins: [UserContextMixin,Router.State,Router.Navigation],
    getInitialState: function() {
        return {
            update: Date.now(),
            stats: []
        }

    },
    getData: function() {
        Util.getData('/api/stat/season/players/' + this.getParams().seasonId, function(d){
            this.setState({stats: d});
        }.bind(this));
    },
    componentDidMount: function () {
        this.getData();
    },
    componentWillReceiveProps: function (o, n) {
        var now = Date.now();
        if ( now - this.state.update > 1000*60)
            this.getData();
    },
    getRows : function(data) {
        var rows = []  ;
        data.forEach(function(d){
            var hc = Util.getHandicap(d.user,this.getParams().seasonId);
            rows.push(
                <tr key={d.user.id}>
                    <td>{d.user.name}</td>
                    <td>{hc}</td>
                    <td>{d.wins}</td>
                    <td>{d.loses}</td>
                    <td>{d.racksWon}</td>
                    <td>{d.racksLost}</td>
                    <td>{d.winPct.toFixed(3)}</td>
                </tr>
            );
        }.bind(this));
        return rows;
    },
    render: function() {
        var stats = this.state.stats;
        if (stats.length == 0){
            return null;
        }

        return (
                <div className="table-responsive">
                <table className="table table-hover table-condensed table-striped table-responsive">
                    <tr>
                        <th>Player</th>
                        <th>HC</th>
                        <th>W</th>
                        <th>L</th>
                        <th>RW</th>
                        <th>RL</th>
                        <th>%</th>
                    </tr>
                     <tbody>
                     {this.getRows(stats)}
                     </tbody>
                </table>
                </div>
            );
    }
});

module.exports = SeasonLeaders;
