import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {

    // realizamos la consulta a la api, regresamos la data y la retornamos
    // le colocamos el generico que declaramos con Paste JSON as code y con eso tenemos acceso a las propiedades de la data response de axios
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')

    // podemos recorrer el result que es un arreglo y destructurar el name y url
    data.results.forEach(({name, url}) => {
      
      // tenemos el name y url, vamos a utilizar la url para saber el numero no
      const segments = url.split('/');

      // obtenemos el numero no de la penultima posicion del segmento de la url separada por /
      const no = parseInt(segments[segments.length - 2]);

      console.log({name, no});
    })

    return data.results;
  }
}
