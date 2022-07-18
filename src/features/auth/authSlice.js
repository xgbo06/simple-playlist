import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const initialState = {
    loading: false,
    token: '',
    error: ''
}

//This is just for demo or you might not login with your spotify account
export const getAuthToken = createAsyncThunk('auth/getToken', () => {
    return axios
        .post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET)
            }
        })
        .then(response => {
            //Okay for now its not in cookie its in local-storage and here it is
            localStorage.setItem('s_token', response.data?.access_token)
            return response.data?.access_token
        })
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAuthToken.pending, state => {
            state.loading = true
        })
        builder.addCase(getAuthToken.fulfilled, (state, action) => {
            state.loading = false
            state.token = action.payload
            state.error = ''
        })
        builder.addCase(getAuthToken.rejected, (state, action) => {
            state.loading = false
            state.token = ''
            state.error = action.error.message
        })
    }
})

export default authSlice.reducer