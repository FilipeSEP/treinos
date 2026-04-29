const treinos = {
    "A": { titulo: "Pernas e Abdominais", exercicios: [
        { nome: "Leg Press 45º/180º", info: "4x12 | Amplitude" },
        { nome: "Cadeira Extensora", info: "3x15 | Lento" },
        { nome: "Mesa/Cadeira Flexora", info: "4x12" },
        { nome: "Cadeira Adutora", info: "3x15" },
        { nome: "Panturrilha", info: "4x15" },
        { nome: "Prancha Abdominal", info: "3x45s" }
    ]},
    "B": { titulo: "Peito, Ombros e Tríceps", exercicios: [
        { nome: "Supino Reto", info: "4x10" },
        { nome: "Supino Inclinado", info: "3x12 | Halteres" },
        { nome: "Desenvolvimento", info: "3x10" },
        { nome: "Elevação Lateral", info: "4x12 | Técnica" },
        { nome: "Tríceps Pulley", info: "3x12" },
        { nome: "Tríceps Testa", info: "3x10" }
    ]},
    "C": { titulo: "Costas e Bíceps", exercicios: [
        { nome: "Puxada Aberta", info: "4x10" },
        { nome: "Remada Sentada", info: "4x12 | Triângulo" },
        { nome: "Remada Curvada", info: "3x12" },
        { nome: "Rosca Direta", info: "3x12 | Barra W" },
        { nome: "Rosca Martelo", info: "3x12" },
        { nome: "Encolhimento", info: "3x15" }
    ]}
};

let aguaConsumida = parseInt(localStorage.getItem('agua')) || 0;
const metaAgua = 4000;

function beberAgua() {
    if (aguaConsumida < metaAgua) {
        aguaConsumida += 750;
        if (aguaConsumida > metaAgua) aguaConsumida = metaAgua;
        localStorage.setItem('agua', aguaConsumida);
        atualizarAguaUI();
    }
}

function atualizarAguaUI() {
    document.getElementById('consumo-atual').innerText = aguaConsumida;
    document.getElementById('barra-agua').style.width = (aguaConsumida/metaAgua)*100 + "%";
}

function trocarTreino(letra, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const treino = treinos[letra];
    document.getElementById('titulo-sessao').innerText = treino.titulo;
    
    const container = document.getElementById('lista-exercicios');
    container.innerHTML = treino.exercicios.map((ex, idx) => `
        <div class="item-ex">
            <div class="info-ex">
                <strong>${ex.nome}</strong>
                <span>${ex.info}</span>
            </div>
            <input type="checkbox" class="check-ex">
        </div>
    `).join('');
}

window.onload = () => {
    atualizarAguaUI();
    trocarTreino('A', document.querySelector('.tab-btn'));
};