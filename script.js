/*
    Código adaptado da referência para usar a Fetch API com suas IDs de Tabela
*/
document.addEventListener('DOMContentLoaded', () => {
    const selectUF = document.getElementById('selectUF');
    const tabelaBody = document.querySelector('#tabelaMunicipios tbody');
    
    // O código de referência usa um <select name='uf'> e <select name='city'>.
    // Vamos adaptá-lo para usar seu <select id='selectUF'>
    
    // --- FUNÇÃO PARA PREENCHER A TABELA (Adaptada do código de referência) ---
    function exibirMunicipios(cityData) {
        let options = '<option value="" disabled selected>– Selecione sua cidade –</option>'; 
        
        // Limpa o corpo da tabela e insere um novo select temporário para as cidades
        tabelaBody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center">
                    <select id="selectCity" name="city" required class="form-select">
                        ${options}
                    </select>
                </td>
            </tr>
        `;
        
        // Agora, popula o novo select de cidades (selectCity)
        const selectCity = document.getElementById('selectCity');
        
        for (var i = 0; i < cityData.length; i++) {
            options += '<option value="' + cityData[i].nome + '" >' + cityData[i].nome + '</option>';
        }
        selectCity.innerHTML = options;

        // Se necessário, adicione um listener aqui para quando a cidade mudar
    }

    // --- FUNÇÃO 1: BUSCAR E PREENCHER AS UFs (Adaptada para jQuery) ---
    // O jQuery faz a chamada direta, ignorando o CORS (devido à natureza da API pública)
    $.getJSON('https://servicodados.ibge.gov.br/api/v1/localidades/estados/', function (uf) {
        let options = '<option value="" selected disabled>– Selecione seu estado –</option>'; 
        
        // Ordena os estados
        var features = uf.sort((a,b) => {
            return (
              (a.nome < b.nome && -1) ||
              (a.nome > b.nome && 1) ||
              0
            ); 
        });

        for (var i = 0; i < features.length; i++) { 
            // Usamos data-id para armazenar o ID do estado, que é necessário na próxima chamada
            options += '<option data-id="' + features[i].id + '" value="' + features[i].nome + '" >' + features[i].nome + '</option>'; 
        }

        selectUF.innerHTML = options; // Preenche o selectUF usando seu ID do HTML

    });
    
    // --- FUNÇÃO 2: BUSCAR MUNICÍPIOS AO MUDAR A UF ---
    $("#selectUF").change(function () {
        if ($(this).val()) {
            // Pega o ID do estado (que salvamos no data-id)
            const ufSelectId = $(this).find("option:selected").attr('data-id');

            // Faz a requisição direta (sem proxy)
            $.getJSON('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+ufSelectId+'/municipios', function (city) {            
                
                // Chama a função de renderização adaptada
                exibirMunicipios(city);

            }).fail(function(jqXHR, textStatus, errorThrown) {
                tabelaBody.innerHTML = `
                    <tr><td colspan="3" class="text-danger text-center">Erro ao buscar municípios: ${textStatus}</td></tr>
                `;
            });

        } else {
            // Limpa a tabela se nada for selecionado
            tabelaBody.innerHTML = `
                <tr>
                    <td colspan="3" class="text-center" id="mensagemInicial">Aguardando seleção de UF...</td>
                </tr>
            `;
        }
    });
});