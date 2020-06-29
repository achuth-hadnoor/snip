// Packages
import { SortableContainer } from "react-sortable-hoc"; 
// Components
import { getProject } from "../../../services/local-storage";
import SortableItem from "./sortable-item";

const SortableList = SortableContainer(
    ({  notes, onDone, onMove }) => { 
        const taskz = notes ? notes.map((note, index) => {
            const _project = getProject(note.project);
            return (
                <SortableItem
                    key={`item-${index}`}
                    index={index}
                    note={note}
                    project={_project}
                    onDone={onDone}
                    onMove={onMove}
                    commands = {note.commands}
                />
            );
        })
        : <div>Nothing to search</div>
        return <div>
            {taskz}
        </div>;
    }
);

export default SortableList 
