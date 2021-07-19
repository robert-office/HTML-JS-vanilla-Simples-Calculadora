class CalculadoraFunctions extends DOOMCalculadora
{

    HISTORICO = {}

    LEFT = ""
    RIGHT = ""
    COMANDO = ""

    VISOR = document.getElementById("visor")
    BUTAO = document.getElementsByClassName("button")

    SPAN_LEFT = document.getElementById("span-left")
    SPAN_COMANDO = document.getElementById("span-comando")
    
    BUTOES_ESPECIAS = {
        "+" : function() {
            CalculadoraFunctions.verificaAndSetComando("+")
        },
        "-" : function(){
            CalculadoraFunctions.verificaAndSetComando("-")
        },
        "X" : function(){
            CalculadoraFunctions.verificaAndSetComando("*")
        },
        "/" : function(){
            CalculadoraFunctions.verificaAndSetComando("/")
        },
        "%" : function(){
            CalculadoraFunctions.verificaAndSetComando("%")
        },
        "<<" : function(){
            CalculadoraFunctions.removeUltimoCaracter()
        },
        "CE" : function(){
            CalculadoraFunctions.zeraTudo()
        },
        "=": function(){
            CalculadoraFunctions.atualizarRight()
            CalculadoraFunctions.doTheCalculos()
        }
    }
    
    constructor(){
        super()
    }

    static adicionarValorAtInput(){
        /// foca o input
        projeto.VISOR.focus()
        CalculadoraFunctions.verificaEAdiciona(this.value, ".")
        CalculadoraFunctions.moveCursorAtFinal()
    }


    static realizarCalculo(){
        /// realiza os calculos de acordo com sua especialidade
        projeto.BUTOES_ESPECIAS[this.value]();
    }

    /// função que media os calculos e entrega o resulta pro usuario
    static doTheCalculos()
    {
        let result = ""

        if (projeto.VISOR.value != "")
        {
            if ( projeto.COMANDO != "%" )
            {
                /// faz o calculo
                result = eval(projeto.LEFT+projeto.COMANDO+projeto.RIGHT)
            }
            else
            {
                /// faz o calculo de porcentagem
                result = (projeto.RIGHT * projeto.LEFT) / 100
            }

            /// zera os campos
            CalculadoraFunctions.zeraTudo()

            /// seta o valor do resultado no visor
            projeto.VISOR.value = result
        }
    }


    eventsConnect()
    {
        /// Adiciona o evento de click para arrumar um erro do visor
        projeto.VISOR.addEventListener("click", CalculadoraFunctions.moveCursorAtFinal, false)

        /// adiciona os eventos de click aos butões designando suas funções
        for ( let i = 0; i < projeto.BUTAO.length; i++ )
        {   
            let atualButton = projeto.BUTAO[i]
            let atualButtonChild = projeto.BUTAO[i].childNodes[0]

            if ( atualButton.classList.contains("t-number"))
            {
                atualButtonChild.addEventListener("click", CalculadoraFunctions.adicionarValorAtInput, false)
            }

            if ( atualButton.classList.contains("t-signal"))
            {
                atualButtonChild.addEventListener("click", CalculadoraFunctions.realizarCalculo, false)
                atualButtonChild.addEventListener("click", CalculadoraFunctions.atualizarCampos, false)
            }
        }
    }




    /// ---------------- FERRAMENTAS ------------------- \\\

    /// antes de realizar o calculo, seta a variavel no RIGHT
    static atualizarRight()
    {
        projeto.RIGHT = projeto.VISOR.value
    }

    /// atualiza os campos para a visualização das operações
    static atualizarCampos()
    {
        CalculadoraFunctions.changeInnerHtml(projeto.SPAN_LEFT, projeto.LEFT)
        CalculadoraFunctions.changeInnerHtml(projeto.SPAN_COMANDO, projeto.COMANDO)
    }

    /// muda os campos para a visualização das operações
    static changeInnerHtml(htmlObject, string)
    {
        htmlObject.innerHTML = string
    }

    /// remove ultimo caracter
    static removeUltimoCaracter()
    {
        projeto.VISOR.focus()
        projeto.VISOR.value = projeto.VISOR.value.slice(0, -1);
    }

    /// zera todos os campos da calculadora
    static zeraTudo()
    {
        projeto.VISOR.value = ""
        projeto.COMANDO = ""
        projeto.LEFT = ""
        projeto.RIGHT = ""
    }

    static setaLeft()
    {
        if ( CalculadoraFunctions.leftIsEmpty())
        {
            projeto.LEFT = projeto.VISOR.value
            console.log("-------- SETANDO LEFT -------")
        }
    }

    static verificaAndSetComando(comando)
    {
        if ( CalculadoraFunctions.leftIsEmpty())
        {
            CalculadoraFunctions.setaLeft()
            CalculadoraFunctions.limpaVisor()
        }

        projeto.COMANDO = comando
        console.log("--------- SETANDO O COMMANDO ------")
    }

    /// Limpa o visor
    static limpaVisor()
    {
        projeto.VISOR.value = ""
        console.log("------- LIMPANDO VISOR -------")
    }


    /// verifica se o left da operação está vazio
    static leftIsEmpty(){
        console.log("------ Verificando se Left Esta Vazio --------")
        return projeto.LEFT === ""
    }

    /// verifica se a string de comando esta vazia
    static comandoIsEmpty(){
        console.log("------ Verificando se Comando Esta Vazio --------")
        return projeto.COMANDO === ""
    }

    /// regex para não deixar digitar letras
    static onlynumber(evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode( key );
        //var regex = /^[0-9.,]+$/;
        var regex = /^[0-9.]+$/;
        if( !regex.test(key) ) {
           theEvent.returnValue = false;
           if(theEvent.preventDefault) theEvent.preventDefault();
        }
     }

    /// verifica se um objeto esta vazio
    static isEmpty(obj) {
        for(var prop in obj) {
          if(obj.hasOwnProperty(prop)) {
            return false;
          }
        }
        return JSON.stringify(obj) === JSON.stringify({});
    }

    /// verifica se o caracter é igual ao valor passado, se sim realiza umas condições
    /// utilizado a verificação com o "." para evitar ter mais de um na string
    static verificaEAdiciona(value, str){
        if ( value == str )
        {
            if ( projeto.VISOR.value != 0 ){
                if ( projeto.VISOR.value.indexOf(str) == -1 )
                {
                    projeto.VISOR.value += value
                }
            }
        }
        else
        {
            projeto.VISOR.value += value
        }
    }

    /// Move o cursor para o ultimo caracter
    static moveCursorAtFinal()
    {
        /// logo depois de 10ms após se clicar no input, ele move cursor
        setTimeout(function() 
        {
            let pos = projeto.VISOR.value.length * 2;
            projeto.VISOR.focus();
            projeto.VISOR.setSelectionRange(pos, pos);
        }, 10);
    }
}

let projeto = new CalculadoraFunctions();

setTimeout(projeto.eventsConnect(), 2000);