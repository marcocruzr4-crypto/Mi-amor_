document.addEventListener("DOMContentLoaded", () => {
    
    const btnEmpezar = document.getElementById("btn-empezar");
    const pantallaInicio = document.getElementById("pantalla-inicio");
    const pantallaCrono = document.getElementById("pantalla-cronometro");
    const contenidoPrincipal = document.getElementById("contenido-principal");
    const pantallaGaleria = document.getElementById("pantalla-galeria");
    const pantallaMensaje = document.getElementById("pantalla-mensaje");
    const pantallaMusica = document.getElementById("pantalla-musica"); 
    const pantallaEstanteria = document.getElementById("pantalla-estanteria"); 
    const pantallaDetalle = document.getElementById("pantalla-detalle-cancion"); 
    const pantallaCarrusel3D = document.getElementById("pantalla-carrusel-3d"); 
    const pantallaFinal = document.getElementById("pantalla-final"); 
    
    const contenedorFotos3D = document.getElementById("carrusel-fotos");
    const escenaInteractiva = document.getElementById("escena-interactiva");
    
    const vistaSobre = document.getElementById("vista-sobre");
    const vistaCarta = document.getElementById("vista-carta");
    const btnCartaAtras = document.getElementById("btn-carta-atras");
    const btnCartaAdelante = document.getElementById("btn-carta-adelante");
    const indicadorSwipeCarta = document.getElementById("indicador-swipe-carta");
    const p1 = document.getElementById("carta-p1");
    const p2 = document.getElementById("carta-p2");
    const p3 = document.getElementById("carta-p3");
    
    const botonVinilo = document.getElementById("boton-vinilo");
    const btnVolverVinilo = document.getElementById("btn-volver-vinilo");
    const btnVolverEstanteria = document.getElementById("btn-volver-estanteria");
    
    const txtTitulo = document.getElementById("detalle-titulo");
    const imgDetalle = document.getElementById("detalle-foto"); 
    
    const musica = document.getElementById("musica-fondo");
    const txtMeses = document.getElementById("cronometro-meses");
    const txtDias = document.getElementById("cronometro-dias");
    const txtHoras = document.getElementById("cronometro-horas");
    const txtSegundos = document.getElementById("cronometro-segundos");

    const fechaInicioRelacion = new Date(2025, 9, 18, 0, 0, 0); 
    let pantallaActual = 0; 
    let parteActualCarta = 1; 

    if (contenedorFotos3D) {
        const totalFotos = 42;
        const anguloSeparacion = 360 / totalFotos; 
        const radioCirculo = 1300; 

        for (let i = 1; i <= totalFotos; i++) {
            const item = document.createElement("div");
            item.className = "item-3d";
            const anguloActual = (i - 1) * anguloSeparacion;
            item.style.transform = `rotateY(${anguloActual}deg) translateZ(${radioCirculo}px)`;
            
            const img = document.createElement("img");
            img.src = `img/C${i}.jpg`;
            item.appendChild(img);
            contenedorFotos3D.appendChild(item);
        }
    }

    let anguloCarrusel = 0;
    let arrastrandoCarrusel = false;
    let xInicial = 0;
    let xAnterior = 0;
    let velocidadAutomatica = -0.15; 

    function animarCarrusel() {
        if (pantallaActual === 8 && !arrastrandoCarrusel && contenedorFotos3D) {
            anguloCarrusel += velocidadAutomatica;
            contenedorFotos3D.style.transform = `rotateY(${anguloCarrusel}deg)`;
        }
        requestAnimationFrame(animarCarrusel);
    }
    
    if (contenedorFotos3D) {
        animarCarrusel(); 
    }

    if (escenaInteractiva && contenedorFotos3D) {
        escenaInteractiva.addEventListener('touchstart', (e) => {
            arrastrandoCarrusel = true;
            xInicial = e.touches[0].clientX;
            xAnterior = xInicial;
        });
        escenaInteractiva.addEventListener('touchmove', (e) => {
            if (!arrastrandoCarrusel) return;
            const xActual = e.touches[0].clientX;
            const difX = xActual - xAnterior;
            anguloCarrusel += difX * 0.4; 
            contenedorFotos3D.style.transform = `rotateY(${anguloCarrusel}deg)`;
            xAnterior = xActual;
        });
        escenaInteractiva.addEventListener('touchend', () => {
            arrastrandoCarrusel = false;
        });
    }

    // =========================================================================
    // BASE DE DATOS LIMPIA (Solo Título, Foto y Audio)
    // =========================================================================
    const bibliotecaCanciones = [
        { titulo: "Yo borracho", rutaFoto: "img/R1.jpg", rutaAudio: "audio/disco1.mp3" },
        { titulo: "Mi amor por ti", rutaFoto: "img/R2.jpg", rutaAudio: "audio/disco2.mp3" },
        { titulo: "Sobre mis pies", rutaFoto: "img/R3.jpg", rutaAudio: "audio/disco3.mp3" },
        { titulo: "Canción 4", rutaFoto: "img/R4.jpg", rutaAudio: "audio/disco4.mp3" },
        { titulo: "Regalo de dios", rutaFoto: "img/R5.jpg", rutaAudio: "audio/disco5.mp3" },
        { titulo: "Siempre te voy a querer", rutaFoto: "img/R6.jpg", rutaAudio: "audio/disco6.mp3" },
        { titulo: "Contigo", rutaFoto: "img/R7.jpg", rutaAudio: "audio/disco7.mp3" },
        { titulo: "Amor del bueno", rutaFoto: "img/R8.jpg", rutaAudio: "audio/disco8.mp3" },
        { titulo: "Te regalo", rutaFoto: "img/R9.jpg", rutaAudio: "audio/disco9.mp3" }
    ];

    function updateCronometro() {
        if (!txtMeses || !txtDias || !txtHoras || !txtSegundos) return;
        const ahora = new Date();
        const diferencia = ahora - fechaInicioRelacion;
        const segundos = Math.floor(diferencia / 1000);
        const dias = Math.floor(segundos / (60 * 60 * 24));
        const horas = Math.floor(segundos / (60 * 60));
        let meses = (ahora.getFullYear() - fechaInicioRelacion.getFullYear()) * 12 + (ahora.getMonth() - fechaInicioRelacion.getMonth());
        if (ahora.getDate() < fechaInicioRelacion.getDate()) meses--;
        
        txtMeses.innerHTML = `❤️ ${meses.toLocaleString()} Meses ❤️`;
        txtDias.innerText = `${dias.toLocaleString()} Días Totales`;
        txtHoras.innerText = `${horas.toLocaleString()} Horas Totales`;
        txtSegundos.innerText = `${segundos.toLocaleString()} Segundos Totales`;
    }

    if (btnEmpezar) {
        btnEmpezar.addEventListener("click", () => {
            if (musica) { try { let pAudio = musica.play(); if (pAudio !== undefined) pAudio.catch(() => {}); } catch(e) {} }
            pantallaInicio.style.opacity = "0";
            pantallaInicio.style.transform = "translateY(-50px)";
            setTimeout(() => {
                pantallaInicio.classList.add("oculto");
                mostrarPantalla(pantallaCrono, 1);
                updateCronometro(); 
                setInterval(updateCronometro, 1000); 
            }, 1000);
        });
    }

    if (vistaSobre) {
        vistaSobre.addEventListener("click", () => {
            vistaSobre.style.opacity = "0";
            vistaSobre.style.transform = "scale(0.8)";
            setTimeout(() => {
                vistaSobre.classList.add("oculto");
                vistaCarta.classList.remove("oculto");
                setTimeout(() => { vistaCarta.classList.remove("transparent"); vistaCarta.style.transform = "translateY(0)"; }, 50);
            }, 500); 
        });
    }

    if (btnCartaAdelante) {
        btnCartaAdelante.addEventListener("click", () => {
            if (parteActualCarta === 1) { p1.classList.add("oculto"); p2.classList.remove("oculto"); btnCartaAtras.classList.remove("oculto"); parteActualCarta = 2; }
            else if (parteActualCarta === 2) { p2.classList.add("oculto"); p3.classList.remove("oculto"); btnCartaAdelante.classList.add("oculto"); if(indicadorSwipeCarta){ indicadorSwipeCarta.classList.remove("oculto"); setTimeout(() => indicadorSwipeCarta.classList.remove("transparent"), 50); } parteActualCarta = 3; }
        });
    }

    if (btnCartaAtras) {
        btnCartaAtras.addEventListener("click", () => {
            if (parteActualCarta === 2) { p2.classList.add("oculto"); p1.classList.remove("oculto"); btnCartaAtras.classList.add("oculto"); parteActualCarta = 1; }
            else if (parteActualCarta === 3) { p3.classList.add("oculto"); p2.classList.remove("oculto"); btnCartaAdelante.classList.remove("oculto"); if(indicadorSwipeCarta){ indicadorSwipeCarta.classList.add("oculto", "transparent"); } parteActualCarta = 2; }
        });
    }

    if (botonVinilo) botonVinilo.addEventListener("click", () => cambiarPantalla(pantallaMusica, pantallaEstanteria, 6));
    if (btnVolverVinilo) btnVolverVinilo.addEventListener("click", () => cambiarPantalla(pantallaEstanteria, pantallaMusica, 5));

    document.querySelectorAll(".caratula-contenedor").forEach(disco => {
        disco.addEventListener("click", () => {
            const id = disco.getAttribute("data-id");
            const datos = bibliotecaCanciones[id];
            if (datos) {
                if(txtTitulo) txtTitulo.innerText = datos.titulo;
                if (datos.rutaFoto && imgDetalle) { imgDetalle.src = datos.rutaFoto; }
                if (datos.rutaAudio && musica) { musica.src = datos.rutaAudio; musica.play().catch(() => {}); }
                cambiarPantalla(pantallaEstanteria, pantallaDetalle, 7);
            }
        });
    });

    if (btnVolverEstanteria) btnVolverEstanteria.addEventListener("click", () => cambiarPantalla(pantallaDetalle, pantallaEstanteria, 6));

    function cambiarPantalla(pantallaOcultar, pantallaMostrar, nuevoEstado) {
        if(!pantallaOcultar || !pantallaMostrar) return;
        pantallaOcultar.style.opacity = "0";
        setTimeout(() => { 
            pantallaOcultar.classList.add("oculto"); 
            mostrarPantalla(pantallaMostrar, nuevoEstado); 
        }, 500); 
    }

    function mostrarPantalla(pantalla, estado) {
        if(!pantalla) return;
        pantalla.classList.remove("oculto");
        setTimeout(() => {
            pantalla.classList.remove("transparent");
            pantalla.style.opacity = "1";
            pantallaActual = estado;
            if (estado === 2 && typeof Swiper !== 'undefined') { const c = document.querySelector('.mi-carrusel'); if(c && c.swiper) c.swiper.update(); }
            if (estado === 3 && typeof Swiper !== 'undefined') { const g = document.querySelector('.mi-galeria'); if(g && g.swiper) { g.swiper.update(); g.swiper.slideToLoop(0, 0); } }
        }, 50);
    }

    let touchStartX = 0; let touchStartY = 0;
    let touchEndX = 0; let touchEndY = 0;
    
    window.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });
    
    window.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        if (pantallaActual > 0) analizarGesto();
    });

    function analizarGesto() {
        const distanciaY = touchStartY - touchEndY;
        const distanciaX = touchStartX - touchEndX;
        
        if (pantallaActual === 8 && Math.abs(distanciaX) > Math.abs(distanciaY)) return;
        
        const umbral = 50; 
        if (pantallaActual === 4 && parteActualCarta !== 3) return; 
        if (pantallaActual === 6 || pantallaActual === 7) return; 

        if (distanciaY > umbral) { 
            if (pantallaActual === 1) cambiarPantalla(pantallaCrono, contenidoPrincipal, 2);
            else if (pantallaActual === 2) cambiarPantalla(contenidoPrincipal, pantallaGaleria, 3);
            else if (pantallaActual === 3) cambiarPantalla(pantallaGaleria, pantallaMensaje, 4);
            else if (pantallaActual === 4 && parteActualCarta === 3) cambiarPantalla(pantallaMensaje, pantallaMusica, 5);
            else if (pantallaActual === 5) cambiarPantalla(pantallaMusica, pantallaCarrusel3D, 8); 
            else if (pantallaActual === 8) cambiarPantalla(pantallaCarrusel3D, pantallaFinal, 9); 
        } 
        else if (distanciaY < -umbral) { 
            if (pantallaActual === 9) cambiarPantalla(pantallaFinal, pantallaCarrusel3D, 8); 
            else if (pantallaActual === 8) cambiarPantalla(pantallaCarrusel3D, pantallaMusica, 5);
            else if (pantallaActual === 5) cambiarPantalla(pantallaMusica, pantallaMensaje, 4);
            else if (pantallaActual === 4) {
                setTimeout(() => {
                    parteActualCarta = 1; p1.classList.remove("oculto"); p2.classList.add("oculto"); p3.classList.add("oculto");
                    btnCartaAtras.classList.add("oculto"); btnCartaAdelante.classList.remove("oculto");
                    if (indicadorSwipeCarta) indicadorSwipeCarta.classList.add("oculto", "transparent");
                    vistaCarta.classList.add("oculto", "transparent"); vistaCarta.style.transform = "translateY(50px)";
                    vistaSobre.classList.remove("oculto"); vistaSobre.style.opacity = "1"; vistaSobre.style.transform = "scale(1)";
                }, 500);
                cambiarPantalla(pantallaMensaje, pantallaGaleria, 3);
            } 
            else if (pantallaActual === 3) cambiarPantalla(pantallaGaleria, contenidoPrincipal, 2);
            else if (pantallaActual === 2) cambiarPantalla(contenidoPrincipal, pantallaCrono, 1);
        }
    }

    if(typeof Swiper !== 'undefined') {
        new Swiper('.mi-carrusel', { effect: 'cards', grabCursor: true, pagination: { el: '.swiper-pagination', clickable: true } });
        new Swiper('.mi-galeria', { slidesPerView: 1, centeredSlides: true, spaceBetween: 20, grabCursor: true, loop: true, loopedSlides: 12, watchSlidesProgress: true, observer: true, observeParents: true });
    }
});
