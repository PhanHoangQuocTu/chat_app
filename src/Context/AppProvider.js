import { createContext, useContext, useMemo, useState } from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../hooks/useFirestore";

export const AppContext = createContext();

function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');

    const { user: { uid } } = useContext(AuthContext)

    const roomCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid])

    const rooms = useFirestore('rooms', roomCondition);
    const selectedRoom = useMemo(() => rooms.find((room) => room.id === selectedRoomId) || {}, [rooms, selectedRoomId]);

    const usersCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        }
    }, [selectedRoom.members])

    const members = useFirestore('users', usersCondition)
    return (
        <AppContext.Provider value={{ rooms, selectedRoom, members, isAddRoomVisible, setIsAddRoomVisible, isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, setSelectedRoomId }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;