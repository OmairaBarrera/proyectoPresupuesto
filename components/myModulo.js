import config from "../storage/config.js";

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
                this.tablaIngresos();
            } else {
                config["egresos"].unshift({
                    tipo: `${data.tipo}`,
                    descripcion: `${data.descripcion}`,
                    valor: `${data.valor}`
                });
                localStorage.setItem("egresos", JSON.stringify(config["egresos"]));
                this.tablaEgresos();
            }
            formularioPresupuesto.reset();
            this.mostrarDatos();
        });
    },

    ingresos(){
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
    },

    tablaIngresos(){
        let data = config["ingresos"];
        document.querySelector('#tablaIngresos').innerHTML = "";
        data.forEach((val,id)=>{
            document.querySelector('#tablaIngresos').insertAdjacentHTML("beforeend",`    
                <tr>
                    <td>${val.descripcion}</td> 
                    <td class="d-flex justify-content-end">
                        <p class="mx-2 px-2 text-success">${this.config.format(val.valor)}</p>
                        <i class="eliminar bi bi-x-circle text-success"></i>
                    </td>
                </tr>
            `); 
        });
    },

    tablaEgresos(){
        let data = config["egresos"];
        let contador = this.ingresos();
        document.querySelector('#tablaEgresos').innerHTML = ""
        data.forEach((val,id)=>{
            document.querySelector('#tablaEgresos').insertAdjacentHTML("beforeend",`    
                <tr>
                    <td>${val.descripcion}</td> 
                    <td></td>
                    <td  class="d-flex justify-content-end">
                        <p class="mx-2 px-2 text-danger">${this.config.format(val.valor)} <span class="badge bg-danger">${((val.valor*100)/contador).toFixed(1)} % </span> </p>
                        <i class="eliminar bi bi-x-circle text-danger"></i>
                    </td>
                </tr>
            `)
        })
    },
}
