import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  // aca se hacen inyeccionde de dependencies
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    
    try {
      // insersion
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;
    } catch (error) {
      this.handleException(error)
    }
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {
    
    let pokemon : Pokemon;

    // si esto es un numero
    if(!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ // findOne busca por el no
        no: term
      });
    }
    // mongo Id
    if( !pokemon && isValidObjectId(term) ) {
      pokemon = await this.pokemonModel.findById(term);
    }
    // Name, donde si hasta ahora no encontramos nada probamos con el name
    if(!pokemon) {
      pokemon = await this.pokemonModel.findOne({ // findOne busca por el nombre
        name: term.toLowerCase().trim() // pasamos a minusculas y sin espacios
      });
    }
    // en el caso de que pokemon vuelva vacio mostramos ese mensaje y al ejecutarse termina el metodo y se corta
    if(!pokemon) throw new NotFoundException(`Pokemon not found whith id, name or no ${term}`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    // reutilizamos el metodo de busqueda por termino asi no realizamos todas las validaciones otra vez, este es un objeto modelo que tiene todas las propiedaes de un modelo de mongoose nos ofrece
    const pokemon = await this.findOne(term)

    
    
    if(updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    // realizamos el update del pokemon encontrado y con el new true regresa el valor del nuevo objeto, sacamos el new true al crear una variable modificada manualmente
    try {
      await pokemon.updateOne(updatePokemonDto) // esto si ya existe el pk entonces cae al catch y le decimos cual es el error
      // pokemon es un objeto modelo en el cual tiene muchos elementos, tenemos que pasarlo a json para poder acceder a las propiedades que nos interesan

      // creamos un retorno con el una copia del updatePokemonDto con el pokemon que hicimos el update, ya que el pokemon no va a mostrar la actualización al retornarse solo
      // por lo tanto hay que modificarlo manualmente y devolverlo
      const pokemonUpdated = {...pokemon.toJSON(), ...updatePokemonDto}
      return pokemonUpdated;
    } catch (error) {
      this.handleException(error)
    }
  }

  async remove(id: string) {

    // buscamos que el element exist
    // y devovlemos el modulo de pokemon que contiene todos sus metodos
    // const pokemon = await this.findOne(id)
    // await pokemon.deleteOne();
    // return {id};

    // vamos a hacerlo con la validación del id del custom pipe para saber si es un mongo id, entonces si no es un mongo id el pipe detiene toda la ejecucuin y muestra un bad request

    // aca le vamos a pasar un id valido de mongo id
    // const result= await this.pokemonModel.findByIdAndDelete(id)
  
    // con el deleteOne es para un id valido y ademas lo buscamos
    const {deletedCount} = await this.pokemonModel.deleteOne({ _id : id });

    // si es igual a 0 entonces no borro nada no encontro nada
    if(deletedCount === 0) throw new NotFoundException(`Pokemon not found with id ${id}`);
    
    // aca regresamos un status 200
    return;
  }

  // creamos un metodo privado para mostrar el error de los catchs
  private handleException(error : any) {
    if(error.code === 11000) {
      throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check your server logs`)
  }
}
