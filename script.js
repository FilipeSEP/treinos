// ===== CONFIGURAÇÕES =====
const QUANTIDADE_AGUA_ML = 250;
const META_AGUA_ML_PADRAO = 4000;
const STORAGE_KEYS = {
    AGUA: 'gym_agua',
    TREINO_A: 'gym_treino_A',
    TREINO_B: 'gym_treino_B',
    TREINO_C: 'gym_treino_C',
    HISTORICO_AGUA: 'gym_historico_agua',
    HISTORICO_TREINOS: 'gym_historico_treinos',
    HISTORICO_MEDIDAS: 'gym_historico_medidas',
    SEQUENCIA: 'gym_sequencia',
    METAS: 'gym_metas',
    CONQUISTAS: 'gym_conquistas'
};

// ===== DADOS DOS TREINOS =====
const treinos = {
    "A": { 
        titulo: "Pernas e Abdominais", 
        exercicios: [
            { nome: "Leg Press 45º/180º", info: "4x12 | Amplitude" },
            { nome: "Cadeira Extensora", info: "3x15 | Lento" },
            { nome: "Mesa/Cadeira Flexora", info: "4x12" },
            { nome: "Cadeira Adutora", info: "3x15" },
            { nome: "Panturrilha", info: "4x15" },
            { nome: "Prancha Abdominal", info: "3x45s" }
        ]
    },
    "B": { 
        titulo: "Peito, Ombros e Tríceps", 
        exercicios: [
            { nome: "Supino Reto", info: "4x10" },
            { nome: "Supino Inclinado", info: "3x12 | Halteres" },
            { nome: "Desenvolvimento", info: "3x10" },
            { nome: "Elevação Lateral", info: "4x12 | Técnica" },
            { nome: "Tríceps Pulley", info: "3x12" },
            { nome: "Tríceps Testa", info: "3x10" }
        ]
    },
    "C": { 
        titulo: "Costas e Bíceps", 
        exercicios: [
            { nome: "Puxada Aberta", info: "4x10" },
            { nome: "Remada Sentada", info: "4x12 | Triângulo" },
            { nome: "Remada Curvada", info: "3x12" },
            { nome: "Rosca Direta", info: "3x12 | Barra W" },
            { nome: "Rosca Martelo", info: "3x12" },
            { nome: "Encolhimento", info: "3x15" }
        ]
    }
};

// ===== CONQUISTAS =====
const CONQUISTAS = [
    { id: 'primeiro_treino', nome: '🌟 Primeiro Passo', icone: '🎯', condicao: (dados) => dados.totalTreinos >= 1 },
    { id: 'semana_completa', nome: '💪 Semana Full', icone: '🏆', condicao: (dados) => dados.sequenciaAtual >= 7 },
    { id: 'hidratado', nome: '💧 Hidratado', icone: '🚰', condicao: (dados) => dados.diasAguaMeta >= 5 },
    { id: 'maratonista', nome: '🏃 Maratonista', icone: '⭐', condicao: (dados) => dados.totalTreinos >= 30 },
    { id: 'perfeccionista', nome: '🎯 Perfeccionista', icone: '👑', condicao: (dados) => dados.diasCompletos >= 10 },
    { id: 'medidas_iniciais', nome: '📏 Primeiras Medidas', icone: '📐', condicao: (dados) => dados.totalMedidas >= 1 },
    { id: 'evolucao', nome: '📈 Evolução', icone: '🚀', condicao: (dados) => dados.medidasEvolucao > 5 }
];

// ===== ESTADO GLOBAL =====
let aguaConsumida = 0;
let metaAgua = META_AGUA_PADRAO;
let treinoAtual = 'A';
let progressoAtual = {};
let graficoGlobal = null;
let graficoMedidasGlobal = null;
let tipoGrafico = 'agua';
let conquistasDesbloqueadas = [];

// ===== UTILITÁRIOS =====
function mostrarToast(mensagem, duracao = 2000) {
    const toast = document.getElementById('toast');
    toast.textContent = mensagem;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duracao);
}

