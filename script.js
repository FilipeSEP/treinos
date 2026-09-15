 const treinos = {
    "A": { titulo: "Upper - Superiores Completo (Segunda)", exercicios: [
        { nome: "Supino Inclinado com Halteres", info: "4x8-10 | Foco no peitoral superior", img: "img/supino-inclinado-halteres.jpg" },
        { nome: "Puxada Alta no Pulley", info: "4x8-10 | Aquecimento + carga progressiva", img: "img/puxada-alta-pulley.jpg" },
        { nome: "Desenvolvimento com Halteres", info: "3x8-10 | Ombro anterior", img: "img/desenvolvimento-halteres.jpg" },
        { nome: "Remada Articulada", info: "3x10 | Miolo das costas", img: "img/remada-articulada.jpg" },
        { nome: "Rosca Scott na Máquina", info: "3x10-12 | Isolamento e pico de contração", img: "img/rosca-scott-maquina.jpg" },
        { nome: "Tríceps Pulley na Corda", info: "3x10-12 | Extensão total do cotovelo", img: "img/triceps-pulley-corda.jpg" },
        { nome: "Abdominal na Polia Alta (Crunch)", info: "3x12-15 | Carga progressiva / Hipertrofia do core", img: "img/abdominal-polia.jpg" }
    ]},
    "B": { titulo: "Lower A - Pernas (Quadríceps) + Core (Terça)", exercicios: [
        { nome: "Agachamento Hack", info: "4x8-10 | Sem tirar o quadril do encosto", img: "img/agachamento-hack.jpg" },
        { nome: "Leg Press 45°", info: "4x10-12 | Carga alta e amplitude", img: "img/leg-press-45.jpg" },
        { nome: "Cadeira Extensora", info: "3x12-15 | Até a falha total", img: "img/cadeira-extensora.jpg" },
        { nome: "Cadeira Flexora", info: "3x10-12 | Manter quadril colado", img: "img/cadeira-flexora.jpg" },
        { nome: "Panturrilha no Leg Press", info: "4x12-15 | Pausa de 2s no alongamento", img: "img/panturrilha-leg-press.jpg" },
        { nome: "Abdominal Infra (Elevação de Pernas)", info: "3x Até a falha | Pelve e porção inferior", img: "img/abdominal-infra.jpg" }
    ]},
    "C": { titulo: "Push - Peito, Ombro e Tríceps (Quarta)", exercicios: [
        { nome: "Supino Reto (Máquina)", info: "4x8-10 | Carga com segurança", img: "img/supino-reto-maquina.jpg" },
        { nome: "Crucifixo Inclinado com Halteres", info: "3x10-12 | Alongamento do peito superior", img: "img/crucifixo-inclinado-halteres.jpg" },
        { nome: "Elevação Lateral na Máquina", info: "4x12-15 | Largura de ombro", img: "img/elevacao-lateral-maquina.jpg" },
        { nome: "Tríceps Francês na Polia Baixa / Corda", info: "3x10-12 | Alongamento da cabeça longa sem forçar cotovelo", img: "img/triceps-frances-corda.jpg" },
        { nome: "Abdominal na Polia Alta (Crunch)", info: "3x12-15 | Carga progressiva / Hipertrofia do core", img: "img/abdominal-polia.jpg" }
    ]},
    "D": { titulo: "Pull - Costas, Bíceps e Antebraço (Quinta)", exercicios: [
        { nome: "Remada Curvada na Máquina / Apio Peitoral", info: "4x8-10 | Puxar cotovelos travando escápulas (Zero lombar)", img: "img/remada-curvada-maquina.jpg" },
        { nome: "Remada Baixa no Triângulo", info: "3x10 | Esmagar escápulas no final", img: "img/remada-baixa-triangulo.jpg" },
        { nome: "Pull Down na Polia", info: "3x12 | Isola a grande dorsal", img: "img/pull-down-polia.jpg" },
        { nome: "Crucifixo Inverso (Máquina)", info: "3x12-15 | Deltóide posterior", img: "img/crucifixo-inverso-maquina.jpg" },
        { nome: "Rosca Inclinada com Halteres (45°)", info: "3x10-12 | Foco total em hipertrofiar a bola do bíceps", img: "img/rosca-inclinada-halteres-45.jpg" },
        { nome: "Rosca Bayesiana na Polia Baixa", info: "3x10-12 | Tensão constante com braço projetado para trás", img: "img/rosca-bayesiana-polia.jpg" },
        { nome: "Rosca Inversa na Polia / Barra W", info: "3x12-15 | Hipertrofia de Antebraço e Braquiorradial", img: "img/rosca-inversa.jpg" }
    ]},
    "E": { titulo: "Lower B - Pernas (Posterior/Glúteo) + Core (Sexta)", exercicios: [
        { nome: "Stiff com Halteres ou Barra", info: "4x8-10 | Alongamento de posterior / força de quadril", img: "img/stiff-halteres.jpg" },
        { nome: "Leg Press 45° (Pés Altos)", info: "3x10-12 | Foco em glúteo e posterior", img: "img/leg-press-45.jpg" },
        { nome: "Mesa Flexora", info: "4x10-12 | Contração do posterior", img: "img/mesa-flexora.jpg" },
        { nome: "Cadeira Extensora", info: "3x12 | Manutenção muscular", img: "img/cadeira-extensora.jpg" },
        { nome: "Panturrilha Sentado (Gêmeos)", info: "4x12-15 | Foco no sóleo / Pausa no topo", img: "img/panturrilha-sentado.jpg" },
        { nome: "Abdominal Infra (Elevação de Pernas)", info: "3x Até a falha | Pelve e porção inferior", img: "img/abdominal-infra.jpg" }
    ]}
};

