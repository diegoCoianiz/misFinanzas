'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from "next/navigation"
import Carousel from '@/components/carousel'
import CarouselBox from '@/components/carouselBox'
import FixedTitle from '@/components/fixedTitle'

const Index = () => {
  const router = useRouter()
  const [userForm, setUserForm] = useState({
    userName: "",
    password: "",
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordType = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userForm)
    }).then(res => { if (res.ok) return res.json() }
    ).then(data => {
      console.log(data._check, data._id)
      if (data._check) router.push(`/dashboard?id=${data.id}`)
    })
  }


  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <FixedTitle />

      <div className='indexBody' style={{ marginTop: "65px" }}>
        <section className='indexLeftSection'>
          <Carousel>
            <CarouselBox text={"Creá una cuenta personalizada y comenzá a registrar tus gastos diarios de forma instantánea."} image={"https://cdn-icons-png.flaticon.com/512/1177/1177568.png"} marginTop={"15px"} />
            <CarouselBox text={"Filtrá por etiquetas personalizadas, categoriza e identificá patrones de gastos y áreas en las que puedes ahorrar dinero."} image={"https://cdn-icons-png.flaticon.com/512/10008/10008777.png"} marginTop={"-10px"} />
            <CarouselBox text={"Administrá en equipo las compras grupales, tené una visión completa de tus finanzas compartidas y tomá decisiones más informadas."} image={"https://cdn-icons-png.flaticon.com/512/809/809448.png"} />
            <CarouselBox text={"¡Únete a nuestra comunidad y comienza a tomar el control de tus finanzas!"} image={"https://cdn-icons-png.flaticon.com/512/5141/5141636.png"} marginTop={"15px"} />
          </Carousel>

          <div>
            <h6 style={{ textAlign: "start", marginBottom: "-15px", color: "yellow" }}>Mensaje del autor:</h6>
            <p>"Como proyecto independiente, MisFinanzas se enfoca en las necesidades específicas de los usuarios, no en los intereses de grandes emprendimientos, y está diseñada para ayudarte a manejar tus números de manera efectiva sin preocuparte por otros asuntos. Recomiendo MisFinanzas para cualquier persona que busque una manera fácil y segura de llevar un registro de sus gastos diarios y mantenerse al tanto de sus finanzas personales."  </p>
          </div>
        </section>
        <section className='indexRightSection' >
          <form onSubmit={handleSubmit}>
            <input type="text" name="userName" placeholder="@Usuario" value={userForm.userName} onChange={handleChange} />
            <input type={isPasswordVisible ? "text" : "password"} name="password" placeholder="@Contraseña" value={userForm.password} onChange={handleChange} />
            <div style={{ display: "flex", alignItems: "center", width: "95%", marginLeft: "3%", marginTop: "-7px" }}>
              <button type="button" style={{ display: "flex", background: "white", border: "none", width: "35px", height: "30px", cursor: "pointer", paddingTop: "4px", paddingLeft: "5px", marginRight: "10px" }} onClick={togglePasswordType}> {isPasswordVisible ? <Image src={"https://cdn-icons-png.flaticon.com/512/9178/9178093.png"} width={25} height={25} alt={"open"} /> : <Image src={"https://cdn-icons-png.flaticon.com/512/3495/3495857.png"} width={25} height={25} alt={"close"} />} </button>
              <div>{isPasswordVisible ? <p>Ocultar contraseña </p> : <p> Mostrar contraseña </p>}</div>
            </div>
            <button type="submit" style={{ cursor: "pointer", backgroundColor: "#09af20", color: "white" }}>
              Iniciar sesión
            </button>
            <Link href={"/"} style={{ textDecoration: "none" }}>
              <p style={{ marginTop: "0px", color: "white" }}>Olvidaste tu contraseña?</p>
            </Link>
          </form>
          <Link href={"/register"} style={{ textDecoration: "none" }}><button style={{ cursor: "pointer", backgroundColor: " #1d3cc2", color: "white" }}>
            Registrarse</button></Link>
        </section>
      </div>
      <footer style={{ borderTop: "1px solid white", }}>
        <p style={{ fontSize: "15px" }}>Copyright © 2023<Link href={"https://juandiegocoianiz.vercel.app"} target='_blank' style={{ textDecoration: "none", color: "#FFBA08" }}> Juan Diego Coianiz</Link>. Todos los derechos reservados. </p>
        <div>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "-20px" }}>
              <Image src="https://cdn-icons-png.flaticon.com/512/1060/1060678.png" width={50} height={50} alt={'logo'} />
              <h1 style={{ fontSize: "30px", marginLeft: "15px" }}>MisFinanzas</h1>
            </div>
            <p style={{ fontSize: "12px", marginTop: "-25px", marginLeft: "85px" }}>utiliza las siguientes tecnologías:</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", marginTop: "-10px", }}>

            <Image src="https://cdn-icons-png.flaticon.com/512/919/919825.png" width={60} height={60} alt={"nodejs"} style={{ margin: "0px 20px" }} />
            <div style={{ display: "flex", margin: "0px 20px" }}>
              <Image src="https://cdn-icons-png.flaticon.com/512/649/649769.png" width={50} height={50} alt={"vercel"} style={{ marginTop: "10px" }} />
              <h1 style={{ fontSize: "30px" }}>Vercel</h1>
            </div>
            <div style={{ display: "flex", margin: "0px 20px" }}>
              <Image src="https://cdn-icons-png.flaticon.com/512/4315/4315005.png" width={50} height={50} alt={"MongDB"} style={{ marginTop: "10px" }} />
              <h1 style={{ fontSize: "30px" }}>MongoDB</h1>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
export default Index