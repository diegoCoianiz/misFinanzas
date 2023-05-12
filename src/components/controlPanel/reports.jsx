import React, { useEffect, useState } from 'react'

const Reports = ({ info }) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Sumamos 1 ya que los meses van de 0 a 11
  
    // Función para filtrar transacciones por mes y por categoría excluyendo alquiler
    const filterTransactions = (transactions) => transactions.filter((item) => {
      const transactionMonth = new Date(item.createdAt).getMonth() + 1;
      return item.type === "egreso" && item.category !== "Alquiler" && transactionMonth === currentMonth;
    });
  
    // Función para calcular el promedio de gastos en el mes sin considerar el alquiler ni los días en los que no se gastó dinero
    const getAverageExpensesInMonthWithNoRent = () => {
      const expensesInMonth = filterTransactions(info);
      const numExpenses = expensesInMonth.length;
      const totalExpenses = expensesInMonth.reduce((acc, cur) => acc + cur.amount, 0);
      const averageExpenses = totalExpenses / numExpenses;
      return `Promedio de gastos en el mes: $${averageExpenses.toFixed(1)}`;
    };
  
    // Función para obtener el día con el gasto más importante en el mes sin considerar el alquiler
    const getDayWithHighestExpenseInMonthWithNoRent = () => {
      const expensesInMonth = filterTransactions(info);
      let highestExpenseDay;
      let highestExpenseAmount = 0;
      let highestExpenseCategory;
      expensesInMonth.forEach((item) => {
        if (item.amount > highestExpenseAmount) {
          highestExpenseDay = item.createdAt.slice(8, 10);
          highestExpenseAmount = item.amount;
          highestExpenseCategory = item.category;
        }
      });
      return `Gasto más importante: $${highestExpenseAmount.toFixed(2)} el ${highestExpenseDay} en la categoría ${highestExpenseCategory}`;
    };
  
    // Función para obtener las categorías con mayor gasto del mes
    const getCategoriesWithHighestExpenses = () => {
      const expensesInMonth = filterTransactions(info);
      const expensesByCategory = {};
      expensesInMonth.forEach((item) => {
        const category = item.category;
        if (!expensesByCategory[category]) {
          expensesByCategory[category] = 0;
        }
        expensesByCategory[category] += item.amount;
      });
      const sortedCategories = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1]);
      const topCategories = sortedCategories.slice(0, 3);
      const topCategoriesStr = topCategories.map((category) => `${category[0]} ($${category[1].toFixed(2)})`).join(", ");
      return `Categorías con mayor gasto: ${topCategoriesStr}`;
    };

    // Reporte 4: Gastos por día de la semana
// Función para obtener los gastos por día de la semana y los días con mayor gasto
const getExpensesByDayOfWeek = () => {
    // Validar que se haya proporcionado información antes de procesarla
    if (!info || info.length === 0) {
      return "No hay información disponible";
    }
  
    // Array con los nombres de los días de la semana en español
    const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  
    // Objeto para almacenar los gastos por día de la semana
    const expensesByDayOfWeek = {
      "Domingo": 0,
      "Lunes": 0,
      "Martes": 0,
      "Miércoles": 0,
      "Jueves": 0,
      "Viernes": 0,
      "Sábado": 0
    };
  
    // Recorrer todas las transacciones y acumular los gastos por día de la semana
    info.forEach((item) => {
      if (item.type === "egreso" && item.category !== "Alquiler") {
        const date = new Date(item.createdAt);
        const dayOfWeek = weekdays[date.getDay()];
        expensesByDayOfWeek[dayOfWeek] += item.amount;
      }
    });
  
    // Obtener los días con mayor gasto
    const sortedExpenses = Object.entries(expensesByDayOfWeek).sort((a, b) => b[1] - a[1]);
    const topDays = sortedExpenses.slice(0, 3);
    const topDaysStr = topDays.map((day) => `${day[0]} ($${day[1].toFixed(2)})`).join(", ");
  
    // Construir la cadena de texto de salida
    let outputStr = ""
    weekdays.forEach((day) => {
      outputStr += `${day.slice(0,3)}: $${expensesByDayOfWeek[day].toFixed(2)};\n`;
    });
    outputStr += `\n Días con mayor gasto: ${topDaysStr}`;
  
    return outputStr;
  };
  
  
  
    return (
        <div style={{textAlign: "start", marginTop: "-20px"}}>
            <p>
                {getAverageExpensesInMonthWithNoRent()} ;<br></br> {getDayWithHighestExpenseInMonthWithNoRent()} ;<br></br> {getCategoriesWithHighestExpenses()} ;
            </p>
            <p>
            {getExpensesByDayOfWeek()}
            </p>
        </div>
    )
}

export default Reports