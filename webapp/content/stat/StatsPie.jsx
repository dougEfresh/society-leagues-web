 var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var Router = require('react-router')
    ,RouteHandler = Router.RouteHandler;
var Pie = require("react-chartjs").Pie;
var Bar = require("react-chartjs").Bar;


var StatsPie = React.createClass({
    render: function() {
        if (this.props.stats.length == 0 ){
            return null;
        }
        var labels = [];
        var wins = [];
        var loses = [];
        this.props.stats.forEach(function(s){
            labels.push(s.season.displayName.substring(0,5));
            wins.push(s.wins);
            loses.push(s.loses);
        });
        var data = {
            labels : labels,
            datasets: [
                {
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    label: "Wins",
                    height: 500,
                    data: wins
                },
                {
                    label: "Loses",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: loses
                }
            ]
        };
        var options = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : false,
    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,
    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(8,8,8,.05)",
    //Number - Width of the grid lines
    scaleGridLineWidth : 1,
    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,
    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,
    //Boolean - If there is a stroke on each bar
    barShowStroke : true,
    //Number - Pixel width of the bar stroke
    barStrokeWidth : 4,
    //Number - Spacing between each of the X value sets
    barValueSpacing : 5,
    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1,
    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

}
        return (
            <Bar redraw width={500} height={300} chartOptions={options} data={data}/>
        );
    }
});

module.exports = StatsPie;

 /*
 var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};
  */

/* <div>
                <Label bsStyle={'success'}>Wins:{this.props.stats.all.wins}</Label>
                <Label bsStyle={'danger'}>Loses:{this.props.stats.all.loses}</Label>

                <div>
                    <Label bsStyle={'success'}>Racks Won:{this.props.stats.all.racksFor}</Label>
                    <Label bsStyle={'danger'}>Racks Lost:{this.props.stats.all.racksAgainst}</Label>
                    <Pie redraw chartOptions={this.getChartOptions()} data={this.getChartData('all',true)} />
                </div>
            </div>

 */