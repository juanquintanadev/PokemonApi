// si axios cambia entonces lo hacemos desde aca

import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";

@Injectable() // para poder injectarlo en nuestro servicio de seeding
export class AxiosAdapter implements HttpAdapter { // implements HttpAdapter

    private axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {// basicamente es una peticion como la que teniamos en el servicio de seeding
            const {data} = await this.axios.get<T>(url); // la data es de tipo T generico
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

}