import { SecOfertas } from "./SecOfertas";
import { Buscador } from "../CommonComponents/Buscador";
import { BotonBuscador } from "../CommonComponents/BotonBuscador";
import { Formulario } from "./Formulario";
export function OfertView() {
  return (
    <><section className="w-[80%] h-fit px-4 pt-24 overflow-hidden">
      <div>
        <Buscador />
        <BotonBuscador />

      </div>

      {/* Secciones de ofertas con scroll  */}
      <section className="flex flex-col m-4 h-[62%]">
        <h2 className="h-fit text-xl font-bold">
          Ofertas Pendientes de Aprobacion
        </h2>
        <SecOfertas statusOfer="Pending" />

        <h2 className="h-fit text-xl font-bold">
          Ofertas Pendientes de Aprobacion
        </h2>
        <SecOfertas statusOfer="Active" />
      </section>

    </section></>
    
  );
}
