'use client'

import { NextUIProvider } from "@nextui-org/react";
import { useState } from "react";
import { Input } from "@nextui-org/react";

import Calendar from "@/components/Calendar";
import ModalDiag from "@/components/Modal";

type Event = {
  title: string;
  start: Date;
  end: Date;
  url: string;
}

export default function Home() {

  // calendar state
  const [startDate, setStartDate] = useState(new Date);
  const [endDate, setEndDate] = useState(new Date);
  const [events, setEvents] = useState<Event[]>([]);

  const handleDateSelected = (info: any) => {
    setStartDate(info.start)
    setEndDate(info.end)
    handleOpenModal()
  };

  // modal state
  const [isModalOpen, setModalOpen] = useState(false);
  const [subject, setSubject] = useState('');

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleValidateModal = () => {
    setModalOpen(false);
    createMeeting();
  };

  const createMeeting = async () => {
    const response = await fetch('/api/meeting/new', {
      method: 'POST',
      body: JSON.stringify({
        subject: subject,
        startDate: startDate,
        endDate: endDate
      })
    })

    if (response.ok) {
      const { data } = await response.json()
      setEvents([
        ...events,
        { title: subject, start: startDate, end: endDate, url: data.start_url }
      ]);
    } else {
      alert("Error while creating zoom meeting")
    }
  }

  return (
    <NextUIProvider>
      <Calendar
        onDateSelected={handleDateSelected}
        events={events}
      />

      <ModalDiag isOpen={isModalOpen} onClose={handleCloseModal} onValidate={handleValidateModal}>
        <div>
          <Input label="Subject" onChange={e => setSubject(e.target.value)}></Input>
          <div className="flex pt-6">
            <Input className="mx-3" isReadOnly label="Start date" defaultValue={startDate.toLocaleDateString()}></Input>
            <Input className="mx-3" isReadOnly label="Start hour" defaultValue={startDate.toLocaleTimeString()}></Input>
          </div>
          <div className="flex pt-2">
            <Input className="mx-3" isReadOnly label="Start date" defaultValue={endDate.toLocaleDateString()}></Input>
            <Input className="mx-3" isReadOnly label="End date" defaultValue={endDate.toLocaleTimeString()}></Input>
          </div>
        </div>
      </ModalDiag>
    </NextUIProvider>
  )
}
