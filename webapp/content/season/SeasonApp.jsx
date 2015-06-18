var React = require('react/addons');
var Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    , Route = Router.Route
    , Link = Router.Link;

var DataStore= require('../../jsx/stores/DataStore.jsx');
var UserContextMixin = require('../../jsx/mixins/UserContextMixin.jsx');
var SeasonMixin = require('../../jsx/mixins/SeasonMixin.jsx');
var StatsMixin = require('../../jsx/mixins/StatsMixin.jsx');

var SeasonApp = React.createClass({
    mixins: [SeasonMixin,UserContextMixin,StatsMixin,Router.State,Router.Navigation],
    getInitialState: function () {
        return {
            user: this.getUser(),
            seasonId: this.getParams().seasonId
        }
    },
    componentWillMount: function () {
        DataStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        DataStore.removeChangeListener(this._onChange);
    },
    componentDidMount: function () {
        this.setState({user: this.getUser()});
    },
    componentWillReceiveProps: function() {
        this.setState({seasonId: this.getParams().seasonId});
    },
    _onChange: function() {
        console.log('onchange');
        this.setState({user: this.getUser()});
    },
    render: function() {
        if (this.getUserId() == 0) {
            return null;
        }
        var season = this.getSeason(this.getParams().seasonId);
        var display = season.isChallenge() ? 'none' : 'inline';
        var header = (
                <div className="btn-group bot-margin">
                    <div id={display == 'none' ? 'season-standings-link-hidden' : 'season-standings-link'}
                         style={{display:display}}>
                    
                    <button className={this.isActive('seasonStandings') ? 'btn btn-success' : 'btn btn-default'}>
                        <Link to='seasonStandings' params={this.getParams()}>
                            <span className="fa fa-trophy"></span><span className="main-item">{ ' Standings'}</span>
                        </Link>
                    </button>
                    </div>
                    <button className={this.isActive('seasonLeaders') ? 'btn btn-success' : 'btn btn-default'} >
                        <Link to='seasonLeaders' params={this.getParams()}>
                            <span className="fa  fa-list-ol"></span><span className="main-item">Leaders</span>
                        </Link>
                    </button>
                    <button className={this.isActive('seasonResults') ? 'btn btn-success' : 'btn btn-default'} >
                        <Link to='seasonResults' params={this.getParams()}>
                            <span className="fa  fa-history"></span><span className="main-item">Matches</span>
                        </Link>
                    </button>
                </div>
        );
        return (
                <div id="season-app" className="panel panel-default">
                    <div className="panel-heading">
                        <h3>{season.getDisplayName()}</h3>
                        {header}
                    </div>
                    <div className="panel-body">
                        <RouteHandler />
                    </div>
                </div>
        );
    }
});

module.exports = SeasonApp;

