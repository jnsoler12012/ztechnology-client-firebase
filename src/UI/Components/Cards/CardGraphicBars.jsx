import { ResponsiveBar } from '@nivo/bar';
import React from 'react'

export default function ({ quoteUser }) {
    const [data, keysID] = quoteUser

    console.log(data, keysID);

    const BarTotalsLayer = (props) => {
        const labelOffset = 10;
        const labelFontSize = 12;
        if (props.bars.length === 0) return null;
        // compute totals for each index/bar
        const totals = {};
        const bandwidth = props.bars[0].width;
        props.bars.forEach((bar) => {
            const indexValue = bar.data.indexValue;
            if (!(indexValue in totals)) {
                totals[indexValue] = 0;
            }
            if (!bar.data.hidden) {
                totals[indexValue] += bar.data.value;
            }
        });
        // place text elements above the bars
        const labels = Object.keys(totals).map((indexValue) => {
            const x = props.xScale(indexValue) + bandwidth / 2;
            const y = props.yScale(totals[indexValue]) - labelOffset;
            return (
                <text
                    key={"total." + indexValue}
                    x={x}
                    y={y}
                    textAnchor={"middle"}
                    fontWeight={"bold"}
                    fontSize={labelFontSize}
                >
                    {totals[indexValue]}
                </text>
            );
        });
        return <>{labels}</>;
    };

    return (
        <div className='w-full h-[80vh] bg-white p-3'>
            {data && keysID
                ? (<>
                    <ResponsiveBar
                        data={data}
                        theme={{
                            axis: {
                                domain: {
                                    line: {
                                        stroke: "#5C5C5C",
                                    },
                                },
                                legend: {
                                    text: {
                                        fill: "#5C5C5C",
                                    },
                                },
                                ticks: {
                                    line: {
                                        stroke: "#5C5C5C",
                                        strokeWidth: 1,
                                    },
                                    text: {
                                        fill: "#5C5C5C",
                                    },
                                },
                            },
                            legends: {
                                text: {
                                    fill: "#5C5C5C",
                                },
                            },
                        }}
                        keys={keysID}
                        indexBy="day"
                        layers={[
                            "grid",
                            "axes",
                            "markers",
                            "bars",
                            "legends",
                            "annotations",
                            BarTotalsLayer
                        ]}
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        padding={0.3}
                        valueScale={{ type: "linear" }}
                        indexScale={{ type: "band", round: true }}
                        colors={{ scheme: "nivo" }}
                        defs={[
                            {
                                id: "dots",
                                type: "patternDots",
                                background: "inherit",
                                color: "#5C5C5C",
                                size: 4,
                                padding: 1,
                                stagger: true,
                            },
                            {
                                id: "lines",
                                type: "patternLines",
                                background: "inherit",
                                color: "#5C5C5C",
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10,
                            },
                        ]}
                        borderColor={{
                            from: "color",
                            modifiers: [["darker", "1.6"]],
                        }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 7,
                            tickPadding: 3,
                            tickRotation: 0,
                            legend: "Last 7 Days",
                            legendPosition: "middle",
                            legendOffset: 38,
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "$USD",
                            legendPosition: "middle",
                            legendOffset: -55,
                        }}
                        enableLabel={false}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{
                            from: "color",
                            modifiers: [["darker", 1.6]],
                        }}
                        legends={[
                            {
                                dataFrom: "keys",
                                anchor: "bottom-right",
                                direction: "column",
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: "left-to-right",
                                itemOpacity: 0.85,
                                symbolSize: 20,
                                effects: [
                                    {
                                        on: "hover",
                                        style: {
                                            itemOpacity: 1,
                                        },
                                    },
                                ],
                            },
                        ]}
                        role="application"
                        barAriaLabel={function (e) {
                            return e.id + ": " + e.formattedValue + " in day: " + e.indexValue;
                        }}
                    />
                </>
                )
                : (
                    <div>
                        Charging...
                    </div>
                )
            }

        </div>
    )
}