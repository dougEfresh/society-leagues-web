var React = require('react/addons');
var Router = require('react-router')
    , Link = Router.Link
    , History = Router.History;

var UserContextMixin = require('../../jsx/mixins/UserContextMixin.jsx');
var TeamStandings = require('../team/TeamStandings.jsx');
var TeamChart = require('../team/TeamChart.jsx');
var Util = require('../../jsx/util.jsx');
var firstBy = require('../../lib/FirstBy.js');
var SeasonStandings = require('../season/SeasonStandings.jsx');
var SeasonMatches = require('../season/SeasonMatches.jsx');
var SeasonLeaders = require('../season/SeasonLeaders.jsx');
var UserResults = require('../../jsx/components/result/UserResults.jsx');

var DisplayApp = React.createClass({
    mixins: [UserContextMixin,History],
     getInitialState: function() {
         var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
         var toggle = true;
         if (width < 768) {
             toggle = false;
         }
         return {
             update: Date.now(),
             teams : [],
             userTeams:  [],
             activeUser: null,
             activeTeam: null,
             activeSeason: null,
             toggleTeam: toggle,
             toggleSeason: true,
             toggleUser: toggle,
             mobile : width < 768
         }
     },
    componentDidMount: function () {
        if (this.props.params.seasonId) {
            this.getSeasonData(this.props.params.seasonId);
        }

        if (this.props.params.teamId) {
            this.getTeamData(this.props.params.teamId);
        }

        if (this.props.params.userId) {
            this.getUserData(this.props.params.userId);
        }
    },
    getSeasonData: function(seasonId) {
        Util.getSomeData({
            url: '/api/season/' + seasonId,
            callback: function(d) {this.setState({activeSeason: d})}.bind(this)
        });
    },
    getTeamData: function(teamId) {
        Util.getSomeData({
            url: '/api/team/' + teamId,
            callback: function(d) {this.setState({activeTeam: d})}.bind(this)
        });
    },
    getUserData: function(userId) {
         if (userId)
             Util.getSomeData({
                 url: '/api/user/' + userId,
                 callback: function(d) {this.setState({activeUser: d})}.bind(this)
             });
    },
    getData: function() {
        var userCb = function(d) {
            if (this.props.params.userId == undefined) {
                this.setState({users: d, activeUser: null})
                return;
            }
            d.forEach(function(u){
                if (u.id == this.props.params.userId) {
                    this.setState({users: d, activeUser: u})
                }
            }.bind(this));

        }.bind(this);
        var teamCb = function(d) {
            var activeTeam = null;
            var activeSeason = null;
            d.forEach(function(t){
                if (this.props.params.teamId != undefined && t.id == this.props.params.teamId) {
                    activeTeam = t;
                }
                if (this.props.params.seasonId == t.season.id){
                    activeSeason  = t.season;
                }
            }.bind(this));
            this.setState({teams: d, activeTeam: activeTeam, activeSeason: activeSeason})
        }.bind(this);

        Util.getSomeData({
                url: '/api/team/active',
                callback: teamCb,
                module: 'TeamApp',
                router: this.props.history
            }
        );
        Util.getSomeData({
                url: '/api/user/active',
                callback: userCb,
                module: 'UserApp',
                router: this.props.history
            }
        );
    },
    componentWillReceiveProps: function (n) {
        if (n.params.seasonId != this.props.params.seasonId) {
            this.getSeasonData(n.params.seasonId);
        }

        if (this.props.params.teamId != n.params.teamId) {
            this.getTeamData(n.params.teamId);
        }
        if (this.props.params.userId != n.params.userId) {
            this.getUserData(n.params.userId);
        }
    },
    changeTeam: function(t) {
        return function(e) {
            e.preventDefault();
            console.log('Going  team to ' + t.name);
            this.state.activeUser = null;
            if (this.state.mobile) {
                this.state.toggleSeason = false;
                this.state.toggleTeam = true;
                this.state.toggleUser = false;
            }
            //this.setState({activeTeam: t, activeSeason: t.season, activeUser: null, toggleSeason: !this.state.mobile});
            this.props.history.pushState(null,'/app/display/' + t.season.id + '/' + t.id);
            //this.setState({activeTeam: t, activeUser: null, activeSeason: t.season, show: 'standings'});
        }.bind(this);
    },
    changeUser: function(u) {
        return function(e) {
            e.preventDefault();
            if (this.state.mobile) {
                this.state.toggleSeason = false;
                this.state.toggleTeam = false;
                this.state.toggleUser = true;
            }
            Util.getSomeData({
                url: '/api/team/user/' + u.id + '/' + this.props.params.seasonId,
                callback: function(d) {
                    console.log('Going to use ' + d.name + ' for ' + u.name);
                    this.props.history.pushState(null,'/app/display/' + this.props.params.seasonId + '/' + d.id + '/' + u.id)
                }.bind(this),
                module: 'ChangeUser'
            });
        }.bind(this);
    },
    toggleUser: function(e) {
        e.preventDefault();
        this.setState({toggleUser: !this.state.toggleUser});
    },
    toggleTeam: function(e) {
        e.preventDefault();
        this.setState({toggleTeam: !this.state.toggleTeam});
    },
    toggleSeason: function(e) {
        e.preventDefault();
        this.setState({toggleSeason: !this.state.toggleSeason});
    },
    render: function () {
        return (
                <div id="team-app">
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <div className="panel panel-default panel-standings">
                                <a onClick={this.toggleSeason} href="#">
                                <div className="panel-heading">
                                    <div className="row panel-title">
                                        <div className="col-xs-11 col-md-11">
                                            Standings
                                        </div>
                                        <div className="col-xs-1 col-md-1">
                                            <span className={"fa fa-caret-" + (this.state.toggleSeason ? "down" : "left")}></span>
                                        </div>
                                    </div>
                                </div>
                                </a>
                                <div className="panel-body">
                                    <SeasonStandings onClick={this.changeTeam} activeTeam={this.state.activeTeam} notitle={true} season={this.state.activeSeason} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className={"panel panel-default panel-members " + (this.state.activeTeam == null ? "hide" : "")}>
                                <a onClick={this.toggleTeam} href="#">
                                    <div className="panel-heading">
                                        <div className="row panel-title">
                                            <div className="col-xs-11 col-md-11">
                                                {this.state.activeTeam == null ? "Choose a team" : this.state.activeTeam.name}
                                            </div>
                                            <div className="col-xs-1 col-md-1">
                                                <span className={"fa fa-caret-" + (this.state.toggleSeason ? "down" : "left")}></span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <div className="panel-body">
                                    <TeamStandings onClick={this.changeUser} activeUser={this.state.activeUser} noteam={true} team={this.state.activeTeam} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-xs-12 col-md-6">
                            <div className={"panel panel-default panel-user-results " + (this.state.activeUser == null ? "hide" : "")}>
                                <a href="#" onClick={this.toggleUser} >
                                <div className="panel-heading" >
                                    <div className="row panel-title">
                                        <div className="col-xs-11 col-md-11">
                                            {this.state.activeUser == null  ? "Select a user" : this.state.activeUser.firstName}
                                        </div>
                                        <div className="col-xs-1 col-md-1">
                                            <span className={"fa fa-caret-" + (this.state.toggleUser ? "down" : "left")}></span>
                                        </div>
                                    </div>
                                </div>
                                </a>
                                <div className="panel-body">
                                        <UserResults onUserClick={this.changeUser} user={this.state.activeUser} season={this.state.activeSeason} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
});

module.exports = DisplayApp;
