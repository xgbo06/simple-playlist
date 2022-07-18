import { useEffect, useState } from "react"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector, useDispatch } from 'react-redux'
import { getAuthToken } from "./features/auth/authSlice";
import { getFeaturedPlaylist, initPlayList } from "./features/playlist/playlistSlice";
import PlaylistCard from "./components/PlaylistCard"
import UserPlaylist from "./components/UserPlaylist";
import Loader from "./components/Loader"
import './App.css';

function App() {
  const auth = useSelector((state) => state.auth);
  const playlist = useSelector((state) => state.playlist)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthToken());
    const savedList = localStorage.getItem("up");
    if (savedList) {
      try {
        const list = JSON.parse(savedList);
        dispatch(initPlayList(list))
      } catch (error) {
        console.error(error);
      }
    }
  }, [])

  useEffect(() => {
    if (auth?.token) {
      dispatch(getFeaturedPlaylist())
    }
  }, [auth?.token])

  const [featuredPlaylist, setFeaturedPlaylist] = useState([]);
  const [userPlaylist, setUserPlaylist] = useState([]);

  useEffect(() => {
    console.log(playlist);
    if (playlist?.playlists) {
      setFeaturedPlaylist(playlist?.playlists)
    }
  }, [playlist?.playlists])

  useEffect(() => {
    console.log(playlist);
    if (playlist?.userList) {

      setUserPlaylist(playlist?.userList)
    }
  }, [playlist?.userList])

  return (
    <div className="app">
      <DndProvider backend={HTML5Backend}>
        {auth.loading ? <div className="full-page"><Loader /></div> :
          <>
            <div className='pane featured-playlist'>
              <div className="playlist-container">
                <h2 className="title">Featured Playlist</h2>
                {playlist.loading ?
                  <Loader /> :
                  <>
                    {featuredPlaylist.map((playlist) => {
                      return <PlaylistCard playlist={playlist} key={playlist.id} />
                    })}
                  </>
                }
              </div>
            </div>
            <div className='pane user-playlist'>
              <div className="playlist-container">
                <h2 className="title">Yours Playlist</h2>
                <UserPlaylist playlist={userPlaylist} />
              </div>
            </div>
          </>}
      </DndProvider>
    </div>
  );
}

export default App;
