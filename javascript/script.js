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
        prices: { pequeno: 60, medio: 75, grande: 95 }
    },
    {
        key: "banho_longo",
        name: "Banho Pêlo Longo",
        tableName: "Banho Pelagem Longa / Densa",
        description: "Shampoo nutritivo + secagem especial",
        icon: "fa-soap",
        prices: { pequeno: 70, medio: 90, grande: 130 }
    },
    {
        key: "banho_higienica",
        name: "Banho + Tosa Higiênica",
        tableName: "Banho + Tosa Higiênica",
        description: "Banho completo + higiene íntima e patas",
        icon: "fa-scissors",
        prices: { pequeno: 70, medio: 85, grande: 120 }
    },
    {
        key: "banho_tosa_maquina",
        name: "Banho + Tosa Geral (Máquina)",
        tableName: "Banho + Tosa Completa (Máquina)",
        description: "Banho + tosa padrão de raça ou baixa",
        icon: "fa-cut",
        prices: { pequeno: 90, medio: 100, grande: 120 }
    },
    {
        key: "banho_tosa_tesoura",
        name: "Banho + Tosa na Tesoura/Bebê",
        tableName: "Banho + Tosa na Tesoura / Bebê",
        description: "Trabalho manual exclusivo e acabamento fino",
        icon: "fa-wand-magic-sparkles",
        prices: { pequeno: 120, medio: 130, grande: 150 }
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
        prices: { pequeno: 25, medio: 25, grande: 25 }
    },
    {
        key: "escovacao",
        name: "Escovação Dental",
        tableName: "Escovação Dental + Flúor Pet",
        icon: "fa-tooth",
        prices: { pequeno: 10, medio: 10, grande: 10 }
    }
];

const PLANS = [
    { key: "bronze", name: "Plano Mensal Bronze", option: "Plano Bronze (2 Banhos + 1 Tosa Higiênica)", prices: { pequeno: 90, medio: 120, grande: 150 } },
    { key: "prata", name: "Plano Mensal Prata", option: "Plano Prata (4 Banhos + 2 Tosas Higiênicas)", prices: { pequeno: 170, medio: 190, grande: 220 } },
    { key: "gold", name: "Plano Mensal Gold VIP", option: "Plano Gold VIP (6 Banhos + 3 Tosas + 2 Hidratações)", prices: { pequeno: 320, medio: 350, grande: 400 } }
];

// Raças por porte, pelo peso médio do cão adulto
const BREEDS = {
    pequeno: [
        "Affenpinscher", "Bichon Bolonhês", "Bichon Frisé", "Boston Terrier", "Cairn Terrier",
        "Cavalier King Charles Spaniel", "Chihuahua", "Chin Japonês", "Cão de Crista Chinês",
        "Coton de Tuléar", "Dachshund (Salsicha)", "Fox Paulistinha (Terrier Brasileiro)",
        "Fox Terrier", "Galgo Italiano", "Griffon de Bruxelas", "Havanês", "Jack Russell Terrier",
        "Lhasa Apso", "Lulu da Pomerânia (Spitz Alemão Anão)", "Maltês", "Norfolk Terrier",
        "Papillon", "Pequinês", "Pinscher Miniatura", "Poodle Toy", "Poodle Miniatura", "Pug",
        "Schnauzer Miniatura", "Scottish Terrier", "Shih Tzu", "Spitz Japonês",
        "West Highland White Terrier (Westie)", "Yorkshire Terrier"
    ],
    medio: [
        "American Pit Bull Terrier", "Basenji", "Basset Hound", "Beagle", "Border Collie",
        "Boiadeiro Australiano", "Bull Terrier", "Bulldog Francês", "Bulldog Inglês",
        "Cão d'Água Português", "Chow Chow", "Cocker Spaniel Americano", "Cocker Spaniel Inglês",
        "Corgi (Pembroke Welsh Corgi)", "Husky Siberiano", "Pastor Australiano",
        "Pastor de Shetland (Sheltie)", "Poodle Médio", "Samoieda", "Schnauzer Standard",
        "Shar-Pei", "Shiba Inu", "Soft Coated Wheaten Terrier", "Spitz Alemão Médio",
        "Springer Spaniel Inglês", "Staffordshire Bull Terrier", "Whippet"
    ],
    grande: [
        "Akita", "American Staffordshire Terrier", "Bloodhound", "Bobtail (Old English Sheepdog)",
        "Boxer", "Bullmastiff", "Cane Corso", "Collie", "Dálmata", "Dobermann", "Dogo Argentino",
        "Dogue Alemão", "Dogue de Bordeaux", "Fila Brasileiro", "Golden Retriever",
        "Greyhound (Galgo Inglês)", "Labrador Retriever", "Leonberger", "Malamute do Alasca",
        "Mastiff Inglês", "Pastor Alemão", "Pastor Belga Malinois", "Pastor Branco Suíço",
        "Pastor do Cáucaso", "Pointer Inglês", "Poodle Standard (Gigante)", "Rhodesian Ridgeback",
        "Rottweiler", "São Bernardo", "Setter Irlandês", "Terra Nova", "Weimaraner"
    ]
};

// ==========================================================
// UTILITÁRIOS
// ==========================================================

const $ = (id) => document.getElementById(id);

const formatPrice = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const findByKey = (list, key) => list.find((item) => item.key === key);

