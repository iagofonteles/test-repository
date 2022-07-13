
//#region variables
var startClick = false;
var showingButtons = false;
var showControls = true;
var showInstructions = false;
var showModal = false;
var showCloseButton = true;
var popupTitle = "Lorem Ipsum Lorem Ipsum";
var popupVideoId = '444190590';
var actualContentId = 0;
var allContent = [];
var actualData = [];

var showScene = true;
var vrMode = false;

var btnCount = 0;
var buttons = { };

var size;

var backLocation;

var carSelector = {
    Content: [{
        id: 1,
        title: {
            "br": "Tração 4x4 e Bloqueio de Diferencial Traseiro",
            "ar": "Tração 4x4 e Bloqueio de Diferencial Traseiro traduzido"
        },
        videoId: '563267536',
        tag: "tracao1",
    },
    {
        id: 2,
        title: {
            "br": "Controle Automático de Descidas",
            "ar": "Controle Automático de Descidas Traduzido",
        },
        videoId: '563266334',
        tag: "tracao2",
    },
    {
        id: 3,
        title: {
            "br": "Painel de Instrumentos",
        },
        videoId: '563265325',
        tag: "tracao3",
    },
    {
        id: 4,
        title: {
            "br": "Painel de Instrumentos com duas telas de LCD 4.2\""
        },
        videoId: '563263656',
        tag: "tracao4",
    },
    {
        id: 5,
        title: {
            "br": "SYNC® 3 - Conectividade via CarPlay & Android Auto"
        },
        videoId: '563262061',
        tag: "tracao5",
    },
    {
        id: 6,
        title: {
            "br": "Sistema de Permanência em Faixa com Detecção de Fadiga"
        },
        videoId: '563259466',
        tag: "tracao6",
    },
    {
        id: 7,
        title: {
            "br": "Piloto Automático Adaptativo"
        },
        videoId: '563258228',
        tag: "tracao7",
    },
    {
        id: 8,
        title: {
            "br": "Assistente Autônomo de Frenagem com Detecção de Pedestres"
        },
        videoId: '563256605',
        tag: "tracao8",
    },
    {
        id: 9,
        title: {
            "br": "Farol Alto Automático e Sistema de Reconhecimento de Sinais de Trânsito"
        },
        videoId: '563269084',
        tag: "tracao9",
    },
    {
        id: 10,
        title: {
            "br": "FordPass™ Connect"
        },
        videoId: '563254782',
        tag: "tracao0",
    },
    {
        id: 11,
        title: {
            "br": "SYNC® 3 - Outras funções"
        },
        videoId: '563260716',
        tag: "tracao11",
    },
    ],
    emptyData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    stormData: [1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1],
    blackData: [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
    xlsData: [1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1],
    xltData: [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1]
}
//#endregion

function popUp(index) {

    //#region Coiso
    Content = allContent[(index % allContent.length + allContent.length) % allContent.length];
    actualContentId = index;
    popupTitle = Content.title["br"];
    popupVideoId = Content.videoId;
    console.log("popup " + actualContentId);

    showModal = true;
    showCloseButton = false;
    animationDecreaseButtons();
    showControls = false;

    if (actualContentId == actualData.indexOf(1)) {
        document.querySelector("#btnPrev").classList.add("carouselBtnInactive");
        document.querySelector("#btnNext").classList.remove("carouselBtnInactive");
    }
    else if (actualContentId == actualData.length - 1) {
        document.querySelector("#btnPrev").classList.remove("carouselBtnInactive");
        document.querySelector("#btnNext").classList.add("carouselBtnInactive");
    }
    else {
        document.querySelector("#btnPrev").classList.remove("carouselBtnInactive");
        document.querySelector("#btnNext").classList.remove("carouselBtnInactive");
    }

    document.getElementById("popup").classList.add("popupActive");
    document.getElementById("popup").classList.remove("popupInactive");
    document.getElementById("featureCount").innerText = `${buttons[actualContentId] + 1}/${btnCount}`;
    document.getElementById("titulo").innerText = `${popupTitle}`;
    document.getElementById("videoFrame").src = `https://player.vimeo.com/video/${popupVideoId}?api=1&player_id=videoFrame`;
    //#endregion
    
    var element = document.getElementById("videoFrame");
    element.customTag = "asd funcionou";
    var video = $f(element);
    video.addEvent('ready', id => ready(id, Content.tag));
}

function ready(player_id, feature) {
    // Keep a reference to Froogaloop for this player
    var froogaloop = $f(player_id);
    var trigger = new TagTrigger(feature);

    /*
     * Adds listeners for the events that are checked. Adding an event
     * through Froogaloop requires the event name and the callback method
     * that is called once the event fires.
     */
    froogaloop.addEvent('playProgress', data=> trigger.trigger(data.percent));
    //froogaloop.addEvent('finish', ()=> trigger.trigger("100%", 100));
    //froogaloop.addEvent('play', ()=> trigger.trigger("play", 0));
    //froogaloop.addEvent('loadProgress', function(data) { apiLog('loadProgress event : ' + data.percent + ' : ' + data.bytesLoaded + ' : ' + data.bytesTotal + ' : ' + data.duration); });
    //froogaloop.addEvent('pause', function(data) { apiLog('pause event'); });
    //froogaloop.addEvent('seek', function(data) { apiLog('seek event : ' + data.seconds + ' : ' + data.percent + ' : ' + data.duration); });
    console.log(player_id + ' ready! feature: ' + feature);
}

class TagTrigger {
    constructor(feature) {
        this.feature = feature;
        this.tag = [];
        this.tag.push({value:0.0, sent:false, name:"play"});
        this.tag.push({value:.25, sent:false, name:"25%"});
        this.tag.push({value:.50, sent:false, name:"50%"});
        this.tag.push({value:.75, sent:false, name:"75%"});
        this.tag.push({value:1.0, sent:false, name:"100%"});
    }

    trigger(progress) {
        this.tag.forEach(t => {
            if(!t.sent && t.value <= progress) {
                t.sent = true;
                fordtag(this.feature+'-'+t.name);
            }
        });
    }
}

 //#region Resto
function increaseZoom() {
    MoveImage.prototype.zoomIn();
}

function decreaseZoom() {
    MoveImage.prototype.zoomOut();
}

window.onload = created;

function created() {
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    let selectedCar = params.get("car");

    backLocation = params.get("callback");

    if (backLocation === "" || backLocation === null || backLocation === undefined)
    {
        backLocation = "https://guia360fordranger.com.br/";
        params.set('callback', backLocation);
        
    }      

    if (selectedCar == "storm")
        actualData = carSelector.stormData;
    else if (selectedCar == "black") {
        actualData = carSelector.blackData;
    } else if (selectedCar == 'xls') {
        actualData = carSelector.xlsData;
    } else if (selectedCar == 'xlt') {
        actualData = carSelector.xltData;
    } else {
        params.set('car', 'xls');
        actualData = carSelector.xlsData;
        window.location.search = params.toString();
    }

    allContent = carSelector.Content;
    selectButtonsByCar();
}

function mounted() {
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    instructions = params.get("inst")

    if (instructions != "false" && instructions != "true") {
        params.set('inst', 'true');
        window.location.search = params.toString();
    }

    if (instructions == "true") {

        //startInstructions()
        start()
        //instantDecreaseButtons()
    } else {
        setTimeout(function () { document.querySelector(".a-modal").style.display = 'block' }, 1000)
    }
}

function closePopUp() {
    //unBlurScene();
    showModal = false;
    showCloseButton = true;
    //animationIncreaseButtons();
    showControls = true;
    document.getElementById("popup").classList.remove("popupActive");
    document.getElementById("popup").classList.add("popupInactive");
}

function next() {
    console.log(actualContentId);
    if (actualContentId > actualData.length - 2)
        return;

    prox = actualContentId + 1;

    while (actualData[prox] == 0) {
        if (prox < actualData.length)
            prox++;
    }

    size = actualData.length;
    popUp(prox);
}

function before() {
    console.log(actualContentId);

    if (actualContentId <= actualData.indexOf(1))
        return;

    ant = actualContentId - 1;

    while (actualData[ant] == 0) {
        if (ant > 0) {
            ant -= 1;
        }
    }

    size = actualData.length;
    popUp(ant);
}

function start() {
    showInstructions = false
    showControls = true

    setTimeout(function () { document.querySelector(".a-modal").style.display = 'block' }, 500);
}

function alternateButtons() {
    if (showingButtons == true) {
        animationDecreaseButtons();
        document.querySelector("#show-hide").setAttribute("src", "images/SHOW_INTERACTIVE_ITEMS.png")
    } else {
        //animationIncreaseButtons();
        document.querySelector("#show-hide").setAttribute("src", "images/HIDE_INTERACTIVE_ITEMS.png")
    }
}

function instantDecreaseButtons() {
    arr = document.querySelectorAll("#buttonsGroup > a-plane")
    for (let i = 0; i < arr.length; i++) {
        button = arr[i]
        button.setAttribute("scale", "0 0")
    }
    showingButtons = false;
}

function animationDecreaseButtons() {
    arr = document.querySelectorAll("#buttonsGroup > a-plane")
    for (let i = 0; i < arr.length; i++) {
        button = arr[i]
        button.setAttribute("animation", "property: scale; to: 0 0 ; dur:200")
    }
    showingButtons = false;
}

function animationIncreaseButtons() {
    arr = document.querySelectorAll("#buttonsGroup > a-plane")
    //size = returnButtonSize()
    for (let i = 0; i < arr.length; i++) {
        button = arr[i]
        button.setAttribute("animation", "property: scale; to: 1 1; dur:200")

    }
    showingButtons = true;
}

function hideButtons() {
    arr = document.querySelectorAll("#buttonsGroup > a-plane")
    //size = returnButtonSize()
    for (let i = 0; i < arr.length; i++) {
        button = arr[i]
        button.setAttribute("scale", "0 0 0")
    }
}

function instantHideButtons() {
    document.querySelector("#buttonsGroup").setAttribute("visible", "false")
    showingButtons = false;
}

function instantShowButtons() {
    document.querySelector("#buttonsGroup").setAttribute("visible", "true")
    showingButtons = true;
}

function instantHideAllButtons() {
    instantHideButtons();
    document.querySelector("#controls").style.display = "none"
    document.querySelector("#gradiente").style.display = "none"
    document.querySelector("#btnFechar").style.display = "none"
}

function instantShowAllButtons() {
    instantShowButtons();
    document.querySelector("#controls").style.display = "block"
    document.querySelector("#gradiente").style.display = "block"
    document.querySelector("#btnFechar").style.display = "block"
}
/*
function blurScene() {
    document.querySelector("#cena > a-scene").style.filter = "blur(4px)"
}

function unBlurScene() {
    document.querySelector("#cena > a-scene").style.filter = "blur(0px)"
}
*/
function mousedown() {
    startClick = true;
}

function mouseleave() {
    startClick = false;
}

function mouseup(index) {
    if (startClick) {
        popUp(index)
    }
}


function zoomIn() {
    zoom = parseFloat(document.querySelector("#camera").getAttribute("zoom"));
    zoom = Math.min(zoom + 0.25, 2);
    document.querySelector("#camera").setAttribute("zoom", zoom);

    zoomButtonsControl();
}

function zoomOut() {
    zoom = document.querySelector("#camera").getAttribute("zoom");

    zoom = Math.max(zoom - 0.25, 1);
    document.querySelector("#camera").setAttribute("zoom", zoom);

    zoomButtonsControl();
}

function zoomButtonsControl() {
    //zoom = document.querySelector("#camera").getAttribute("zoom");
    let zoomInBtn = document.getElementById("zoomIn");
    let zoomOutBtn = document.getElementById("zoomOut");


    if (zoomFactor == maxZoomFactor) {
        zoomInBtn.classList.add("btnUnactive");
        zoomInBtn.classList.remove("btnActive");
    } else {
        zoomInBtn.classList.remove("btnUnactive");
        zoomInBtn.classList.add("btnActive");
    }

    if (zoomFactor == minZoomFactor) {        
        zoomOutBtn.classList.add("btnUnactive");
        zoomOutBtn.classList.remove("btnActive");
    } else {
        zoomOutBtn.classList.add("btnActive");
        zoomOutBtn.classList.remove("btnUnactive");
    }
}

function selectButtonsByCar() {
    size = actualData.length;

    for (let i = 0; i < size; i++) {
        if (actualData[i] == 1) {
            buttons[i] = btnCount;
            btnCount++;
            continue;
        }
    }

    size = btnCount;
}

function startInstructions() {
    //BlurScene();
    showInstructions = true;
    showModal = false;
    showControls = false;
    popupTitle = "Lorem Ipsum Lorem Ipsum";
    popupVideoId = '444190590';
}

function backButton() {
    window.location = backLocation;
}

function refreshPage() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        showScene = false
        selectedCar = carSelector.selectedCar;
        setTimeout(() => { window.location.href = "./index.html?inst=false&car=" + selectedCar + "&ts=" + new Date().getTime(), 10 })
    }
}
//#endregion
