var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var Router = require('react-router')
    ,Link = Router.Link;

var SeasonLink = React.createClass({
    mixins: [Router.State],
    propTypes: {
        season: ReactPropTypes.object.isRequired
    },
    getDefaultProps: function(){
        return {
            season: null
        }
    },
    render: function() {
        if (this.props.season == null || this.props.user == null) {
            return null;
        }
        return (<Link className="seasonLink" to={"/app/scout/"+ this.props.user.id + '/' + this.props.season.id +'/history'}>
                    {this.props.season.displayName}
        </Link>);
    }
});

module.exports = SeasonLink;