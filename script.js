// ===== SEUS TREINOS ORIGINAIS =====
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

// ===== CONFIGURAÇÕES =====
let aguaConsumida = parseInt(localStorage.getItem('agua')) || 0;
const META_AGUA = 4000;

// ===== FUNÇÕES DA ÁGUA (SEU CÓDIGO ORIGINAL) =====
function beberAgua() {
    if (aguaConsumida < META_AGUA) {
        aguaConsumida += 750;
        if (aguaConsumida > META_AGUA) aguaConsumida = META_AGUA;
        localStorage.setItem('agua', aguaConsumida);
        atualizarAguaUI();
        mostrarToast(`💧 +750ml de água!`);
    }
}

function removerAgua() {
    if (aguaConsumida > 0) {
        aguaConsumida -= 750;
        if (aguaConsumida < 0) aguaConsumida = 0;
        localStorage.setItem('agua', aguaConsumida);
        atualizarAguaUI();
        mostrarToast(`💧 -750ml de água`);
    }
}

function atualizarAguaUI() {
    document.getElementById('consumo-atual').innerText = aguaConsumida;
    const porcentagem = (aguaConsumida / META_AGUA) * 100;
    document.getElementById('barra-agua').style.width = porcentagem + "%";
}

// ===== FUNÇÕES DOS TREINOS (SEU CÓDIGO ORIGINAL) =====
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
            <input type="checkbox" class="check-ex" data-indice="${idx}" data-treino="${letra}">
        </div>
    `).join('');
    
    // Carregar checkboxes salvos
    const saved = localStorage.getItem(`treino_${letra}`);
    if (saved) {
        const savedChecks = JSON.parse(saved);
        document.querySelectorAll('.check-ex').forEach(cb => {
            const idx = cb.dataset.indice;
            if (savedChecks[idx]) cb.checked = true;
        });
    }
    
    // Salvar quando clicar
    document.querySelectorAll('.check-ex').forEach(cb => {
        cb.addEventListener('change', function() {
            const checks = {};
            document.querySelectorAll('.check-ex').forEach(c => {
                checks[c.dataset.indice] = c.checked;
            });
            localStorage.setItem(`treino_${letra}`, JSON.stringify(checks));
        });
    });
}

// ===== FUNÇÕES DE MEDIDAS =====
const camposMedidas = ['biceps_e', 'biceps_d', 'antebraco_e', 'antebraco_d', 
                       'coxa_e', 'coxa_d', 'panturrilha_e', 'panturrilha_d', 
                       'abdomen', 'peitoral'];

const nomesBonitos = {
    biceps_e: 'Bíceps E', biceps_d: 'Bíceps D',
    antebraco_e: 'Antebraço E', antebraco_d: 'Antebraço D',
    coxa_e: 'Coxa E', coxa_d: 'Coxa D',
    panturrilha_e: 'Panturrilha E', panturrilha_d: 'Panturrilha D',
    abdomen: 'Abdômen', peitoral: 'Peitoral'
};

function salvarMedidas() {
    const medidas = {};
    camposMedidas.forEach(campo => {
        const input = document.getElementById(campo);
        if (input && input.value) {
            medidas[campo] = parseFloat(input.value);
        }
    });
    
    if (Object.keys(medidas).length === 0) {
        mostrarToast('Preencha pelo menos uma medida!');
        return;
    }
    
    const historico = JSON.parse(localStorage.getItem('historico_medidas') || '[]');
    const novaMedicao = {
        id: Date.now(),
        data: new Date().toLocaleDateString('pt-BR'),
        timestamp: Date.now(),
        ...medidas
    };
    historico.unshift(novaMedicao);
    localStorage.setItem('historico_medidas', JSON.stringify(historico));
    
    document.getElementById('modal-medidas').style.display = 'none';
    atualizarDisplayMedidas();
    atualizarHistorico();
    atualizarGrafico();
    mostrarToast('Medidas salvas com sucesso!');
}

function atualizarDisplayMedidas() {
    const historico = JSON.parse(localStorage.getItem('historico_medidas') || '[]');
    if (historico.length === 0) return;
    
    const ultimas = historico[0];
    camposMedidas.forEach(campo => {
        const elemento = document.getElementById(`display-${campo}`);
        if (elemento && ultimas[campo]) {
            elemento.textContent = `${ultimas[campo]}cm`;
        }
    });
}

function atualizarHistorico() {
    const historico = JSON.parse(localStorage.getItem('historico_medidas') || '[]');
    const container = document.getElementById('lista-historico');
    if (!container) return;
    
    container.innerHTML = historico.slice(0, 10).map(item => {
        const medidasList = camposMedidas.filter(c => item[c]).map(c => `${nomesBonitos[c]}: ${item[c]}cm`).join(' | ');
        return `
            <div class="historico-item">
                <div class="historico-data">📅 ${item.data}</div>
                <div class="historico-medidas">${medidasList.substring(0, 100)}${medidasList.length > 100 ? '...' : ''}</div>
            </div>
        `;
    }).join('');
}

function atualizarGrafico() {
    const medidaSelecionada = document.getElementById('select-medida')?.value || 'biceps_e';
    const historico = JSON.parse(localStorage.getItem('historico_medidas') || '[]');
    
    const dados = historico.slice().reverse().map(item => ({
        data: item.data,
        valor: item[medidaSelecionada] || 0
    })).filter(d => d.valor > 0);
    
    const ctx = document.getElementById('grafico-medidas')?.getContext('2d');
    if (!ctx) return;
    
    if (window.meuGrafico) window.meuGrafico.destroy();
    
    window.meuGrafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dados.map(d => d.data),
            datasets: [{
                label: nomesBonitos[medidaSelecionada],
                data: dados.map(d => d.valor),
                borderColor: '#0A84FF',
                backgroundColor: 'rgba(10, 132, 255, 0.1)',
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: '#0A84FF',
                pointBorderColor: '#fff',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                tooltip: { callbacks: { label: (ctx) => `${ctx.raw}cm` } }
            },
            scales: {
                y: { title: { display: true, text: 'cm', color: '#8E8E93' } }
            }
        }
    });
}

function mostrarToast(mensagem) {
    const toast = document.getElementById('toast');
    toast.textContent = mensagem;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// ===== NAVEGAÇÃO =====
function initNavegacao() {
    document.getElementById('nav-treinos').addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('nav-treinos').classList.add('active');
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById('section-treinos').classList.add('active');
    });
    
    document.getElementById('nav-medidas').addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('nav-medidas').classList.add('active');
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById('section-medidas').classList.add('active');
        atualizarDisplayMedidas();
        atualizarHistorico();
    });
    
    document.getElementById('nav-grafico').addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('nav-grafico').classList.add('active');
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById('section-grafico').classList.add('active');
        atualizarGrafico();
    });
}

// ===== INICIALIZAÇÃO =====
window.onload = () => {
    // Água
    atualizarAguaUI();
    document.getElementById('btn-adicionar-agua').onclick = beberAgua;
    document.getElementById('btn-remover-agua').onclick = removerAgua;
    
    // Treinos
    trocarTreino('A', document.querySelector('.tab-btn'));
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => trocarTreino(btn.dataset.treino, btn);
    });
    
    // Medidas
    document.getElementById('btn-nova-medida').onclick = () => {
        document.getElementById('modal-data').textContent = `Data: ${new Date().toLocaleDateString('pt-BR')}`;
        camposMedidas.forEach(c => {
            const input = document.getElementById(c);
            if (input) input.value = '';
        });
        document.getElementById('modal-medidas').style.display = 'flex';
    };
    document.getElementById('salvar-medidas').onclick = salvarMedidas;
    document.getElementById('fechar-modal').onclick = () => document.getElementById('modal-medidas').style.display = 'none';
    document.getElementById('select-medida').onchange = () => atualizarGrafico();
    
    // Fechar modal clicando fora
    window.onclick = (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    };
    
    // Navegação
    initNavegacao();
    
    // Carregar dados iniciais
    atualizarDisplayMedidas();
    atualizarHistorico();
}; 