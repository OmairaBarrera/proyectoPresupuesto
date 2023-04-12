import config from "../storage/config.js";
export default{
    showTablas(){
        const myworker = new Worker("storage/wsTablas.js", {type:"module"})
        let count = 0;
        myworker.postMessage({module:"tablaIngresos", data: config["ingresos"]})
        myworker.postMessage({module:"tablaEgresos", data: config})
        let id = ["#tablaIngresos", "#tablaEgresos"]
        myworker.addEventListener("message", (e)=>{
            let doc = new DOMParser().parseFromString(e.data, "text/html");
            document.querySelector(id[count]).innerHTML = "";
            document.querySelector(id[count]).append(...doc.body.children);
            (id.length-1==count) ? myworker.terminate(): undefined;
            count++;
        })
    }
}