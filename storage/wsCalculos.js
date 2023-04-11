let wsCalculos = {
    config: new Intl.NumberFormat({ minimumFractionDigits: 0 }),
    ingresos(data){
        let contadorIngreso = 0;
        data.forEach((val,id)=>{
            contadorIngreso = contadorIngreso + Number(val.valor);
        });
        return this.config.format(contadorIngreso);
    },

    egresos(data){
        let contadorEgresos = 0;
        data.forEach((val,id)=>{
            contadorEgresos = contadorEgresos + Number(val.valor);
        });
        return this.config.format(contadorEgresos);
    },

    porcentaje(data){
        let x = data
        console.log(x)
        return 5000;
        /* console.log(data)
        let dato1 = this.ingresos(data["ingresos"]);
        let dato2 = this.egresos(data["egresos"]);
        let resultado = (dato2*100)/dato1;
        isNaN(resultado) ? resultado = 0 : resultado; */
    },

    disponible (data){
        let x = data.ingresos
        let y = data.egresos
        let dato1 = this.ingresos(x);
        console.log(dato1)
        let dato2 = this.egresos(y);
        console.log(dato2)
        let resultado = dato1 - dato2;
        console.log(resultado)
        return this.config.format(resultado);
    },
}

self.addEventListener("message", (e) => {
    postMessage(wsCalculos[`${e.data.module}`](e.data.data))
})