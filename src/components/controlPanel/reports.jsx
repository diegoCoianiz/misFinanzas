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
    if(type === "egreso" && exclude) {
      return item.type === type && !excludedCategories.includes(item.category) && transactionMonth === currentMonth && transactionYear === currentYear;
    } else if(type === "egreso" && !exclude) {
      return item.type === type && excludedCategories.includes(item.category) && transactionMonth === currentMonth && transactionYear === currentYear;
    } 
    if (type === "all") {
      return item
    }
});

  // Obtener las transacciones relevantes para los reportes
  const relevantTransactions = filterTransactions("egreso", true, ["Alquiler", "Viajes"]);
  const relevantTransactionsWithTravels = filterTransactions("egreso", true, ["Alquiler"]);
  const travelTransactions = filterTransactions("egreso", false, [ "Viajes"]);
  const totalOfCapital = filterTransactions("all")

  /*--------------------------------------------------------------------------------------------------------------------------*/

  // 1) Función para calcular el promedio de gastos en el mes sin considerar el alquiler ni los días en los que no se gastó dinero
  const getAverageExpensesInMonthWithNoRent = () => {
    const numExpenses = relevantTransactions.length;
    const totalRelevantExpenses = relevantTransactions.reduce((acc, cur) => acc + cur.amount, 0);
    // const totalTravelExpenses = travelTransactions.reduce((acc, cur) => acc + cur.amount, 0)
    const averageExpenses = totalRelevantExpenses / numExpenses;
    const capital = totalOfCapital.reduce((acc, cur) => {
      const amount = parseFloat(cur.amount);
      return acc + (cur.type === "egreso" ? -amount : amount);
    }, 0);

    return ` Tu promedio de gastos comúnes (sin Alquiler ni Viajes) es de $${averageExpenses.toFixed(1)} por día y $${(averageExpenses * numExpenses).toFixed(1)} hasta la fecha. Para los próximos ${daysInCurrentMonth - currentDate} días se esperan $${(averageExpenses * (daysInCurrentMonth - currentDate)).toFixed(1)} mas de gastos (con un total de $${(averageExpenses.toFixed(1) * daysInCurrentMonth).toFixed(1)} gastados) finalizando el mes con un capital de $${(capital - (averageExpenses * (daysInCurrentMonth - currentDate))).toFixed(1)}`;
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
    const topCategoriesStr = topCategories.map((category) => `${category[0]} ($${category[1].toFixed(2)})`).join(", ");
    return `Mayores gastos: ${topCategoriesStr}`;
  };

  return (
    <div style={{ textAlign: "start", marginTop: "-20px" }}>
      <h3>Reportes al {currentDate} de {monthsOfYear[currentMonth - 1]}:</h3>
      <p style={{marginTop:"-10px", fontSize:"16px"}}>
        {getAverageExpensesInMonthWithNoRent()} ;<br></br> {getCategoriesWithHighestExpenses()} ;
      </p>
    </div>
  )
}

export default Reports