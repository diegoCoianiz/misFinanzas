import React, { useMemo, useCallback } from "react";
import PieChart from "../basics/pieChart";
import { incomeCategoryColors, expenseCategoryColors, capitalAbailable } from "@/data/categoryAndColors";
import PieChartDescriptions from "./pieChartDescriptions";

const Stadistics = ({ chart }) => {
  // Creamos la lista de códigos de colores solo una vez, usando useMemo
  const categoryCodes = useMemo(() => createLabelColors([...incomeCategoryColors, ...expenseCategoryColors, ...capitalAbailable]), []);

  // Filtramos las transacciones realizadas en el mes actual
  const currentMonthTransactions = chart.filter((element) => {
    const transactionDate = new Date(element.createdAt);
    const transactionMonth = transactionDate.getMonth() + 1;
    const transactionYear = transactionDate.getFullYear();
    
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
  
    return transactionYear === currentYear && transactionMonth === currentMonth;
  });

  // Calculamos los datos totales para el gráfico
  let totalIncome = 0;
  let totalAmount = 0;

  for (const element of chart) {
    if (element.type === "ingreso") {
      totalIncome += Number(element.amount);
    } else {
      totalAmount += Number(element.amount);
    }
  }

  // Calculamos los datos para el gráfico del mes actual
  const { orderCategoriesForPieDescription, labelsForPieChart, valuesForPieChart, totalAmountForThisMonth } = useMemo(() => {
    const combinedDivision = {};
    const categories = new Set();
    let totalAmountForThisMonth = 0;

    for (const element of currentMonthTransactions) {
      const category = element.category;
      if (element.type === "ingreso") {
        combinedDivision[category] = (combinedDivision[category] || 0) + Number(element.amount);
        categories.add(category);
      } else {
        combinedDivision[category] = (combinedDivision[category] || 0) - Number(element.amount);
        categories.add(category);
        totalAmountForThisMonth += Number(element.amount);
      }
    }
    combinedDivision["Ingresos disponibles"] = Math.max(totalIncome - totalAmount, 0);

    const values = Object.values(combinedDivision);
    const labels = [...categories, "Capital disponible"];

    const orderCategoriesForPieDescription = labels
      .map((label, index) => {
        return {
          label,
          value: values[index],
        };
      })
      .filter((category) => {
        return category.label !== "Ingresos disponibles" && category.label !== "Capital disponible";
      })
      .sort((a, b) => b.value - a.value)
      .reverse();

    const incomeCategories = incomeCategoryColors.map((category) => {
      return category[0];
    });

    const labelsForPieChart = labels.filter((label) => {
      return label === "Egresos" || label === "Capital disponible" || !incomeCategories.includes(label);
    });

    const valuesForPieChart = values.filter((value, index) => {
      return (
        labels[index] === "Egresos" ||
        labels[index] === "Capital disponible" ||
        !incomeCategories.includes(labels[index])
      );
    });

    return { orderCategoriesForPieDescription, labelsForPieChart, valuesForPieChart, totalAmountForThisMonth };
  }, [currentMonthTransactions, incomeCategoryColors, expenseCategoryColors, capitalAbailable]);

  // Mostramos el gráfico solo si hay datos relevantes
  const colors = useMemo(() => {
    return Object.keys(categoryCodes)
      .map((category) => {
        if (labelsForPieChart.includes(category)) {
          return categoryCodes[category];
        }
        return null;
      })
      .filter((color) => color !== null);
  }, [categoryCodes, labelsForPieChart]);

  return (
    <div className="stadistics" style={{ display: "flex" }}>
      <PieChartDescriptions totalIncome={totalIncome} totalAmount={totalAmount} totalAmountForThisMonth={totalAmountForThisMonth} orderCategories={orderCategoriesForPieDescription} categoryCodes={categoryCodes} />
      <PieChart labels={labelsForPieChart} data={valuesForPieChart} colors={colors} />
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

export default Stadistics