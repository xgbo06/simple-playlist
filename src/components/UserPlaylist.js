import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux'
import { addToUserPlaylist, deleteFromUserPlaylist } from "../features/playlist/playlistSlice"
import PlaylistCard from './PlaylistCard';


const UserPlaylist = ({ playlist }) => {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.playlist?.userList)
    const deleteFromList = (id) => {
        dispatch(deleteFromUserPlaylist(id))
    }
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "box",
        drop: (item) => {
            if (userList) {
                const found = userList.find(list => list.id === item?.id)
                if (!found) {
                    dispatch(addToUserPlaylist(item))
                }
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    const isActive = canDrop && isOver;
    let backgroundColor = '#fff';
    if (isActive) {
        backgroundColor = '#3333ff';
    }
    else if (canDrop) {
        backgroundColor = '#9999ff';
    }
    return <div ref={drop} role={'UserList'} className='user-playlist-drop' style={{
        backgroundColor
    }}>
        {playlist.length > 0 ? (playlist.map(list => <div key={list.id}>
            <PlaylistCard playlist={list} onRemove={() => deleteFromList(list.id)} />
        </div>)) :
            <div className='empty'>
                <span>Drag a playlist from Featured Playlist to add to list :D </span>
            </div>
        }
    </div>;
};


export default UserPlaylist