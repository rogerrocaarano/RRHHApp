/* import React from 'react'; */
import { useForm } from 'react-hook-form';

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert('Formulario enviado');
    console.log(data);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email) || 'Email inválido';
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age >= 18 || 'Debes tener al menos 18 años';
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        className="bg-zinc-100 z-20 flex flex-col gap-4 h-[90%] overflow-y-scroll p-6 w-[50%] ml-[10%] rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Nombre */}
        <div className="flex justify-around gap-4">
          <label className="w-1/3 text-base font-semibold border-b-2 border-zinc-900" htmlFor="nombre">
            Nombre
          </label>
          <input
            className="w-2/3 rounded-xl pl-4"
            type="text"
            {...register('nombre', {
              required: 'Nombre es requerido',
              minLength: {
                value: 2,
                message: 'Nombre debe tener al menos 2 caracteres',
              },
              maxLength: {
                value: 20,
                message: 'Nombre debe tener máximo 20 caracteres',
              },
            })}
          />
        </div>
        {errors.nombre && (
          <span className="pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900">
            {errors.nombre.message}
          </span>
        )}

        {/* Correo electrónico */}
        <div className="flex justify-around gap-4">
          <label className="w-1/3 text-base font-semibold border-b-2 border-zinc-900" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className="w-2/3 rounded-xl pl-4"
            type="email"
            {...register('email', {
              required: 'Correo electrónico es requerido',
              validate: validateEmail,
            })}
          />
        </div>
        {errors.email && (
          <span className="pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900">
            {errors.email.message}
          </span>
        )}

        {/* Fecha de nacimiento */}
        <div className="flex justify-around gap-4">
          <label className="w-1/3 text-base font-semibold border-b-2 border-zinc-900" htmlFor="birthDate">
            Fecha de nacimiento
          </label>
          <input
            className="w-2/3 rounded-xl pl-4"
            type="date"
            {...register('birthDate', {
              required: 'Fecha de nacimiento es requerida',
              validate: calculateAge,
            })}
          />
        </div>
        {errors.birthDate && (
          <span className="pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900">
            {errors.birthDate.message}
          </span>
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-xl">
          Enviar
        </button>
      </form>
    </div>
  );
}
