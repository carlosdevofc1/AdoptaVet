document.addEventListener('DOMContentLoaded', () => {
    
    // Lógica da Página Inicial
    const listaAnimais = document.getElementById('listaAnimais');
    if (listaAnimais) {
        const inputPesquisa = document.getElementById('inputPesquisa');
        const filtroEspecie = document.getElementById('filtroEspecie');
        const ordenarIdade = document.getElementById('ordenarIdade');

        const renderizarLista = () => {
            let animais = getAnimais();
            
            const termo = inputPesquisa.value.toLowerCase();
            if (termo) animais = animais.filter(a => a.nome.toLowerCase().includes(termo) || a.raca.toLowerCase().includes(termo));
            
            const especie = filtroEspecie.value;
            if (especie) animais = animais.filter(a => a.especie === especie);
            
            const ordem = ordenarIdade.value;
            animais.sort((a, b) => ordem === 'asc' ? a.idade - b.idade : b.idade - a.idade);

            listaAnimais.innerHTML = animais.length ? animais.map(animal => `
                <article class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm">
                        <figure class="m-0">
                            <img src="${animal.foto || 'https://via.placeholder.com/300x200?text=Sem+Foto'}" class="card-img-top" style="height:200px; object-fit:cover;">
                        </figure>
                        <section class="card-body">
                            <h3 class="card-title h5">${animal.nome}</h3>
                            <p class="card-text"><strong>Espécie:</strong> ${animal.especie} <br> <strong>Raça:</strong> ${animal.raca}</p>
                            <span class="badge ${animal.status === 'Adotado' ? 'bg-secondary' : 'bg-primary'}">${animal.status}</span>
                        </section>
                        <footer class="card-footer bg-white text-center border-top-0">
                            <a href="detalhes.html?id=${animal.id}" class="btn btn-outline-primary btn-sm">Ver Detalhes</a>
                        </footer>
                    </div>
                </article>
            `).join('') : '<p class="text-center w-100 mt-4">Nenhum animal encontrado.</p>';
        };

        inputPesquisa.addEventListener('input', renderizarLista);
        filtroEspecie.addEventListener('change', renderizarLista);
        ordenarIdade.addEventListener('change', renderizarLista);
        
        renderizarLista();
    }

    //Lógica da Página de Detalhes
    const detalheNome = document.getElementById('detalheNome');
    if (detalheNome) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const animal = getAnimal(id);

        if (!animal) {
            alert('Animal não encontrado!');
            window.location.href = 'index.html';
            return;
        }

        document.getElementById('detalheFoto').src = animal.foto || 'https://via.placeholder.com/500x500?text=Sem+Foto';
        detalheNome.textContent = animal.nome;
        document.getElementById('detalheStatus').textContent = animal.status;
        document.getElementById('detalheEspecie').textContent = animal.especie;
        document.getElementById('detalheRaca').textContent = animal.raca;
        document.getElementById('detalheIdade').textContent = `${animal.idade} anos`;
        document.getElementById('detalheData').textContent = animal.dataResgate;
        document.getElementById('detalheCondicao').textContent = animal.condicao;

        document.getElementById('btnExcluir').addEventListener('click', () => {
            if (confirm(`Tem certeza que deseja excluir o resgate de ${animal.nome}?`)) {
                excluirAnimal(id);
                window.location.href = 'index.html';
            }
        });

        document.getElementById('btnEditar').addEventListener('click', () => {
            window.location.href = `form-animal.html?id=${id}`;
        });
    }

    // Lógica da Página de Relatórios
    const totalResgates = document.getElementById('totalResgates');
    if (totalResgates) {
        const animais = getAnimais();
        totalResgates.textContent = animais.length;
        document.getElementById('totalAdotados').textContent = animais.filter(a => a.status === 'Adotado').length;
        document.getElementById('totalTratamento').textContent = animais.filter(a => a.status === 'Em Tratamento').length;
    }
});