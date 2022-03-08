function calcularMedia(notas)   {

    let soma = 0;
    for(c = 0; c < notas.length; c++)   {
        soma += notas[c];
    }

    media = soma / notas.length;
    return media;
}



function aprovacao(notas)   {
    let media = calcularMedia(notas);
    let condicao = media >= 7 ? "Aprovado" : "Reprovado" //funciona como um if

    return "Média: " + media + " Situação: " + condicao;
    
}

/*
Envious de dados do formulário de nota
*/

document.getElementById('formulario-01').addEventListener('submit', function(evento)    {

    evento.preventDefault();//Cancela o evento
    evento.stopPropagation();

    if(this.getAttribute('class'))    {//não roda o código se algum campo der erro
        return false;
    }
    
    let dados = new FormData(this);
    let notas = [];

    for(let key of dados.keys())    {
        
        let numero = dados.get(key).match(/\d*/) ? Number(dados.get(key)) : 0// é um número

        if(!isNaN(numero))   {
            notas.push(numero);
        }

        //notas.push(parseInt(dados.get(key)));//adiciona itens no array;
    }

    console.log(notas);
    texto = aprovacao(notas);
    document.getElementById('resultado').innerHTML = texto;
});


function validaCampo(elemento)  {
    
    elemento.addEventListener('focusout', function(evento)    {//focusout->sai do objeto
   
    evento.preventDefault();

    if(this.value == "")    {
        document.querySelector('.mensagem').innerHTML = "Verifique o preenchimento";
        this.classList.add("erro");
        this.parentNode.classList.add("erro");
        return false;
    }else{
        document.querySelector('.mensagem').innerHTML = "";
        this.classList.remove('erro');
        this.parentNode.classList.remove('erro');
    }
});

}

function validaCampoNumerico(elemento)  {
    
    elemento.addEventListener('focusout', function(evento)    {//focusout->sai do objeto
   
    evento.preventDefault();

    let numero = this.value.match(/^[\d]5-[\d]3/) ? this.value.replace(/-/, "") : this.value;
        ///^[\d]5-[\d]3/ -> cep

    if(this.value !='' && this.value.match(/[0-9]*/) && this.value >= 0 && this.value <=10)    {
        document.querySelector('.mensagem').innerHTML = "";
        this.classList.remove('erro');
        this.parentNode.classList.remove('erro');
    }else{
        document.querySelector('.mensagem').innerHTML = "Verifique o preenchimento";
        this.classList.add('erro');
        this.parentNode.classList.add('erro');
        return false;
    }
});
}

function validaEmail(elemento){

    elemento.addEventListener("focusout", function(evento) {

        evento.preventDefault();

        const emailValido = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.[a-z]?$/i;//e-mail

        if(this.value.match(emailValido)){
        document.querySelector(".mensagem").innerHTML = "";
        this.classList.remove("erro");
        this.parentNode.classList.remove("erro")
        }else{
            document.querySelector(".mensagem").innerHTML = "Verifique o campo faltante";
            this.classList.add("erro");
            this.parentNode.classList.add("erro");
            return false;
        }

    });
}

function validaUf(elemento){

    elemento.addEventListener("focusout", function(evento)  {

        evento.preventDefault();

        const ufValido = /A[CLMP]|BA|CE|ES|M[AGST]|P[ABEIR]|R[JNORS]|S[CEP]|[GT]O/i; //uf

        if(this.value.match(ufValido)){
            document.querySelector(".mensagem").innerHTML = "";
            this.classList.remove("erro");
            this.parentNode.classList.remove("erro");
        }else{
            document.querySelector(".mensagem").innerHTML = "Verifique a Unidade Federal";
            this.classList.add("erro");
            this.parentNode.classList.add("erro");
            return false;
        }
    });
}

let camposObrigatorios =  document.querySelectorAll('input.obrigatorio');
let camposNumericos = document.querySelectorAll('input.numero'); 
let camposEmails = document.querySelectorAll('input.email')
let camposUf = document.querySelectorAll('input.uf')

for(let emFoco of camposObrigatorios)   {
    validaCampo(emFoco);
}

for(let emFoco of camposNumericos)  {
    validaCampoNumerico(emFoco)
}

for(let emFoco of camposEmails) {
    validaEmail(emFoco);
}

for(let emFoco of camposUf) {
    validaUf(emFoco);
}
