let wsTablas = {
    config: new Intl.NumberFormat({ minimumFractionDigits: 0 }),
    tablaIngresos(data){
        return `
        <table class="table table-hover">
            <tbody>  
                ${data.map((val,id)=> ` 
                    <tr identificadorId="${val.eliminarId}">
                        <td>${val.descripcion}</td> 
                        <td class="d-flex justify-content-end">
                            <p class="mx-2 px-2 text-success">${this.config.format(val.valor)}</p>
                            <i type="button" class="eliminar bi bi-x-circle text-success"></i>
                        </td>
                    </tr>`
                ).join("")}
            </tbody>
        </table>
        `; 
    },

    tablaEgresos(data){
        let contador = 0;
        data.ingresos.forEach((val,id)=>{
            contador = contador + Number(val.valor);
        });
        return ` 
        <table  class="tabla table table-hover">
            <tbody>  
                ${data.egresos.map((val,id)=> `
                    <tr identificadorId="${val.eliminarId}">
                        <td>${val.descripcion}</td> 
                        <td  class="d-flex justify-content-end">
                            <p class="mx-2 px-2 text-danger">${this.config.format(val.valor)} <span class="badge bg-danger">${((val.valor*100)/contador).toFixed(1)} % </span> </p>
                            <i type="button" class="eliminar bi bi-x-circle text-danger"></i>
                        </td>
                    </tr>`
                ).join("")} 
            </tbody>
        </table>
        `
    },
}

self.addEventListener("message", (e) => {
    postMessage(wsTablas[`${e.data.module}`](e.data.data))
})