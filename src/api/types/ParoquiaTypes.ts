export interface ParoquiaType {
    paroquia: Paroquia;
    distancia: number;
}

export interface Paroquia {
    id: number;
    nome: string;
    endereco: Endereco;
    telefone: string;
    email: string;
    secretaria: string;
    urlSite: string;
    missas: Missas;
    redesSociais: RedesSociais;
    cleros: Clero[];
}

interface Clero {
    id: number;
    nome: string;
    urlSite: string;
}

interface RedesSociais {
    id: number;
    facebook: string;
    instagram: string;
    youtube: string;
}

interface Missas {
    id: number;
    segunda: string;
    terca: string;
    quarta: string;
    quinta: string;
    sexta: string;
    sabado: string;
    domingo: string;
}

interface Endereco {
    id: number;
    enderecoCompleto: string;
    cidade: string;
    estado: string;
    cep: string;
    latitude: number;
    longitude: number;
}