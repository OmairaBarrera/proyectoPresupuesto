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
    console.log(tipoObjeto);
    formularioPresupuesto.reset();
});

let tablas = ()=>{
    document.querySelector('#tablaIngresos').innerHTML = ""
    tipoObjeto.ingresos.forEach((val,id)=>{
        document.querySelector('#tablaIngresos').insertAdjacentHTML("beforeend",`    
            <tr>
                <td>${val.descripcion}</td> 
                <td>${val.valor}</td>
            </tr>
        `)
    });
    document.querySelector('#tablaEgresos').innerHTML = ""
    tipoObjeto.egresos.forEach((val,id)=>{
        document.querySelector('#tablaEgresos').insertAdjacentHTML("beforeend",`    
            <tr>
                <td>${val.descripcion}</td> 
                <td>${val.valor}</td>
            </tr>
        `)
    });
}