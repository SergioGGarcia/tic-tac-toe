// Variable con el elemento select del modo de juego
const modoJuegoElemento = document.getElementById("modo_juego");

// Variable con el elemento select del tipo de juego
const tipoJuegoElemento = document.getElementById("tipo_juego");

// Booleano que dirá si la partida está empezada o no
let partidaEmpezada = false;

// Contador de fichas puestas en el tablero
let xPuestas = 0;
let oPuestas = 0;
let fichasPuestas = 0;

// Turno
let turno = null;

// Array con todos los botones del tablero
let botones = Array.from(document.getElementsByClassName("celda"));

// Para cada botón del array añadimos un eventListener con un forEach
botones.forEach(
    x => x.addEventListener("click", ponerFicha)
);

// Inicializamos variables de los contadores
let segundos = 0;
let minutos = 0;
let inicioContadorRegresivo = 30;

// Array con el historico de jugador y CPU o de los dos jugadores en caso que sea 1vs1
const jugador1 = [0, 0, 0];
const jugador2 = [0, 0, 0];
const CPU = [0, 0, 0];

let modoAnterior = null;
// Función que será llamada cuando se pulse empezar partida
// Se encargará de iniciar la partida
function empezarPartida() {

    let modoJuego = modoJuegoElemento.value;
    if (modoJuego !== modoAnterior) {
        for (let i = 0; i < 3; i++) {
            jugador1[i] = 0;
            jugador2[i] = 0;
            CPU[i] = 0;
        }
    }
    modoAnterior = modoJuego;

    // Ahora la partida está empezada
    partidaEmpezada = true;
    // Reiniciamos contador de fichas
    xPuestas = 0;
    oPuestas = 0;
    fichasPuestas = 0;

    // Reiniciamos el tablero
    botones.forEach(
        x => x.innerHTML = ""
    );

    // Asignamos un turno
    turno = "X";

    // Iniciamos contadores de tiempo
    segundos = 0;
    minutos = 0;
    inicioContadorRegresivo = 30;
    tiempoJuego();
    contadorRegresivo();

    for (let i = 0; i < 9; i++) {
        document.getElementById("celda" + i).style.backgroundColor = "#363636";
    }

    if (modoJuego == 3) {
        document.getElementById("turno").innerHTML = "Turno de " + turno;
    } else {
        document.getElementById("turno").innerHTML = "";
    }

    historico();
    document.getElementById("indicar").innerHTML = "Partida en curso";
    document.getElementById("ganador").innerHTML = "";
}


// CONTADORES
// Contador que indicará el tiempo total del juego
function tiempoJuego() {

    const tiempoJuego = setInterval(()=>{
        
        if (segundos < 60) {


            if (segundos < 10) {

                let html = "Tiempo de juego:<br>0" + minutos + ":0" + segundos;
                document.getElementById("tiempoJuego").innerHTML = html;

            } else {

                let html = "Tiempo de juego:<br>0" + minutos + ":" + segundos;
                document.getElementById("tiempoJuego").innerHTML = html;
            }

            segundos++;

        } else {

            segundos = 0;
            minutos++;
            let html = "Tiempo de juego:<br>" + minutos + ":" + segundos;
            document.getElementById("tiempoJuego").innerHTML = html;

        }

        if (inicioContadorRegresivo == 0) {
            clearInterval(tiempoJuego);
        }

        if (!partidaEmpezada) {
            clearInterval(tiempoJuego);
        }


    }, 1000);
}

// Contador regresivo de 30 segundo para cada turno
function contadorRegresivo() {

    const contadorRegresivo = setInterval(()=>{

        let html = "Tiempo restante de jugada:<br>" + inicioContadorRegresivo + " segundos";
        document.getElementById("contadorRegresivo").innerHTML = html;
        inicioContadorRegresivo--;

        if (inicioContadorRegresivo == 0) {
            if (turno == "X") {

                document.getElementById("ganador").innerHTML = "Se acabó el tiempo. El jugador 1 ha perdido";

                jugador1[2]++;
                CPU[0]++;
                jugador2[0]++;

                document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";

            } else {

                document.getElementById("ganador").innerHTML = "Se acabó el tiempo. El jugador 2 ha perdido";
                jugador1[0]++;
                jugador2[2]++;

                document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            }

            partidaEmpezada = false;
            clearInterval(contadorRegresivo);
        }

        if (!partidaEmpezada) {
            clearInterval(contadorRegresivo);
        }

        historico();

    },1000);
}



