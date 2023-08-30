import { Avatar, Form, Modal, Select, Spin } from "antd";
import { useContext, useMemo, useState } from "react";
import { AppContext } from '../../../Context/AppProvider'
import { AuthContext } from '../../../Context/AuthProvider'
import { addDocument } from '../../../firebase/services'
import { debounce } from "lodash";
import { db } from "../../../firebase/config";
import { collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, props.currentMembers).then(newOptions => {
                setOptions(newOptions);
                setFetching(false);
            })
        }

        return debounce(loadOptions, debounceTimeout)
    }, [debounceTimeout, fetchOptions, props.currentMembers])

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
        >
            {options?.map(option => (
                <Select.Option key={option.value} value={option.value} title={option.label}>
                    <Avatar size={'small'} src={option.photoURL}>
                        {option.photoURL ? '' : option.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${option.label}`}
                </Select.Option>
            ))}
        </Select>
    )
}

async function fetchUserList(search, currentMembers) {
    const q = query(collection(db, 'users'), where('keywords', 'array-contains', search), orderBy('displayName'), limit(20)).filter(opt => currentMembers.includes(opt.value))
    const querySnapshot = await getDocs(q);

    const userOptions = querySnapshot.docs.map((doc) => ({
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL
    }));

    return userOptions;
}

function InviteMemberModal() {
    const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext);
    const { user: { uid } } = useContext(AuthContext);
    const [value, setValue] = useState([])
    const [form] = Form.useForm();
    const handleOk = async () => {
        //add new room to firestore
        addDocument('rooms', { ...form.getFieldValue(), members: [uid] });

        //reset form
        form.resetFields();

        //update member in current room
        const roomRef =  doc(db, 'rooms', selectedRoomId);
        await updateDoc(roomRef, {
            members: [...selectedRoom.members, ...value.map(val => val.value)]
        })
        //close modal
        setIsInviteMemberVisible(false);
    }

    const handleCancel = () => {
        //reset form
        form.resetFields();

        //close modal
        setIsInviteMemberVisible(false);
    }

    console.log(value);

    return (
        <div>
            <Modal
                title="Mời thêm thành viên"
                open={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <DebounceSelect
                        mode="multiple"
                        label="Tên các thành viên"
                        value={value}
                        placeholder="Nhập tên thành viên"
                        fetchOptions={fetchUserList}
                        onChange={newValue => setValue(newValue)}
                        style={{ width: '100%' }}
                        currentMembers={selectedRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    );
}

export default InviteMemberModal;