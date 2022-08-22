import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { ChatContextState } from "../context/chat/ChatContext"
import { User } from "../interfaces/interfaces"

export const useOrderUsers = (chatState: ChatContextState) => {
    const [usersOrderDate, setUsersOrderDate] = useState<User[]>([])

    useEffect(() => {
        let usersWithLastMessage = chatState.users.filter(user => chatState?.messages[user.uid!])
        let restUsers = chatState.users.filter(user => !chatState?.messages[user.uid!])
        // console.log(restUsers)
        if (Object.keys(chatState?.messages).length > 0) {
            const usersOrder = usersWithLastMessage.sort((a: User, b: User) => {
                return dayjs(chatState?.messages[a.uid!][0]?.createdAt) < dayjs(chatState?.messages[b.uid!][0]?.createdAt)
            })
            setUsersOrderDate([...usersOrder, ...restUsers])
        } else {
            setUsersOrderDate([...restUsers])
        }
    }, [ chatState.users ])

    return usersOrderDate
}