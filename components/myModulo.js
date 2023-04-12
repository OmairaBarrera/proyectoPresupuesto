import config from "../storage/config.js";
import myTablas from "./myTablas.js";
import myCalculos from "./myCalculos.js";

export default{ 
    config: new Intl.NumberFormat({ minimumFractionDigits: 0 }),
    newId(){
        let lastid= localStorage.getItem("lastid") || -1;
        let newid = JSON.parse(lastid) + 1;
        localStorage.setItem("lastid", JSON.stringify(newid))
        return newid;
    },
    formulario(){
        let formularioPresupuesto = document.querySelector("#formularioPresupuesto");
        formularioPresupuesto.addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            if(data.tipo == "+"){
                config["ingresos"].unshift({
                    tipo: `${data.tipo}`,
                    descripcion: `${data.descripcion}`,
                    valor: `${data.valor}`,
                    eliminarId: this.newId()
                });
                localStorage.setItem("ingresos", JSON.stringify(config["ingresos"]));
                myTablas.showTablas();
            } else {
                config["egresos"].unshift({
                    tipo: `${data.tipo}`,
                    descripcion: `${data.descripcion}`,
                    valor: `${data.valor}`,
                    eliminarId: this.newId()
                });
                localStorage.setItem("egresos", JSON.stringify(config["egresos"]));
                myTablas.showTablas();
            }
            formularioPresupuesto.reset();
            myCalculos.mostrarDatos();
        });
    },
    
}
