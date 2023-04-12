import config from "../storage/config.js";
export default{
    config: new Intl.NumberFormat({ minimumFractionDigits: 0 }),
    mostrarDatos(){
        const myworker = new Worker("storage/wsCalculos.js", {type:"module"})
        let count = 0;
        myworker.postMessage({module:"disponible", data: config})
        myworker.postMessage({module:"ingresos", data: config["ingresos"]})
        myworker.postMessage({module:"egresos", data: config["egresos"]})
        myworker.postMessage({module:"porcentaje", data: config})
        let id = ["#valorDisponible", "#ingresosMostrar", "#egresosMostrar", "#porcentajeEgresos"]
        myworker.addEventListener("message", (e)=>{
            document.querySelector(id[count]).textContent = `${this.config.format(e.data)}`;
            (id.length-1==count) ? myworker.terminate(): undefined;
            count++;
        })
    },
}
