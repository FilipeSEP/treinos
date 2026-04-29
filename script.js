// Dados iniciais (No futuro, virão do MySQL)
const treinos = {
    "A": {
        titulo: "Pernas e Abdominais",
        exercicios: [
            { nome: "Leg Press 45º/180º", series: "4x12", obs: "Amplitude máxima" },
            { nome: "Cadeira Extensora", series: "3x15", obs: "Cadência lenta" },
            { nome: "Mesa/Cadeira Flexora", series: "4x12", obs: "" },
            { nome: "Cadeira Adutora", series: "3x15", obs: "" },
            { nome: "Panturrilha", series: "4x15", obs: "" },
            { nome: "Prancha Abdominal", series: "3x45s", obs: "Estabilidade" }
        ]
    },
    "B": {
        titulo: "Peito, Ombros e Tríceps",
        exercicios: [
            { nome: "Supino Reto", series: "4x10", obs: "" },
            { nome: "Supino Inclinado", series: "3x12", obs: "Halteres" },
            { nome: "Desenvolvimento", series: "3x10", obs: "" },
            { nome: "Elevação Lateral", series: "4x12", obs: "Foco na técnica" },
            { nome: "Tríceps Pulley", series: "3x12", obs: "" },
            { nome: "Tríceps Testa", series: "3x10", obs: "" }
        ]
    },
    "C": {
        titulo: "Costas e Bíceps",
        exercicios: [
            { nome: "Puxada Aberta", series: "4x10", obs: "" },
            { nome: "Remada Sentada", series: "4x12", obs: "Triângulo" },
            { nome: "Remada Curvada", series: "3x12", obs: "" },
            { nome: "Rosca Direta", series: "3x12", obs: "Barra W" },
            { nome: "Rosca Martelo", series: "3x12", obs: "" },
            { nome: "Encolhimento", series: "3x15", obs: "" }
        ]
    }
};

let aguaConsumida = 0;
const metaAgua = 4000;

function beberAgua() {
    if (aguaConsumida < metaAgua) {
        aguaConsumida += 750;
        if (aguaConsumida > metaAgua) aguaConsumida = metaAgua;
        
        document.getElementById('consumo-atual').innerText = aguaConsumida;
        const porc = (aguaConsumida / metaAgua) * 100;
        document.getElementById('barra-agua').style.width = porc + "%";
    }
}

function trocarTreino(letra, btn) {
    // UI: Troca aba ativa
    document.querySelectorAll('.aba-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // UI: Atualiza título e lista
    const treino = treinos[letra];
    document.getElementById('titulo-sessao').innerText = treino.titulo;
    
    const container = document.getElementById('lista-exercicios');
    container.innerHTML = treino.exercicios.map(ex => `
        <div class="item-exercicio">
            <div class="info-ex">
                <strong>${ex.nome}</strong>
                <span>${ex.series} ${ex.obs ? ' - ' + ex.obs : ''}</span>
            </div>
            <input type="checkbox" class="check-ex">
        </div>
    `).join('');
}

// Inicializar com Treino A
window.onload = () => {
    trocarTreino('A', document.querySelector('.aba-btn'));
};