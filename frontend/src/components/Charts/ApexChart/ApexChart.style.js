import { motion } from "framer-motion";
import styled from "styled-components";


export const ChartsWrapper = styled(motion.div)`
position:relative;
 display:flex;
overflow:hidden;
#level_2_chart_ref{
    flex:1; 
    
    background:black;
}
#level_1_chart_ref{
z-index:23;
flex:1;
background:black;

}
 

`
export const ButtonWrapper = styled.div`
padding: 25px;
padding-bottom:0px;
text-align:start;
 
`

export const ChartsLayout = styled.div`
background:black;
border-radius:10px;
height:350px;


`