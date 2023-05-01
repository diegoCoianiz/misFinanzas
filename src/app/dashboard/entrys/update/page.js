'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { incomeCategoryColors, expenseCategoryColors } from '@/data/categoryAndColors'
import TransactionBox from '@/components/transactionBox'

const UpdateTransaction = ({ searchParams }) => {

  let types = { egreso: [], ingreso: [] };

  createTypes(types, incomeCategoryColors, expenseCategoryColors) //ingreso, egreso

  const router = useRouter()
  const [userNewAmount, setUserNewAmount] = useState({
    amount: '',
    notes: '',
    category: 'Alimentación',
    type: 'egreso',
    transactionId: searchParams.id
  })
  const [categoryOptions, setCategoryOptions] = useState(
    types[userNewAmount.type]
  );

  //GET
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/transactions?id=${searchParams.id}&request=update`);
      const awaitTransaction = await response.json();
      // setUser(awaitUser.user);
      if (awaitTransaction.transaction !== undefined) {
        setUserNewAmount(awaitTransaction.transaction);
      }
    }
    fetchData();
  }, []);

  //PUT
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/transactions', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userNewAmount)
    }).then(res => {
      if (res.ok) return res.json()
    }).then(data => {
      if (data) router.push(data.res)
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserNewAmount({
      ...userNewAmount,
      [name]: value,
    });
    if (value === "egreso") {
      setUserNewAmount({
        ...userNewAmount,
        [name]: value,
        category: "Alimentación",
      });
    } else if (value === "ingreso") {
      setUserNewAmount({
        ...userNewAmount,
        [name]: value,
        category: "Alquileres",
      });
    }
  };


  const renderCategoryOptions = () => {
    return categoryOptions.map((category, id) => (
      <option
        style={{ width: "100%", margin: "5px 0px" }}
        key={category}
        name={"category"}
        value={category}
        onChange={handleChange}
        defaultValue={id === 0 ? true : false}
      >
        {category}
      </option>
    ));
  };

  useEffect(() => {
    setCategoryOptions(types[userNewAmount.type]);
  }, [userNewAmount.type]);


  return (
    <div className='newTransactionFormPage'>
      <p style={{ textAlign: "start", marginBottom: "-20px" }}>modificar transacción: {userNewAmount.transactionId} </p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} type='number' step="0.1" name='amount' placeholder='@Monto: $500' defaultValue={userNewAmount.amount} onChange={handleChange} />
        <input style={styles.input} type='text' name='notes' placeholder='@Descripción opcional: "pago de alquiler"' defaultValue={userNewAmount.notes} onChange={handleChange} />

        <div style={{ margin: "15px 2px" }}>
          <label htmlFor='gasto' style={{ marginRight: "25px", fontSize: "20px" }}>
            <input type='radio' id='egreso' name='type' value='egreso' checked={userNewAmount.type === 'egreso'} onChange={handleChange} />
            Gasto
          </label>
          <label htmlFor='ingreso' style={{ fontSize: "20px" }}>
            <input type='radio' id='ingreso' name='type' value='ingreso' checked={userNewAmount.type === 'ingreso'} onChange={handleChange} />
            Ingreso
          </label>
        </div>

        <label htmlFor='category'>
          <select style={styles.input} name='category' id='category' value={userNewAmount.category} onChange={handleChange}>
            {renderCategoryOptions()}
          </select>
        </label>


        <input type='submit' style={{ width: '100%', height: '60px', backgroundColor: '#09af20' }} value={"Añadir"} />
      </form>
      { }
      <div className='newTransactionFormPage_transactionBox'>
        <p style={{ margin: "0px", marginBottom: "-5px", textAlign: "start" }} >tu nueva transacción:</p>
        <TransactionBox amount={userNewAmount.amount} date={false} category={userNewAmount.category} type={userNewAmount.type} notes={userNewAmount.notes} userNewAmount_id={userNewAmount._id} />
      </div>
    </div>
  )
}

export default UpdateTransaction

const createTypes = (types, incomeTypes, expenseTypes) => {
  for (let element in incomeTypes) { //ingresos
    types.ingreso.push(incomeTypes[element][0])
  }
  for (let element in expenseTypes) { //gastos
    types.egreso.push(expenseTypes[element][0])
  }
}


const styles = {
  form: {
    marginTop: "20px",
  },
  input: {
    width: "100%",
    height: "60px",
    bordderRadius: "10px",
  }
}