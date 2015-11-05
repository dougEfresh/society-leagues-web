var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var UserContextMixin = require('../../jsx/mixins/UserContextMixin.jsx');
var UserLink= require('../../jsx/components/links/UserLink.jsx');
var TeamLink= require('../../jsx/components/links/TeamLink.jsx');
var moment = require('moment');
var Util = require('../../jsx/util.jsx');
var Handicap = require('../../lib/Handicap');
var Status = require('../../lib/Status');
var ChallengePendingApp = require('../challenge/ChallengePendingApp.jsx');
var ChallengeAcceptedApp = require('../challenge/ChallengeAcceptedApp.jsx');
var ChallengeSentApp = require('../challenge/ChallengeSentApp.jsx');

var UpcomingChallenges = React.createClass({
    mixins: [UserContextMixin,Router.History],
    render: function() {
        var user = this.getUser();
        if (!user.challenge || this.props.data.length == 0) {
            return null;
        }
        var challenges = [];
        var pending = [];
        var sent = [];
        for (var i=0; i< this.props.data.length ; i++) {
            var challenge = this.props.data[i];
            if (challenge.status  == Status.ACCEPTED) {
                challenges.push(<ChallengeAcceptedApp key={challenge.id} challenge={challenge} />);
            }
            if (challenge.status  == Status.PENDING && challenge.userOpponent.id == this.getUser().id ) {
                pending.push(<ChallengePendingApp key={challenge.id} challenge={challenge} />);
            }
            if (challenge.status  == Status.PENDING && challenge.userChallenger.id == this.getUser().id ) {
                sent.push(<ChallengeSentApp key={challenge.id} challenge={challenge} />);
            }
        }
        var upComingChallenges = null;
        var pendingChallenges = null;
        var sentChallenges = null;

        if (challenges.length > 0) {
            upComingChallenges = (
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <div id={'accepted-challenges'} className="panel panel-default">
                            <div className="panel-heading" ><span>Upcoming</span></div>
                            <div className="panel-body" >
                                <table className={Util.tableCls + " table-challenge-upcoming"}>
                                <thead></thead>
                                <tbody>
                                    {challenges}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </div>
            );
        }

        if (pending.length > 0) {
            pendingChallenges = (
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <div id={pending-challenges} className="panel panel-warning">
                            <div className="panel-heading"><h4>Pending</h4></div>
                            <div className="panel-body" >
                                <table className={Util.tableCls + " table-challenge-upcoming"}>
                                <thead></thead>
                                <tbody>
                                    {pending}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </div>
            );

        }
        if (sent.length > 0) {
            sentChallenges = (
                <div id={'sent-challenges'} className="panel panel-success">
                <div className="panel-heading" >Sent Challenges</div>
                <div className="panel-body" >
                    <ul className="list-group home-upcoming-challenges">
                        {sent}
                    </ul>
                </div>
            </div>);
        }

        return (
            <div>
                {sentChallenges}
                {pendingChallenges}
                {upComingChallenges}
            </div>
        )
    }
});

module.exports = UpcomingChallenges;