// Función que es llamada al pulsar un botón del tablero
// Se encargará de poner la fichas correspondiente en el tablero
function ponerFicha() {

    // Variables con el modo y tipo de juego seleccionados para la partida
    const modoJuego = modoJuegoElemento.value;
    const tipoJuego = tipoJuegoElemento.value;

    // Solo si la partida está empezada podremos poner ficha
    if (partidaEmpezada) {

        // Variable donde guardaremos el botón que se a pulsado
        let botonPulsado = event.target;

        // Si el botón pulsado está vacio
        if(botonPulsado.innerHTML == "") {

            // Si el tipo de juego es de 6 fichas y tenemos menos de 6 fichas puestas
            // podremos poner ficha
            if (tipoJuego == 6 && fichasPuestas < 6) {

                // Si el modo de juego es el 1
                if (modoJuego == 1) {
                        
                    // Ponemos la ficha en el botón pulsado
                    botonPulsado.innerHTML = "X";
                    inicioContadorRegresivo = 30;

                    // Incrementamos contador de fichas
                    fichasPuestas++;
                    xPuestas++;
                    // Llamamos a la función aleatorio para colocar la ficha del ordenador
                    aleatorio(tipoJuego);

                // Si el modo de juego es el 2 será igual que el 1 pero cambiando la función que llamaremos
                } else if (modoJuego == 2) {

                    // Ponemos la ficha en el botón pulsado
                    botonPulsado.innerHTML = "X";
                    inicioContadorRegresivo = 30;


                    // Incrementamos contador de fichas
                    fichasPuestas++;
                    xPuestas++;
                    // Llamamos a la función ia que se encargará de colocar la ficha con "inteligencia artificial"
                    ia(tipoJuego);

                } else {

                    if (turno == "X") {

                        botonPulsado.innerHTML = "X";
                        turno = "O";
                        document.getElementById("turno").innerHTML = "Turno de " + turno;
                        fichasPuestas++;
                        xPuestas++;
                        inicioContadorRegresivo = 30;

                    } else {

                        botonPulsado.innerHTML = "O";
                        turno = "X";
                        document.getElementById("turno").innerHTML = "Turno de " + turno;
                        fichasPuestas++;
                        oPuestas++;
                        inicioContadorRegresivo = 30;
                    }
                }

            } else if (tipoJuego == 9 && fichasPuestas < 9) {

                // Si el modo de juego es el 1
                if (modoJuego == 1) {
                        
                    // Ponemos la ficha en el botón pulsado
                    botonPulsado.innerHTML = "X";
                    inicioContadorRegresivo = 30;

                    // Incrementamos contador de fichas
                    fichasPuestas++;
                    xPuestas++;

                    if (fichasPuestas < 9) {
                        // Llamamos a la función aleatorio para colocar la ficha del ordenador
                        aleatorio(tipoJuego);
                    }

                // Si el modo de juego es el 2 será igual que el 1 pero cambiando la función que llamaremos
                } else if (modoJuego == 2) {

                    // Ponemos la ficha en el botón pulsado
                    botonPulsado.innerHTML = "X";
                    inicioContadorRegresivo = 30;

                    // Incrementamos contador de fichas
                    fichasPuestas++;
                    xPuestas++;

                    if (fichasPuestas < 9) {
                        // Llamamos a la función ia para colocar la ficha del ordenador
                        ia(tipoJuego);
                    }

                } else {

                    if (turno == "X") {

                        botonPulsado.innerHTML = "X";
                        turno = "O";
                        document.getElementById("turno").innerHTML = "Turno de " + turno;
                        fichasPuestas++;
                        xPuestas++;
                        inicioContadorRegresivo = 30;

                    } else {

                        botonPulsado.innerHTML = "O";
                        turno = "X";
                        document.getElementById("turno").innerHTML = "Turno de " + turno;
                        fichasPuestas++;
                        oPuestas++;
                        inicioContadorRegresivo = 30;
                    }
                }

            } else {
                alert("Número de fichas excedido, mueve alguna ficha del tablero");
            }

            // Función que se va ejecutar cada vez que se ponga una ficha para comprobar si alguno a ganado
            ganar(modoJuego);

        // Si el botón pulsado no está vacío
        } else {

            // Llamamos a la función mover ficha, que quitará la ficha que hayamos pulsado, siempre y cuando el juego sea de 6 fichas
            if (tipoJuego == 6) {
                moverFicha(modoJuego);
            }
        }
    }
}

