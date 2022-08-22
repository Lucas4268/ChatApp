import dayjs, { Dayjs } from "dayjs";

const dateNow = dayjs().subtract(3, 'hour')

export const getMessageDate = (lastMessageDate: Dayjs | null): string => {
    if (lastMessageDate) {
        if (lastMessageDate.date() === dateNow.date()) {
            return dayjs(lastMessageDate).add(3, 'hour').format('HH:mm')
        }

        if (lastMessageDate.date() === dateNow.date() - 1) {
            return 'Ayer';
        }
        
        return dayjs(lastMessageDate).add(3, 'hour').format('DD/MM/YY')
    }

    return ''
}