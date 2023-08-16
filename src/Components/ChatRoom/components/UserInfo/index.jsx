import { Avatar, Button, Typography } from "antd";
import { styled } from "styled-components";
import { signOut} from 'firebase/auth'
import { auth, db } from "../../../../firebase/config";
import { useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82, 38,83);

    .username {
        color: white;
        margin-left: 5px;
    }
`

const handleSignOut = () => {
    signOut(auth);
}

function UserInfo() {
    useEffect(() => {
        onSnapshot(collection(db, 'users'), (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))

            console.log({data, snapshot, docs: snapshot.docs})
        })
    }, [])
    return (
        <WrapperStyled>
            <div>
                <Avatar>A</Avatar>
                <Typography.Text className="username">Name</Typography.Text>
            </div>
            <Button ghost onClick={handleSignOut}>Đăng xuất</Button>
        </WrapperStyled>
    );
}

export default UserInfo;