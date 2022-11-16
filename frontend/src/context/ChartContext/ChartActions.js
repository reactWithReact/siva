
import { colors } from '../../utils/Colors';

export const Action_add_stackedData = (data) => {

    return (state) => {

        let stackedData = [...state.stackedData];
        let index;

        if (stackedData.length === 0) {
            stackedData = [data];

            return {
                ...state,
                stackedData
            };
        }
        else {

            for (const [i, { name }] of stackedData.entries()) {
                if (name === data.name) {
                    index = i;
                    break;
                }
                index = -1;
            };

        }

        if (index === -1) {
            stackedData = [...stackedData, data];
        }
        else {
            stackedData.splice(index, 1);
        }

        return {
            ...state,
            stackedData
        };

    };
};

export const Action_empty_stackedData = () => {
    return (state) => {
        return {
            ...state,
            stackedData: [],
        };
    };
};

export const Action_barChartData = (chart) => {
    return (state) => {

        const barChartData = Object.keys(chart).map((key, index) => {
            const data = Object.values(chart[key]).reverse();
            const total = data.reduce((acc, curr) => acc + curr);
            return {
                name: key,
                data,
                color: colors[index],
                total
            };
        });

        return {
            ...state,
            barChartData

        };
    };
};