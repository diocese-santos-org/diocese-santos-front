import axios from 'axios';

import { Paroquia, ParoquiaType } from "@/api/types/ParoquiaTypes";
import { mockParoquias } from '@/api/mocks/paroquias';
import { mockParoquia } from '@/api/mocks/paroquia';

import { AvisoType } from "@/api/types/AvisoTypes";
import { mockAvisos } from '@/api/mocks/avisos';

import { EventoType } from "@/api/types/EventoTypes";
import { mockEventos } from '@/api/mocks/eventos';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        Authorization: 'Bearer ' + process.env.EXPO_PUBLIC_API_TOKEN
    }
});

export const getParoquias = async (
    latitude: number | null = null,
    longitude: number | null = null
): Promise<ParoquiaType[]> => {
    if (process.env.EXPO_PUBLIC_API_MOCK === 'true') {
        return mockParoquias;
    }

    const coordinates = {
        latitude: latitude || process.env.EXPO_PUBLIC_LATITUDE,
        longitude: longitude || process.env.EXPO_PUBLIC_LONGITUDE
    }

    let response;
    if (coordinates.latitude !== null && coordinates.longitude !== null) {
        response = await api.get<ParoquiaType[]>('paroquias/geo', {
            params: { ...coordinates }
        }).catch(error => console.log(
            'paroquias/geo[error]: ' +
            error
        ));
    }

    if (!response) {
        response = await api.get<ParoquiaType[]>('paroquias')
            .catch(error => console.log(
                'paroquias[error]: ' + error
            ));
    }

    return response?.data || [];
}

export const getParoquia = async (id: string = '1'): Promise<Paroquia> => {
    if (process.env.EXPO_PUBLIC_API_MOCK === 'true') {
        return mockParoquia;
    }

    const response = await api.get<Paroquia>(`paroquias/${id}`);

    return response?.data || [];
}

export const getAvisos = async (): Promise<AvisoType[]> => {
    if (process.env.EXPO_PUBLIC_API_MOCK === 'true') {
        return mockAvisos;
    }

    const response = await api.get<AvisoType[]>(`avisos`);

    return response?.data || [];
}

export const getEventos = async (): Promise<EventoType[]> => {
    if (process.env.EXPO_PUBLIC_API_MOCK === 'true') {
        return mockEventos;
    }

    const response = await api.get<EventoType[]>(`eventos`);

    return response?.data || [];
}