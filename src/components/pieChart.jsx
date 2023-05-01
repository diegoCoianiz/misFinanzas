import React, { useEffect, useRef, useMemo, useCallback } from "react";
import Chart from "chart.js/auto";
import { incomeCategoryColors, expenseCategoryColors } from "@/data/categoryAndColors";
import Image from "next/image";

const PieChart = ({ chart }) => {
  const categoryCodes = useMemo(() => createLabelColors([...incomeCategoryColors, ...expenseCategoryColors]), []);

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  const calculateChartData = useCallback(() => {
    const firstDivision = {};
    const categories = new Set();
    let totalIncome = 0;
    let totalAmount = 0;

    for (const element of chart) {
      if (element.type === "ingreso") {
        totalIncome += Number(element.amount);
      } else {
        const category = element.category;
        firstDivision[category] = (firstDivision[category] || 0) + Number(element.amount);
        categories.add(category);
        totalAmount += Number(element.amount);
      }
    }

    const labels = [...categories];
    const values = Object.values(firstDivision);

    return {
      labels,
      values,
      totalAmount,
      totalIncome,
    };
  }, [chart]);

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
      };

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartContainer.current, chartConfig);
    }
  }, [chart, categoryCodes, calculateChartData]);

  const { totalIncome, totalAmount } = calculateChartData();
  const pieChartView = useMemo(() => totalIncome > 0 && totalAmount > 0, [totalIncome, totalAmount]);

  return (
    <>
      <div>
        {pieChartView ? (
          <>
            <h1 style={{ textAlign: "start", margin: "0px" }}> {"<"} Estadisticas  {">"}</h1>
            <p style={styles.p} >Total de gastos: ${totalAmount} {"<"} {Math.floor((totalAmount / totalIncome) * 100)}% de ${totalIncome} {">"} </p>
            <p style={styles.p}>Categoria con mayor gasto: xxx {"<"} xx% del capital {">"} </p>
            <p style={styles.p}>Meta de ahorro: $xxx {"<"} xx% del capital {">"} </p>
            <p style={styles.p}>El promedio de gasto por día: $xxx coincide con la espectativa de ahorro! {"<"} $xxx por día, xx% del capital {">"} sigue así!</p>
            <br></br>
            <h1 style={styles.p}> {"<"} Gastos por categoría  {">"}</h1>

          </>
        ) : (
          <div style={{marginBottom:"-350px"}}>
            <h1 style={{ textAlign: "center", margin: "0px", marginBottom: "10px" }}> {"<"} Agregá al menos un gasto para visualizar nuestros gráficos! {">"}</h1>
            <Image src={"https://cdn-icons-png.flaticon.com/512/3589/3589881.png"} width={300} height={300} alt={"chart"} />
          </div>
        )}

        {!!chartContainer ? (
          <>
            <canvas ref={chartContainer} />
            <br></br>
          </>
        ) : (
<></>
        )}
      </div>
    </>
  );
};

export default PieChart;

const createLabelColors = (types) => {
  const colors = {};
  types.forEach(([category, color]) => {
    if (!colors[category]) {
      colors[category] = color;
    }
  });
  return colors;
};


const styles = {
  p: {
    textAlign: "center",
    margin: "0px"
  }
}
