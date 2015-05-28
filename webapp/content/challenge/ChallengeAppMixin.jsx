var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var Bootstrap = require('react-bootstrap')
    ,Badge = Bootstrap.Badge;
var ChallengeStatus = require('../../jsx/constants/ChallengeStatus.jsx');

var ChallengeAppMixin = {
    shouldRender: function() {
        return this.props.requests[this.props.type].length > 0;
    },
    getRequests: function() {
        return this.state.requests[this.props.type];
    },
    getTitle: function() {
        switch(this.props.type) {
            case ChallengeStatus.NOTIFY:
                return (<div>Needs Notification<span></span><Badge>{this.getRequests().length}</Badge></div>);
            case ChallengeStatus.PENDING:
                return (<div>Approval Required<span></span><Badge>{this.getRequests().length}</Badge></div>);
            case ChallengeStatus.SENT:
                return (<div>Sent Request<span></span><Badge>{this.getRequests().length}</Badge></div>);
            case ChallengeStatus.ACCEPTED:
                return (<div>Upcoming Challenges<span></span><Badge>{this.getRequests().length}</Badge></div>);
            default:
                return (<div>{this.props.type} <span></span><Badge>{this.getRequests().length}</Badge></div>);
        }
    }
};

module.exports = ChallengeAppMixin;