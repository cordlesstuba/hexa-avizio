import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';

type Event = {
    title: string;
    start: Date;
    end: Date;
    url: string;
}

type Props = {
    events: Event[]
    onDateSelected: (info: any) => void;
}

export default function Calendar({ events, onDateSelected }: Props) {

    return (
        <FullCalendar
            plugins={[interactionPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            selectable={true}
            select={onDateSelected}
            events={events}
            eventClick={(event) => {
                if (event.event.url) {
                    event.jsEvent.preventDefault();
                    window.open(event.event.url, "_blank");
                  }
            }}  
        />
    )
}
