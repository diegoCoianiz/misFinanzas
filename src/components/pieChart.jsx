import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

const PieChart = ({ labels, data, colors, setDisplay = false }) => {
    // console.log(labels, colors)

    const chartContainer = useRef(null);
    const chartInstance = useRef(null);
    useEffect(() => {
        if (chartContainer.current) {
            const chartConfig = {
                type: "pie",
                data: {
                    labels,
                    datasets: [
                        {
                            data,
                            backgroundColor: colors,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: setDisplay,
                        },
                    },
                },
            };

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart(chartContainer.current, chartConfig);
        }

        // cleanup function to destroy chart instance
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [labels, data, colors]);

    return (
        <div className="canvasChartContainer">
            <canvas ref={chartContainer} className="canvasChart" />
        </div>
    );
};

export default PieChart;
