import { useForm } from "react-hook-form";

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }, watch, /* setValue  lo utilizo para cargar file*/
  } = useForm();

  console.log(errors);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        className=" bg-zinc-100 z-20 flex flex-col gap-4 h-[90%] overflow-y-scroll p-6 w-[50%] ml-[10%] rounded-xl"
        onSubmit={onSubmit}
      >
        {/*Nombre*/}
        <div className='flex justify-around gap-4'>
          <label className='w-1/3 text-base font-semibold border-b-2 border-zinc-900' htmlFor="nombre">
          {" "}
          Nombre{" "}
          </label>
          
          
          <input
            className="w-2/3 rounded-xl pl-4"
            type="text"
            {...register("nombre", {
              required: {
                value: true,
                message: "Nombre es requqerido",
              },

              minLength: {
                value: 2,
                message: "Nombre debe tener al menos 2 caracteres",
              },

              maxLength: {
                value: 20,
                message: "Nombre debe tener maximo 20 caracteres",
              },
            })}
          ></input>

          
        </div>
        {errors.nombre && (
            <span className="pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900">
              {" "}
              {errors.nombre.message} Nombre es requerido
            </span>
          )}

        {/*Correo*/}
        <label className='w-1/3 text-base font-semibold border-b-2 border-zinc-900' htmlFor="Correo">
        {" "}
						Correo{" "}
        </label>
        
        <input
          className="w-2/3 rounded-xl pl-4"
          type="email"
          {...register("Correo", { 
            required: { 
            value: true,
            message: "Correo no válido" },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message:"El correo no es válido"
            }
            })}
        ></input>

{errors.Correo && (
            <span className="pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900">
              {" "}
              {errors.Correo.message} 
            </span>
          )}

        {/*Pasword*/}
        <label className='w-1/3 text-base font-semibold border-b-2 border-zinc-900' htmlFor="password">Password</label>
        <input
          className="w-2/3 rounded-xl pl-4"
          type="password"
          {...register("password", {
            required:{ 
              value: true,
            message:"Password es requerido"}
          })}
        ></input>
        {errors.password && (
            <span className="pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900">
              {/* {" "} */}
              {errors.password.message} 
            </span>
          )}


        {/*Confirmar Password*/}

        <label className='w-1/3 text-base font-semibold border-b-2 border-zinc-900' htmlFor="confirmarPassword">
          Confirmar Password
        </label>
        <input
          className="w-2/3 rounded-xl pl-4"
          type="password"
          {...register("ConfirmarPassword", { required:{ 
          value: true,
          message:"Confirmar password es requerido",},
          validate: (value) => {
if (value=== watch("password")) { return true} else { return "Los parametros no ccoincide"}
          }
           })}
        ></input>
        {errors.ConfirmarPassword && (
          <span className="pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900">Confirmar password es requerido.</span>
        )}


        {/*Feecha*/}

        <label className='w-1/3 text-base font-semibold border-b-2 border-zinc-900' htmlFor="fechaNacimiento">
          Fecha de nacimiento
        </label>
        <input
          className="w-2/3 rounded-xl pl-4"
          type="date"
          {...register("fechaNacimiento", { required: {
            value: true,
            message:"Fecha de nacimietno es requerida"
            },
            validate:(value) => {
              
              const fechaNacimiento = new Date(value);
              const fechaActual = new Date();
              const edad = 
              fechaActual.getFullYear() - fechaNacimiento.getFullYear();
              return edad = 18 || "Debe ser mayor de edad";
            },
             })}
        ></input>
        {errors.fechaNacimiento && (
            <span className="pl-2 pb-2 w-full flex justify-center text-xs font-bold text-rose-900">
              {"Debe ser mayor de edad "}
              {errors.fechaNacimiento.message} 
            </span>
          )}

        
        {/**/}
        <button className="w-fit px-4 py-2 flex justify-center items-center border-2  rounded-xl font-semibold">Enviar</button>

        <pre>
          {JSON.stringify(watch(), null, 2)}
        </pre>
      </form>
    </div>
  );
}
