import React, { Component } from 'react'
import {PieChart, Pie, Sector} from 'recharts'

                   
const renderActiveShape = ({key}) => (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload[`${key}`]}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Tickets: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`Porcentaje: ${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

class TwoLevelPieChart extends Component { 
  state = {
      activeIndex: 0,
  };
  
  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  }

  render () {
    return (
      <PieChart width={800} height={400}>
        <Pie 
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape({key: this.props.keyName})} 
          data={this.props.data}
          dataKey={this.props.dataKey}
          cx={300} 
          cy={200} 
          innerRadius={60}
          outerRadius={80} 
          fill="#8884d8"
          onMouseEnter={this.onPieEnter}
        />
       </PieChart>
    );
  }

}

export default TwoLevelPieChart
