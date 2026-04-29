import { useState } from "react"

export const useDateTimePicker = () => {
  const [dateTime, setDateTime] = useState<Date | null>(null)
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  
  const formateDateAndTime = (selectedDateTime: Date | null) => {
    if (!selectedDateTime) return ''
    return selectedDateTime.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const openDateTimePicker = () => {
    setIsPickerOpen(true)
  }

  const closeDateTimePicker = () => {
    setIsPickerOpen(false)
  }

  const handleDateTimeConfirm = (selectedDateTime: Date) => {
    const now = new Date()
    
    if (selectedDateTime < now) {
      alert('Please select today or a future date and time')
      return
    }
    
    setDateTime(selectedDateTime)
    setIsPickerOpen(false)
  }

  return {
    dateTime,
    setDateTime,
    formateDateAndTime,
    openDateTimePicker,
    closeDateTimePicker,
    handleDateTimeConfirm,
    isOpen: isPickerOpen,
    minDateTime: new Date()
  }
}