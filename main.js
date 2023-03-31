let formularioPresupuesto = document.querySelector("#formularioPresupuesto");
let tipoObjeto = {
    ingresos:[],
    egresos:[]
};


formularioPresupuesto.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    if(data.tipo == "+"){
        tipoObjeto["ingresos"].unshift({
            tipo: `${data.tipo}`,
            descripcion: `${data.descripcion}`,
            valor: `${data.valor}`
        });
    } else {
        tipoObjeto["egresos"].unshift({
            tipo: `${data.tipo}`,
            descripcion: `${data.descripcion}`,
            valor: `${data.valor}`
        });
    }
    tablas();
    formularioPresupuesto.reset();
});

let tablas = ()=>{
    document.querySelector('#tablaIngresos').innerHTML = "";
    let contadorIngreso = 0;
    tipoObjeto.ingresos.forEach((val,id)=>{
        document.querySelector('#tablaIngresos').insertAdjacentHTML("beforeend",`    
            <tr>
                <td>${val.descripcion}</td> 
                <td>${val.valor}</td>
            </tr>
        `); 
        contadorIngreso = contadorIngreso + Number(val.valor);
        document.querySelector('#ingresosMostrar').textContent = `${contadorIngreso}`
    });
    let contadorEgresos = 0;
    document.querySelector('#tablaEgresos').innerHTML = ""
    tipoObjeto.egresos.forEach((val,id)=>{
        document.querySelector('#tablaEgresos').insertAdjacentHTML("beforeend",`    
            <tr>
                <td>${val.descripcion}</td> 
                <td>${val.valor}</td>
            </tr>
        `)
        contadorEgresos = contadorEgresos + Number(val.valor);
        document.querySelector('#egresosMostrar').textContent = `${contadorEgresos}`
    });
    let disponible = 0;
    disponible = contadorIngreso - contadorEgresos;
    document.querySelector('#valorDisponible').textContent = `$ ${disponible}`
    let porcentaje = (contadorEgresos*100)/contadorIngreso;
    console.log(porcentaje.toFixed(1));
    document.querySelector('#porcentajeEgresos').textContent = `${porcentaje} %`
}

