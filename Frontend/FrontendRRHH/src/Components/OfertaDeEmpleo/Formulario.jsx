import { useForm } from "react-hook-form";

export function Formulario() {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();
  console.log(errors)

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <div className="bg-green-300 ">


      <form onSubmit={onSubmit}>
        {/*Nombre*/}
        <label html htmlFor="nombre">
          Nombre
        </label>
        <input
          className="bg-pink-300 m-2"
          type="text"
          {...register("nombre", { 
            required: { 
                value: true,
                message: "Nombre es requqerido"},

            minLength: {
                value: 2,
                message: "Nombre debe tener al menos 2 caracteres"},

            maxLength: {
                value: 20,
                message: "Nombre debe tener maximo 20 caracteres"},
          })}
        ></input>
        {
            errors.nombre && <span class="text-red-700"> {errors.nombre.message} Nombre es requerido</span>
        }

        {/*Correo*/}
        <label html htmlFor="correo">
          Correo
        </label>
        <input
          className="bg-pink-300 m-2"
          type="email"
          {...register("Correo", { required: true })}
        ></input>

        {
            errors.Correo && <span class="text-red-700">Correo es requerido</span>
        }

        {/*Pasword*/}
        <label htmlFor="password">Password</label>
        <input
          className="bg-pink-300 m-2"
          type="password"
          {...register("Password", { required: true,
          minLength: 2,
          maxLength:16, })}
        ></input>
        {
            errors.Password && <span class="text-red-700">Password es requerido</span>
        }
        {/**/}
        <label html htmlFor="confirmarPassword">
          Confirmar Password
        </label>
        <input
          className="bg-pink-300 m-2"
          type="password"
          {...register("ConfirmarPassword", { required: true })}
        ></input>
        {
            errors.ConfirmarPassword && <span class="text-red-700">ConfirmarPassword es requerido</span>
        }
        {/*Feecha*/}
        <label html htmlFor="fechaNacimiento">
          Fecha de nacimiento
        </label>
        <input
          className="bg-pink-300 m-2"
          type="date"
          {...register("fechaNacimiento", { required: true })}
        ></input>
        {
            errors.fechanacimiento && <span class="text-red-700">fechanacimiento es requerido</span>
        }
        {/**/}
        <button className="bg-blue-400 m-4">Enviar</button>
      </form>
    </div>
  );
}
