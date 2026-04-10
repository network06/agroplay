window.showDailyTip = function() {
    const tips = [
        {title: "💡 Tips Siram", content: "Pagi 6-9 AM terbaik. Hindari malam hari (jamur risk)."},
        {title: "🌱 Hidroponik", content: "Hemat air 90%, cepat 30-50%, no gulma!"},
        {title: "🏭 Sawit Indonesia", content: "Produsen minyak sawit #1 dunia!"},
        {title: "💊 Jahe-Kunyit", content: "Jahe hangatkan, kunyit anti-radang."}
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    const html = `<div style="padding:24px;text-align:center;"><div style="font-size:60px;">💡</div><h3>${randomTip.title}</h3><p>${randomTip.content}</p><button onclick="closeModal()" style="background:var(--primary-blue);color:white;padding:12px;border-radius:12px;border:none;margin-top:20px;">Mengerti!</button></div>`;
    if(typeof showModal === 'function') showModal(html); else alert(randomTip.content);
};
