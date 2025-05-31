//criada a função para validar o cpf
function validarCpf(cpf) {
    cpf = document.getElementById("cpf").value;
    cpf = cpf.replace(/[^\d]/g, "");
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999") {
        return false;
    }
    //criadas as váriaveis soma e resto
    var resto;
    var soma = 0;

    for (i = 1; i <= 9; i++) {
        //multiplicamos cada um dos 9 digitos em ordem  decrescente de 10 a 2 e somamos os resultados
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) {
        resto = 0;
    }
    if (resto != parseInt(cpf.substring(9, 10))) {
        return false;
    }
    soma = 0;
    for (i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);

    }
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) {
        resto = 0;
    }
    if (resto != parseInt(cpf.substring(10, 11))) {
        return false;
    } else {
        return true;
    }
}
//função que alerta se o cpf é válido
function verificarCpf(cpf) {
    if (cpf == "") {
        return false;
    }
    if (!validarCpf(cpf.value)) {
        alert("o cpf digitado é inválido. verifique e tente novamente!!");
        cpf = document.getElementById("cpf").value = "";
    }


}

//função que alerta que o cliente foi cadastrado 
function cadastrar() {
    alert(" parabéns!! cadastro realizado com sucesso.");
}


function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById("endereco").value = ("");
    document.getElementById("bairro").value = ("");
    document.getElementById("cidade").value = ("");
    document.getElementById("estado").value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById("endereco").value = (conteudo.logradouro);
        document.getElementById("bairro").value = (conteudo.bairro);
        document.getElementById("cidade").value = (conteudo.localidade);
        document.getElementById("estado").value = (conteudo.uf);
    }
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisaCep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/[^\d]/g, "");

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById("endereco").value = "...";
            document.getElementById("bairro").value = "...";
            document.getElementById("cidade").value = "...";
            document.getElementById("estado").value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        }
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    }
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

function validarCin() {
  setTimeout(() => {
    const checkbox = document.getElementById("cin");
    const cpf = document.getElementById("cpf").value.trim();
    const rg = document.getElementById("rg");

    if (checkbox.checked) {
      rg.value = cpf;
      rg.readOnly = true;
    } else {
      rg.value = "";
      rg.readOnly = false;
    }
  }, 0);
}