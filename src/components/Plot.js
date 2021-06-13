import React, {Component} from 'react';
import Bar from "./Bar";
import {getHexColor} from "../helpers";
import AxisX from "./AxisX";
import AxisY from "./AxisY";

class Plot extends Component{

    render() {
        const {maxWidth, maxHeight, data, xLabel, yLabel} = this.props;
        const x0 = 50;
        const y0 = 50;

        const xLength = maxWidth - x0 * 2;
        const yLength = maxHeight - y0 * 2;

        const xAxisY = y0 + yLength;

        const dataYMax = data.reduce(
            (currMax, [_, dataY]) => Math.max(currMax, dataY),
            -Infinity
        );
        const dataYMin = data.reduce(
            (currMin, [_, dataY]) => Math.min(currMin, dataY),
            Infinity
        );
        const dataYRange = dataYMax - dataYMin;

        const barPlotWidth = xLength / data.length;
        return (
            <div className='main'>
                <svg width={maxWidth} height={maxHeight}>
                    /* Ox axis*/
                    <AxisX
                        x1={x0}
                        y1={xAxisY}
                        x2={x0 + xLength}
                        y2={xAxisY}
                        x={x0 + xLength + 5}
                        y={xAxisY + 4}
                        label={xLabel}
                    />

                    /*Oy axis*/
                    <AxisY
                        x1={x0}
                        y1={y0}
                        x2={x0}
                        y2={y0 + yLength}
                        xT={x0}
                        yT={y0 - 8}
                        label={yLabel}
                        maxYData={dataYMax}
                        rangeYData={dataYRange}
                        yLength={yLength}
                    />


                    /* Bar plots */
                    {data.map(([label, dataY], index) => {
                        const sidePadding = 10;
                        const x = x0 + index * barPlotWidth + sidePadding / 2;

                        const yRatio = (dataY - dataYMin) / dataYRange;

                        const y = y0 + (1 - yRatio) * yLength;
                        const height = yRatio * yLength;
                        const width = barPlotWidth - sidePadding;

                        return (
                            <Bar
                                x={x}
                                y={y}
                                yValue={dataY}
                                width={width}
                                height={height}
                                label={label}
                                xAxisY={xAxisY}
                                fill={getHexColor()}
                            />
                        );
                    })}
                </svg>
            </div>
        )
    }
}

export default Plot;
