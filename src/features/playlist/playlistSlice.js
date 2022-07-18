import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const spotifyURL = "https://api.spotify.com/v1/"

const initialState = {
    loading: false,
    playlists: [],
    userList: [],
    error: ''
}

export const getFeaturedPlaylist = createAsyncThunk('playlist/getFeaturedPlaylist', () => {
    return axios
        .get(`${spotifyURL}browse/featured-playlists`, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("s_token") } })
        .then(response => {
            console.log(response.data);
            return response.data?.playlists.items
        })
})

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        initPlayList(state, action) {
            const list = [...action.payload];
            state.userList = list;
        },
        addToUserPlaylist(state, action) {
            const newList = [...state.userList, action.payload]
            state.userList = newList;
            //Yes, it should be somewhere else :P 
            localStorage.setItem('up', JSON.stringify(newList));

        },
        deleteFromUserPlaylist(state, action) {
            const newList = state.userList.filter((list) => list.id !== action.payload);
            state.userList = newList;
        },
    },
    extraReducers: builder => {
        builder.addCase(getFeaturedPlaylist.pending, state => {
            state.loading = true
        })
        builder.addCase(getFeaturedPlaylist.fulfilled, (state, action) => {
            state.loading = false
            state.playlists = action.payload
            state.error = ''
        })
        builder.addCase(getFeaturedPlaylist.rejected, (state, action) => {
            state.loading = false
            state.playlists = []
            state.error = action.error.message
        })
    }
})

export default playlistSlice.reducer
export const { addToUserPlaylist, deleteFromUserPlaylist, initPlayList } = playlistSlice.actions