// Packages
import { SortableHandle } from "react-sortable-hoc";  
import styled from 'styled-components'

const DragHandle = SortableHandle(() => <Drag>
    <svg width="7" height="3em" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4"></circle><circle cx="1.5" cy="5.5" r="1.5" fill="#C4C4C4"></circle>
        <circle cx="1.5" cy="9.5" r="1.5" fill="#C4C4C4"></circle><circle cx="5.5" cy="1.5" r="1.5" fill="#C4C4C4"></circle>
        <circle cx="5.5" cy="5.5" r="1.5" fill="#C4C4C4"></circle><circle cx="5.5" cy="9.5" r="1.5" fill="#C4C4C4"></circle>
    </svg>
</Drag>);

export default DragHandle;

const Drag = styled.span`
padding:5px;
`