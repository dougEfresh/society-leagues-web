var React = require('react/addons');
var Router = require('react-router')
    , State = Router.State
    , Navigation = Router.Navigation
    , Link = Router.Link
    , RouteHandler = Router.RouteHandler;

var UserContextMixin = require('../../jsx/mixins/UserContextMixin.jsx');
var TeamStandings = require('./TeamStandings.jsx');
var TeamChart = require('./TeamChart.jsx');
var Util = require('../../jsx/util.jsx');

var TeamApp = React.createClass({
    mixins: [UserContextMixin, State, Navigation],
     getInitialState: function() {
         return {
             update: Date.now(),
             teams : []
        }
    },
    componentWillMount: function () {

    },
    componentWillUnmount: function () {
    },
    componentDidMount: function () {
         this.getData();
    },
    onSelect: function (e) {
        console.log(e.target.value);
        this.setState({teamId: e.target.value});
    },
    onChange: function (e) {
        e.preventDefault();
        if (this.isActive('teamStandings')) {
            this.getParams().teamId = e.target.value;
            this.transitionTo('teamStandings',this.getParams(),null);
        }

        if (this.isActive('teamMemberResults')) {
            this.getParams().teamId = e.target.value;
            this.transitionTo('teamMemberResults',this.getParams(),null);
        }

           if (this.isActive('teamChart')) {
            this.getParams().teamId = e.target.value;
            this.transitionTo('teamChart',this.getParams(),null);
        }

    },
    getData: function() {
        Util.getData('/api/team/get/season/' + this.getParams().seasonId, function(d){
            this.setState({teams: d});
        }.bind(this));
    },
    componentWillReceiveProps: function (o, n) {
        var now = Date.now();
        if (now - this.state.update > 1000*60*2)
            this.getData();
    },
    handleClick: function() {
        this.transitionTo('teamChart',this.getParams());
    },
    showResults: function() {
        this.transitionTo('teamResults',this.getParams());
    },

    render: function () {
        var user = this.getUser();
        var teams = this.state.teams;
        if (teams.length == 0) {
            return null;
        }
        var team = null;
        teams.forEach(function(t){
            if (this.getParams().teamId == t.id) {
                team = t;
            }
        }.bind(this));

        if (team == null) {
            return null;
        }
        var options = [];
        teams.forEach(function(t){
            options.push(<option key={t.id} value={t.id}>{t.name}</option>);
        });
        var select = ( <select ref='user' onChange={this.onChange}
                                className="form-control"
                                value={this.getParams().teamId}
                                type={'select'}>
                            {options}
                        </select>);
        var teamHeader = select;
        var header = (
                <div style={{display: 'inline'}}>
                    <Link to='teamStandings' params={this.getParams()}>
                        <button className={this.isActive('teamStandings') ? 'btn btn-success' : 'btn btn-default'}>
                            <i className="fa fa-users"></i><span className="main-item">{ ' Standings'}</span>
                        </button>
                    </Link>
                    <Link to='teamMemberResults' params={this.getParams()}>
                        <button  className={this.isActive('teamMemberResults') ? 'btn btn-success' : 'btn btn-default'}>
                            <i className="fa  fa-list-ol"></i><span className="main-item">{ ' Results'}</span>
                        </button>
                    </Link>
                    <Link to='teamChart' params={this.getParams()}>
                        <button   className={this.isActive('teamChart') ? 'btn btn-success' : 'btn btn-default'}>
                            <i className="fa fa-bar-chart"></i><span className="main-item">{ ' Chart'}</span>
                        </button>
                    </Link>
                </div>
        );

            return (
                <div id="team-app">
                    {teamHeader}
                    {header}
                    <RouteHandler />
                </div>
        );


    }
});

module.exports = TeamApp;
