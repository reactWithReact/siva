import { motion } from 'framer-motion';
import React, { useContext } from 'react';
import { getSign } from '../../utils/GetSign';
import { Button } from '../Button/Button';
import { CardWrapper, ChartSelectionWrapper } from './Card.style';
import { chartTypeData } from '../../Data/HelperData';
import { CardDetails } from '../CardDetails/CardDetails';
import { ChartStoreContext } from '../../context/ChartContext/ChartStore';

export default function CompactCard({ onChartType }) {

  const { barChartData } = useContext(ChartStoreContext);

  if (!!!barChartData.length) {
    return null;
  }

  return (
    <CardWrapper as={motion.div} layoutId='expandable' >
      {
        barChartData.map(({ name, data }) => (
          <CardDetails key={name} text={name} value={data[3]} sign={getSign(data[2], data[3])} />
        ))
      }

      <ChartSelectionWrapper>
        {
          chartTypeData.map(text => (
            <Button text={text} key={text} onClick={() => onChartType(text)} />
          ))
        }
      </ChartSelectionWrapper>
    </CardWrapper>
  )
}
