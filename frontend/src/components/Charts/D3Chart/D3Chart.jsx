import { motion } from 'framer-motion';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ChartStoreContext } from '../../../context/ChartContext/ChartStore';
import { ButtonWrapper, ChartsLayout, ChartsWrapper } from '../Charts.style';
import * as d3 from 'd3';
import { Action_add_stackedData } from '../../../context/ChartContext/ChartActions';
import { xAxisData } from '../../../Data/HelperData';
import { TableStoreContext } from '../../../context/TablePageContext/TableStore';
import { Action_SetFilteredByBusinessUnitData } from '../../../context/TablePageContext/TableActions';


// set the dimensions and margin of the graph
const { top, right, bottom, left } = { top: 30, right: 30, bottom: 30, left: 30 };
const width = 600 - left - right;
const height = 250 - top - bottom;

export default function D3Chart({ setExpanded }) {

  const { tableDispatch } = useContext(TableStoreContext);
  const { chartDispatch, barChartData, stackedData } = useContext(ChartStoreContext);

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const [classAdded, setClassAdded] = useState(false);


  /********************************************************************************************************/

  /* level 1 bar chart */
  useEffect(() => {

    // append the svg object to the body of the page
    const svg = d3.select(ref1.current)
      .append('svg')
      .attr('width', width + left + right)
      .attr('height', height + top + bottom)
      .append('g')
      .attr('transform', `translate(${left},${top})`);

    // X-scale
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(barChartData.map(({ total }) => total))])
      .range([0, width])
      .nice();

    //  X-axis
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', '#fff')
      .attr('transform', 'translate(5,0)')
      .style('text-anchor', 'end');

    // Y-scale
    const yScale = d3.scaleBand()
      .range([0, height])
      .domain(barChartData.map(function ({ name }) { return name }))
      .padding(.2);


    // Y-axis
    const yAxis = d3.axisLeft(yScale).tickFormat('').tickSize(0);

    svg.append('g')
      .classed('axis', true)
      .call(yAxis);


    //Bars
    const bars = svg.append('g').selectAll('.myRect')
      .data(barChartData)
      .join('rect')
      .classed('myRect', true)
      .attr('y', function ({ name }, i) { return yScale(name) })
      .attr('height', yScale.bandwidth() - 5)
      .attr('fill', function ({ color }, i) {
        return color
      })
      // apply transition to each bar
      .transition()
      .attr('width', function ({ total }, i) { return xScale(total) + i * 30 })
      .transition()
      .attr('width', function ({ total }, i) { return xScale(total) });


    // labels
    const labels = svg.append('g')
      .selectAll('label')
      .data(barChartData)
      .join('text')
      .classed('label', true)
      .text(function ({ name }) {
        return name
      })
      .attr('x', xScale(0))
      .attr('y', function ({ name }, i) { return yScale(name) })
      .attr('fill', '#fff')
      .attr('transform', 'translate(10,25)')
      .transition()
      .style('opacity', 0)
      .transition()
      .style('opacity', 1);


    d3.selectAll('.myRect')
      // add the clicked bar's data to the stacked data
      .on('click', (e, d, i) => {
        chartDispatch(Action_add_stackedData(d))
        tableDispatch(Action_SetFilteredByBusinessUnitData(d.name))

      })
      // mouse events on bars
      .on('mouseover', (event, d) => {
        d3.select('.chart-tooltip')
          .style('display', 'inline')

      })
      .on('mouseout', () => {
        d3.select('.chart-tooltip').style('display', 'none')
      })
      .on('mousemove', (e, { name, total }) => {
        d3.select('.chart-tooltip')
          .style('left', `${e.pageX + 15}px`)
          .style('top', `${e.pageY - 25}px`)
          .text(`${name} : ${total}`)

      });

    // open stacked bar chat 
    if (stackedData.length !== 0) {
      ref2.current.classList.add('active');
      setClassAdded(true);

    }
    else {
      ref2.current.classList.remove('active');
      setClassAdded(false);
    }

    return () => {
      d3.select('svg').remove();
    }

  }, [barChartData, stackedData]);





  /********************************************************************************************************/

  /*  level 2 stacked chart */

  useEffect(() => {

    const sums = xAxisData.map((_, i) => d3.sum(stackedData.map(({ data }) => data[i])));

    const svg = d3.select(ref2.current)
      .append('svg')
      .attr('width', width + left + right)
      .attr('height', height + top + bottom)
      .append('g')
      .attr('transform', `translate(${left},${top})`);


    // X-scale
    const xScale = d3.scaleBand()
      .padding(0.1)
      .domain(xAxisData)
      .range([0, width]);

    //  X-axis
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', '#fff')
      .attr('transform', 'translate(5,0)')
      .style('text-anchor', 'end');


    // Y-scale
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(sums)])
      .nice()
      .range([height, 0]);

    // Y-axis
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .classed('axis', true)
      .call(yAxis)
      .selectAll('text')
      .attr('fill', '#fff');

    // stacked bars
    const dataMatrix = d3.transpose(stackedData.map(({ data }) => data));
    const stackData = d3.stack().keys(Object.keys(stackedData))(dataMatrix);

    const stackedBar = svg
      .append('g')
      .classed('stackedBars', true);

    const stacks = stackedBar.selectAll('.layer').data(stackData);

    const layer = stacks
      .join('g')
      .attr('fill', (_, i) => stackedData[i].color)
      .attr('class', function (_, i) {
        return stackedData[i].name
      })
      .classed('layer', true);


    const singleRect = layer.selectAll('g')
      .data(d => d)
      .join('g');

    singleRect.append('text')
      .text(function (d, i) {
        return d[1] - d[0]
      })
      .attr('y', ([, end]) => yScale(end))
      .style('fill', 'none');


    singleRect.append('rect')
      .attr('width', xScale.bandwidth() - 70)
      .attr('x', (_, i) => xScale(xAxisData[i]) + 35)
      .attr('y', ([, end]) => yScale(end))
      .transition()
      .attr('height', ([start, end]) => yScale(start) - yScale(end));

    // labels
    const labels = svg.append('g')
      .selectAll('label')
      .data(barChartData)
      .join('text')
      .classed('label', true)
      .text(function (d, i) {
        return sums[i]
      })
      .attr('text-anchor', 'middle')
      .attr('x', function (d, i) {
        return xScale(xAxisData[i]) + xScale.bandwidth() / 2

      })
      .attr('y', function (d, i) { return yScale(sums[i]) - 5 })
      .attr('fill', '#fff')
      .transition()
      .style('opacity', 0)
      .transition()
      .style('opacity', 1);


    d3.selectAll('.layer')
      .on('mouseover', function (event, d) {
        d3.select('.chart-tooltip')
          .style('display', 'block');

      })

      .on('mouseout', () => {
        d3.select('.chart-tooltip').style('display', 'none');
      })

      .on('mousemove', function (e, d) {
        const label = this.classList.value.replace('layer', '');
        const tooltipContainer = d3.select('.chart-tooltip')
          .style('left', `${e.pageX + 15}px`)
          .style('top', `${e.pageY - 25}px`);

        d3.selectAll(this.children).on('mousemove', function () {
          const value = this.children[0].innerHTML;
          tooltipContainer.text(`${label} : ${value}`);
        })
      })



    return () => {
      d3.select('svg').remove();

    }
  }, [stackedData]);


  /********************************************************************************************************/

  // tooltip 
  useEffect(() => {
    let tooltip = d3.select('body').append('div')
      .classed('chart-tooltip', true)
      .style('position', 'absolute')
      .style('display', 'none')
      .style('padding', '10px')
      .style('background', 'black')
      .style('border-radius', '10px')
      .style('z-index', '34');

    return () => {
      d3.select('.chart-tooltip').remove();

    }
  }, [stackedData, barChartData]);

  /********************************************************************************************************/


  return (
    <ChartsLayout as={motion.div} layoutId='expandable' >

      <ButtonWrapper >
        <button onClick={() => setExpanded(false)} >Close</button>
      </ButtonWrapper>

      <ChartsWrapper>
        <motion.div initial={{ x: '50%' }}
          animate={{ x: classAdded ? 0 : '50%' }}
          transition={{ type: 'tween' }}
          id='level_1_chart_ref'        >
          <div ref={ref1} ></div>
        </motion.div>

        <motion.div id='level_2_chart_ref'
          initial={{ x: '-150%' }}
          animate={{ x: classAdded ? 0 : '250%' }}
          transition={{ type: 'tween' }} >
          <div ref={ref2} ></div>
        </motion.div>
      </ChartsWrapper>

    </ChartsLayout>
  )
};