// Placeholder usado quando uma imagem não existe/não carrega
const IMG_PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <rect width="100" height="100" fill="#2c2c2e"/>
  <text x="50" y="55" font-size="34" text-anchor="middle" fill="#8E8E93">🏋️</text>
</svg>`);

// Mapeia o dia da semana (0=domingo) para a letra do treino do dia
const TREINO_DO_DIA = { 1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E' };

function letraTreinoHoje() {
    const diaSemana = new Date().getDay();
    return TREINO_DO_DIA[diaSemana] || 'A'; // fim de semana cai no A
}

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

// ===== FUNÇÕES DOS TREINOS (SEU CÓDIGO ORIGINAL + IMAGENS + PROGRESSO) =====
function trocarTreino(letra, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const treino = treinos[letra];
    document.getElementById('titulo-sessao').innerText = treino.titulo;

    const container = document.getElementById('lista-exercicios');
    container.innerHTML = treino.exercicios.map((ex, idx) => `
        <div class="item-ex" data-item-indice="${idx}">
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

    // Carregar checkboxes salvos (só se foram marcados HOJE; se for de outro dia, reseta)
    const hoje = new Date().toLocaleDateString('pt-BR');
    const saved = localStorage.getItem(`treino_${letra}`);
    if (saved) {
        const savedData = JSON.parse(saved);
        if (savedData.data === hoje) {
            document.querySelectorAll('.check-ex').forEach(cb => {
                const idx = cb.dataset.indice;
                if (savedData.checks[idx]) {
                    cb.checked = true;
                    cb.closest('.item-ex').classList.add('concluido');
                }
            });
        } else {
            localStorage.removeItem(`treino_${letra}`);
        }
    }

    atualizarContadorProgresso(letra);

    // Salvar quando clicar
    document.querySelectorAll('.check-ex').forEach(cb => {
        cb.addEventListener('change', function() {
            this.closest('.item-ex').classList.toggle('concluido', this.checked);

            const checks = {};
            document.querySelectorAll('.check-ex').forEach(c => {
                checks[c.dataset.indice] = c.checked;
            });
            localStorage.setItem(`treino_${letra}`, JSON.stringify({ data: hoje, checks }));

            atualizarContadorProgresso(letra);
        });
    });
}

function atualizarContadorProgresso(letra) {
    const el = document.getElementById('contador-progresso');
    if (!el) return;
    const total = document.querySelectorAll('.check-ex').length;
    const feitos = document.querySelectorAll('.check-ex:checked').length;
    el.textContent = total > 0 ? `${feitos}/${total} concluídos` : '';
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

    // Treinos — abre automaticamente o treino do dia da semana
    const letraHoje = letraTreinoHoje();
    const btnHoje = document.querySelector(`.tab-btn[data-treino="${letraHoje}"]`) || document.querySelector('.tab-btn');
    trocarTreino(letraHoje, btnHoje);
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
