const prices = {
    pequeno: {
        banho_simples: 50,
        banho_longo: 65,
        banho_higienica: 75,
        banho_tosa_maquina: 90,
        banho_tosa_tesoura: 120,
        hidratacao: 25,
        bronze: 90,
        prata: 170,
        gold: 250
    },
    medio: {
        banho_simples: 70,
        banho_longo: 85,
        banho_higienica: 95,
        banho_tosa_maquina: 120,
        banho_tosa_tesoura: 150,
        hidratacao: 35,
        bronze: 130,
        prata: 220,
        gold: 320
    },
    grande: {
        banho_simples: 95,
        banho_longo: 115,
        banho_higienica: 130,
        banho_tosa_maquina: 160,
        banho_tosa_tesoura: 200,
        hidratacao: 45,
        bronze: 180,
        prata: 310,
        gold: 440
    }
};

const serviceNames = {
    banho_simples: "Banho Pêlo Curto",
    banho_longo: "Banho Pêlo Longo",
    banho_higienica: "Banho + Tosa Higiênica",
    banho_tosa_maquina: "Banho + Tosa Geral (Máquina)",
    banho_tosa_tesoura: "Banho + Tosa Tesoura/Bebê",
    bronze: "Plano Mensal Bronze",
    prata: "Plano Mensal Prata",
    gold: "Plano Mensal Gold VIP"
};

function togglePlanType(type) {
    if (type === 'avulso') {
        document.getElementById('avulsoOptions').classList.remove('hidden');
        document.getElementById('mensalOptions').classList.add('hidden');
    } else {
        document.getElementById('avulsoOptions').classList.add('hidden');
        document.getElementById('mensalOptions').classList.remove('hidden');
    }
    calculateTotal();
}

function calculateTotal() {
    const size = document.getElementById('petSize').value;
    const isAvulso = document.querySelector('input[name="planType"]:checked').value === 'avulso';
    let total = 0;
    let serviceText = "";
    let extras = [];

    const sizeLabel = size === 'pequeno' ? 'Porte Pequeno (até 10kg)' : (size === 'medio' ? 'Porte Médio (10kg a 25kg)' : 'Porte Grande (> 25kg)');

    if (isAvulso) {
        const serviceKey = document.getElementById('avulsoService').value;
        total += prices[size][serviceKey];
        serviceText = serviceNames[serviceKey];

        if (document.getElementById('addHydration').checked) {
            total += prices[size].hidratacao;
            extras.push("Hidratação Profunda");
        }
        if (document.getElementById('addTeeth').checked) {
            total += 15;
            extras.push("Escovação Dental");
        }
    } else {
        const planKey = document.getElementById('mensalPlan').value;
        total += prices[size][planKey];
        serviceText = serviceNames[planKey];
    }

    document.getElementById('summarySize').innerText = sizeLabel;
    document.getElementById('summaryService').innerText = serviceText;

    const extrasRow = document.getElementById('summaryExtrasRow');
    if (extras.length > 0) {
        extrasRow.classList.remove('hidden');
        document.getElementById('summaryExtras').innerText = extras.join(', ');
    } else {
        extrasRow.classList.add('hidden');
    }

    document.getElementById('totalPrice').innerText = `R$ ${total},00`;
}

function sendWhatsApp() {
    const petName = document.getElementById('petName').value || "Meu Pet";
    const sizeText = document.getElementById('summarySize').innerText;
    const serviceText = document.getElementById('summaryService').innerText;
    const totalPrice = document.getElementById('totalPrice').innerText;

    let message = `Olá, Estética Animal! Gostaria de agendar um horário.\n\n`;
    message += `*Nome do Pet:* ${petName}\n`;
    message += `*Porte:* ${sizeText}\n`;
    message += `*Serviço Escolhido:* ${serviceText}\n`;

    const extrasRow = document.getElementById('summaryExtrasRow');
    if (!extrasRow.classList.contains('hidden')) {
        message += `*Opcionais:* ${document.getElementById('summaryExtras').innerText}\n`;
    }

    message += `*Valor Estimado:* ${totalPrice}\n\n`;
    message += `Como podemos verificar a disponibilidade da agenda?`;

    const phone = "554195428051";
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

calculateTotal();
