document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formAnimal');
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('id');

    // Preenche formulário se for edição
    if (editId) {
        const animal = getAnimal(editId);
        if (animal) {
            document.getElementById('tituloFormulario').textContent = 'Editar Animal';
            document.getElementById('animalId').value = animal.id;
            document.getElementById('nomeAnimal').value = animal.nome;
            document.getElementById('especieAnimal').value = animal.especie;
            document.getElementById('racaAnimal').value = animal.raca;
            document.getElementById('idadeAnimal').value = animal.idade;
            document.getElementById('statusAnimal').value = animal.status;
            document.getElementById('urlFoto').value = animal.foto;
            document.getElementById('condicaoMedica').value = animal.condicao;
        }
    }

    // Salvar Dados
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const animal = {
            id: document.getElementById('animalId').value || null,
            nome: document.getElementById('nomeAnimal').value,
            especie: document.getElementById('especieAnimal').value,
            raca: document.getElementById('racaAnimal').value || 'SRD',
            idade: document.getElementById('idadeAnimal').value,
            status: document.getElementById('statusAnimal').value,
            foto: document.getElementById('urlFoto').value,
            condicao: document.getElementById('condicaoMedica').value,
            dataResgate: editId ? getAnimal(editId).dataResgate : null // Mantém data original se for edição
        };

        salvarAnimal(animal);
        window.location.href = 'index.html';
    });

    // Consumo da API 
    document.getElementById('btnBuscarRaca').addEventListener('click', async () => {
        const raca = document.getElementById('racaAnimal').value;
        const especie = document.getElementById('especieAnimal').value;
        
        if (!raca || !especie) {
            alert('Selecione a espécie e digite a raça antes de buscar.');
            return;
        }

        const btn = document.getElementById('btnBuscarRaca');
        btn.textContent = 'Buscando...';
        btn.disabled = true;

        const baseUrl = especie === 'Gato' 
            ? `https://api.thecatapi.com/v1/breeds/search?q=${raca}` 
            : `https://api.thedogapi.com/v1/breeds/search?q=${raca}`;

        try {
            const response = await fetch(baseUrl);
            const data = await response.json();

            if (data.length > 0) {
                const info = data[0];
                const condicaoAtual = document.getElementById('condicaoMedica').value;
                const tracoTemperamento = `[Info da API] Temperamento típico: ${info.temperament || 'Não informado'}. Expectativa de vida: ${info.life_span || 'Não informada'}.`;
                
                document.getElementById('condicaoMedica').value = condicaoAtual 
                    ? `${condicaoAtual}\n\n${tracoTemperamento}` 
                    : tracoTemperamento;
                    
                alert(`Raça "${info.name}" encontrada! Informações adicionadas às observações médicas.`);
            } else {
                alert('Raça não encontrada na base de dados da API.');
            }
        } catch (error) {
            alert('Erro ao conectar com a API.');
        } finally {
            btn.textContent = 'Buscar';
            btn.disabled = false;
        }
    });
});