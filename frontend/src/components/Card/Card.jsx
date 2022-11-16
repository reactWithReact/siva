import React, { useState } from 'react';
import { CardLayout } from './Card.style';
import CompactCard from './CompactCard';
import ExpandedCard from './ExpandedCard';

export default function Card() {

    const [expanded, setExpanded] = useState(false);
    const [chartType, setChartType] = useState('');

    return (
            <CardLayout className='cardlayout'>
                {
                    expanded ?
                        <ExpandedCard chartType={chartType} setExpanded={setExpanded} /> :
                        <CompactCard onChartType={(type) => {
                            setExpanded(true);
                            setChartType(type);
                        }} />
                }
            </CardLayout>
    )
};
