import React, { useMemo, useCallback } from "react";
import PieChart from "../basics/pieChart";
import { incomeCategoryColors, expenseCategoryColors, capitalAbailable } from "@/data/categoryAndColors";
import PieChartDescriptions from "./pieChartDescriptions";

const Stadistics = ({ chart }) => {
  // Creamos la lista de códigos de colores solo una vez, usando useMemo
  const categoryCodes = useMemo(() => createLabelColors([...incomeCategoryColors, ...expenseCategoryColors, ...capitalAbailable]), []);

  // Calculamos los datos para el gráfico
  const {totalIncome, totalAmount, orderCategoriesForPieDescription, labelsForPieChart, valuesForPieChart} = useMemo(() => {
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
    totalIncome - totalAmount > 0 ? combinedDivision["Ingresos disponibles"] = totalIncome - totalAmount : combinedDivision["Ingresos disponibles"] = 0;

    const values = Object.values(combinedDivision);
    const labels = [...categories, "Capital disponible"];

    const orderCategoriesForPieDescription = labels.map((label, index) => {
      return {
        label,
        value: values[index],
      };
    }).filter((category) => {
      return category.label !== "Ingresos disponibles" && category.label !== "Capital disponible";
    }).sort((a, b) => b.value - a.value);

    const incomeCategories = incomeCategoryColors.map((category) => {
      return category[0]
    })

    const labelsForPieChart = labels.filter((label) => {
      return label === "Egresos" || label === "Capital disponible" || !incomeCategories.includes(label);
    });

    const valuesForPieChart = values.filter((value, index) => {
      return labels[index] === "Egresos" || labels[index] === "Capital disponible"|| !incomeCategories.includes(labels[index]);
    });

    return {totalIncome, totalAmount, orderCategoriesForPieDescription, labelsForPieChart, valuesForPieChart};
  }, [chart, incomeCategoryColors, expenseCategoryColors, capitalAbailable]);

  // Mostramos el gráfico solo si hay datos relevantes
  const colors = useMemo(() => {
    return Object.keys(categoryCodes).map((category) => {
      if (labelsForPieChart.includes(category)) {
        return categoryCodes[category];
      }
      return null;
    }).filter((color) => color !== null).reverse();
  }, [categoryCodes, labelsForPieChart]);

  return (
    <div className="stadistics" style={{ display: "flex" }}>
      <PieChartDescriptions totalIncome={totalIncome} totalAmount={totalAmount} orderCategories={orderCategoriesForPieDescription} categoryCodes={categoryCodes} />
      <PieChart labels={labelsForPieChart} data={valuesForPieChart} colors={colors.reverse()} />
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