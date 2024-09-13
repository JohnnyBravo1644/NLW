const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {value: 'Tomar 3L de água por dia', checked: false,}

let mensagem = "(---Bem vindo---)";

let metas = [meta];

//funcao para cadastrar as metas
const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a meta:"})
    
    if(meta.length == 0) {
        mensagem = "A meta deve ser preenchida"
        return
    }
    
    metas.push({value: meta, checked: false})

    mensagem = "Meta cadastrada com sucesso"
} 

//funcao de listar metas
const listarMeta = async () => {

    const resposta = await checkbox ({
        message: "Navegue pelas setas, selecione com especo, finalize com enter",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(resposta.length == 0) {
        mensagem = "Não há uma meta selecionada"
        return
    }

    resposta.forEach(() => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "As metas foram concluidas"

} 

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        mensagem = "Nenhuma meta foi realizada!"
        return
    }

    await select ({
        message: "metas realizadas " + realizadas.length,
        choices: [...realizadas]
    })
    console.log(realizadas)
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0) {
        mensagem = "Nenhuma meta em aberto"
        return
    }

    await select({
        message: "metas abertas " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas =  async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })

    const itensADeletar = await checkbox ({
        message: "Selecione o item que deseja deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if (itensADeletar.length == 0) {
        mensagem = "Nenhuma meta selecionado"
        return
    }

    itensADeletar.forEach ((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletada com sucesso!"
}

//limpa o terminal a cada acao executada
const mostrarMensagem = () => {
    console.clear();

    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

//funcao do menu
const start = async () => {
    
    while (true) {
        mostrarMensagem();

        //funcao que mostra e cadastra as opcoes
        const opcao = await select ({
            message: "menu >",
            choices: [
                {name: "cadastrar meta", value: "cadastrar"},
                {name: "listar meta", value: "listar"},
                {name: "metas realizadas", value: "realizadas"},
                {name: "metas abertas", value: "abertas"},
                {name: "deletar metas", value: "deletar"},
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

            case "realizadas":
                await metasRealizadas()
                break

            case "abertas":
                await metasAbertas()
                break

            case "deletar":
                await deletarMetas()
                break

            case "sair": console.log("encerrando...") 
            return
        }
    }

}

start()