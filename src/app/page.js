'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from "next/navigation"
import Carousel from '@/components/carousel'

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
      <div className='indexBody' style={{ marginTop: "6%" }}>
        <div className='indexLeftSection' style={{ padding: "10px" }}>
          <Carousel>
            <div style={{ justifyContent: "flex-start" }}>
              <p>MisFinanzas es la herramienta perfecta para llevar un registro de tus gastos diarios de manera fácil y eficiente. Creá una cuenta personalizada y comenzá a registrar tus gastos de forma instantánea.</p>
              {/* <div style={{ width: "200px", height: "125px" }}>
                <img src={"https://img.icons8.com/fluency/256/dapp.png"} width={100} height={70} alt={"img"} />
              </div> */}
            </div>
            <div style={{ justifyContent: "flex-end" }}>
              <p>Visualizá tus gastos de manera clara y concisa, caegoriza e identificá patrones de gastos y áreas en las que puedes ahorrar dinero. Filtrá por etiquetas personalizadas y tené un control completo de tus finanzas personales.</p>
              {/* <div style={{ width: "200px", height: "125px" }}>
                <img src={"https://img.icons8.com/nolan/256/categorize.png"} width={100} height={70} alt={"img"} />
              </div> */}
            </div>
          </Carousel>

          <div>
            <h6 style={{ textAlign: "start", marginBottom: "-15px", color: "yellow" }}>Mensaje del autor:</h6>
            <p>"Como proyecto independiente, MisFinanzas se enfoca en las necesidades específicas de los usuarios, no en los intereses de grandes emprendimientos, y está diseñada para ayudarte a manejar tus números de manera efectiva sin preocuparte por otros asuntos. Recomiendo MisFinanzas para cualquier persona que busque una manera fácil y segura de llevar un registro de sus gastos diarios y mantenerse al tanto de sus finanzas personales."  </p>
          </div>
        </div>
        <div className='indexRightSection'>
          <form onSubmit={handleSubmit}>
            <input type="text" name="userName" placeholder="@Usuario" value={userForm.userName} onChange={handleChange} />
            <input type={isPasswordVisible ? "text" : "password"} name="password" placeholder="@Contraseña" value={userForm.password} onChange={handleChange} />
            <div style={{ display: "flex", alignItems: "center", width: "95%", marginLeft: "3%", marginTop: "-7px" }}>
              <button type="button" style={{ display: "flex", background: "white", border: "none", width: "35px", height: "30px", cursor: "pointer", paddingTop: "4px", paddingLeft: "5px", marginRight: "10px" }} onClick={togglePasswordType}> {isPasswordVisible ? <Image src={"https://cdn-icons-png.flaticon.com/512/9178/9178093.png"} width={25} height={25} alt={"open"} /> : <Image src={"https://cdn-icons-png.flaticon.com/512/3495/3495857.png"} width={25} height={25} alt={"close"} />} </button>
              <div>{isPasswordVisible ? <p>Ocultar contraseña </p> : <p> Mostrar contraseña </p>}</div>
            </div>
            <button type="submit" style={{ cursor: "pointer", backgroundColor: "#09af20" }}>
              Iniciar sesión
            </button>
            <Link href={"/"} style={{ textDecoration: "none" }}>
              <p style={{ marginTop: "0px", color: "white" }}>Olvidaste tu contraseña?</p>
            </Link>
          </form>
          <Link href={"/register"} style={{ textDecoration: "none", color: "white" }}><button style={{ cursor: "pointer", backgroundColor: " #1d3cc2" }}>
            Registrarse</button></Link>
        </div>
      </div >
      <div style={{ borderTop: "1px solid white" }}>
        <p>todos los derechos reservados.<Link href={"https://juandiegocoianiz.vercel.app"} target='_blank' style={{ textDecoration: "none" }}> Juan Diego Coianiz </Link> </p>
      </div>
    </>
  )
}
export default Index