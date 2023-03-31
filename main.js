let formularioPresupuesto = document.querySelector("#formularioPresupuesto");
let tipoObjeto = [];

formularioPresupuesto.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    tipoObjeto.unshift({
        tipo: `${data.tipo}`,
        descripcion: `${data.descripcion}`,
        valor: `${data.valor}`
    });
    console.log(tipoObjeto);
    tablas();
    formularioPresupuesto.reset();
});

let tablas = ()=>{
    document.querySelector('#tabla').innerHTML = ""
    tipoObjeto.forEach((val,id)=>{
        document.querySelector('#tablaIngresos').insertAdjacentHTML("beforeend",`    
            <tr>
                <td>${val.descripcion}</td> 
                <td>${val.valor}</td>
            </tr>
        `)
    });
}