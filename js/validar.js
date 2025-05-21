// Valida CPF
function validarCpf(cpf) {
    cpf = cpf.replace(/[^\d]/g, "");

    if (
        cpf.length !== 11 ||
        /^(\d)\1+$/.test(cpf) // evita CPFs repetidos
    ) {
        return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
}

// Avisa se o CPF é inválido
function verificarCpf() {
    const cpfInput = document.getElementById("cpf");
    const cpf = cpfInput.value.trim();

    if (!cpf) return;

    if (!validarCpf(cpf)) {
        alert("O CPF digitado é inválido. Verifique e tente novamente!");
        cpfInput.value = "";
        cpfInput.focus();
    }
}

// Alerta de sucesso no cadastro
function cadastrar() {
    alert("Parabéns! Cadastro realizado com sucesso.");
}

// Limpa campos do endereço
function limpaFormularioCep() {
    ["endereco", "bairro", "cidade", "estado"].forEach(id => {
        document.getElementById(id).value = "";
    });
}

// Preenche os campos com os dados do ViaCEP
function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById("endereco").value = conteudo.logradouro;
        document.getElementById("bairro").value = conteudo.bairro;
        document.getElementById("cidade").value = conteudo.localidade;
        document.getElementById("estado").value = conteudo.uf;
    } else {
        limpaFormularioCep();
        alert("CEP não encontrado.");
    }
}

// Busca dados do CEP na API ViaCEP
function pesquisaCep(valor) {
    const cep = valor.replace(/[^\d]/g, "");

    if (cep.length !== 8) {
        limpaFormularioCep();
        alert("Formato de CEP inválido.");
        return;
    }

    const validacep = /^[0-9]{8}$/;

    if (validacep.test(cep)) {
        // Preenche campos com "..." temporário
        ["endereco", "bairro", "cidade", "estado"].forEach(id => {
            document.getElementById(id).value = "...";
        });

        // Cria o script para chamar o ViaCEP
        const script = document.createElement("script");
        script.src = `https://viacep.com.br/ws/${cep}/json/?callback=meu_callback`;
        document.body.appendChild(script);
    } else {
        limpaFormularioCep();
        alert("Formato de CEP inválido.");
    }
}

function validarSim() {
  setTimeout(() => {
    const checkbox = document.getElementById("sim");
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
