'use strict';

import React from 'react';
import d3 from 'd3';

class DonutChart extends React.PureComponent {

    constructor(props){
        super(props);

        console.log('init Donut Chart', this.props);
    };

    drawChart(){

    };

    updateChart(){
        
    }

    render(){
        return <div id={this.props.id}></div>
    };

};

export default DonutChart;