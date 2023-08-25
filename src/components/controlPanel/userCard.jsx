import React from 'react'

const UserCard = ({ userId }) => {
  return (
    <div className='userCard'>
      <header>
        <h1>UserCard {userId}</h1>
      </header>
      <main style={{display: 'flex', flexDirection: 'row', gap: '5rem', margin:"70px 10px"}}>
        <h3>Cambiar cuenta</h3>
        <h3>Configuración</h3>
        <h3>Ayuda y comentarios</h3>
        <h3></h3>
      </main>
    </div>
  )
}

export default UserCard