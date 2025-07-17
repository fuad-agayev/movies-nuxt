// composables/useDateFormat.ts
import { format, formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'

export const useDateFormat = () => {
  /**
   * Belirli bir tarihi formatlar (örn. Haziran 9, 2025)
   */
  const formatDate = (date: Date | string, pattern = 'MMMM d, yyyy') => {
    const d = typeof date === 'string' ? new Date(date) : date
    return format(d, pattern, { locale: tr })
  }

  /**
   * Geçen süreyi gösterir (örn. "2 gün önce")
   */
  const timeAgo = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date
    return formatDistanceToNow(d, { addSuffix: true, locale: tr })
  }

  return { formatDate, timeAgo }
}
//! Misal componentde bu composables nasil kulllanilur sonrr a bu aciklamani silersin
/*
import { useDateFormat } from '~/composables/useDateFormat'

const { formatDate, timeAgo } = useDateFormat()

const dateExample = new Date('2025-06-07')
</script>

<template>
  <div>
    <p>Tam tarih: {{ formatDate(dateExample) }}</p>
    <p>Geçen süre: {{ timeAgo(dateExample) }}</p>
  </div>

 //* Tam tarih: Haziran 7, 2025
 //*Geçen süre: 2 gün önce
*/
