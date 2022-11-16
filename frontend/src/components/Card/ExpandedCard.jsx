import React  from 'react';
import ApexChart from '../Charts/ApexChart/ApexChart';
import D3Chart from '../Charts/D3Chart/D3Chart';
export default function ExpandedCard({ chartType, setExpanded }) {

  if (chartType === 'Apex chart') {
    return (
      <ApexChart {...{ setExpanded }} />

    )
  }
  else if(chartType === 'D3 chart'){
    return (
      <D3Chart {...{ setExpanded }} />
    )
  }
  
};