// Función que será llamada cuando sea el turno del ordenador en el modo de juego 1
function aleatorio(tipoJuego) {

    // Hacemos un map cogiendo la ficha que tiene cada botón a través de un innerHTML
    let valores = botones.map(x=>x.innerHTML);

    // Generamos número aleatorio para escoger un botón
    let n = Math.floor(Math.random() * (8 - 0 + 1)) + 0;

    // Hacemos bucle para generar de nuevo el número aleatorio
    // en caso de que el que se haya generado ya tenga una ficha puesta
    while (valores[n] != ""){
        n = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
    }

    // Ponemos la ficha en el botón que corresponda
    botones[n].innerHTML = "O";

    // Si el total de fichas es 6, hay que quitar una aleatoria y poner otra
    if (tipoJuego == 6 && oPuestas == 3) {

        // Bucle que busca un botón aleatorio que tenga la ficha O
        while (valores[n] != "O"){
            n = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
        }

        // Quitamos la ficha del botón indicado
        botones[n].innerHTML = "";
        // Decrementamos el contador de fichas
        fichasPuestas--;
        oPuestas--;

    }
    // Incrementamos contador de fichas
    fichasPuestas++;
    oPuestas++;
}


// Función que será llamada cuando sea el turno del ordenador en el modo de juego 2
function ia(tipoJuego) {

    // La primera ficha la colocara aleatoriamente
    if (fichasPuestas == 1) {

        aleatorio(6);

    } else {

        // Funciones que intentará bloquear al jugador comprobando las fichas del jugador
        // y si puede ganar hará una llamada a taparJugador pero en este caso con la ficha 0 para ganar
        if (!taparJugador("X") && !intentarGanar()) {
            // Si no puede bloquear al jugador ni ganar, coloca la ficha aleatoriamente
            aleatorio(tipoJuego);
        }

        // Si las fichas son 6 la IA deberá mover una ficha
        if (tipoJuego == 6 && oPuestas > 3) {
            
            // Hacemos un map cogiendo la ficha que tiene cada botón a través de un innerHTML
            let valores = botones.map(x=>x.innerHTML);
            // Generamos número aleatorio para escoger un botón
            let n = Math.floor(Math.random() * (8 - 0 + 1)) + 0;

            // Bucle que busca un botón aleatorio que tenga la ficha O
            while (valores[n] != "O"){
                n = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
            }

            // Quitamos la ficha del botón indicado
            botones[n].innerHTML = "";
            // Decrementamos el contador de fichas
            fichasPuestas--;
            oPuestas--;
        }
    }
}

// Función que intentará bloquear al jugador comprobando filas columnas y diagonales
function taparJugador(jugador) {

    // Hacemos un map cogiendo la ficha que tiene cada botón a través de un innerHTML
    let valores = botones.map(x=>x.innerHTML);

    // Comprobamos todas las filas y las columnas con un for
    for (let i = 0; i < 3; i++) {

        // Comprobación de filas
        if (valores[i * 3] == jugador && valores[i * 3 + 1] == jugador && valores[i * 3 + 2] == "") {
            botones[i * 3 + 2].innerHTML = "O";
            fichasPuestas++;
            oPuestas++;
            return true;

        }
        if (valores[i * 3] == jugador && valores[i * 3 + 1] == "" && valores[i * 3 + 2] == jugador) {
            botones[i * 3 + 1].innerHTML = "O";
            fichasPuestas++;
            oPuestas++;
            return true;

        }
        if (valores[i * 3] == "" && valores[i * 3 + 1] == jugador && valores[i * 3 + 2] == jugador) {
            botones[i * 3].innerHTML = "O";
            fichasPuestas++;
            oPuestas++;
            return true;
        }

        // Comprobación de columnas
        if (valores[i] == jugador && valores[i + 3] == jugador && valores[i + 6] == "") {
            botones[i + 6].innerHTML = "O";
            fichasPuestas++;
            oPuestas++;
            return true;
        }
        if (valores[i] == jugador && valores[i + 3] == "" && valores[i + 6] == jugador) {
            botones[i + 3].innerHTML = "O";
            fichasPuestas++;
            oPuestas++;
            return true;
        }
        if (valores[i] == "" && valores[i + 3] == jugador && valores[i + 6] == jugador) {
            botones[i].innerHTML = "O";
            fichasPuestas++;
            oPuestas++;
            return true;
        }
    }

    // Comprobación de diagonales
    if (valores[0] == jugador && valores[4] == jugador && valores[8] == "") {
        botones[8].innerHTML = "O";
        fichasPuestas++;
        oPuestas++;
        return true;
    }
    if (valores[0] == jugador && valores[4] == "" && valores[8] == jugador) {
        botones[4].innerHTML = "O";
        fichasPuestas++;
        oPuestas++;
        return true;
    }
    if (valores[0] == "" && valores[4] == jugador && valores[8] == jugador) {
        botones[0].innerHTML = "O";
        fichasPuestas++;
        oPuestas++;
        return true;
    }

    if (valores[2] == jugador && valores[4] == jugador && valores[6] == "") {
        botones[6].innerHTML = "O";
        fichasPuestas++;
        oPuestas++;
        return true;
    }
    if (valores[2] == jugador && valores[4] == "" && valores[6] == jugador) {
        botones[4].innerHTML = "O";
        fichasPuestas++;
        oPuestas++;
        return true;
    }
    if (valores[2] == "" && valores[4] == jugador && valores[6] == jugador) {
        botones[2].innerHTML = "O";
        fichasPuestas++;
        oPuestas++;
        return true;
    }

    if (fichasPuestas < 6) {return false;}
}

