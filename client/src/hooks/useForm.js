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

  const handleBlur = (e)=>{
    handleChange(e)
    setErrors(validateForm(form))
  }


  return {
    form,
    errors,
    handleChange,
    handleBlur,
   
  }

}