import { Avatar, Button, Typography } from "antd";
import { styled } from "styled-components";
import { signOut } from 'firebase/auth'
import { auth } from "../../../../firebase/config";
import { useContext } from "react";
import { AuthContext } from '../../../../Context/AuthProvider'

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
    const {user: {
        displayName,
        photoURL,
    }} = useContext(AuthContext);
    
    return (
        <WrapperStyled>
            <div>
                <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className="username">{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={handleSignOut}>Đăng xuất</Button>
        </WrapperStyled>
    );
}

export default UserInfo;