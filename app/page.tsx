'use client'

import { NextUIProvider } from "@nextui-org/react";
import { useState } from "react";
import { Input } from "@nextui-org/react";

import Calendar from "@/components/Calendar";
import ModalDiag from "@/components/Modal";

export default function Home() {
  
  // calendar state
  const [startDate, setStartDate] = useState(new Date);
  const [endDate, setEndDate] = useState(new Date);

  const handleDateSelected = (info: any) => {
    setStartDate(info.start)
    setEndDate(info.end)
    handleOpenModal()
  };

  // modal state
  const [isModalOpen, setModalOpen] = useState(true);
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
    console.log({subject, startDate, endDate})
  }

  return (
    <NextUIProvider>
      <Calendar
        onDateSelected={handleDateSelected}
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