// Ordem alfabética em português (ignora acentos e maiúsculas)
const byName = (a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" });

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

// Ignora maiúsculas e acentos na busca ("sao bernardo" encontra "São Bernardo")
const normalize = (text) => text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function renderBreedTable(filter = "") {
    const query = normalize(filter.trim());

    const columns = Object.entries(BREEDS).map(([size, breeds]) => {
        const matches = breeds
            .filter((breed) => normalize(breed).includes(query))
            .sort(byName);
        const items = matches.length > 0
            ? matches.map((breed) => `
                <li class="flex items-center gap-2 py-1.5">
                    <i class="fa-solid fa-paw text-xs text-brand-lightbrown"></i> ${breed}
                </li>`).join("")
            : `<li class="py-1.5 text-gray-400 italic">Nenhuma raça encontrada</li>`;
        const [title, weight] = SIZES[size].split(" (");

        return `
            <div class="bg-white rounded-2xl shadow-sm border border-brand-brown/10 overflow-hidden">
                <div class="bg-brand-brown text-white text-center py-4 px-4">
                    <h3 class="font-display text-xl font-bold">${title}</h3>
                    <span class="text-xs text-amber-200">(${weight} · ${matches.length} raças</span>
                </div>
                <ul class="px-6 py-4 text-sm text-gray-700 divide-y divide-gray-100">${items}</ul>
            </div>`;
    });

    $("breedTable").innerHTML = columns.join("");
}

function renderPlanPrices() {
    document.querySelectorAll("[data-plan-price]").forEach((el) => {
        const plan = findByKey(PLANS, el.dataset.planPrice);
        el.textContent = `R$ ${plan.prices.pequeno}`;
    });

    // Preço de cada porte abaixo do valor principal do card
    document.querySelectorAll("[data-plan-sizes]").forEach((el) => {
        const plan = findByKey(PLANS, el.dataset.planSizes);
        el.innerHTML = Object.keys(SIZES)
            .map((size) => `
                <div class="bg-amber-50 rounded-lg py-1.5">
                    <span class="block text-[10px] uppercase tracking-wide text-gray-500">${SIZES[size].split(" (")[0].replace("Porte ", "")}</span>
                    <span class="font-bold text-brand-darkbrown">${formatPrice(plan.prices[size])}</span>
                </div>`)
            .join("");
    });
}

// Todas as raças numa lista única, em ordem alfabética
const ALL_BREEDS = Object.entries(BREEDS)
    .flatMap(([size, breeds]) => breeds.map((name) => ({ name, size })))
    .sort((a, b) => byName(a.name, b.name));

const OTHER_BREED = "Sem raça definida (SRD) / Outra";

function renderSimulatorOptions() {
    $("petBreed").innerHTML = [
        `<option value="">Selecione a raça</option>`,
        `<option value="${OTHER_BREED}">${OTHER_BREED}</option>`,
        ...ALL_BREEDS.map((breed) => `<option value="${breed.name}">${breed.name}</option>`)
    ].join("");
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

// Ao escolher uma raça conhecida, ajusta o porte (o tutor ainda pode alterar)
function selectBreed(breedName) {
    const breed = ALL_BREEDS.find((item) => item.name === breedName);
    if (breed) {
        $("petSize").value = breed.size;
    }
}

function updateSummary() {
    const quote = getQuote();
    const breed = $("petBreed").value;

    $("summaryBreed").textContent = breed;
    $("summaryBreedRow").classList.toggle("hidden", breed === "");

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
        `*Nome do Pet:* ${petName}`
    ];
    if ($("petBreed").value) {
        lines.push(`*Raça:* ${$("petBreed").value}`);
    }
    lines.push(
        `*Porte:* ${SIZES[quote.size]}`,
        `*Serviço Escolhido:* ${quote.serviceName}`
    );
    if (quote.extras.length > 0) {
        lines.push(`*Opcionais:* ${quote.extras.join(", ")}`);
    }
    lines.push(`*Valor Estimado:* ${formatPrice(quote.total)}`, "", "Como podemos verificar a disponibilidade da agenda?");

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
}

// ==========================================================
// ROLAGEM SUAVE DOS LINKS INTERNOS (#secao)
// ==========================================================

const SCROLL_DURATION_MS = 1000;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function smoothScrollTo(target) {
    const headerOffset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const start = window.scrollY;
    const distance = target.getBoundingClientRect().top - headerOffset;

    // Respeita quem prefere menos animação no sistema
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo(0, start + distance);
        return;
    }

    const startTime = performance.now();
    const step = (now) => {
        const progress = Math.min((now - startTime) / SCROLL_DURATION_MS, 1);
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;

            event.preventDefault();
            history.pushState(null, "", link.getAttribute("href"));
            smoothScrollTo(target);
        });
    });
}

// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

function init() {
    renderPriceTable();
    renderBreedTable();
    renderPlanPrices();
    renderSimulatorOptions();
    setupSmoothScroll();

    // Registrado antes do listener do formulário para o porte mudar antes do resumo
    $("petBreed").addEventListener("change", (event) => selectBreed(event.target.value));
    $("calcForm").addEventListener("change", updateSummary);
    $("calcForm").addEventListener("submit", (event) => event.preventDefault());
    document.querySelectorAll('input[name="planType"]').forEach((radio) => {
        radio.addEventListener("change", () => togglePlanType(radio.value));
    });
    $("whatsappButton").addEventListener("click", sendWhatsApp);
    $("breedSearch").addEventListener("input", (event) => renderBreedTable(event.target.value));

    updateSummary();
}

init();