// Función que llamará a taparJugador con la ficha O para ganar
function intentarGanar() {
    return taparJugador("O");
}


// Función que será llamada para quitar la ficha que se haya pulsado
function moverFicha(modoJuego) {

    if (tipoJuegoElemento.value == 6) {
        // Variable donde guardaremos el botón pulsado
        let botonPulsado = event.target;

        // Hacemos un map cogiendo la ficha que tiene cada botón a través de un innerHTML
        let valores = botones.map(x=>x.innerHTML);

        // Si el modo de juego es el 1 o el 2 va ser igual
        if (modoJuego == 1 || modoJuego == 2) {

            // Si el botón que se a pulsado tiene la ficha X, entonces se puede quitar
            if (botonPulsado.innerHTML == "X") {

                // Quitamos la ficha
                botonPulsado.innerHTML = "";
                // Decrementamos contador de fichas
                fichasPuestas--;
                xPuestas--;

            }

        // Si el modo de juego es el 3 tenemos implementar también para quitar las fichas O
        } else {

            if (botonPulsado.innerHTML == "X" && turno == "X") {

                botonPulsado.innerHTML = "";
                fichasPuestas--;
                xPuestas--;

            } else if (botonPulsado.innerHTML == "O" && turno == "O") {

                botonPulsado.innerHTML = "";
                fichasPuestas--;
                oPuestas--;
            }
        }
    }
}


