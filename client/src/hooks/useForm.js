import { useState } from "react"

export const useForm = (initialForm,validateForm)=>{

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  

  const handleChange = (e)=>{
    const {name,value} = e.target
    setForm({
      ...form,
      [name]: value
    })
  }
  let fecha = new Date(form.releaseDate)
 
  

  const handleBlur = (e)=>{
    handleChange(e)
    setErrors(validateForm(form))
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    setErrors(validateForm(form))
    if(Object.keys(errors).length===0){

      alert("Enviando Formulario")
      

    }else return
  }

  return {
    form,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    fecha
  }

}