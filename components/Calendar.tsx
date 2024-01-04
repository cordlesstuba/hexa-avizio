import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';

type Props = {
    onDateSelected: (info: any) => void;
}

export default function Calendar({ onDateSelected }: Props) {

    return (
        <FullCalendar
            plugins={[interactionPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            selectable={true}
            select={onDateSelected}
        />
    )
}
