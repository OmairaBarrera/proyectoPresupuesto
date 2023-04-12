import config from "../storage/config.js";
export default{
    showEliminarI(){
        let tablaIngresos = document.querySelector("#tablaIngresos");
        tablaIngresos.addEventListener("click", (e)=>{
            if(e.target.matches(".eliminar")){
                let filaEliminar = e.target.parentNode.parentNode;
                let eliminarId = filaEliminar.getAttribute("identificadorId");
                filaEliminar.remove();
                this.eliminarLocalIngresos(Number(eliminarId));
            }
        })
    },
    showEliminarE(){
        let tablaEgresos = document.querySelector("#tablaEgresos");
        tablaEgresos.addEventListener("click", (e)=>{
            if(e.target.matches(".eliminar")){
                let filaEliminar = e.target.parentNode.parentNode;
                let eliminarId = filaEliminar.getAttribute("identificadorId");
                filaEliminar.remove();
                this.eliminarLocalEgresos(Number(eliminarId));
            }
        })
    },
    eliminarLocalIngresos(eliminarId){
        let data = config["ingresos"];
        let eliminarIdIngresos = data.findIndex(element => element.eliminarId === eliminarId);
        data.splice(eliminarIdIngresos, 1);
        localStorage.setItem("ingresos", JSON.stringify(data));
    },
    eliminarLocalEgresos(eliminarId){
        let data = config["egresos"];
        let eliminarIdEgresos = data.findIndex(element => element.eliminarId === eliminarId);
        data.splice(eliminarIdEgresos, 1);
        localStorage.setItem("egresos", JSON.stringify(data));
    }
}