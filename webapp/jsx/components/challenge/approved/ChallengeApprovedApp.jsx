var React = require('react/addons');
var GroupList = require('../group/GroupList.jsx');
var UserContextMixin = require('../../../mixins/UserContextMixin.jsx');
var ChallengeStatus  = require('../../../constants/ChallengeStatus.jsx');
var DataStore = require('../../../stores/DataStore.jsx');
var Bootstrap = require('react-bootstrap')
    ,Panel = Bootstrap.Panel;

var ChallengeAcceptedApp = React.createClass({
    mixins: [UserContextMixin],
    getInitialState: function () {
        return  {
            challengeGroups: []
        };
    },
    componentWillMount: function () {
        DataStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        DataStore.removeChangeListener(this._onChange);
    },
    componentDidMount: function () {
        if (this.getUser().userId != 0 && this.getUser().challenges != undefined)
            this.setState({challengeGroups: this.getUser().challenges[ChallengeStatus.ACCEPTED]});
    },
    componentWillReceiveProps: function() {

    },
    _onChange: function() {
        if (this.getUser().userId != 0 && this.getUser().challenges != undefined)
            this.setState({challengeGroups: this.getUser().challenges[ChallengeStatus.ACCEPTED]});
    },
    render: function(){
        if (this.state.challengeGroups.length == 0) {
            return (<Panel><div><p>You have no challenges accepted</p></div></Panel>)
        }
        return (
            <div id="approvedApp">
                <GroupList type={ChallengeStatus.ACCEPTED} noSelect={false} challengeGroups={this.state.challengeGroups}/>
            </div>
        )
    }
});

module.exports = ChallengeAcceptedApp;