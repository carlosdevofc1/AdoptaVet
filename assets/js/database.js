const STORAGE_KEY = 'adoptavet_animais';

function getAnimais() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function getAnimal(id) {
    return getAnimais().find(animal => animal.id === String(id));
}

function salvarAnimal(animal) {
    let animais = getAnimais();
    
    if (animal.id) {
        const index = animais.findIndex(a => a.id === String(animal.id));
        animais[index] = animal;
    } else {
        animal.id = Date.now().toString();
        animal.dataResgate = new Date().toLocaleDateString('pt-BR');
        animais.push(animal);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(animais));
}

function excluirAnimal(id) {
    const animais = getAnimais().filter(animal => animal.id !== String(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(animais));
}