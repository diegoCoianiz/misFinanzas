"use client"
import React from 'react'
import Image from 'next/image'
import Carousel from '@/components/basics/carousel'
import CarouselBox from '@/components/basics/carouselBox'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Register = () => {
    const router = useRouter()
    const [userForm, setUserForm] = useState({
        userName: "",
        password: "",
        passwordAgain: "",
    })

    const [theUserNameBorder, setTheUserNameBorder] = useState('0px solid #fff');
    const [thePasswordBorder, setThePasswordBorder] = useState('0px solid #fff');
    const correctBorder = '3px solid #09af20'
    const wrongBorder = '3px solid #F2178B'

    const handleSubmit = (e) => {
        const { password, passwordAgain, userName } = userForm;
        e.preventDefault()
        console.log(password, passwordAgain, userName)
        if (password === passwordAgain && password.length >= 4 && userName.length >= 4) {
            fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userForm)
            })
                .then(res => {
                    if (res.ok) return res.json()
                    else throw new Error('Network response was not ok')
                })
                .then(data => {
                    if (data._check) router.push(`/dashboard?id=${data.id}`)
                })
                .catch(error => console.error('There was a problem with the fetch operation:', error))
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm({
            ...userForm,
            [name]: value,
        });
    };

    useEffect(() => {
        const { password, passwordAgain, userName } = userForm;
        if (userName.length > 0) {
            userName.length < 4 ? setTheUserNameBorder(wrongBorder) : setTheUserNameBorder(correctBorder)
        }
        if (password.length > 0) {
            password.length < 4 || password !== passwordAgain ? setThePasswordBorder(wrongBorder) : setThePasswordBorder(correctBorder);
        }
    }, [userForm])

    return (
        <>
            <div className='indexBody' style={{ marginTop: "6%", width: "95%" }}>
                <div className='indexLeftSection' style={{ padding: "10px" }}>
                    <div>
                        <h6 style={{ textAlign: "start", margin: "0px", marginBottom: "-18px", color: "yellow" }}>Mensaje del autor:</h6>
                        <p style={{ marginBottom: "5%" }}>'digitalOrganizer' ha sido diseñada pensando en la simplicidad y la intuitividad para el usuario. No solicitamos información innecesaria y no estamos interesados en obtener datos personales de nuestros usuarios. Nuestra única finalidad es hacer que la gestión de las finanzas personales sea más sencilla y accesible para todos. Queremos ayudar a las personas a tener un mayor control de sus gastos e ingresos, y permitirles tomar decisiones financieras más informadas. </p>
                    </div>
                    <div className='registerCarousel'>
                    <Carousel>
                        <CarouselBox text={"Optimiza tu tiempo y tus finanzas en un solo lugar. Nuestra aplicación te permite gestionar tanto tus gastos como tu agenda diaria, brindándote una solución integral para organizar tu vida."} image={"https://cdn-icons-png.flaticon.com/512/809/809448.png"} />
                        <CarouselBox text={"Visualiza tus datos financieros en gráficos interactivos y fáciles de entender. Observa cómo tus gastos fluctúan a lo largo del tiempo y identifica áreas en las que puedes ajustar tus hábitos para lograr un mayor equilibrio económico."} image={"https://cdn-icons-png.flaticon.com/512/1177/1177568.png"} marginTop={"15px"} />
                        <CarouselBox text={"Descubre áreas de oportunidad para ahorrar dinero mediante el análisis de tus gastos. Categoriza y etiqueta tus transacciones para identificar patrones y tomar decisiones financieras más inteligentes."} image={"https://cdn-icons-png.flaticon.com/512/10008/10008777.png"} marginTop={"-10px"} />
                        <CarouselBox text={"Simplifica tu vida con nuestra aplicación todo en uno. Agenda reuniones, establece metas financieras y realiza un seguimiento de tu progreso, permitiéndote administrar tu tiempo y tu dinero de manera eficiente."} image={"https://cdn-icons-png.flaticon.com/512/5141/5141636.png"} marginTop={"15px"} />
                    </Carousel>
                    </div>
                </div>
                <div className='indexRightSection'>
                    <form onSubmit={handleSubmit}>
                        <p style={{ textAlign: "center", margin: "0px" }}>Nuevo registro:</p>
                        <input type='text' name='userName' placeholder='@Usuario' onChange={handleChange} style={{ border: `${theUserNameBorder}` }} />
                        <input type='password' name='password' placeholder='@Contraseña' onChange={handleChange} style={{ border: `${thePasswordBorder}` }} />
                        <input type='password' name='passwordAgain' placeholder='@ Repetir contraseña' onChange={handleChange} style={{ border: `${thePasswordBorder}` }} />
                        {thePasswordBorder === theUserNameBorder && theUserNameBorder === correctBorder ?
                            <button type='submit' style={{ cursor: "pointer", backgroundColor: "#09af20" }}>Registrar</button> :
                            <p>Todos los casilleros deben estar marcardos en color verde. Ingresa un nombre de usuario y contraseña con al menos cuatro caracteres.</p>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register