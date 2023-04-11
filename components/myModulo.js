import config from "../storage/config.js";
import myTablas from "./myTablas.js";
import myCalculos from "./myCalculos.js";

export default{ 
    config: new Intl.NumberFormat({ minimumFractionDigits: 0 }),
    formulario(){
        let formularioPresupuesto = document.querySelector("#formularioPresupuesto");
        formularioPresupuesto.addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            if(data.tipo == "+"){
                config["ingresos"].unshift({
                    tipo: `${data.tipo}`,
                    descripcion: `${data.descripcion}`,
                    valor: `${data.valor}`
                });
                localStorage.setItem("ingresos", JSON.stringify(config["ingresos"]));
                myTablas.showTablas();
            } else {
                config["egresos"].unshift({
                    tipo: `${data.tipo}`,
                    descripcion: `${data.descripcion}`,
                    valor: `${data.valor}`
                });
                localStorage.setItem("egresos", JSON.stringify(config["egresos"]));
                myTablas.showTablas();
            }
            formularioPresupuesto.reset();
            myCalculos.mostrarDatos();
        });
    },

}
