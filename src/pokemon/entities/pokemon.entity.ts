import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// extendemos de mongoose para que se le añada todas las funcionalidades respectivas de mongoose
@Schema()
export class Pokemon extends Document{

    // el id ya mongo lo proporciona

    @Prop({
        unique: true,
        index: true, // el indice sabe donde esta el elemnto que esta buscando
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;

}

// vamos a importar el schema es basicamente lo que le va a decir cuando se inicie la bd las reglas condiciones etc
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);