function getUltimos7Dias() {
    const dias = [];
    for (let i = 6; i >= 0; i--) {
        const data = new Date();
        data.setDate(data.getDate() - i);
        dias.push({
            data: data.toDateString(),
            label: data.toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase()
        });
    }
    return dias;
}

// ===== FUNÇÕES DE MEDIDAS CORPORAIS =====
const camposMedidas = [
    'biceps_e', 'biceps_d', 'antebraco_e', 'antebraco_d',
    'coxa_e', 'coxa_d', 'panturrilha_e', 'panturrilha_d',
    'abdomen', 'peitoral'
];

const nomesMedidas = {
    biceps_e: 'Bíceps E',
    biceps_d: 'Bíceps D',
    antebraco_e: 'Antebraço E',
    antebraco_d: 'Antebraço D',
    coxa_e: 'Coxa E',
    coxa_d: 'Coxa D',
    panturrilha_e: 'Panturrilha E',
    panturrilha_d: 'Panturrilha D',
    abdomen: 'Abdômen',
    peitoral: 'Peitoral'
};

function salvarMedidas(medidas) {
    const historico = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_MEDIDAS) || '[]');
    const novaMedicao = {
        id: Date.now(),
        data: new Date().toISOString(),
        dataDisplay: new Date().toLocaleDateString('pt-BR'),
        ...medidas
    };
    historico.unshift(novaMedicao);
    localStorage.setItem(STORAGE_KEYS.HISTORICO_MEDIDAS, JSON.stringify(historico));
    return novaMedicao;
}

function carregarUltimasMedidas() {
    const historico = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_MEDIDAS) || '[]');
    if (historico.length === 0) return null;
    return historico[0];
}

function carregarMedidasAnteriores() {
    const historico = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_MEDIDAS) || '[]');
    if (historico.length < 2) return null;
    return historico[1];
}

function atualizarUIComMedidas() {
    const ultimas = carregarUltimasMedidas();
    const anteriores = carregarMedidasAnteriores();
    
    camposMedidas.forEach(campo => {
        const valorAtual = ultimas?.[campo] || '--';
        const valorAnterior = anteriores?.[campo] || null;
        
        const elementoValor = document.getElementById(`${campo}-valor`);
        if (elementoValor) elementoValor.textContent = valorAtual !== '--' ? `${valorAtual}cm` : '--cm';
        
        const elementoEvol = document.getElementById(`${campo}-evol`);
        if (elementoEvol && valorAnterior && valorAtual !== '--') {
            const diferenca = valorAtual - valorAnterior;
            if (diferenca !== 0) {
                const sinal = diferenca > 0 ? '+' : '';
                elementoEvol.textContent = `${sinal}${diferenca.toFixed(1)}cm`;
                elementoEvol.className = `medida-evolucao ${diferenca > 0 ? 'positivo' : 'negativo'}`;
            } else {
                elementoEvol.textContent = '';
            }
        }
    });
    
    atualizarHistoricoMedidas();
}

function atualizarHistoricoMedidas() {
    const historico = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_MEDIDAS) || '[]');
    const container = document.getElementById('lista-historico-medidas');
    if (!container) return;
    
    container.innerHTML = historico.slice(0, 10).map(item => `
        <div class="historico-item" onclick="carregarMedidaParaEdicao(${item.id})">
            <div class="historico-data">📅 ${item.dataDisplay}</div>
            <div class="historico-detalhes">
                ${camposMedidas.filter(c => item[c]).map(c => `${nomesMedidas[c]}: ${item[c]}cm`).join(' | ').substring(0, 100)}...
            </div>
        </div>
    `).join('');
}

function abrirModalMedidas(data = null) {
    const modal = document.getElementById('modal-medidas');
    const dataSpan = document.getElementById('modal-data');
    dataSpan.textContent = `Data: ${new Date().toLocaleDateString('pt-BR')}`;
    
    camposMedidas.forEach(campo => {
        const input = document.getElementById(`med-${campo}`);
        if (input) input.value = '';
    });
    
    modal.style.display = 'flex';
}

