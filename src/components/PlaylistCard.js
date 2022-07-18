import { useDrag } from 'react-dnd';

const PlaylistCard = ({ playlist, onRemove }) => {
    const { name, images, description } = playlist
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "box",
        item: { ...playlist },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));
    return <div ref={drag} className="card playlist"
        style={{
            border: isDragging ? '2px dashed grey' : null
        }}>
        <img src={images[0].url} alt="playlist" />
        <div className="card playlist-info">
            <h3>{name}</h3>
            <span>{description}</span>
        </div>
        {onRemove && <div className="action">
            <button onClick={onRemove} className="btn delete">❌</button>
        </div>}
    </div>
}

export default PlaylistCard