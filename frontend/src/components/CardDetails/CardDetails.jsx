import React from 'react';
import { Wrapper } from './Wrapper';

export const CardDetails = ({text,value,sign}) => {
  return (
    <Wrapper>{text} : {value} {sign >=0 ? <span>&#8679;</span> : <span>&#8681;</span>}</Wrapper>
  )
}
