var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var Router = require('react-router')
    ,Link = Router.Link
    , History = Router.History;

var UserContextMixin = require('../../jsx/mixins/UserContextMixin.jsx');
var Util = require('../../jsx/util.jsx');
var UserLink = require('../../jsx/components/links/UserLink.jsx');

var StatApp = React.createClass({
    mixins: [UserContextMixin,History],
    getInitialState: function() {
        return {
            update: Date.now(),
            users: []
        }
    },
    getData: function() {
        Util.getData('/api/user/season/user/' + this.getUser().id, function(d){
            this.setState({users: d});
        }.bind(this),null,'StatApp');
    },
    componentDidMount: function () {
        this.getData();
    },
    componentWillReceiveProps: function (o, n) {
        this.getData();
    },
    changeUser: function(e) {
        e.preventDefault();
        if (this.props.location.pathname.indexOf("/stats") >= 0) {
            this.props.history.pushState(null,'/app/scout/' + e.target.value + '/stats');
            return;
        }
        this.props.history.pushState(null,'/app/scout/' + e.target.value + '/history');
    },
    render: function() {
        var users = this.state.users;
        if (users.length == 0) {
            return null;
        }

        var options = [];
        var selectedUser = null;
        users.forEach(function(u){
            if (u.id == this.props.params.statsId)
                selectedUser = u;

            options.push(<option key={u.id} value={u.id}>{u.name}</option>);
        }.bind(this));

        var header = null;
        if (this.props.location.pathname.indexOf('history') > 0) {
              header = (
                  <div className="row">
                      <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                          <div className="col-lg-6 col-md-6 col-xs-12 no-pad">
                              <UserLink user={selectedUser} type='normal'/>
                          </div>
                      </div>
                  </div>

        );
        } else {
            header = (
                <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                        <div className="col-lg-6 col-md-6 col-xs-12 no-pad">
                            <select ref='user' onChange={this.changeUser}
                                    className="form-control"
                                    value={this.props.params.statsId}
                                    type={'select'}>
                                {options}
                            </select>
                        </div>
                        <div className="btn-group col-lg-6 col-md-6 col-xs-12 stats-btn">
                            <Link className='scoutNav' to={'/app/scout/' +  this.props.params.statsId +'/stats'}>
                                <button
                                    className={this.props.location.pathname.indexOf('stats') >=0 ? 'btn btn-success btn-responsive' : 'btn btn-default btn-responsive'}>
                                    <span className="fa fa-bar-chart"></span>Stats
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div id="scout-app" >
                <div className="panel-heading">
                     {header}
                </div>
                <div className="panel-body">
                    {this.props.children}
                </div>
            </div>
        );
        //
    }
});

module.exports = StatApp;
