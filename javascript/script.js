// ==========================================================
// DADOS: única fonte de preços e serviços do site
// ==========================================================

const WHATSAPP_PHONE = "554195428051";

const SIZES = {
    pequeno: "Porte Pequeno (até 10kg)",
    medio: "Porte Médio (10kg a 25kg)",
    grande: "Porte Grande (acima de 25kg)"
};

// Serviços avulsos (tabela de preços + simulador)
const SERVICES = [
    {
        key: "banho_simples",
        name: "Banho Pêlo Curto",
        tableName: "Banho Simples (Pêlo Curtinho)",
        description: "Inclui corte de unhas e limpeza de ouvidos",
        icon: "fa-shower",
        prices: { pequeno: 50, medio: 70, grande: 95 }
    },
    {
        key: "banho_longo",
        name: "Banho Pêlo Longo",
        tableName: "Banho Pelagem Longa / Densa",
        description: "Shampoo nutritivo + secagem especial",
        icon: "fa-soap",
        prices: { pequeno: 65, medio: 85, grande: 115 }
    },
    {
        key: "banho_higienica",
        name: "Banho + Tosa Higiênica",
        tableName: "Banho + Tosa Higiênica",
        description: "Banho completo + higiene íntima e patas",
        icon: "fa-scissors",
        prices: { pequeno: 75, medio: 95, grande: 130 }
    },
    {
        key: "banho_tosa_maquina",
        name: "Banho + Tosa Geral (Máquina)",
        tableName: "Banho + Tosa Completa (Máquina)",
        description: "Banho + tosa padrão de raça ou baixa",
        icon: "fa-cut",
        prices: { pequeno: 90, medio: 120, grande: 160 }
    },
    {
        key: "banho_tosa_tesoura",
        name: "Banho + Tosa na Tesoura/Bebê",
        tableName: "Banho + Tosa na Tesoura / Bebê",
        description: "Trabalho manual exclusivo e acabamento fino",
        icon: "fa-wand-magic-sparkles",
        prices: { pequeno: 120, medio: 150, grande: 200 }
    }
];

// Opcionais adicionados ao serviço avulso
const EXTRAS = [
    {
        key: "hidratacao",
        name: "Hidratação Profunda",
        tableName: "Adicional: Hidratação Profunda",
        description: "Máscara de tratamento pré/pós banho",
        icon: "fa-spa",
        highlight: true,
        prices: { pequeno: 25, medio: 35, grande: 45 }
    },
    {
        key: "escovacao",
        name: "Escovação Dental",
        tableName: "Escovação Dental + Flúor Pet",
        icon: "fa-tooth",
        prices: { pequeno: 15, medio: 15, grande: 15 }
    }
];

const PLANS = [
    { key: "bronze", name: "Plano Mensal Bronze", option: "Plano Bronze (2 Banhos/mês)", prices: { pequeno: 90, medio: 130, grande: 180 } },
    { key: "prata", name: "Plano Mensal Prata", option: "Plano Prata (4 Banhos + 1 Tosa Higiênica)", prices: { pequeno: 170, medio: 220, grande: 310 } },
    { key: "gold", name: "Plano Mensal Gold VIP", option: "Plano Gold VIP (4 Banhos + Tosa + Hidratação)", prices: { pequeno: 250, medio: 320, grande: 440 } }
];

// ==========================================================
// UTILITÁRIOS
// ==========================================================

const $ = (id) => document.getElementById(id);

const formatPrice = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const findByKey = (list, key) => list.find((item) => item.key === key);

const toOptions = (items, getLabel) =>
    items.map((item) => `<option value="${item.key}">${getLabel(item)}</option>`).join("");

// ==========================================================
// RENDERIZAÇÃO A PARTIR DOS DADOS
// ==========================================================

