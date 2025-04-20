import { httpClient } from "../config/AxiosHelper"

export const createRoom = async (roomDetails) => {
    const response = await httpClient.post(`/api/v1/rooms/create`, roomDetails, {
        headers: {
            "Content-Type" : "application/json",
        }
    });
    return response;
};

export const joinRoomChat = async (roomId) => {
    const response = await httpClient.get(`api/v1/rooms/${roomId}`);
    return response.data;
}

export const loadMessages = async (roomId) => {
    const response = await httpClient.get(`/api/v1/rooms/${roomId}/messages`);
    return response.data;
}