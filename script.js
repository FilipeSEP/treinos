// ===== SEUS TREINOS ORIGINAIS =====
// Cada exercício agora tem um campo "img" apontando para o arquivo
// dentro da pasta /imagens do repositório. Troque o nome do arquivo
// pelo nome real da imagem que você vai subir pro GitHub.
const treinos = {
    "A": { titulo: "Costas e Bíceps (Puxar)", exercicios: [
        { nome: "Puxada Alta no Pulley", info: "4x10-12 | Aquecimento + carga progressiva", img: "img/puxada-alta-pulley.jpg" },
        { nome: "Remada Articulada", info: "3x8-10 | Carga no miolo das costas", img: "img/remada-articulada.jpg" },
        { nome: "Puxada Articulada", info: "3x10-12", img: "img/puxada-articulada.jpg" },
        { nome: "Remada Baixa no Triângulo", info: "3x10-12 | Esmagar escápulas no final", img: "img/remada-baixa-triangulo.jpg" },
        { nome: "Rosca Direta com Halteres", info: "3x8-10 | Básico de braço", img: "img/rosca-direta-halteres.jpg" },
        { nome: "Rosca Scott na Máquina", info: "3x10-12 | Isolamento no pico", img: "img/rosca-scott-maquina.jpg" },
        { nome: "Rosca Martelo com Halteres", info: "3x10-12 | Braquial / volume lateral", img: "img/rosca-martelo-halteres.jpg" }
    ]},
    "B": { titulo: "Peito, Ombro e Tríceps (Empurrar)", exercicios: [
        { nome: "Supino Inclinado (Máquina)", info: "4x8-10 | Peito superior", img: "img/supino-inclinado-maquina.jpg" },
        { nome: "Supino Reto (Máquina)", info: "3x8-10 | Carga com segurança", img: "img/supino-reto-maquina.jpg" },
        { nome: "Crucifixo Inclinado na Polia", info: "3x10-12 | Tensão constante no topo", img: "img/crucifixo-inclinado-polia.jpg" },
        { nome: "Desenvolvimento com Halteres", info: "3x8-10 | Ombro anterior", img: "img/desenvolvimento-halteres.jpg" },
        { nome: "Elevação Lateral na Máquina", info: "4x12-15 | Ombro lateral / largura", img: "img/elevacao-lateral-maquina.jpg" }
    ]},
    "C": { titulo: "Pernas Completo e Panturrilhas", exercicios: [
        { nome: "Agachamento Hack", info: "4x8-10 | Sem tirar o quadril do banco", img: "img/agachamento-hack.jpg" },
        { nome: "Leg Press 45°", info: "4x10-12 | Carga alta", img: "img/leg-press-45.jpg" },
        { nome: "Cadeira Flexora", info: "4x10-12 | Foco posterior de coxa", img: "img/cadeira-flexora.jpg" },
        { nome: "Cadeira Extensora", info: "3x12-15 | Até a falha total", img: "img/cadeira-extensora.jpg" },
        { nome: "Mesa Flexora", info: "3x10-12", img: "img/mesa-flexora.jpg" },
        { nome: "Panturrilha no Leg Press", info: "4x12-15 | Pausa de 2s no alongamento", img: "img/panturrilha-leg-press.jpg" }
    ]},
    "D": { titulo: "Costas, Ombros (Posterior) e Bíceps", exercicios: [
        { nome: "Pull Down na Polia", info: "3x12 | Isola o dorsal", img: "img/pull-down-polia.jpg" },
        { nome: "Puxada Alta no Pulley", info: "3x10-12", img: "img/puxada-alta-pulley.jpg" },
        { nome: "Remada Articulada", info: "3x10", img: "img/remada-articulada.jpg" },
        { nome: "Crucifixo Inverso (Máquina)", info: "4x12-15 | Deltóide posterior", img: "img/crucifixo-inverso-maquina.jpg" },
        { nome: "Face Pull na Polia", info: "3x12-15 | Saúde do ombro", img: "img/face-pull-polia.jpg" },
        { nome: "Rosca Inclinada com Halteres (45°)", info: "3x10-12 | Máximo alongamento", img: "img/rosca-inclinada-halteres-45.jpg" },
        { nome: "Rosca na Polia Baixa", info: "3x12-15 | Tensão constante", img: "img/rosca-polia-baixa.jpg" }
    ]},
    "E": { titulo: "Peito, Ombro Lateral e Tríceps", exercicios: [
        { nome: "Supino Inclinado (Máquina)", info: "4x8-10", img: "img/supino-inclinado-maquina.jpg" },
        { nome: "Supino Reto (Máquina)", info: "3x10", img: "img/supino-reto-maquina.jpg" },
        { nome: "Crossover na Polia", info: "3x12-15 | Esmagar o peito no meio", img: "img/crossover-polia.jpg" },
        { nome: "Elevação Lateral na Máquina", info: "4x12-15 | Alta frequência/volume", img: "img/elevacao-lateral-maquina.jpg" },
        { nome: "Tríceps Pulley na Corda (Opcional)", info: "3x12 | Fecha o braço", img: "img/triceps-pulley-corda.jpg" }
    ]}
};

// Placeholder usado quando uma imagem não existe/não carrega
const IMG_PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <rect width="100" height="100" fill="#2c2c2e"/>
  <text x="50" y="55" font-size="34" text-anchor="middle" fill="#8E8E93">🏋️</text>
</svg>`);

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

// ===== FUNÇÕES DOS TREINOS (SEU CÓDIGO ORIGINAL + IMAGENS) =====
function trocarTreino(letra, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const treino = treinos[letra];
    document.getElementById('titulo-sessao').innerText = treino.titulo;

    const container = document.getElementById('lista-exercicios');
    container.innerHTML = treino.exercicios.map((ex, idx) => `
        <div class="item-ex">
            <img
                class="thumb-ex"
                src="${ex.img}"
                alt="Execução: ${ex.nome}"
                loading="lazy"
                onerror="this.onerror=null; this.src='${IMG_PLACEHOLDER}'; this.classList.add('sem-imagem');"
                onclick="abrirImagemExecucao('${ex.img.replace(/'/g, "\\'")}', '${ex.nome.replace(/'/g, "\\'")}')"
            >
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

// ===== IMAGEM DE EXECUÇÃO EM TELA CHEIA =====
function abrirImagemExecucao(src, nome) {
    const modal = document.getElementById('modal-imagem-execucao');
    const img = document.getElementById('imagem-execucao-grande');
    const titulo = document.getElementById('nome-exercicio-imagem');

    img.src = src;
    img.onerror = () => { img.onerror = null; img.src = IMG_PLACEHOLDER; };
    titulo.textContent = nome;
    modal.style.display = 'flex';
}

function fecharImagemExecucao() {
    document.getElementById('modal-imagem-execucao').style.display = 'none';
}

function criarModalImagem() {
    if (document.getElementById('modal-imagem-execucao')) return;
    document.body.insertAdjacentHTML('beforeend', `
        <div class="modal" id="modal-imagem-execucao">
            <div class="modal-imagem-content">
                <button class="fechar-imagem" id="fechar-imagem" aria-label="Fechar">&times;</button>
                <img id="imagem-execucao-grande" src="" alt="Execução do exercício">
                <p id="nome-exercicio-imagem"></p>
            </div>
        </div>
    `);
    document.getElementById('fechar-imagem').onclick = fecharImagemExecucao;
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
    // Modal de imagem de execução
    criarModalImagem();

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

    // Fechar modal clicando fora (funciona pros dois modais, pois ambos usam a classe .modal)
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