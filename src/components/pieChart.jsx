import React, { useEffect, useRef, useMemo, useCallback } from "react";
import Chart from "chart.js/auto";
import { incomeCategoryColors, expenseCategoryColors } from "@/data/categoryAndColors";

const PieChart = ({ chart }) => {
  // Creamos la lista de códigos de colores solo una vez, usando useMemo
  const categoryCodes = useMemo(() => createLabelColors([...incomeCategoryColors, ...expenseCategoryColors]), []);

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  // Función que calcula los datos para el gráfico, usando useCallback
  const calculateChartData = useCallback(() => {
    const combinedDivision = {};
    const categories = new Set();
    let totalIncome = 0;
    let totalAmount = 0;

    for (const element of chart) {
      const category = element.category;
      if (element.type === "ingreso") {
        combinedDivision[category] = (combinedDivision[category] || 0) + Number(element.amount);
        categories.add(category);
        totalIncome += Number(element.amount);
      } else {
        combinedDivision[category] = (combinedDivision[category] || 0) - Number(element.amount);
        categories.add(category);
        totalAmount += Number(element.amount);
      }
    }

    const values = Object.values(combinedDivision);
    const labels = [...categories];

    return {
      labels,
      values,
      totalAmount,
      totalIncome,
    };
  }, [chart]);

  // Actualizamos el gráfico cuando cambia la información o la configuración
  useEffect(() => {
    if (chartContainer.current && chart) {
      const data = calculateChartData();

      const chartConfig = {
        type: "pie",
        data: {
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              backgroundColor: data.labels.map(category => categoryCodes[category]),
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          }
        }
      };

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartContainer.current, chartConfig);
    }
  }, [chart, categoryCodes, calculateChartData]);

  // Mostramos el gráfico solo si hay datos relevantes
  const { totalIncome, totalAmount, labels, values } = calculateChartData();

  // Creamos un array de objetos con las etiquetas y valores de cada categoría
  const orderCategories = labels.map((label, index) => ({
    label,
    value: values[index],
  }));
  orderCategories.sort((a, b) => b.value - a.value);


  return (

    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
        <h1 style={{ textAlign: "start", margin: "0px" }}>
          capital: ${totalIncome}
        </h1>
        {orderCategories.map(({ label, value }, index) => (
          value > 0 ? (
            <p key={index} style={{ color: categoryCodes[label], margin: "0px", fontSize: "13px", alignItems: "start" }}>
              {label}: {value}
            </p>
          ) : null
        ))}
        <h1 style={{ textAlign: "start", marginBottom: "0px" }}>
          gastos: ${totalAmount}
        </h1>
        {orderCategories.reverse().map(({ label, value }, index) => (
          value < 0 && index < 8 ? (
            <p key={index} style={{ color: categoryCodes[label], margin: "0px", fontSize: "13px", alignItems: "start" }}>
              {label.length > 8 ? `${label.slice(0, 8)}..: ${value}` : `${label}: ${value}`}
            </p>
          ) : null
        ))}
      </div>
      <div className="canvasChartContainer">
        <canvas ref={chartContainer} className="canvasChart" />
      </div>
    </div>
  );
};

const createLabelColors = (types) => {
  const colors = {};
  types.forEach(([category, color]) => {
    if (!colors[category]) {
      colors[category] = color;
    }
  });
  return colors;
};

export default PieChart;
