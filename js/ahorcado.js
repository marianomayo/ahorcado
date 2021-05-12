document.addEventListener('DOMContentLoaded', function () {

  const listaPalabras = ['caballo', 'oveja', 'cerdo', 'chimpance', 'terremoto', 'manzana', 'comida', 'perdiste', 'salamandra', 'tostadora'];
  let palabraAdivinar = [];
  let palabraMostrar = [];
  let historialLetrasUsuario = [];
  let numIntentos = 5;
  let suma = 0;
  let nodoLetra = document.querySelector('#letra');
  let nodoBoton = document.querySelector('#boton');
  let nodoResultado = document.querySelector('#resultado');
  let nodoIntentos = document.querySelector('#intentos');
  let nodoHistorial = document.querySelector('#historial');
  let imagen = document.getElementById("imagen");
  let respuesta = document.getElementById("response");
  
  function prepararJuego () {
      let posAleatoriaListaPalabras = Math.floor(Math.random()*listaPalabras.length);
      console.log(posAleatoriaListaPalabras);
      let palabraAleatoria = listaPalabras[posAleatoriaListaPalabras];
   
      palabraAdivinar = palabraAleatoria.split('');

      for (let letra of palabraAdivinar) {
          palabraMostrar.push('_');
      }
     
      dibujarJuego();
  }

  
  function dibujarJuego () {

      nodoResultado.textContent = palabraMostrar.join(' ');

      nodoIntentos.textContent = numIntentos;
  
      nodoHistorial.textContent = historialLetrasUsuario.join(' ');
  }


  function comprobarLetraUsuario () {
      
      let letraUsuario = nodoLetra.value;
      
      nodoLetra.value = '';
      
      nodoLetra.focus();
      // Recorremos todas las letras para saber si alguna esta bien
      for (const [posicion, letraAdivinar] of palabraAdivinar.entries()) {
          // Comprobamos si la letra del usuario es igual a la letra a adivinar
          if (letraUsuario == letraAdivinar) {
              // Sustituimos el guion por la letra acertada
              palabraMostrar[posicion] = letraAdivinar;
          }
      }
   
      if (!palabraAdivinar.includes(letraUsuario)) {
        //se resta un intento y se suma para modificar imagen
        numIntentos -= 1;
        suma++;
        imagen.src = "img/imagen"+suma+".jpg";
          // Guardamos en el historial la letra pulsada por el usuario
        historialLetrasUsuario.push(letraUsuario);
      }
      //// 3 Comprobamos si hay que terminar el juego
      acabarJuego();
      //// 4 Mostramos los cambios
      dibujarJuego();
  }


  function comprobarPulsadoEnter (evento) {
      if (evento.code == 'Enter') {
          comprobarLetraUsuario();
      }
  }

  /**
   * Método que verifica si se ha acabado el juego
   */
  function acabarJuego () {
      let footer = document.getElementById("button");
      if (!palabraMostrar.includes('_')) {
         respuesta.innerHTML="Ganaste";
         respuesta.classList.add("ganaste");
         let boton = document.createElement("button");
         boton.innerHTML = "Volver a jugar";
         boton.addEventListener("click", ()=> jugarDeNuevo())
         footer.appendChild(boton);
      }
      // Ha perdido: ¿Tiene 0 intentos?
      if (numIntentos == 0) {
        respuesta.innerHTML="Perdiste!! La palabra era: " + palabraAdivinar.join('');
        let boton = document.createElement("button");
        boton.innerHTML = "Volver a jugar";
        respuesta.classList.add("perdiste");
        boton.addEventListener("click", ()=> jugarDeNuevo())
        footer.appendChild(boton);
        imagen.classList.add("ocultar");
      }
  }

  function jugarDeNuevo(){
      location.reload(true);
  }
  nodoBoton.addEventListener('click', comprobarLetraUsuario);
  nodoLetra.addEventListener('keyup', comprobarPulsadoEnter);
  
  

  prepararJuego(); 
});