// Función que se encargará de comprobar si alguien a ganado, y si ha ganado, parar la partida y decir quien ha ganado
function ganar(modoJuego) {

    // Variable que nos dirá si alguien a ganado
    let ganar = false;

    // COMPROBACIÓN POR FILAS
    if (botones[0].innerHTML == "X" && botones[1].innerHTML == "X" && botones[2].innerHTML == "X") {

        // Terminamos la partida
        partidaEmpezada = false;
        document.getElementById("ganador").innerHTML = "¡ENHORABUENA!, ha ganado el jugador 1";

        // Ponemos color verde al fondo para destacar la fila que ha ganado
        document.getElementById("celda0").style.backgroundColor = "green";
        document.getElementById("celda1").style.backgroundColor = "green";
        document.getElementById("celda2").style.backgroundColor = "green";

        // Incrementamos los valores de la tabla historico respectivamente
        jugador1[0]++;
        if (modoJuego == 1 || modoJuego == 2) {
            CPU[2]++;
        } else {
            jugador2[2]++;
        }

        document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
        historico();
        ganar = true;
        return true;

    } else if (botones[3].innerHTML == "X" && botones[4].innerHTML == "X" && botones[5].innerHTML == "X") {

        // Terminamos la partida
        partidaEmpezada = false;
        document.getElementById("ganador").innerHTML = "¡ENHORABUENA!, ha ganado el jugador 1";

        // Ponemos color verde al fondo para destacar la fila que ha ganado
        document.getElementById("celda3").style.backgroundColor = "green";
        document.getElementById("celda4").style.backgroundColor = "green";
        document.getElementById("celda5").style.backgroundColor = "green";

        // Incrementamos los valores de la tabla historico respectivamente
        jugador1[0]++;
        if (modoJuego == 1 || modoJuego == 2) {
            CPU[2]++;
        } else {
            jugador2[2]++;
        }

        document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
        historico();
        ganar = true;
        return true;

    } else if (botones[6].innerHTML == "X" && botones[7].innerHTML == "X" && botones[8].innerHTML == "X") {

        // Terminamos la partida
        partidaEmpezada = false;
        document.getElementById("ganador").innerHTML = "¡ENHORABUENA!, ha ganado el jugador 1";

        // Ponemos color verde al fondo para destacar la fila que ha ganado
        document.getElementById("celda6").style.backgroundColor = "green";
        document.getElementById("celda7").style.backgroundColor = "green";
        document.getElementById("celda8").style.backgroundColor = "green";

        // Incrementamos los valores de la tabla historico respectivamente
        jugador1[0]++;
        if (modoJuego == 1 || modoJuego == 2) {
            CPU[2]++;
        } else {
            jugador2[2]++;
        }

        document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
        historico();
        ganar = true;
        return true;

    } else if (botones[0].innerHTML == "O" && botones[1].innerHTML == "O" && botones[2].innerHTML == "O") {

        // Condicional simplemente para cambiar el mensaje dependiendo de que modo de juego se haya jugado
        if (modoJuego == 1 || modoJuego == 2) {

            // Terminamos la partida
            partidaEmpezada = false;
            document.getElementById("ganador").innerHTML = "¡QUE PENA!, ha ganado la CPU";

            // Ponemos color verde al fondo para destacar la fila que ha ganado
            document.getElementById("celda0").style.backgroundColor = "red";
            document.getElementById("celda1").style.backgroundColor = "red";
            document.getElementById("celda2").style.backgroundColor = "red";

            // Incrementamos los valores de la tabla historico respectivamente
            CPU[0]++;
            jugador1[2]++;

            document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            historico();
            ganar = true;
            return true;

        } else {

            // Terminamos la partida
            partidaEmpezada = false;
            document.getElementById("ganador").innerHTML = "¡ENHORABUENA!, ha ganado el jugador 2";

            // Ponemos color verde al fondo para destacar la fila que ha ganado
            document.getElementById("celda0").style.backgroundColor = "green";
            document.getElementById("celda1").style.backgroundColor = "green";
            document.getElementById("celda2").style.backgroundColor = "green";

            // Incrementamos los valores de la tabla historico respectivamente
            jugador2[0]++;
            jugador1[2]++;

            document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            historico();
            ganar = true;
            return true;
        }

    } else if (botones[3].innerHTML == "O" && botones[4].innerHTML == "O" && botones[5].innerHTML == "O") {

        // Condicional simplemente para cambiar el mensaje dependiendo de que modo de juego se haya jugado
        if (modoJuego == 1 || modoJuego == 2) {

            // Terminamos la partida
            partidaEmpezada = false;
            document.getElementById("ganador").innerHTML = "¡QUE PENA!, ha ganado la CPU";

            // Ponemos color verde al fondo para destacar la fila que ha ganado
            document.getElementById("celda3").style.backgroundColor = "red";
            document.getElementById("celda4").style.backgroundColor = "red";
            document.getElementById("celda5").style.backgroundColor = "red";

            // Incrementamos los valores de la tabla historico respectivamente
            CPU[0]++;
            jugador1[2]++;

            document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            historico();
            ganar = true;
            return true;

        } else {

            // Terminamos la partida
            partidaEmpezada = false;
            document.getElementById("ganador").innerHTML = "¡ENHORABUENA!, ha ganado el jugador 2";

            // Ponemos color verde al fondo para destacar la fila que ha ganado
            document.getElementById("celda3").style.backgroundColor = "green";
            document.getElementById("celda4").style.backgroundColor = "green";
            document.getElementById("celda5").style.backgroundColor = "green";

            // Incrementamos los valores de la tabla historico respectivamente
            jugador2[0]++;
            jugador1[2]++;

            document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            historico();
            ganar = true;
            return true;
        }

    } else if (botones[6].innerHTML == "O" && botones[7].innerHTML == "O" && botones[8].innerHTML == "O") {

        // Condicional simplemente para cambiar el mensaje dependiendo de que modo de juego se haya jugado
        if (modoJuego == 1 || modoJuego == 2) {

            // Terminamos la partida
            partidaEmpezada = false;
            document.getElementById("ganador").innerHTML = "¡QUE PENA!, ha ganado la CPU";

            // Ponemos color verde al fondo para destacar la fila que ha ganado
            document.getElementById("celda6").style.backgroundColor = "red";
            document.getElementById("celda7").style.backgroundColor = "red";
            document.getElementById("celda8").style.backgroundColor = "red";

            // Incrementamos los valores de la tabla historico respectivamente
            CPU[0]++;
            jugador1[2]++;

            document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            historico();
            ganar = true;
            return true;

        } else {

            // Terminamos la partida
            partidaEmpezada = false;
            document.getElementById("ganador").innerHTML = "¡ENHORABUENA!, ha ganado el jugador 2";

            // Ponemos color verde al fondo para destacar la fila que ha ganado
            document.getElementById("celda6").style.backgroundColor = "green";
            document.getElementById("celda7").style.backgroundColor = "green";
            document.getElementById("celda8").style.backgroundColor = "green";

            // Incrementamos los valores de la tabla historico respectivamente
            jugador2[0]++;
            jugador1[2]++;

            document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            historico();
            ganar = true;
            return true;
        }

    }


    // COMPROBACIÓN POR COLUMNAS
    if (botones[0].innerHTML == "X" && botones[3].innerHTML == "X" && botones[6].innerHTML == "X") {

        // Terminamos la partida
        partidaEmpezada = false;
        document.getElementById("ganador").innerHTML = "¡ENHORABUENA!, ha ganado el jugador 1";

        // Ponemos color verde al fondo para destacar la columna que ha ganado
        document.getElementById("celda0").style.backgroundColor = "green";
        document.getElementById("celda3").style.backgroundColor = "green";
        document.getElementById("celda6").style.backgroundColor = "green";

        // Incrementamos los valores de la tabla historico respectivamente
        jugador1[0]++;
        if (modoJuego == 1 || modoJuego == 2) {
            CPU[2]++;
        } else {
            jugador2[2]++;
        }

        document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
        historico();
        ganar = true;
        return true;

    } else if (botones[1].innerHTML == "X" && botones[4].innerHTML == "X" && botones[7].innerHTML == "X") {

        // Terminamos la partida
        partidaEmpezada = false;
        document.getElementById("ganador").innerHTML = "¡ENHORABUENA!, ha ganado el jugador 1";

        // Ponemos color verde al fondo para destacar la fila que ha ganado
        document.getElementById("celda1").style.backgroundColor = "green";
        document.getElementById("celda4").style.backgroundColor = "green";
        document.getElementById("celda7").style.backgroundColor = "green";

        // Incrementamos los valores de la tabla historico respectivamente
        jugador1[0]++;
        if (modoJuego == 1 || modoJuego == 2) {
            CPU[2]++;
        } else {
            jugador2[2]++;
        }

        document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
        historico();
        ganar = true;
        return true;

    } else if (botones[2].innerHTML == "X" && botones[5].innerHTML == "X" && botones[8].innerHTML == "X") {

        // Terminamos la partida
        partidaEmpezada = false;
        document.getElementById("ganador").innerHTML = "¡ENHORABUENA!, ha ganado el jugador 1";

        // Ponemos color verde al fondo para destacar la fila que ha ganado
        document.getElementById("celda2").style.backgroundColor = "green";
        document.getElementById("celda5").style.backgroundColor = "green";
        document.getElementById("celda8").style.backgroundColor = "green";

        // Incrementamos los valores de la tabla historico respectivamente
        jugador1[0]++;
        if (modoJuego == 1 || modoJuego == 2) {
            CPU[2]++;
        } else {
            jugador2[2]++;
        }

        document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
        historico();
        ganar = true;
        return true;

    } else if (botones[0].innerHTML == "O" && botones[3].innerHTML == "O" && botones[6].innerHTML == "O") {

        // Condicional simplemente para cambiar el mensaje dependiendo de que modo de juego se haya jugado
        if (modoJuego == 1 || modoJuego == 2) {

            // Terminamos la partida
            partidaEmpezada = false;
            document.getElementById("ganador").innerHTML = "¡QUE PENA!, ha ganado la CPU";

            // Ponemos color verde al fondo para destacar la fila que ha ganado
            document.getElementById("celda0").style.backgroundColor = "red";
            document.getElementById("celda3").style.backgroundColor = "red";
            document.getElementById("celda6").style.backgroundColor = "red";

            // Incrementamos los valores de la tabla historico respectivamente
            CPU[0]++;
            jugador1[2]++;

            document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            historico();
            ganar = true;
            return true;

        } else {

            // Terminamos la partida
            partidaEmpezada = false;
            document.getElementById("ganador").innerHTML = "¡ENHORABUENA!, ha ganado el jugador 2";

            // Ponemos color verde al fondo para destacar la fila que ha ganado
            document.getElementById("celda0").style.backgroundColor = "green";
            document.getElementById("celda3").style.backgroundColor = "green";
            document.getElementById("celda6").style.backgroundColor = "green";

            // Incrementamos los valores de la tabla historico respectivamente
            jugador2[0]++;
            jugador1[2]++;

            document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            historico();
            ganar = true;
            return true;
        }

    } else if (botones[1].innerHTML == "O" && botones[4].innerHTML == "O" && botones[7].innerHTML == "O") {

        // Condicional simplemente para cambiar el mensaje dependiendo de que modo de juego se haya jugado
        if (modoJuego == 1 || modoJuego == 2) {

            // Terminamos la partida
            partidaEmpezada = false;
            document.getElementById("ganador").innerHTML = "¡QUE PENA!, ha ganado la CPU";

            // Ponemos color verde al fondo para destacar la fila que ha ganado
            document.getElementById("celda1").style.backgroundColor = "red";
            document.getElementById("celda4").style.backgroundColor = "red";
            document.getElementById("celda7").style.backgroundColor = "red";

            // Incrementamos los valores de la tabla historico respectivamente
            CPU[0]++;
            jugador1[2]++;

            document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            historico();
            ganar = true;
            return true;

        } else {

            // Terminamos la partida
            partidaEmpezada = false;
            document.getElementById("ganador").innerHTML = "¡ENHORABUENA!, ha ganado el jugador 2";

            // Ponemos color verde al fondo para destacar la fila que ha ganado
            document.getElementById("celda1").style.backgroundColor = "green";
            document.getElementById("celda4").style.backgroundColor = "green";
            document.getElementById("celda7").style.backgroundColor = "green";

            // Incrementamos los valores de la tabla historico respectivamente
            jugador2[0]++;
            jugador1[2]++;

            document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            historico();
            ganar = true;
            return true;
        }

    } else if (botones[2].innerHTML == "O" && botones[5].innerHTML == "O" && botones[8].innerHTML == "O") {

        // Condicional simplemente para cambiar el mensaje dependiendo de que modo de juego se haya jugado
        if (modoJuego == 1 || modoJuego == 2) {

            // Terminamos la partida
            partidaEmpezada = false;
            document.getElementById("ganador").innerHTML = "¡QUE PENA!, ha ganado la CPU";

            // Ponemos color verde al fondo para destacar la fila que ha ganado
            document.getElementById("celda2").style.backgroundColor = "red";
            document.getElementById("celda5").style.backgroundColor = "red";
            document.getElementById("celda8").style.backgroundColor = "red";

            // Incrementamos los valores de la tabla historico respectivamente
            CPU[0]++;
            jugador1[2]++;

            document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            historico();
            ganar = true;
            return true;

        } else {

            // Terminamos la partida
            partidaEmpezada = false;
            document.getElementById("ganador").innerHTML = "¡ENHORABUENA!, ha ganado el jugador 2";

            // Ponemos color verde al fondo para destacar la fila que ha ganado
            document.getElementById("celda2").style.backgroundColor = "green";
            document.getElementById("celda5").style.backgroundColor = "green";
            document.getElementById("celda8").style.backgroundColor = "green";

            // Incrementamos los valores de la tabla historico respectivamente
            jugador2[0]++;
            jugador1[2]++;

            document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            historico();
            ganar = true;
            return true;
        }
    }


    // COMPROBACIÓN POR DIAGONALES
    if (botones[0].innerHTML == "X" && botones[4].innerHTML == "X" && botones[8].innerHTML == "X") {

        // Terminamos la partida
        partidaEmpezada = false;
        document.getElementById("ganador").innerHTML = "¡ENHORABUENA!, ha ganado el jugador 1";

        // Ponemos color verde al fondo para destacar la fila que ha ganado
        document.getElementById("celda0").style.backgroundColor = "green";
        document.getElementById("celda4").style.backgroundColor = "green";
        document.getElementById("celda8").style.backgroundColor = "green";

        // Incrementamos los valores de la tabla historico respectivamente
        jugador1[0]++;
        if (modoJuego == 1 || modoJuego == 2) {
            CPU[2]++;
        } else {
            jugador2[2]++;
        }

        document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
        historico();
        ganar = true;
        return true;

    } else if (botones[0].innerHTML == "O" && botones[4].innerHTML == "O" && botones[8].innerHTML == "O") {

        // Condicional simplemente para cambiar el mensaje dependiendo de que modo de juego se haya jugado
        if (modoJuego == 1 || modoJuego == 2) {

            // Terminamos la partida
            partidaEmpezada = false;
            document.getElementById("ganador").innerHTML = "¡QUE PENA!, ha ganado la CPU";

            // Ponemos color verde al fondo para destacar la fila que ha ganado
            document.getElementById("celda0").style.backgroundColor = "red";
            document.getElementById("celda4").style.backgroundColor = "red";
            document.getElementById("celda8").style.backgroundColor = "red";

            // Incrementamos los valores de la tabla historico respectivamente
            CPU[0]++;
            jugador1[2]++;

            document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            historico();
            ganar = true;
            return true;

        } else {

            // Terminamos la partida
            partidaEmpezada = false;
            document.getElementById("ganador").innerHTML = "¡ENHORABUENA!, ha ganado el jugador 2";

            // Ponemos color verde al fondo para destacar la fila que ha ganado
            document.getElementById("celda0").style.backgroundColor = "green";
            document.getElementById("celda4").style.backgroundColor = "green";
            document.getElementById("celda8").style.backgroundColor = "green";

            // Incrementamos los valores de la tabla historico respectivamente
            jugador2[0]++;
            jugador1[2]++;

            document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            historico();
            ganar = true;
            return true;
        }

    } else if (botones[2].innerHTML == "X" && botones[4].innerHTML == "X" && botones[6].innerHTML == "X") {

        // Terminamos la partida
        partidaEmpezada = false;
        document.getElementById("ganador").innerHTML = "¡ENHORABUENA!, ha ganado el jugador 1";

        // Ponemos color verde al fondo para destacar la fila que ha ganado
        document.getElementById("celda2").style.backgroundColor = "green";
        document.getElementById("celda4").style.backgroundColor = "green";
        document.getElementById("celda6").style.backgroundColor = "green";

        // Incrementamos los valores de la tabla historico respectivamente
        jugador1[0]++;
        if (modoJuego == 1 || modoJuego == 2) {
            CPU[2]++;
        } else {
            jugador2[2]++;
        }

        document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
        historico();
        ganar = true;
        return true;

    } else if (botones[2].innerHTML == "O" && botones[4].innerHTML == "O" && botones[6].innerHTML == "O") {

        // Condicional simplemente para cambiar el mensaje dependiendo de que modo de juego se haya jugado
        if (modoJuego == 1 || modoJuego == 2) {

            // Terminamos la partida
            partidaEmpezada = false;
            document.getElementById("ganador").innerHTML = "¡QUE PENA!, ha ganado la CPU";

            // Ponemos color verde al fondo para destacar la fila que ha ganado
            document.getElementById("celda2").style.backgroundColor = "red";
            document.getElementById("celda4").style.backgroundColor = "red";
            document.getElementById("celda6").style.backgroundColor = "red";

            // Incrementamos los valores de la tabla historico respectivamente
            CPU[0]++;
            jugador1[2]++;

            document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            historico();
            ganar = true;
            return true;

        } else {

            // Terminamos la partida
            partidaEmpezada = false;
            document.getElementById("ganador").innerHTML = "¡ENHORABUENA!, ha ganado el jugador 2";

            // Ponemos color verde al fondo para destacar la fila que ha ganado
            document.getElementById("celda2").style.backgroundColor = "green";
            document.getElementById("celda4").style.backgroundColor = "green";
            document.getElementById("celda6").style.backgroundColor = "green";

            // Incrementamos los valores de la tabla historico respectivamente
            jugador2[0]++;
            jugador1[2]++;

            document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
            historico();
            ganar = true;
            return true;
        }

    }

    // Si nadie a ganado comprobaremos si el tablero esta lleno
    if (!ganar) {
        tableroLleno();
        return false;
    } else {
        document.getElementById("turno").innerHTML = "";
        document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
    }
}

