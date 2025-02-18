import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  //DEVUELVE TODAS LAS PELICULAS DEL ARCHIVOS JSON 
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("pelis.json").then((data) => {
      return data; // Devuelve directamente el contenido del archivo
    });
  }

  //METODO PARA BUSCAR LAS PELICULAS 
  async search(options: { title?: string; tag?: string }): Promise<Peli[]> { 
    const lista = await this.getAll(); // Obtiene todas las películas
  
    const listaFiltrada = lista.filter((p) => {
      let esteVa = false; // Variable para determinar si la película pasa el filtro
  
      if (options.tag) {
        esteVa = p.tags.includes(options.tag);// Verifica si el tag está en la lista de tags de la película
      }
  
      if (options.title) {
        esteVa = esteVa || p.title.includes(options.title);// Verifica si el title contiene el string
      }
  
      return esteVa; // Devuelve true si pasa alguna de las condiciones
    });
  
    return listaFiltrada; // Devuelve la lista filtrada
  }
  

  //AGREGA UNA NUEVA PELICULAS
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false; // Si ya existe, devuelve false
      } else {
        return this.getAll().then((peliculas) => {
          //nueva película al array
          peliculas.push(peli); // Aquí agregas la nueva película

          // Escribe el array actualizado en el archivo
          return jsonfile.writeFile("./pelis.json", peliculas).then(() => {
            return true; // Da true si se guardó correctamente
          });
        });
      }
    });

    return promesaUno; // Devuelve la promesa
  }

//Devuelve la peli con el id que se le pase por parámetro.
  getById(id: number): Promise<Peli> {
    return this.getAll().then((peliculas) => {
      return peliculas.find((peli) => peli.id === id) || null; 
    });
  }
}



export { PelisCollection, Peli };
