const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false,
}

let metas = [meta];

//funcao para cadastrar as metas
const cadastrarMeta = async () => {
    const meta = await input({message: "digite a meta:"})
    
    if(meta.length == 0) {
        console.log("meta deve ser preenchida")
        return
    }
    
    metas.push({value: meta, checked: false})
} 

const listarMeta = async () => {
    const resposta = await checkbox ({
        message: "navegue pelas setas, selecione com especo, finalize com enter",
        choices: [...metas],
        instructions: false,
    })

    if(resposta.length == 0) {
        console.log("nao ha uma meta selecionada")
    }

    metas.forEach((m) => {
        m.checked = false
    })

    resposta.forEach(() => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("As metas foram concluidas")
} 


//funcao do menu
const start = async () => {

    
    while (true) {
        
        //funcao que mostra e cadastra as opcoes
        const opcao = await select ({
            message: "menu >",
            choices: [
                {name: "cadastrar meta", value: "cadastrar"},
                {name: "listar meta", value: "listar"},
                {name: "sair", value: "sair"}
            ]
        })
        
        //switch case que possui as opcoes
        switch(opcao){
            case "cadastrar": 
                await cadastrarMeta()
                console.log(metas)
                break

            case "listar": 
                await listarMeta()
                break

            case "listar":
                console.log("vamos listar")
                break

            case "sair": console.log("encerrando...") 
            return
        }
    }

}

start()