function carregarMedidaParaEdicao(id) {
    const historico = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_MEDIDAS) || '[]');
    const medida = historico.find(m => m.id === id);
    if (!medida) return;
    
    const modal = document.getElementById('modal-medidas');
    document.getElementById('modal-data').textContent = `Data: ${medida.dataDisplay} (Editando)`;
    
    camposMedidas.forEach(campo => {
        const input = document.getElementById(`med-${campo}`);
        if (input && medida[campo]) input.value = medida[campo];
    });
    
    modal.style.display = 'flex';
    
    const salvarBtn = document.getElementById('salvar-medidas');
    const oldClick = salvarBtn.onclick;
    salvarBtn.onclick = () => {
        editarMedida(id);
    };
    
    setTimeout(() => {
        salvarBtn.onclick = oldClick;
    }, 100);
}

function editarMedida(id) {
    const historico = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_MEDIDAS) || '[]');
    const index = historico.findIndex(m => m.id === id);
    if (index === -1) return;
    
    const novasMedidas = {};
    camposMedidas.forEach(campo => {
        const input = document.getElementById(`med-${campo}`);
        if (input && input.value) novasMedidas[campo] = parseFloat(input.value);
    });
    
    historico[index] = { ...historico[index], ...novasMedidas };
    localStorage.setItem(STORAGE_KEYS.HISTORICO_MEDIDAS, JSON.stringify(historico));
    
    document.getElementById('modal-medidas').style.display = 'none';
    atualizarUIComMedidas();
    atualizarGraficoEvolucaoMedidas();
    mostrarToast('Medidas atualizadas com sucesso!');
}

function salvarMedidasDoModal() {
    const medidas = {};
    camposMedidas.forEach(campo => {
        const input = document.getElementById(`med-${campo}`);
        if (input && input.value) {
            medidas[campo] = parseFloat(input.value);
        }
    });
    
    if (Object.keys(medidas).length === 0) {
        mostrarToast('Preencha pelo menos uma medida!');
        return;
    }
    
    salvarMedidas(medidas);
    document.getElementById('modal-medidas').style.display = 'none';
    atualizarUIComMedidas();
    atualizarGraficoEvolucaoMedidas();
    verificarConquistas();
    mostrarToast('Medidas salvas com sucesso!');
}

