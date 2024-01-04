'use client'

import Calendar from "@/components/Calendar";
import { NextUIProvider } from "@nextui-org/react";
import { useState } from "react";

export default function Home() {
  const [startDate, setStartDate] = useState(new Date);
  const [endDate, setEndDate] = useState(new Date);

  const handleDateSelected = (info: any) => {
    setStartDate(info.start)
    setEndDate(info.end)
  };

  return (
    <NextUIProvider>
      <Calendar
        onDateSelected={handleDateSelected}
      />
    </NextUIProvider>
  )
}
