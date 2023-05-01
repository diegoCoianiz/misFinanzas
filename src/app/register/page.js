"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
            <div className='indexBody' style={{ marginTop: "6%" }}>
                <div className='indexLeftSection' style={{ padding: "10px" }}>
                    <div>
                        <h6 style={{ textAlign: "start", margin: "0px", marginBottom: "-18px", color: "yellow" }}>Mensaje del autor:</h6>
                        <p>'Mis Finanzas' ha sido diseñada pensando en la simplicidad y la intuitividad para el usuario. No solicitamos información innecesaria y no estamos interesados en obtener datos personales de nuestros usuarios. Nuestra única finalidad es hacer que la gestión de las finanzas personales sea más sencilla y accesible para todos. Queremos ayudar a las personas a tener un mayor control de sus gastos e ingresos, y permitirles tomar decisiones financieras más informadas. </p>
                    </div>
                    <div style={{ display: "flex", textAlign: "start" }}>
                        <Image src={"https://img.icons8.com/?size=512&id=64994&format=png"} width={200} height={125} alt={"img"} />
                        <p> Registrá tus ingresos y gastos, establecé metas de ahorro y controlá tu presupuesto diario. Administrá en equipo las compras grupales, tené una visión completa de tus finanzas y tomá decisiones más informadas. ¡Únete a nuestra comunidad y comienza a tomar el control de tus finanzas!" </p>
                    </div>
                </div>
                <div className='indexRightSection'>
                    <p style={{ textAlign: "start", margin: "0px" }}>Nuevo registro:</p>
                    <form onSubmit={handleSubmit}>
                        <input type='text' name='userName' placeholder='@Usuario' onChange={handleChange} style={{ border: `${theUserNameBorder}` }} />
                        <input type='password' name='password' placeholder='@Contraseña' onChange={handleChange} style={{ border: `${thePasswordBorder}` }} />
                        <input type='password' name='passwordAgain' placeholder='@ Repetir contraseña' onChange={handleChange} style={{ border: `${thePasswordBorder}` }} />
                        {thePasswordBorder === theUserNameBorder && theUserNameBorder === correctBorder ?
                            <button type='submit' style={{ cursor: "pointer", backgroundColor: "#09af20" }}>Registrar</button> :
                            <p>Para llevar a cabo la solicitud, asegurate de que todos los casilleros estén marcardos en color verde. Para ello ingresa un nombre de usuario y contraseña con al menos cuatro caracteres</p>
                        }
                    </form>
                </div>
            </div>
            <div style={{ borderTop: "1px solid white" }}>
                <p>todos los derechos reservados.<Link href={"https://juandiegocoianiz.vercel.app"} target='_blank' style={{ textDecoration: "none" }}> Juan Diego Coianiz </Link> </p>
            </div>
        </>
    )
}

export default Register