function atualizarGraficoEvolucaoMedidas() {
    const select = document.getElementById('select-medida-grafico');
    if (!select) return;
    
    const medidaSelecionada = select.value;
    const historico = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_MEDIDAS) || '[]');
    
    const dados = historico.slice().reverse().map(item => ({
        data: item.dataDisplay,
        valor: item[medidaSelecionada] || 0
    })).filter(d => d.valor > 0);
    
    const ctx = document.getElementById('grafico-evolucao-medidas').getContext('2d');
    
    if (graficoMedidasGlobal) graficoMedidasGlobal.destroy();
    
    graficoMedidasGlobal = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dados.map(d => d.data),
            datasets: [{
                label: nomesMedidas[medidaSelecionada],
                data: dados.map(d => d.valor),
                borderColor: '#30D158',
                backgroundColor: 'rgba(48, 209, 88, 0.1)',
                borderWidth: 3,
                pointRadius: 4,
                pointBackgroundColor: '#30D158',
                pointBorderColor: '#fff',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}cm`
                    }
                }
            },
            scales: {
                y: {
                    title: { display: true, text: 'cm', color: '#AEAEB2' }
                }
            }
        }
    });
}

// ===== FUNÇÕES DA ÁGUA =====
function atualizarAguaUI() {
    const porcentagem = (aguaConsumida / metaAgua) * 100;
    document.getElementById('consumo-atual').textContent = aguaConsumida;
    document.getElementById('barra-agua').style.width = `${porcentagem}%`;
    document.getElementById('porcentagem-agua').textContent = `${Math.floor(porcentagem)}%`;
    document.getElementById('meta-agua').textContent = (metaAgua / 1000).toFixed(1);
    
    const coposRestantes = Math.ceil((metaAgua - aguaConsumida) / QUANTIDADE_AGUA_ML);
    document.getElementById('copos-restantes').textContent = Math.max(0, coposRestantes);
}

function beberAgua() {
    if (aguaConsumida < metaAgua) {
        aguaConsumida = Math.min(aguaConsumida + QUANTIDADE_AGUA_ML, metaAgua);
        localStorage.setItem(STORAGE_KEYS.AGUA, aguaConsumida);
        atualizarAguaUI();
        
        registrarAtividade('agua', aguaConsumida);
        mostrarToast(`💧 +${QUANTIDADE_AGUA_ML/250} copo de água!`);
        
        if (aguaConsumida === metaAgua) mostrarToast('🎉 Meta diária de água atingida!');
        atualizarGrafico();
    } else {
        mostrarToast('✅ Meta diária já atingida!');
    }
}

function removerAgua() {
    if (aguaConsumida > 0) {
        aguaConsumida = Math.max(0, aguaConsumida - QUANTIDADE_AGUA_ML);
        localStorage.setItem(STORAGE_KEYS.AGUA, aguaConsumida);
        atualizarAguaUI();
        registrarAtividade('agua', aguaConsumida);
        mostrarToast('💧 -1 copo removido');
        atualizarGrafico();
    }
}

// ===== FUNÇÕES DOS TREINOS =====
function salvarProgresso() {
    localStorage.setItem(STORAGE_KEYS[`TREINO_${treinoAtual}`], JSON.stringify(progressoAtual));
}

function carregarProgresso() {
    const saved = localStorage.getItem(STORAGE_KEYS[`TREINO_${treinoAtual}`]);
    progressoAtual = saved ? JSON.parse(saved) : {};
}

function atualizarContadorTreino() {
    const total = treinos[treinoAtual].exercicios.length;
    const feitos = Object.values(progressoAtual).filter(v => v === true).length;
    document.getElementById('exercicios-feitos').textContent = feitos;
    document.getElementById('total-exercicios').textContent = total;
    document.getElementById('barra-progresso-treino').style.width = `${(feitos/total)*100}%`;
}

function toggleExercicio(index) {
    progressoAtual[index] = !progressoAtual[index];
    salvarProgresso();
    atualizarContadorTreino();
    renderizarExercicios();
    
    const total = treinos[treinoAtual].exercicios.length;
    const feitos = Object.values(progressoAtual).filter(v => v === true).length;
    
    if (feitos === total && feitos > 0) {
        registrarAtividade('treinos', 100);
        verificarConquistas();
        mostrarToast('🎉 Treino completo! +1 dia registrado');
        atualizarGrafico();
    }
    
    mostrarToast(progressoAtual[index] ? '✅ Exercício concluído!' : '🔄 Exercício reaberto');
}

function renderizarExercicios() {
    const container = document.getElementById('lista-exercicios');
    const treino = treinos[treinoAtual];
    if (!treino) return;
    
    container.innerHTML = treino.exercicios.map((ex, idx) => {
        const concluido = progressoAtual[idx] || false;
        return `
            <div class="item-ex ${concluido ? 'concluido' : ''}">
                <div class="info-ex">
                    <strong>${ex.nome}</strong>
                    <span>${ex.info}</span>
                </div>
                <div class="checkbox-custom ${concluido ? 'checked' : ''}" data-index="${idx}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
            </div>
        `;
    }).join('');
    
    document.querySelectorAll('.checkbox-custom').forEach(checkbox => {
        checkbox.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleExercicio(parseInt(checkbox.dataset.index));
        });
    });
}

function trocarTreino(letra) {
    treinoAtual = letra;
    carregarProgresso();
    renderizarExercicios();
    atualizarContadorTreino();
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.dataset.treino === letra) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    
    document.getElementById('titulo-sessao').textContent = treinos[letra].titulo;
}

function resetarTreino() {
    if (confirm('Resetar todo o progresso deste treino?')) {
        progressoAtual = {};
        salvarProgresso();
        renderizarExercicios();
        atualizarContadorTreino();
        mostrarToast('Progresso resetado');
    }
}

// ===== HISTÓRICO E GRÁFICO =====
function registrarAtividade(tipo, valor) {
    const hoje = new Date().toDateString();
    const key = tipo === 'agua' ? STORAGE_KEYS.HISTORICO_AGUA : STORAGE_KEYS.HISTORICO_TREINOS;
    let historico = JSON.parse(localStorage.getItem(key) || '{}');
    historico[hoje] = { data: hoje, valor, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(historico));
    atualizarSequencia();
}

function getHistoricoUltimos7Dias(tipo) {
    const key = tipo === 'agua' ? STORAGE_KEYS.HISTORICO_AGUA : STORAGE_KEYS.HISTORICO_TREINOS;
    const historico = JSON.parse(localStorage.getItem(key) || '{}');
    const ultimos7Dias = getUltimos7Dias();
    
    if (tipo === 'medidas') {
        const medidasHist = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_MEDIDAS) || '[]');
        return ultimos7Dias.map(dia => {
            const medida = medidasHist.find(m => new Date(m.data).toDateString() === dia.data);
            return medida ? (medida.peitoral || 0) : 0;
        });
    }
    
    return ultimos7Dias.map(dia => {
        const registro = historico[dia.data];
        if (tipo === 'agua') return registro ? (registro.valor / metaAgua) * 100 : 0;
        return registro ? registro.valor : 0;
    });
}

function atualizarSequencia() {
    const historico = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_TREINOS) || '{}');
    const datas = Object.keys(historico).sort();
    
    let sequenciaAtual = 0;
    let melhorSequencia = 0;
    let dataEsperada = new Date();
    dataEsperada.setHours(0, 0, 0, 0);
    
    for (let i = datas.length - 1; i >= 0; i--) {
        const dataRegistro = new Date(datas[i]);
        dataRegistro.setHours(0, 0, 0, 0);
        const diffDias = Math.floor((dataEsperada - dataRegistro) / (1000 * 60 * 60 * 24));
        if (diffDias === sequenciaAtual && historico[datas[i]].valor === 100) sequenciaAtual++;
        else break;
    }
    
    let temp = 0;
    for (let i = 0; i < datas.length; i++) {
        if (historico[datas[i]].valor === 100) {
            temp++;
            melhorSequencia = Math.max(melhorSequencia, temp);
        } else temp = 0;
    }
    
    localStorage.setItem(STORAGE_KEYS.SEQUENCIA, JSON.stringify({ atual: sequenciaAtual, melhor: melhorSequencia }));
    document.getElementById('sequencia-atual').textContent = sequenciaAtual;
    document.getElementById('melhor-sequencia').textContent = melhorSequencia;
}

function calcularMediaHistorica() {
    const historico = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_TREINOS) || '{}');
    const ultimos28Dias = Object.values(historico).slice(-28);
    if (ultimos28Dias.length === 0) return 0;
    const soma = ultimos28Dias.reduce((acc, h) => acc + h.valor, 0);
    return soma / ultimos28Dias.length;
}

function atualizarComparacaoMedia() {
    const media = calcularMediaHistorica();
    const hoje = new Date().toDateString();
    const historico = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_TREINOS) || '{}');
    const hojeValor = historico[hoje]?.valor || 0;
    const diferenca = hojeValor - media;
    document.getElementById('comparacao-media').textContent = Math.abs(diferenca).toFixed(0);
    document.getElementById('comparacao-texto').textContent = diferenca >= 0 ? 'acima' : 'abaixo';
}

function criarGrafico(dados, tipo) {
    const ctx = document.getElementById('grafico-semanal').getContext('2d');
    const dias = getUltimos7Dias().map(d => d.label);
    if (graficoGlobal) graficoGlobal.destroy();
    
    graficoGlobal = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dias,
            datasets: [{
                label: tipo === 'agua' ? 'Hidratação' : (tipo === 'treinos' ? 'Treinos' : 'Peitoral (cm)'),
                data: dados,
                borderColor: tipo === 'agua' ? '#0A84FF' : (tipo === 'treinos' ? '#30D158' : '#FF9F0A'),
                backgroundColor: `rgba(${tipo === 'agua' ? '10,132,255' : (tipo === 'treinos' ? '48,209,88' : '255,159,10')}, 0.1)`,
                borderWidth: 3,
                pointRadius: 4,
                pointBackgroundColor: tipo === 'agua' ? '#0A84FF' : (tipo === 'treinos' ? '#30D158' : '#FF9F0A'),
                pointBorderColor: '#fff',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: { callbacks: { label: (ctx) => `${ctx.raw.toFixed(1)}${tipo === 'medidas' ? 'cm' : '%'}` } }
            },
            scales: { y: { beginAtZero: true, max: tipo === 'medidas' ? 150 : 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#AEAEB2' } } }
        }
    });
}

function atualizarGrafico() {
    const dados = getHistoricoUltimos7Dias(tipoGrafico);
    criarGrafico(dados, tipoGrafico);
}

// ===== CONQUISTAS =====
function verificarConquistas() {
    const stats = {
        totalTreinos: Object.values(JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_TREINOS) || '{}')).filter(t => t.valor === 100).length,
        sequenciaAtual: parseInt(document.getElementById('sequencia-atual')?.textContent || 0),
        diasAguaMeta: Object.values(JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_AGUA) || '{}')).filter(a => a.valor >= metaAgua).length,
        diasCompletos: Object.values(JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_TREINOS) || '{}')).filter(t => t.valor === 100).length,
        totalMedidas: JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_MEDIDAS) || '[]').length,
        medidasEvolucao: 0
    };
    
    const conquistasSalvas = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONQUISTAS) || '[]');
    conquistasDesbloqueadas = conquistasSalvas;
    
    CONQUISTAS.forEach(conquista => {
        if (!conquistasDesbloqueadas.includes(conquista.id) && conquista.condicao(stats)) {
            conquistasDesbloqueadas.push(conquista.id);
            mostrarToast(`${conquista.icone} CONQUISTA: ${conquista.nome}!`, 3000);
        }
    });
    
    localStorage.setItem(STORAGE_KEYS.CONQUISTAS, JSON.stringify(conquistasDesbloqueadas));
    atualizarUIConquistas();
}

function atualizarUIConquistas() {
    const container = document.getElementById('conquistas-container');
    if (!container) return;
    
    container.innerHTML = CONQUISTAS.map(conq => {
        const desbloq = conquistasDesbloqueadas.includes(conq.id);
        return `
            <div class="conquista-card ${desbloq ? 'desbloqueada' : 'bloqueada'}">
                <div class="conquista-icone">${desbloq ? conq.icone : '🔒'}</div>
                <div class="conquista-info">
                    <strong>${conq.nome}</strong>
                    <span>${desbloq ? 'Conquistada!' : 'Ainda não'}</span>
                </div>
            </div>
        `;
    }).join('');
}

// ===== METAS =====
function carregarMetas() {
    const saved = localStorage.getItem(STORAGE_KEYS.METAS);
    if (saved) {
        const metas = JSON.parse(saved);
        metaAgua = metas.agua || META_AGUA_PADRAO;
    }
}

function salvarMetasDoModal() {
    const novaMetaAgua = parseInt(document.getElementById('meta-agua-slider').value);
    metaAgua = novaMetaAgua;
    localStorage.setItem(STORAGE_KEYS.METAS, JSON.stringify({ agua: metaAgua, treinosSemana: parseInt(document.getElementById('meta-treinos').value) }));
    document.getElementById('modal-metas').style.display = 'none';
    atualizarAguaUI();
    mostrarToast('Metas atualizadas!');
}

// ===== EXPORTAÇÃO =====
function exportarJSON() {
    const dados = {
        versao: '2.0',
        exportadoEm: new Date().toISOString(),
        agua: JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_AGUA) || '{}'),
        treinos: JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_TREINOS) || '{}'),
        medidas: JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_MEDIDAS) || '[]'),
        conquistas: conquistasDesbloqueadas,
        metas: { agua: metaAgua }
    };
    
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gym-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    mostrarToast('Dados exportados!');
}

function exportarCSV() {
    const historico = JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORICO_MEDIDAS) || '[]');
    if (historico.length === 0) { mostrarToast('Nenhuma medida para exportar'); return; }
    
    let csv = 'Data,Bíceps E,Bíceps D,Antebraço E,Antebraço D,Coxa E,Coxa D,Panturrilha E,Panturrilha D,Abdômen,Peitoral\n';
    historico.forEach(m => {
        csv += `${m.dataDisplay},${m.biceps_e || ''},${m.biceps_d || ''},${m.antebraco_e || ''},${m.antebraco_d || ''},${m.coxa_e || ''},${m.coxa_d || ''},${m.panturrilha_e || ''},${m.panturrilha_d || ''},${m.abdomen || ''},${m.peitoral || ''}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medidas-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    mostrarToast('CSV exportado!');
}

