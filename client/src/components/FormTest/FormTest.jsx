import React from 'react'
import { useForm } from '../../hooks/useForm'

const initialForm = {
  name:"",
  subject:"",
  comments:"",
  email:"",
}

const validationsForm = (form) => {
  let errors = {}
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexComments = /^.{1,255}$/;



  if(!form.name.trim()){
    errors.name = "El campo 'name' es requerido"
  }else if(!regexName.test(form.name.trim())){
    errors.name = "El campo 'nombre' solo acepta letras"
  }

  if(!form.email.trim()){
    errors.email = "El campo 'email' es requerido"
  }else if(!regexEmail.test(form.email.trim())){
    errors.email = "El campo 'email' es incorrecto"
  }

  if(!form.subject.trim()){
    errors.subject = "El campo 'subject' es requerido"
  }

  if(!form.comments.trim()){
    errors.comments = "El campo 'comments' es requerido"
  }else if(!regexComments.test(form.comments.trim())){
    errors.comments = "El campo 'comments' no puede ser mayor a 250 caracteres "
  }
  return errors
}

const FormTest = () => {

  const {form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit} = useForm(initialForm,validationsForm)
  
  return (
    <div>
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        name="name" 
        placeholder="Escribe tu nombre" 
        onChange={handleChange} 
        onBlur={handleBlur}
        value={form.name}
        />
        {errors && <p>{errors.name}</p>}
        
        <input 
        type="email" 
        name="email" 
        placeholder="Escribe tu email" 
        onChange={handleChange} 
        onBlur={handleBlur}
        value={form.email}
        />
         {errors && <p>{errors.email}</p>}

        <input 
        type="text" 
        name="subject" 
        placeholder="Escribe el subject" 
        onChange={handleChange} 
        onBlur={handleBlur}
        value={form.subject}
        />
         {errors && <p>{errors.subject}</p>}

       <textarea
       name="comments" 
       placeholder="Escribe tus comentarios" 
       onChange={handleChange} 
       onBlur={handleBlur}
       value={form.comments}
       >
       </textarea>
       {errors && <p>{errors.comments}</p>}
        <input type="submit" disabled={Object.keys(errors).length===0?false:true} value="Guardar" />
      </form>
    </div>
  )
}

export default FormTest