import config from "../storage/config.js";
import myTablas from "./myTablas.js";

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
/*             formularioPresupuesto.reset();
            this.mostrarDatos(); */
        });
    },

    /* ingresos(){
        let data = config["ingresos"];
        let contadorIngreso = 0;
        data.forEach((val,id)=>{
            contadorIngreso = contadorIngreso + Number(val.valor);
        });
        return contadorIngreso;
    },

    egresos(){
        let data = config["egresos"];
        let contadorEgresos = 0;
        data.forEach((val,id)=>{
            contadorEgresos = contadorEgresos + Number(val.valor);
        });
        return contadorEgresos;
    },

    mostrarDatos(){
        let contadorIngreso = this.ingresos();
        let contadorEgresos = this.egresos();
        let disponible = contadorIngreso - contadorEgresos;
        let porcentaje = (contadorEgresos*100)/contadorIngreso;
        document.querySelector('#valorDisponible').textContent = `$ ${this.config.format(disponible)}`;
        document.querySelector('#ingresosMostrar').textContent = `${this.config.format(contadorIngreso)}`
        document.querySelector('#egresosMostrar').textContent = `${this.config.format(contadorEgresos)}`
        document.querySelector('#porcentajeEgresos').innerHTML = `<span class="badge bg-secondary">${porcentaje.toFixed(1)} %</span>`;
    }, */

}
