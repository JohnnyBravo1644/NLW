//hello word
let mensagem = "Hello World" 

console.log (mensagem);

//array
let metas = ["omelander kill me wife and took me bloody son", "oi"]

console.log(metas[1] + ", " + metas[0]);

//objeto
let metaObjeto = {
    value: "valor aleatório",
    checked: false,
    log: (info) => {
        console.log(info)
    }
}

//metaObjeto.value = "How did you the eletric will do job?"
metaObjeto.log (metaObjeto.value)

//fencao start
const start = () => {

    let count = 1

    while(count <= 10){
        console.log(count++)
    
    }
}

start()