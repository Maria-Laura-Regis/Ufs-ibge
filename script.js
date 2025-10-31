document.addEventListener('DOMContentLoaded', () => {
    const selectUF = document.getElementById('selectUF');
    const tabelaBody = document.querySelector('#tabelaMunicipios tbody');
    const mensagemInicial = document.getElementById('mensagemInicial');

    // URLs da API do IBGE
    const URL_UFS = 'https://ibge.gov.br/api/v1/localidades/estados';
    // A URL dos municípios será montada dinamicamente: URL_MUNICIPIOS_BASE + siglaUF + /municipios

    // --- FUNÇÃO 1: BUSCAR E PREENCHER AS UFs ---
    async function buscarUFs() {
        try {
            const response = await fetch(URL_UFS);
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            const ufs = await response.json();
            
            // Ordenar as UFs por nome (opcional, mas melhora a UX)
            ufs.sort((a, b) => a.nome.localeCompare(b.nome));

            // Preenche o select com as UFs
            ufs.forEach(uf => {
                const option = document.createElement('option');
                option.value = uf.sigla; // O valor deve ser a sigla (ex: SP, RJ)
                option.textContent = `${uf.nome} (${uf.sigla})`;
                selectUF.appendChild(option);
            });

            // Configura o evento de mudança após popular o select
            selectUF.addEventListener('change', handleUFChange);

        } catch (error) {
            console.error("Erro ao buscar as UFs:", error);
            // Desafio Extra: Exibir mensagem amigável de erro
            selectUF.innerHTML = '<option value="">Erro ao carregar UFs</option>';
            mensagemInicial.textContent = "Não foi possível carregar as UFs. Verifique a conexão.";
            mensagemInicial.classList.remove('text-center');
        }
    }

    // --- FUNÇÃO 2: BUSCAR E EXIBIR MUNICÍPIOS ---
    async function handleUFChange(event) {
        const siglaUF = event.target.value;
        
        // Requisito: A tabela deve estar vazia e mostrar mensagem inicial se NADA for selecionado
        tabelaBody.innerHTML = ''; 

        if (!siglaUF) {
            // Se for a opção "Selecione uma UF"
            tabelaBody.innerHTML = `
                <tr>
                    <td colspan="3" class="text-center" id="mensagemInicial">Aguardando seleção de UF...</td>
                </tr>
            `;
            return; 
        }
        
        // Mostrar que estamos carregando (bom para UX)
        tabelaBody.innerHTML = '<tr><td colspan="3" class="text-center">Carregando municípios...</td></tr>';

        const URL_MUNICIPIOS = `https://ibge.gov.br/api/v1/localidades/estados/${siglaUF}/municipios`;

        try {
            const response = await fetch(URL_MUNICIPIOS);
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            const municipios = await response.json();

            // Exibe os dados na tabela
            exibirMunicipios(municipios);

        } catch (error) {
            console.error(`Erro ao buscar municípios de ${siglaUF}:`, error);
            // Desafio Extra: Mensagem de erro
            tabelaBody.innerHTML = `
                <tr>
                    <td colspan="3" class="text-danger text-center">Erro ao carregar os municípios. Tente novamente.</td>
                </tr>
            `;
        }
    }

    // --- FUNÇÃO 3: RENDERIZAÇÃO NA TABELA ---
    function exibirMunicipios(municipios) {
        tabelaBody.innerHTML = ''; // Limpa o estado de "Carregando"
        
        if (municipios.length === 0) {
             tabelaBody.innerHTML = `
                <tr>
                    <td colspan="3" class="text-center">Nenhum município encontrado para esta UF.</td>
                </tr>
            `;
            return;
        }

        municipios.forEach((municipio, index) => {
            const linha = tabelaBody.insertRow();
            
            // Coluna # (Índice + 1)
            linha.insertCell().textContent = index + 1;
            
            // Coluna Nome
            linha.insertCell().textContent = municipio.nome;
            
            // Coluna ID IBGE
            linha.insertCell().textContent = municipio.id;
        });
    }


    // --- INICIALIZAÇÃO ---
    buscarUFs(); // Chama a função principal ao carregar a página
});