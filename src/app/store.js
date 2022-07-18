import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import playlistSlice from "../features/playlist/playlistSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        playlist: playlistSlice
    }
})

export default store