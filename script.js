/**
 * Salva os dados de um formulário no localStorage.
 * @param {string} formId O ID do formulário (ex: 'form-rh')
 */
function saveData(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const data = {};
    const elements = form.elements;

    for (const element of elements) {
        if (!element.name) continue; // Pula elementos sem nome

        if (element.type === 'checkbox') {
            if (!data[element.name]) {
                data[element.name] = []; // Cria um array para checkboxes
            }
            if (element.checked) {
                data[element.name].push(element.value);
            }
        } else if (element.type === 'radio') {
            if (element.checked) {
                data[element.name] = element.value;
            }
        } else if (element.type !== 'button' && element.type !== 'submit' && element.type !== 'reset') {
            data[element.name] = element.value;
        }
    }

    localStorage.setItem(formId, JSON.stringify(data));
}

/**
 * Carrega os dados do localStorage e preenche o formulário.
 * @param {string} formId O ID do formulário
 */
function loadData(formId) {
    const data = JSON.parse(localStorage.getItem(formId));
    if (!data) return; // Nenhum dado salvo

    const form = document.getElementById(formId);
    if (!form) return;

    for (const element of form.elements) {
        if (!element.name) continue;

        const value = data[element.name];
        if (value === undefined) continue; // Nenhum dado salvo para este campo

        if (element.type === 'checkbox') {
            // Verifica se o valor está no array de checkboxes salvos
            element.checked = Array.isArray(value) && value.includes(element.value);
        } else if (element.type === 'radio') {
            // Verifica se o valor é o mesmo do radio salvo
            element.checked = (value === element.value);
        } else {
            element.value = value;
        }
    }
}

/**
 * Limpa o formulário e os dados salvos no localStorage.
 * @param {string} formId O ID do formulário
 */
function clearData(formId) {
    if (confirm("Tem certeza que deseja limpar todos os campos? Os dados salvos serão perdidos.")) {
        localStorage.removeItem(formId);
        document.getElementById(formId).reset();
    }
}

/**
 * Função principal para gerar o PDF.
 * Primeiro salva os dados, depois chama a impressão.
 * @param {string} formId O ID do formulário
 */
function gerarPDF(formId) {
    saveData(formId);
    window.print();
}

// ---- Gatilho de Carregamento ----
// Quando a página carregar, verifica qual formulário está nela e tenta carregar os dados
window.addEventListener('load', () => {
    if (document.getElementById('form-rh')) {
        loadData('form-rh');
    }
    
    if (document.getElementById('form-idoso')) {
        loadData('form-idoso');
    }
});