function renderPriceTable() {
    const rows = [...SERVICES, ...EXTRAS].map((item) => {
        const isExtra = EXTRAS.includes(item);
        const prefix = item.highlight ? "+ " : "";
        const priceClass = item.highlight ? "text-brand-brown" : "text-gray-800";
        const priceCells = Object.keys(SIZES)
            .map((size) => `<td class="py-4 px-4 text-center font-bold ${priceClass}">${prefix}${formatPrice(item.prices[size])}</td>`)
            .join("");
        const description = item.description
            ? `<span class="text-xs text-gray-500 font-normal block">${item.description}</span>`
            : "";

        return `
            <tr class="hover:bg-amber-50/50 transition${isExtra && item.highlight ? " bg-amber-50/30" : ""}">
                <td class="py-4 px-6 font-semibold text-brand-darkbrown">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid ${item.icon} text-brand-lightbrown"></i> ${item.tableName}
                    </div>
                    ${description}
                </td>
                ${priceCells}
            </tr>`;
    });

    $("priceTableBody").innerHTML = rows.join("");
}

function renderPlanPrices() {
    document.querySelectorAll("[data-plan-price]").forEach((el) => {
        const plan = findByKey(PLANS, el.dataset.planPrice);
        el.textContent = `R$ ${plan.prices.pequeno}`;
    });
}

function renderSimulatorOptions() {
    $("petSize").innerHTML = toOptions(Object.keys(SIZES).map((key) => ({ key })), ({ key }) => SIZES[key]);
    $("avulsoService").innerHTML = toOptions(SERVICES, (service) => service.name);
    $("mensalPlan").innerHTML = toOptions(PLANS, (plan) => plan.option);

    const teeth = findByKey(EXTRAS, "escovacao");
    $("addTeethLabel").textContent = `Adicionar Escovação Dental (+ ${formatPrice(teeth.prices.pequeno)})`;
}

// ==========================================================
// SIMULADOR
// ==========================================================

function getQuote() {
    const size = $("petSize").value;
    const isAvulso = document.querySelector('input[name="planType"]:checked').value === "avulso";

    if (!isAvulso) {
        const plan = findByKey(PLANS, $("mensalPlan").value);
        return { size, serviceName: plan.name, extras: [], total: plan.prices[size] };
    }

    const service = findByKey(SERVICES, $("avulsoService").value);
    const selectedExtras = [
        $("addHydration").checked && findByKey(EXTRAS, "hidratacao"),
        $("addTeeth").checked && findByKey(EXTRAS, "escovacao")
    ].filter(Boolean);

    const total = selectedExtras.reduce((sum, extra) => sum + extra.prices[size], service.prices[size]);

    return { size, serviceName: service.name, extras: selectedExtras.map((extra) => extra.name), total };
}

function updateSummary() {
    const quote = getQuote();

    $("summarySize").textContent = SIZES[quote.size];
    $("summaryService").textContent = quote.serviceName;
    $("summaryExtras").textContent = quote.extras.join(", ");
    $("summaryExtrasRow").classList.toggle("hidden", quote.extras.length === 0);
    $("totalPrice").textContent = formatPrice(quote.total);
}

function togglePlanType(type) {
    $("avulsoOptions").classList.toggle("hidden", type !== "avulso");
    $("mensalOptions").classList.toggle("hidden", type !== "mensal");
}

function sendWhatsApp() {
    const quote = getQuote();
    const petName = $("petName").value.trim() || "Meu Pet";

    const lines = [
        "Olá, Estética Animal! Gostaria de agendar um horário.",
        "",
        `*Nome do Pet:* ${petName}`,
        `*Porte:* ${SIZES[quote.size]}`,
        `*Serviço Escolhido:* ${quote.serviceName}`
    ];
    if (quote.extras.length > 0) {
        lines.push(`*Opcionais:* ${quote.extras.join(", ")}`);
    }
    lines.push(`*Valor Estimado:* ${formatPrice(quote.total)}`, "", "Como podemos verificar a disponibilidade da agenda?");

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
}

// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

function init() {
    renderPriceTable();
    renderPlanPrices();
    renderSimulatorOptions();

    $("calcForm").addEventListener("change", updateSummary);
    $("calcForm").addEventListener("submit", (event) => event.preventDefault());
    document.querySelectorAll('input[name="planType"]').forEach((radio) => {
        radio.addEventListener("change", () => togglePlanType(radio.value));
    });
    $("whatsappButton").addEventListener("click", sendWhatsApp);

    updateSummary();
}

init();