function importarBackup() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const dados = JSON.parse(event.target.result);
                if (dados.medidas) localStorage.setItem(STORAGE_KEYS.HISTORICO_MEDIDAS, JSON.stringify(dados.medidas));
                if (dados.agua) localStorage.setItem(STORAGE_KEYS.HISTORICO_AGUA, JSON.stringify(dados.agua));
                if (dados.treinos) localStorage.setItem(STORAGE_KEYS.HISTORICO_TREINOS, JSON.stringify(dados.treinos));
                mostrarToast('Backup importado! Recarregando...');
                setTimeout(() => location.reload(), 1500);
            } catch { mostrarToast('Erro ao importar'); }
        };
        reader.readAsText(e.target.files[0]);
    };
    input.click();
}

// ===== NAVEGAÇÃO =====
function initNavegacao() {
    document.querySelectorAll('.main-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.nav;
            document.querySelectorAll('.main-nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.nav-section').forEach(section => section.classList.remove('active'));
            document.getElementById(`section-${target}`).classList.add('active');
            
            if (target === 'progresso') {
                atualizarGrafico();
                atualizarGraficoEvolucaoMedidas();
                atualizarComparacaoMedia();
            }
            if (target === 'medidas') atualizarUIComMedidas();
            if (target === 'conquistas') atualizarUIConquistas();
        });
    });
}

