var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var UserContextMixin = require('../../jsx/mixins/UserContextMixin.jsx');
var DataStore = require('../../jsx/stores/DataStore.jsx');
var UpcomingChallenges = require('./UpcomingChallenges.jsx');
var UpcomingMatches = require('./UpcomingMatches.jsx');
var RecentMatches = require('./RecentMatches.jsx');
var ChallengePendingApp = require('../challenge/pending/ChallengePendingApp.jsx');

var HomeApp = React.createClass({
    mixins: [UserContextMixin],
    componentWillMount: function () {
        DataStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        DataStore.removeChangeListener(this._onChange);
    },
    componentDidMount: function () {

    },
    _onChange: function () {
        this.setState({user: DataStore.getAuthUserId()});
    },
    render: function () {
        if (this.getUser().id == 0) {
            return null;
        }
        var welcome = <Link to='info' params={{userId: this.getUser().userId}}>
            <span id="welcome-name">{'Welcome ' + this.getUser().fName}</span> </Link>
        var button = null;
        if (this.getUser().isChallenge()) {
            button =  <Link id="request-link" to="challengeMain">
                <button className="btn btn-default btn-primary request">
                    <span className="glyphicon glyphicon-plus-sign"></span>
                    <b>Request</b></button>
                </Link>
        }

        return (
            <div id="home-app">
                <h2 className="welcome" >
                    <span className="glyphicon glyphicon-user"></span>
                    {welcome}
                    {button}
                </h2>
                <ChallengePendingApp />
                <UpcomingChallenges />
                <RecentMatches />
            </div>
        );
    }
});

module.exports = HomeApp;