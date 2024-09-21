export const metodos = {
  
  listaNumeros: [],

  mensaje() {
    return 'hola mundo';

  },
  mensaje2(paso) {
    return {
      name : paso ? 'Viaje hoy' : 'Viaje mañana',
      style: paso ? 'orange' : 'brown'
    };
  },
  mensaje3(){
    return capitalizarPalabras("Aprendiendo vuejs");
  },
  lectura(ABS){
    console.log(ABS);
  },
  arrayCal() {
    return ['1','2','3','4','5','6','7','8','9','0','+','-','*','/','='];
  },
  arrayFrutasP() {
    return [
      {
        name: "MANZANA",
        Price: "$1.00",
        description: "Una manzana",
        stock: 20,
      },
      {
        name: "PERA",
        Price: "$2.00",
        description: "Una pera",
        stock: 15,
      },
      {
        name: "NARANJA",
        Price: "$12.00",
        description: "Una naranja",
        stock: 12,
      },
    ];
  },
  calculo(valor, texto) {
    switch (texto) {
      case "suma":
        return (valor+1);
      case "resta":
        return (valor-1);
      case "add":
        if (!this.listaNumeros.includes(valor)) {
          this.listaNumeros.push(valor);
        }
        return valor;
      default:
        return (0);
    }
  },
  calculadora(Total, subTotal, signo, texto) {

    switch (texto) {
      case '+':
        return operacion(Total, subTotal, signo, texto);

      case '-':
        return operacion(Total, subTotal, signo, texto);

      case '*':
        return operacion(Total, subTotal, signo, texto);

      case '/':
        return operacion(Total, subTotal, signo, texto);

      case '=':
        if (Total != 0 && subTotal != 0) {
          // const valor = eval(Total+signo+subTotal);
          return { 
            Total: 0, 
            subTotal: parseInt(eval(Total+signo+subTotal)),
            signo: texto };
        }

        else {
          return { 
          Total: Total,
          subTotal: subTotal,
          signo: signo };
        }

      case 'C':
        return {
          Total: Total,
          subTotal: UNumero(subTotal),
          signo: signo
        };

      case 'CE':
        return {
          Total: 0,
          subTotal: 0,
          signo: ''
        };
      
      default:
        if (signo == "="){
          return { 
            Total: Total, 
            subTotal: parseInt(texto),
            signo: '' };
        }
        else {
          return { 
            Total: Total, 
            subTotal: parseInt(subTotal+texto),
            signo: signo };
        }
    }
  },
  Post: [
    {
      title: "Post 1",
      id: 1,
      body: "Ecrito por AI",
      color: "orange"
    },
    {
      title: "Post 2",
      id: 2,
      body: "Ecrito por Humano",
      color: "blue"
    },
    {
      title: "Post 3",
      id: 3,
      body: "Ecrito por Niño",
      color: "brown"
    },
    {
      title: "Post 4",
      id: 4,
      body: "Ecrito por Niña",
      color: "green"
    },
    {
      title: "Post 5",
      id: 5,
      body: "Ecrito por Mujer",
      color: "purple"
    }
  ]
};

function capitalizarPalabras(texto) {
  return texto.replace(/\b\w/g, function(l) {
    return l.toUpperCase();
  });
}

function salida(){
  console.log("hola a todos");
}

function entrada(){
  console.log("como estan todos");
}

function operacion(Total, subTotal, signo, texto) {
  if (Total == 0) {
    return { 
      Total: subTotal,
      subTotal: 0,
      signo: texto };
  }
  else if(subTotal != 0){
    return { 
      Total: eval(Total+signo+subTotal),
      subTotal: 0,
      signo: signo };
  }
  else{
    return { 
      Total: Total, 
      subTotal: subTotal,
      signo: texto };
  }
}

function UNumero(numero) {
  return numero < 10 ? 0 : parseInt(numero.toString().slice(0, -1));
}

export const prueba = {
  lectura(texto) {
    console.log(texto);
  },
  calcular(lista1, lista2) {
    // console.log(lista1);
    // lista2.forEach(function(numero) {
    //   // console.log(numero);
      // while(true) {
    //     const delt = lista1.shift();
    //     if(numero != delt) {
    //       lista1.push(delt);
    //       break;
    //     }
    //   }
    // });
    // lista1 = lista1.filter(numero => !lista2.includes(numero));
    // lista1 = 

    // console.log(lista1)
    return filtrarNumeros(lista1, lista2);
  }
}

function filtrarNumeros(listaCompleta, listaImpares) {
    const setImpares = new Set(listaImpares);
    return listaCompleta.filter(numero => !setImpares.has(numero));
}

import axios from 'axios';

export const Pokedest = {

  async Pokeboll(texto) {
    try{
      return (await axios.get(texto)).data;
    } catch(er){
      return null;
    }
  },
  lectura() {
    console.log('hola mundo');
  }
}