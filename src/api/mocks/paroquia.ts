import { Paroquia } from "@/api/types/ParoquiaTypes";

export const mockParoquia: Paroquia = {
    "id": 5,
    "nome": "PARÓQUIA JESUS CRUCIFICADO",
    "endereco": {
        "id": 5,
        "enderecoCompleto": "Av. Rangel Pestana, 397, Jabaquara",
        "cidade": "Santos",
        "estado": "São Paulo",
        "cep": "11013-553",
        "latitude": -23.942083,
        "longitude": -46.339401
    },
    "telefone": "(13)3223-2338",
    "email": "parjesus@uol.com.br",
    "secretaria": "Terça-Feira a Sábado: 14h30 às 18h30",
    "urlSite": "NULL",
    "missas": {
        "id": 5,
        "segunda": "NULL",
        "terca": "18h30",
        "quarta": "NULL",
        "quinta": "NULL",
        "sexta": "NULL",
        "sabado": "18h30",
        "domingo": "8h e 18h30"
    },
    "redesSociais": {
        "id": 5,
        "facebook": "https://www.facebook.com/parjesuscrucificado",
        "instagram": "NULL",
        "youtube": "NULL"
    },
    "cleros": [
        {
            "id": 11,
            "nome": "Padre Dr. Caetano Rizzi - Pároco",
            "urlSite": "NULL"
        },
        {
            "id": 12,
            "nome": "Diácono Fabiano Piqui Souza",
            "urlSite": "NULL"
        }
    ],
}