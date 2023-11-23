import { ParoquiaType } from "@/api/types/ParoquiaTypes";
import { mockParoquias } from "@/api/mocks/paroquias";

import { AvisoType } from "@/api/types/AvisoTypes";
import { mockAvisos } from "@/api/mocks/avisos";

import { EventoType } from "@/api/types/EventoTypes";
import { mockEventos } from "@/api/mocks/eventos";

const urlBase = process.env.EXPO_PUBLIC_API_URL || '';

export const getParoquias = async (latitude: number | null = null, longitude: number | null = null): Promise<ParoquiaType[]> => {
    if (!!process.env.EXPO_PUBLIC_API_MOCK) {
        return mockParoquias;
    }

    const coordinates = {
        latitude: latitude || process.env.EXPO_PUBLIC_LATITUDE || -23.938525,
        longitude: longitude || process.env.EXPO_PUBLIC_LONGITUDE || -46.418176
    }

    const response = await fetch(`${urlBase}/paroquia?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`);
    const data = await response.json();

    return data;
}

export const getParoquia = async (id: string = '1') => {
    if (!!process.env.EXPO_PUBLIC_API_MOCK) {
        return mockParoquias[0];
    }

    const response = await fetch(`${urlBase}/paroquia/${id}`);

    return await response.json();
}

export const getAvisos = async (): Promise<AvisoType[]> => {
    if (!!process.env.EXPO_PUBLIC_API_MOCK) {
        return mockAvisos;
    }

    return new Promise(() => {
        return [];
    });
}

export const getEventos = async (): Promise<EventoType[]> => {
    if (!!process.env.EXPO_PUBLIC_API_MOCK) {
        return mockEventos;
    }

    return new Promise(() => {
        return [];
    });
}