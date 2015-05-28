var React = require('react/addons');
var Router = require('react-router')
    ,RouteHandler = Router.RouteHandler;
var State = Router.state;
var UserContextMixin = require('../../jsx/mixins/UserContextMixin.jsx');
var LeagueNav = require('./LeagueNav.jsx');
var LoginApp = require('../login/LoginApp.jsx');
var DataStore = require('../../jsx/stores/DataStore.jsx');
var RequestStore = require('../../jsx/stores/RequestStore.jsx');
var DataActions= require('../../jsx/actions/DataActions.jsx');
var LoadingApp  = require('../../jsx/components/LoadingApp.jsx');

var NavApp = React.createClass({
    mixins: [State,UserContextMixin,Router.Navigation,Router.State],
    getInitialState: function() {
         return {
             loading: false,
             authenticated: false
        }
    },
    componentWillMount: function() {
        DataStore.addChangeListener(this._onChange);
        RequestStore. addRequestListener(this._onChange);
    },
    componentWillUnmount: function() {
        DataStore.removeChangeListener(this._onChange);
        RequestStore.removeListener(this._onChange);
    },
    componentDidMount: function() {
        DataStore.checkLogin();
    },
    componentWillReceiveProps: function(p,n) {
        if (!DataStore.isAuthenticated()) {
            return;
        }
        if (DataStore.isLoading()) {
            return;
        }
        if (DataStore.isLoaded() && DataStore.isAuthenticated()) {
            if (this.isActive('default')) {
                this.transitionTo('home');
            }
            return;
        }
        DataActions.init();
    },
    _onChange: function(){
        console.log('NavApp change: ' + this.getUserId() + ' Loading ' + DataStore.isLoading() + ' Authenticated: ' + DataStore.isAuthenticated());
        if (DataStore.isAuthenticated() && !DataStore.isLoaded() && !DataStore.isLoading()) {
            DataStore.init();
        }
        this.setState({
            loading: DataStore.isLoading(),
            authenticated: DataStore.isAuthenticated()
        });
    },
    render: function() {
        if (!this.state.authenticated) {
            console.log("LoginApp");
            return (
                <LoginApp />
            )
        }
        if (this.state.loading) {
            return (
                <div id={'loading-' + this.state.loading}>
                    <LoadingApp />
                </div>
            );
        }

        return (
            <div>
                <LeagueNav  />
                <div id='appReady' ></div>
                <div id={this.getUser().id} ></div>
            </div>

        );
    }
});

module.exports = NavApp;