function tableroLleno() {
    
    // if comprobando todos los botones que no esten vacios
    if (botones[0].innerHTML !== "" && botones[1].innerHTML !== "" && botones[2].innerHTML !== ""
    && botones[3].innerHTML !== "" && botones[4].innerHTML !== "" && botones[5].innerHTML !== ""
    && botones[6].innerHTML !== "" && botones[7].innerHTML !== "" && botones[8].innerHTML !== "") {

        partidaEmpezada = false;
        document.getElementById("ganador").innerHTML = "OOH!! Habéis empatado";

        // Incrementamos los valores de la tabla historico respectivamente
        if (modoJuegoElemento.value == 1 || modoJuegoElemento.value == 2) {
            jugador1[1]++
            CPU[1]++;
        } else {
            jugador1[1]++
            jugador2[1]++;
        }

        document.getElementById("indicar").innerHTML = "Indica el modo y el tipo de juego antes de empezar otra partida.";
        historico();
    }
}

function historico() {

    if (modoJuegoElemento.value == 1 || modoJuegoElemento.value == 2) {

        let html = "<tr><td colspan='3' class='jugador1'>Jugador</td><td colspan='3' class='cpu'>CPU</tr>";
        
        html += "<tr><td>Ganadas</td><td>Empatadas</td><td>Perdidas</td><td>Ganadas</td><td>Empatadas</td><td>Perdidas</td></tr>";

        html += "<tr><td>" + jugador1[0] + "</td><td>" + jugador1[1] + "</td><td>" + jugador1[2] + "</td><td>" + CPU[0] + "</td><td>" + CPU[1] + "</td><td>" + CPU[2] + "</td></tr>";

        document.getElementById("historico").innerHTML = html;

    } else {

        let html = "<tr><td colspan='3' class='jugador1'>Jugador 1</td><td colspan='3' class='jugador2'>Jugador 2</tr>";
        
        html += "<tr><td>Ganadas</td><td>Empatadas</td><td>Perdidas</td><td>Ganadas</td><td>Empatadas</td><td>Perdidas</td></tr>";

        html += "<tr><td>" + jugador1[0] + "</td><td>" + jugador1[1] + "</td><td>" + jugador1[2] + "</td><td>" + jugador2[0] + "</td><td>" + jugador2[1] + "</td><td>" + jugador2[2] + "</td></tr>";

        document.getElementById("historico").innerHTML = html;
    }
}