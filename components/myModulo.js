export default{
    tipoObjeto : {
    ingresos:[],
    egresos:[]
    },

    formulario(){
        let formularioPresupuesto = document.querySelector("#formularioPresupuesto");
        var contador = 0,contador2 = 0;
        formularioPresupuesto.addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            if(data.tipo == "+"){
                this.tipoObjeto.ingresos.unshift({
                tipo: `${data.tipo}`,
                descripcion: `${data.descripcion}`,
                valor: `${data.valor}`
                });
                contador = this.tablaIngresos();
            } else {
                this.tipoObjeto.egresos.unshift({
                tipo: `${data.tipo}`,
                descripcion: `${data.descripcion}`,
                valor: `${data.valor}`
                });
                contador2 = this.tablaEgresos(contador);
            }
            formularioPresupuesto.reset();
            this.disponible(contador, contador2);
            this.porcentajes(contador, contador2);
        });
    },
    
    disponible(contadorIngreso, contadorEgresos){
        let disponible = 0;
        disponible = contadorIngreso - contadorEgresos;
        document.querySelector('#valorDisponible').textContent = `$ ${disponible}`;
    },

    tablaIngresos(){
        document.querySelector('#tablaIngresos').innerHTML = "";
        var contadorIngreso = 0;
        this.tipoObjeto.ingresos.forEach((val,id)=>{
            document.querySelector('#tablaIngresos').insertAdjacentHTML("beforeend",` 
                <tr>
                <td>${val.descripcion}</td> 
                <td>${val.valor}</td>
            </tr>
            `); 
            contadorIngreso = contadorIngreso + Number(val.valor);
            document.querySelector('#ingresosMostrar').textContent = `${contadorIngreso}`
        });
        return contadorIngreso;
    },
    
    tablaEgresos(contador){
        let contadorEgresos = 0;
        document.querySelector('#tablaEgresos').innerHTML = ""
        this.tipoObjeto.egresos.forEach((val,id)=>{
            document.querySelector('#tablaEgresos').insertAdjacentHTML("beforeend",` 
                <tr>
                <td>${val.descripcion}</td> 
                <td>${val.valor}</td>
                <td>${((val.valor*100)/contador).toFixed(1)} % </td>
                </tr>
            `)
            contadorEgresos = contadorEgresos + Number(val.valor);
            document.querySelector('#egresosMostrar').textContent = `${contadorEgresos}`
        });
        return contadorEgresos;
    }, 
    
    porcentajes(contadorIngreso, contadorEgresos){
        let porcentaje = 0;
        porcentaje = (contadorEgresos*100)/contadorIngreso;
        console.log(porcentaje.toFixed(1));
        document.querySelector('#porcentajeEgresos').innerHTML = `<span class="badge bg-secondary">${porcentaje.toFixed(1)} %</span>`;
    }
}
