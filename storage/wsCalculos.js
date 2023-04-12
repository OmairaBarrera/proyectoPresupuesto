let wsCalculos = {
    config: new Intl.NumberFormat({ minimumFractionDigits: 0 }),
    ingresos(data){
        let contadorIngreso = 0;
        data.forEach((val,id)=>{
            contadorIngreso = contadorIngreso + Number(val.valor);
        });
        return contadorIngreso;
    },

    egresos(data){
        let contadorEgresos = 0;
        data.forEach((val,id)=>{
            contadorEgresos = contadorEgresos + Number(val.valor);
        });
        return contadorEgresos;
    },

    porcentaje(data){
        let dato1 = this.ingresos(data.ingresos);
        let dato2 = this.egresos(data.egresos);
        let resultado = ((dato2*100)/dato1).toFixed(1);
        return isNaN(resultado) ? resultado = 0 : resultado;
    },

    disponible (data){
        let dato1 = this.ingresos(data.ingresos);
        let dato2 = this.egresos(data.egresos);
        return dato1 - dato2;
    },
}

self.addEventListener("message", (e) => {
    postMessage(wsCalculos[`${e.data.module}`](e.data.data))
})