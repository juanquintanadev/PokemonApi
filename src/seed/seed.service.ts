import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// importamos el adapter, el modulo nos da acceso a esto
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  
  
  constructor (
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ){}

  async executeSeed() {

    await this.pokemonModel.deleteMany({})

    // realizamos la consulta a la api, regresamos la data y la retornamos
    // le colocamos el generico que declaramos con Paste JSON as code y con eso tenemos acceso a las propiedades de la data response de axios
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    const insertPokemons: {name: string, no: number}[] = [];

    // podemos recorrer el result que es un arreglo y destructurar el name y url
    data.results.forEach(({name, url}) => {
      
      // tenemos el name y url, vamos a utilizar la url para saber el numero no
      const segments = url.split('/');

      // obtenemos el numero no de la penultima posicion del segmento de la url separada por /
      const no = parseInt(segments[segments.length - 2]);

      // const pokemon = await this.pokemonModel.create({name, no});

      // cargamos el arreglo de promesas para ejecutarlas todas juntas
      insertPokemons.push({name, no});

    })

    // ejecutamos todas las promesas y no tenemos que hacer tantas consultas a la bd
    // await Promise.all(promisesArray)

    // la manera mas optima es insertar con insertMany
    await this.pokemonModel.insertMany(insertPokemons)

    return 'Seed Executed';
  }
}

