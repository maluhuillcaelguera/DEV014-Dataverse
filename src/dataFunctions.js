// función "Filtrar POR RAZA"
export const filterData = (data, filterBy, value) => {
  let  resultadoFiltro = []
  resultadoFiltro = data.filter((element)=>{
    return element.facts[filterBy] === value
  })

  return resultadoFiltro
}

// función "Filtrar POR EDAD"
export const filterData2 = (data, filterBy, value) => {
  let  resultadoFiltro2 = []
  resultadoFiltro2 = data.filter((element)=>{

    if(value.split(' ').length === 2){ //si tiene dos valores 
      const edad = value.split(' ');
      return  element.facts[filterBy] >= edad[0] && element.facts[filterBy] <= edad[1] //rango de edad
    }if(value === '100'){
      return element.facts[filterBy] <= value 
    }if(value === '2000'){
      return element.facts[filterBy] >= value && element.facts[filterBy] <= 4000
    }if(value === 'Desconocida'){
      return element.facts[filterBy] === value 
    }
  })

  return resultadoFiltro2
}

//Lógica para la FUNCION "ORDENAR"
export const sortData = (data, sortBy, sortOrder) => {
  // Si es orden descendente (A - Z)
  if (sortOrder === 'asc') {

    return data.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) { // Compara los objetos 'a' y 'b'
        return -1; // Retorna -1 si 'a' esta antes que 'b'
      }
      if (a[sortBy] > b[sortBy]) { 
        return 1; // Retorna 1 si 'a' esta después que 'b'
      }
      return 0; // Retorna 0 si los elementos son iguales
    });
  }
  
  // Si es orden descendente (Z - A)
  if (sortOrder === 'desc') {
    return data.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) { 
        return 1; // Retorna 1 si 'a' esta antes que 'b' (inverso para orden descendente)
      }
      if (a[sortBy] > b[sortBy]) { 
        return -1; // Retorna -1 si 'a' debe estar después que 'b' (inverso para orden descendente)
      }
      return 0; // Retorna 0 si son iguales
    });
  }
}


//Lógica para la FUNCION CALCULO PROMEDIO DE LAS EDADES

export const computeStats = (data) => {
//guardamos los datos de los elementos con edad conocidad
  const personasConEdadConocida = data.filter(persona => typeof persona.facts.age === 'number');
  // Si no hay personas con edad conocida, retornar 0
  if (personasConEdadConocida.length === 0) return 0;
  
  const edades = personasConEdadConocida.map(persona => persona.facts.age);//extraemos las eedades

  const totalEdad = edades.reduce((acumulador, edad) => {
    return acumulador + edad;
  }, 0);

  return Math.floor(totalEdad / personasConEdadConocida.length);
}