import config from "../storage/config.js";
export default{
    
    mostrarDatos(){
        const myworker = new Worker("storage/wsCalculos.js", {type:"module"})
        let count = 0;
        myworker.postMessage({module:"disponible", data: config})
        myworker.postMessage({module:"ingresos", data: config["ingresos"]})
        myworker.postMessage({module:"egresos", data: config["egresos"]})
        let id = ["#valorDisponible", "#ingresosMostrar", "#egresosMostrar"]
        myworker.addEventListener("message", (e)=>{
            let doc = new DOMParser().parseFromString(e.data, "text/html");
            console.log(e.data)
            document.querySelector(id[count]).textContent = `${e.data}`;
            (id.length-1==count) ? myworker.terminate(): undefined;
            count++;
        })
        /* let contadorIngreso = this.ingresos();
        let contadorEgresos = this.egresos();
        let disponible = this.disponible(contadorIngreso, contadorEgresos);
        let porcentaje = this.porcentaje(contadorIngreso, contadorEgresos);
        document.querySelector('#valorDisponible').textContent = `$ ${this.config.format(disponible)}`;
        document.querySelector('#ingresosMostrar').textContent = `${this.config.format(contadorIngreso)}`
        document.querySelector('#egresosMostrar').textContent = `${this.config.format(contadorEgresos)}`
        document.querySelector('#porcentajeEgresos').innerHTML = `<span class="badge bg-secondary">${porcentaje.toFixed(1)} %</span>`; */
    },
}
