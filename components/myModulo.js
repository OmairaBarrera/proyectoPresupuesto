export default{ 
    formulario(){
        let ingresos=[];
        if (localStorage.ingresos){
            ingresos = JSON.parse(localStorage.ingresos);
        }
        let egresos=[];
        if (localStorage.egresos){
            egresos = JSON.parse(localStorage.egresos);
        }
        let formularioPresupuesto = document.querySelector("#formularioPresupuesto");
        formularioPresupuesto.addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            if(data.tipo == "+"){
                ingresos.unshift({
                    tipo: `${data.tipo}`,
                    descripcion: `${data.descripcion}`,
                    valor: `${data.valor}`
                });
                localStorage.setItem("ingresos", JSON.stringify(ingresos));
                this.tablaIngresos();
            } else {
                egresos.unshift({
                    tipo: `${data.tipo}`,
                    descripcion: `${data.descripcion}`,
                    valor: `${data.valor}`
                });
                localStorage.setItem("egresos", JSON.stringify(egresos));
                this.tablaEgresos();
            }
            formularioPresupuesto.reset();
            this.disponible();
            this.porcentajes();
        });
    },

    ingresos(){
        let data = JSON.parse(localStorage.getItem("ingresos"));
        let contadorIngreso = 0;
        data.forEach((val,id)=>{
            contadorIngreso = contadorIngreso + Number(val.valor);
        });
        return contadorIngreso;
    },

    egresos(){
        let data = JSON.parse(localStorage.getItem("egresos"));
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
        document.querySelector('#valorDisponible').textContent = `$ ${disponible}`;
        document.querySelector('#ingresosMostrar').textContent = `${contadorIngreso}`
        document.querySelector('#egresosMostrar').textContent = `${contadorEgresos}`
        document.querySelector('#porcentajeEgresos').innerHTML = `<span class="badge bg-secondary">${porcentaje.toFixed(1)} %</span>`;
    },

    tablaIngresos(){
        let data = JSON.parse(localStorage.getItem("ingresos"))
        document.querySelector('#tablaIngresos').innerHTML = "";
        data.forEach((val,id)=>{
            document.querySelector('#tablaIngresos').insertAdjacentHTML("beforeend",`    
                <tr>
                    <td>${val.descripcion}</td> 
                    <td>${val.valor}</td>
                </tr>
            `); 
        });
    },

    tablaEgresos(){
        let data = JSON.parse(localStorage.getItem("egresos"))
        let contador = this.ingresos();
        document.querySelector('#tablaEgresos').innerHTML = ""
        data.forEach((val,id)=>{
            document.querySelector('#tablaEgresos').insertAdjacentHTML("beforeend",`    
                <tr>
                    <td>${val.descripcion}</td> 
                    <td>${val.valor}</td>
                    <td>${((val.valor*100)/contador).toFixed(1)} % </td>
                </tr>
            `)
        })
    }, 
}
