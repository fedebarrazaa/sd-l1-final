import { PelisCollection, Peli } from "./models";

class PelisController {
  model: PelisCollection;
  constructor() {
    this.model = new PelisCollection(); 
  }

  
  async get(options) {
    try {
      console.log("Interacciona con data");
      const resultado = await this.model.getAll();
      console.log(resultado);

      // Condicionales 
      if (options.id) { // Buscar por id
        const peli = resultado.find(p => p.id === options.id);
        return peli ? [peli] : []; 
      } else if (options.search) { // Verificar si hay búsqueda
        let pelisFiltradas = resultado;
        if (options.search.title) { // Buscar por title
          pelisFiltradas = pelisFiltradas.filter(p => p.title.includes(options.search.title));
        } if (options.search.tag) { // Buscar por tag
          pelisFiltradas = pelisFiltradas.filter(p => p.tags.includes(options.search.tag)); 
        } return pelisFiltradas; // Devuelve las películas filtradas
      } else {
        return resultado; // Devuelve todas las películas 
      }
    } catch (error) {
      console.log("hubo un error!", error);
      return [];
    }
  }

  /* Método getOne */
  async getOne(options: Options): Promise<Peli | undefined> { 
    const resultados = await this.get(options); // Llama al método get
    return resultados[0]; // Devuelve el primer resultado
  }
 
  /*ultimo metodo*/
  
 async add(peli:Peli):Promise<boolean> {
  const resultado = await this.model.add(peli); //llama al metodo add
  return resultado //devuelve el resultado
  }
  
}
type  Options = {
    id?: number;
    search?: {
      title?: string;
      tag?: string;
    };
  }

export { PelisController };
