var React = require('react/addons');
var Bootstrap = require('react-bootstrap')
    ,Button = Bootstrap.Button
    ,Badge = Bootstrap.Badge
    ,TabbedArea = Bootstrap.TabbedArea
    ,TabPane = Bootstrap.TabPane
    ,Nav = Bootstrap.Nav
    ,NavItem = Bootstrap.NavItem
    ,Alert = Bootstrap.Alert
    ,Panel = Bootstrap.Panel;

var ReactRouterBootstrap = require('react-router-bootstrap')
    ,NavItemLink = ReactRouterBootstrap.NavItemLink
    ,MenuItemLink = ReactRouterBootstrap.MenuItemLink;

var Router = require('react-router')
    , RouteHandler = Router.RouteHandler;

var ChallengeStore = require('../../stores/ChallengeStore.jsx');
var ChallengeActions = require('../../actions/ChallengeActions.jsx');
var UserStore = require('../../stores/UserStore.jsx');
var ChallengeRequestApp = require('./request/ChallengeRequestApp.jsx');

var ChallengeApprovalApp = require('./approvals/ChallengeApprovalApp.jsx');
var ChallengeAcceptedApp = require('./approved/ChallengeApprovedApp.jsx');
var ChallengeSentApp = require('./sent/ChallengeSentApp.jsx');
var ChallengeNotifyApp = require('./notify/ChallengeNotifyApp.jsx');

var DataFactory = require('../../DataFactoryMixin.jsx');
var ChallengeStatus = require('../../constants/ChallengeStatus.jsx');

var ChallengeApp = React.createClass({
    mixins: [DataFactory],
    getInitialState: function() {
        return {
            requests: ChallengeStore.getAllChallenges(),
            added: false
        }
    },
    componentDidMount: function() {
        ChallengeStore.addRequestListener(this._onAdd);
        ChallengeStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        ChallengeStore.removeRequestListener(this._onAdd);
        ChallengeStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        var requests = ChallengeStore.getAllChallenges();
        this.setState({requests: ChallengeStore.getAllChallenges()});
        //var types = [ChallengeStatus.NOTIFY,ChallengeStatus.SENT,ChallengeStatus.PENDING,ChallengeStatus.ACCEPTED];
        for (var t in ChallengeStatus) {

            if (t == ChallengeStatus.REQUEST) {
                return;
            }
            if (this.context.router.isActive(t.toLowerCase())) {
                if (requests[t].length==0) {
                    this.context.router.transitionTo(
                        ChallengeStatus.REQUEST.toLowerCase(),
                        {userId: this.getUserId()},null
                    );
                    return;
                }
            }

        }
    },
    _onAdd: function() {
        this.setState({requests: ChallengeStore.getAllChallenges()});
        this.context.router.transitionTo('needs_notify',{userId: this.getUserId()},null);
    },
    getTitle: function(type) {
        var r = this.state.requests[type];

        switch (type) {
            case ChallengeStatus.NOTIFY:
                return (<div>Notify<span></span><Badge>{r.length}</Badge></div>);
            case ChallengeStatus.PENDING:
                return (<div>Approval Required<span></span><Badge>{r.length}</Badge></div>);
            case ChallengeStatus.SENT:
                return (<div>Sent<span></span><Badge>{r.length}</Badge></div>);
            case ChallengeStatus.ACCEPTED:
                return (<div>Upcoming<span></span><Badge>{r.length}</Badge></div>);
            default:
                return (<div>{type} <span></span></div>);
        }
    },
    shouldRender: function(type) {
        return this.state.requests[type].length > 0;
    },
    getApp: function(type) {
        switch(type) {
            case ChallengeStatus.NOTIFY:
                return <ChallengeNotifyApp requests={this.state.requests} />;
            case ChallengeStatus.SENT:
                return <ChallengeSentApp requests={this.state.requests} />;
            case ChallengeStatus.ACCEPTED:
                return <ChallengeAcceptedApp requests={this.state.requests} />;
            case ChallengeStatus.PENDING:
                return <ChallengeApprovalApp requests={this.state.requests} />;
            default:
                return null;
        }
    },
    genTab: function(type,tabs) {
        if (this.shouldRender(type)) {
            tabs.push(
                    <NavItemLink to={type.toLowerCase()} params={{userId: this.getUserId()}}  key={type} eventKey={type} >
                        {this.getTitle(type)}
                    </NavItemLink>
            );
        }
    },
    render: function() {
        var tabs = [];

        tabs.push(
            <NavItemLink to={ChallengeStatus.REQUEST.toLowerCase()} params={{userId: this.getUserId()}} key={ChallengeStatus.REQUEST} eventKey={ChallengeStatus.REQUEST} >
                {this.getTitle('Request')}
            </NavItemLink>
                );

        this.genTab(ChallengeStatus.NOTIFY,tabs);
        this.genTab(ChallengeStatus.PENDING,tabs);
        this.genTab(ChallengeStatus.ACCEPTED,tabs);
        this.genTab(ChallengeStatus.SENT,tabs);
        if (this.context.router.getCurrentPath().endsWith('/challenge')) {
            return (
                <div>
                    <Nav bsStyle='pills' activeKey={ChallengeStatus.REQUEST}>
                        {tabs}
                    </Nav>
                    <ChallengeRequestApp />
                    <RouteHandler />
                </div>
            );
        } else {

            return (
                <div>
                    <Nav bsStyle='pills' >
                        {tabs}
                    </Nav>
                    <RouteHandler />
                </div>
            )
        }
    }
});

module.exports = ChallengeApp;

