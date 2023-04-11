let wsTablas = {
    config: new Intl.NumberFormat({ minimumFractionDigits: 0 }),
    tablaIngresos(data){
        return `
        <table  class="table table-hover">
            <tbody>  
                ${data.map((val,id)=> ` 
                    <tr>
                        <td>${val.descripcion}</td> 
                        <td class="d-flex justify-content-end">
                            <p class="mx-2 px-2 text-success">${this.config.format(val.valor)}</p>
                            <i class="eliminar bi bi-x-circle text-success"></i>
                        </td>
                    </tr>`
                ).join("")}
        `; 
    },

    tablaEgresos(data){
        let contador = 5000;
        return ` 
        <table  class="table table-hover">
            <tbody>  
                ${data.map((val,id)=> `
                    <tr>
                        <td>${val.descripcion}</td> 
                        <td  class="d-flex justify-content-end">
                            <p class="mx-2 px-2 text-danger">${this.config.format(val.valor)} <span class="badge bg-danger">${((val.valor*100)/contador).toFixed(1)} % </span> </p>
                            <i class="eliminar bi bi-x-circle text-danger"></i>
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