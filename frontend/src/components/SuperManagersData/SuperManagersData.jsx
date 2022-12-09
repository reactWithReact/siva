
import { useContext, useEffect } from 'react';
import { Action_Set_SuperManagerData } from '../../context/TablePageContext/TableActions';
import { SingleManager, Wrapper } from './Wrapper.style';
import { TableStoreContext } from '../../context/TablePageContext/TableStore';
import axios from 'axios';
import { BASE_URL_GRAPHQL, QUERY_SUPERMANGERS } from '../../Data/HelperData';

export const SuperManagersData = () => {

  const { superManagersData, tableDispatch } = useContext(TableStoreContext);

  useEffect(() => {
    const getSuperManagerData = async () => {
      const { data } = await axios.post(BASE_URL_GRAPHQL, QUERY_SUPERMANGERS());
      const { superManagerData } = data.data;
      tableDispatch(Action_Set_SuperManagerData(superManagerData));

    };
    getSuperManagerData();
  }, []);


  if (!superManagersData.length) {

    return <h1 style={{ textAlign: 'center', padding: 50 }}>Loading...</h1>
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', padding: 10 }}>SuperManagersData</h1>
      <Wrapper>
        {
          superManagersData.map((managerData, index) => (
            <SingleManager key={index}>
              {
                Object.keys(managerData).map((data, index) => (
                  <div key={index}>{data}: {managerData[data]}</div> 
                ))
              }
            </SingleManager>

          ))
        }
      </Wrapper>
    </>
  )
}
