import { motion } from 'framer-motion';
import { useMemo, useContext, useState, useEffect, useRef } from 'react';
import Chart from 'react-apexcharts';
import { colors } from '../../../utils/Colors';
import { Action_add_stackedData } from '../../../context/ChartContext/ChartActions';
import { ChartStoreContext } from '../../../context/ChartContext/ChartStore';
import { ChartsWrapper, ButtonWrapper, ChartsLayout } from '../Charts.style';
import { xAxisData } from '../../../Data/HelperData';
import { Action_SetFilteredByBusinessUnitData } from '../../../context/TablePageContext/TableActions';
import { TableStoreContext } from '../../../context/TablePageContext/TableStore';



export default function ApexChart({ setExpanded }) {

  const { tableDispatch } = useContext(TableStoreContext);

  const { barChartData, stackedData, chartDispatch, } = useContext(ChartStoreContext);

  const level_2_chart_ref = useRef(null);
  const [classAdded, setClassAdded] = useState(false);


  /********************************************************************************************************/

  //// barChart Series data
  const barChartSeries = useMemo(() => ([
    {
      data: barChartData.map(({ total }) => total),
    }
  ]
  ), [barChartData]);


  //// barChart Options
  const barChartOptions = useMemo(() => ({
    chart: {
      toolbar: {
        show: false
      },
      events: {
        dataPointMouseEnter: function (event) {
          event.path[0].style.cursor = 'pointer';
        },
        dataPointSelection: function (event, chartContext, { selectedDataPoints, dataPointIndex, w }) {
          chartDispatch(Action_add_stackedData(barChartData[dataPointIndex]));
          tableDispatch(Action_SetFilteredByBusinessUnitData(barChartData[dataPointIndex].name));

        }
      }
    },

    grid: {
      yaxis: { lines: { show: false } }

    },

    xaxis: {
      categories: barChartData.map(({ name }) => name),
      labels: { style: { colors: '#fff' } }
    },

    yaxis: { show: false },

    plotOptions: {
      bar: {
        distributed: true,
        horizontal: true,
        barHeight: '75%',
        dataLabels: {
          position: 'bottom'
        },
      }
    },
    tooltip: {
      theme: 'dark',
      x: { show: false },
      y: {
        title: {
          formatter: function (value, { dataPointIndex }) {
            return barChartData[dataPointIndex].name
          }
        }
      }

    },
    legend: { show: false },

    colors,
    states: {
      normal: {
        filter: {
          type: 'desaturate'
        }
      },
      active: {
        allowMultipleDataPointsSelection: true,
        filter: {
          type: 'darken',
          value: 1
        }
      }
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      formatter: function (value, { dataPointIndex }) {
        return barChartData[dataPointIndex].name
      },
    }

  }), [stackedData, colors]);


  /********************************************************************************************************/


  /// stackedChart Series data
  const stackedChartSeries = useMemo(() => stackedData, [stackedData]);

  //// stackedChart Options
  const stackedChartOptions = useMemo(() => ({
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: false }
    },

    // colors,

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 600,
              color: '#fff'
            }
          }
        }
      },
    },

    xaxis: {
      categories: xAxisData,
      labels: { style: { colors: '#fff', } }
    },

    yaxis: {
      labels: { style: { colors: '#fff' } }
    },

    legend: { show: false },
    fill: { opacity: 1 },
    tooltip: { theme: 'dark' }
  }
  ), [xAxisData]);


  /********************************************************************************************************/


  useEffect(() => {

    // open stacked bar chat 
    if (stackedData.length !== 0) {
      level_2_chart_ref.current.classList.add('active');
      setClassAdded(true);

    } else {
      level_2_chart_ref.current.classList.remove('active');
      setClassAdded(false);
     
    }
  }, [stackedData]);

  /********************************************************************************************************/


  return (
    <ChartsLayout as={motion.div} layoutId='expandable' >

      <ButtonWrapper >
        <button onClick={() => setExpanded(false)} >Close</button>
      </ButtonWrapper>

      <ChartsWrapper >
        <motion.div initial={{ x: '50%' }}
          animate={{ x: classAdded ? 0 : '50%' }}
          transition={{ type: 'tween' }}
          id='level_1_chart_ref' >
          <Chart options={barChartOptions} series={barChartSeries} type='bar' height={250} width='80%' />
        </motion.div>

        <motion.div id='level_2_chart_ref' ref={level_2_chart_ref}
          initial={{ x: '-150%' }}
          animate={{ x: classAdded ? 0 : '250%' }}
          transition={{ type: 'tween' }} >
          <Chart options={stackedChartOptions} series={stackedChartSeries} type='bar' height={250} width='80%' />
        </motion.div>
      </ChartsWrapper>

    </ChartsLayout>
  )
}
