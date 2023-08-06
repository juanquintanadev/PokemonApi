// vamos a tener una definicion de una clase adaptadora en esta clase http adapter para implementarla en cualquier otro servicio

// toda clase que implemente esta clase va a tener que tener un get
export interface HttpAdapter {

    // recibe una url y esto resuelve una promesa
    get<T>(url: string): Promise<T>;
}