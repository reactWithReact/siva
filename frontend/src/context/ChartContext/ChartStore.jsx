import { useReducer } from "react";
import { createContext } from "react";

export const ChartStoreContext = createContext();

const initialState = {

    barChartData:[],
    barChartCategories: [],
    totalQuarterlyData: [],
    chartObjectData: {},
    selectedDataPoints: [],
    stackedBarChartCategories: [],
    stackedData: []
}

const chartStoreReducer = (state, action) => {
    try {
        return action(state);
    } catch (error) {
        console.warn(
            "re-check the action you're dispatching, we're expecting a function here"
        );
        return initialState;
    }
}

const ChartStore = ({ children }) => {

    const [state, chartDispatch] = useReducer(chartStoreReducer, initialState);

    return (
        <ChartStoreContext.Provider value={{ ...state, chartDispatch }}>
            {children}
        </ChartStoreContext.Provider>
    );
};

export default ChartStore;



