const Reports = ({ info }) => {
  // Validar que se haya proporcionado información antes de procesarla
  if (!info || info.length === 0) return "No hay información disponible. Añada almenos un gasto y un ingreso para comenzar a utilizar el sistema de estadisticas y reportes!";

  const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const monthsOfYear = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",];

  const currentDate = new Date().getDate();
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1;
  const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();
  // Filtrar transacciones por mes y por categoría excluyendo alquiler
  const filterTransactions = (type, exclude, excludedCategories) => info.filter((item) => {
    const transactionDate = new Date(item.createdAt);
    const transactionMonth = transactionDate.getMonth() + 1;
    const transactionYear = transactionDate.getFullYear();
    const currentYear = new Date().getFullYear();
    if (type === "egreso" && exclude) {
      return item.type === type && !excludedCategories.includes(item.category) && transactionMonth === currentMonth && transactionYear === currentYear;
    } else if (type === "egreso" && !exclude) {
      return item.type === type && excludedCategories.includes(item.category) && transactionMonth === currentMonth && transactionYear === currentYear;
    }
    if (type === "all") {
      return item
    }
  });

  // Obtener las transacciones relevantes para los reportes
  const relevantTransactions = filterTransactions("egreso", true, ["Alquiler", "Viajes"]);
  const relevantTransactionsWithTravels = filterTransactions("egreso", true, ["Alquiler"]);
  const travelTransactions = filterTransactions("egreso", false, ["Viajes"]);
  const totalOfCapital = filterTransactions("all")

  /*--------------------------------------------------------------------------------------------------------------------------*/

  // 1) Función para calcular el promedio de gastos en el mes sin considerar el alquiler ni los días en los que no se gastó dinero
  const getAverageExpensesInMonthWithNoRent = () => {
    const numExpenses = relevantTransactions.length;
    const totalRelevantExpenses = relevantTransactions.reduce((acc, cur) => acc + cur.amount, 0);
    const totalTravelExpenses = travelTransactions.reduce((acc, cur) => acc + cur.amount, 0)
    const averageExpenses = totalRelevantExpenses / numExpenses;
    const capital = totalOfCapital.reduce((acc, cur) => {
      const amount = parseFloat(cur.amount);
      return acc + (cur.type === "egreso" ? -amount : amount);
    }, 0);

    return [
      {
        label: "Promedio de gastos comunes (sin Alquiler ni Viajes)",
        value: `$${averageExpenses.toFixed(1)} por día`,
      },
      {
        label: "Total de gastos hasta la fecha (con viajes incluidos)",
        value: `$${(averageExpenses * numExpenses + totalTravelExpenses).toFixed(1)}`,
      },
      {
        label: `Proyección para los próximos ${daysInCurrentMonth - currentDate + 1} días`,
        value: `$${(averageExpenses * (daysInCurrentMonth - currentDate + 1)).toFixed(1)}`,
      },
      {
        label: "Estimación de gastos a final del mes",
        value: `$${((averageExpenses.toFixed(1) * daysInCurrentMonth + 1) + totalTravelExpenses).toFixed(1)}`,
      },
      {
        label: "Capital estimado a final del mes",
        value: `$${(capital - averageExpenses * (daysInCurrentMonth - currentDate + 1) - totalTravelExpenses).toFixed(1)}`,
      },
    ];
  };

  // 2) Función para obtener las categorías con mayor gasto del mes
  const getCategoriesWithHighestExpenses = () => {
    const expensesByCategory = {};
    relevantTransactionsWithTravels.forEach((item) => {
      const category = item.category;
      if (!expensesByCategory[category]) {
        expensesByCategory[category] = 0;
      }
      expensesByCategory[category] += item.amount;
    });
    const sortedCategories = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1]);
    const topCategories = sortedCategories.slice(0, 3);
    const topCategoriesItems = topCategories.map((category) => ({
      label: category[0],
      value: `$${category[1].toFixed(2)}`,
    }));

    return [
      {
        label: "Categorías con mayores gastos",
        items: topCategoriesItems,
      },
    ];
  };



  return (
    <div style={{ textAlign: "start", marginTop: "-20px" }}>
      <h3>Reportes al {currentDate} de {monthsOfYear[currentMonth - 1]}:</h3>
      <p style={{ marginTop: "-10px", fontSize: "16px" }}>
        {getAverageExpensesInMonthWithNoRent().map((item, index) => (
          <span key={index}>
            {item.label}: {item.value}
            <br />
          </span>
        ))}
        <br />
        {getCategoriesWithHighestExpenses().map((item, index) => (
          <span key={index}>
            {item.label}:{" "}
            {item.items.map((category, categoryIndex) => (
              <span key={categoryIndex}>
                {category.label} ({category.value})
                {categoryIndex !== item.items.length - 1 ? ", " : ""}
              </span>
            ))}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Reports