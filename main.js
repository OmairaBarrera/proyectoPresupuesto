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
    formularioPresupuesto.reset();
});