// ===== INICIALIZAÇÃO =====
function init() {
    carregarMetas();
    
    const savedAgua = localStorage.getItem(STORAGE_KEYS.AGUA);
    aguaConsumida = savedAgua ? parseInt(savedAgua) : 0;
    
    const ultimaData = localStorage.getItem('gym_ultima_data');
    const hoje = new Date().toDateString();
    if (ultimaData !== hoje) {
        aguaConsumida = 0;
        localStorage.setItem(STORAGE_KEYS.AGUA, aguaConsumida);
        localStorage.setItem('gym_ultima_data', hoje);
        mostrarToast('🌅 Novo dia! Metas resetadas.');
    }
    atualizarAguaUI();
    
    trocarTreino('A');
    atualizarUIComMedidas();
    atualizarSequencia();
    
    document.getElementById('btn-adicionar-agua').addEventListener('click', beberAgua);
    document.getElementById('btn-remover-agua').addEventListener('click', removerAgua);
    document.getElementById('resetar-treino').addEventListener('click', resetarTreino);
    document.getElementById('btn-adicionar-medida').addEventListener('click', abrirModalMedidas);
    document.getElementById('salvar-medidas').addEventListener('click', salvarMedidasDoModal);
    document.getElementById('fechar-modal-medidas').addEventListener('click', () => document.getElementById('modal-medidas').style.display = 'none');
    document.getElementById('btn-config-metas').addEventListener('click', () => document.getElementById('modal-metas').style.display = 'flex');
    document.getElementById('salvar-metas').addEventListener('click', salvarMetasDoModal);
    document.getElementById('fechar-modal-metas').addEventListener('click', () => document.getElementById('modal-metas').style.display = 'none');
    document.getElementById('btn-export-json')?.addEventListener('click', exportarJSON);
    document.getElementById('btn-export-csv')?.addEventListener('click', exportarCSV);
    document.getElementById('btn-import')?.addEventListener('click', importarBackup);
    document.getElementById('select-medida-grafico')?.addEventListener('change', () => atualizarGraficoEvolucaoMedidas());
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', () => trocarTreino(btn.dataset.treino)));
    document.querySelectorAll('.grafico-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            document.querySelectorAll('.grafico-toggle').forEach(t => t.classList.remove('active'));
            toggle.classList.add('active');
            tipoGrafico = toggle.dataset.tipo;
            atualizarGrafico();
        });
    });
    
    initNavegacao();
    atualizarGrafico();
    atualizarGraficoEvolucaoMedidas();
    verificarConquistas();
    atualizarComparacaoMedia();
}

document.addEventListener('DOMContentLoaded', init);