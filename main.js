let finansije = {
    prihodi: 0,
    troskovi: {
        hrana: 0,
        smjestaj: 0,
        prijevoz: 0,
        zabava: 0,
        ostalo: 0
    },
    ciljevi: {}
};

let troskoviChart = null;
let raspodjelaChart = null;

function azurirajStanje() {
    const ukupniTroskovi = Object.values(finansije.troskovi).reduce((a, b) => a + b, 0);
    
    document.getElementById('prikazi-prihode').textContent = `${finansije.prihodi} EURA`;
    document.getElementById('prikazi-troskove').textContent = `${ukupniTroskovi} EURA`;
    document.getElementById('preostalo').textContent = `${finansije.prihodi - ukupniTroskovi} EURA`;
    
    azurirajGrafikone();
}

function dodajPrihode() {
    const iznos = parseFloat(document.getElementById('prihodi').value);
    if (!isNaN(iznos) && iznos > 0) {
        finansije.prihodi = iznos;
        azurirajStanje();
        document.getElementById('prihodi').value = '';
    }
}

function dodajTrosak() {
    const kategorija = document.getElementById('kategorija').value;
    const iznos = parseFloat(document.getElementById('iznos').value);
    
    if (!isNaN(iznos) && iznos > 0) {
        finansije.troskovi[kategorija] += iznos;
        azurirajStanje();
        document.getElementById('iznos').value = '';
    }
}

function azurirajGrafikone() {
    if (troskoviChart) troskoviChart.destroy();
    if (raspodjelaChart) raspodjelaChart.destroy();
    
    const kategorije = Object.keys(finansije.troskovi);
    const iznosi = Object.values(finansije.troskovi);
    const ukupniTroskovi = iznosi.reduce((a, b) => a + b, 0);
    const procenti = iznosi.map(iznos => ((iznos / ukupniTroskovi) * 100).toFixed(1));
    
    const ctx1 = document.getElementById('troskoviChart').getContext('2d');
    const ctx2 = document.getElementById('raspodjelaChart').getContext('2d');
    
    troskoviChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: kategorije,
            datasets: [{
                label: 'Troškovi po kategorijama (u eurima)',
                data: iznosi,
                backgroundColor: [
                    '#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6'
                ]
            }]
        }
    });
    
    raspodjelaChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: kategorije,
            datasets: [{
                label: 'Raspodjela troškova (%)',
                data: procenti,
                backgroundColor: [
                    '#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6'
                ]
            }]
        }
    });
}


azurirajStanje();

var swiper = new Swiper(".pocetna", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});