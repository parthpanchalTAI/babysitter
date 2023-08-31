import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseUrl } from "./apiEndPoints";
import { useSelector } from "react-redux";

const setHeaders = (token) => ({
    "Accept": "application/json",
    "Content-Type": "multipart/form-data",
    'custom-token': token || ''
});

const handleApiResponse = (response, disableMessage, dispatch) => {
    if (!disableMessage) {
        if (response?.status === 'Success') {
            console.log('Success', response?.message);
        } else {
            console.log('Failed', JSON.stringify(response?.message));
        }
    }
    return response;
}

export const ApiPostRequest = ({ key, endPoints, disableMessage, successCallBack }) => {
    console.log('key', key);
    console.log('end points', endPoints);
    return createAsyncThunk(
        `${key || endPoints}`,
        async ({ data }, { dispatch }) => {
            const { token } = useSelector((state) => state?.whiteLists);
            const meta = {
                endPoints: endPoints,
                params: data
            };

            console.log('token --->', token);
            console.log('Api request ->', JSON.stringify(meta));

            try {
                const parsedResponse = await fetch(`${BaseUrl}${endPoints}`, {
                    method: 'POST',
                    headers: setHeaders(token),
                    body: data
                });

                let response = await parsedResponse.json();
                console.log('response', response);
                handleApiResponse(response, disableMessage, dispatch);
                return successCallBack && successCallBack(response) || response;
            } catch (error) {
                console.log('error from api =>', JSON.parse(error));
                return error;
            }
        }
    );
};

export const ApiGetRequest = ({ key, endPoints, disableMessage = true, successCallBack }) => {
    return createAsyncThunk(
        `${key || endPoints}`,
        async ({ data }, { dispatch }) => {
            const { token } = useSelector((state) => state.whiteLists);
            let url = data ? `${endPoints}${data}` : endPoints;

            console.log('Get Request Url ===>', url);
            console.log('user token ===>', token);

            try {
                const parsedResponse = await fetch(`${BaseUrl}${url}`, {
                    method: 'GET',
                    headers: setHeaders(token),
                });

                let response = await parsedResponse.json();
                console.log('response -->', response);
                handleApiResponse(response, disableMessage, dispatch);
                return successCallBack && successCallBack(response) || response;
            } catch (error) {
                console.log('error from api ==>', JSON.stringify(error));
            }
        }
    );
};