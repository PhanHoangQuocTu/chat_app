import { Avatar, Typography } from "antd";
import { styled } from "styled-components";

const WrapperStyled = styled.div`
    margin-bottom: 12px;

    .author {
        margin-left: 4px;
        font-weight: bold;
    }

    .date {
        margin-left: 12px;
        font-size: 12px;
        color: #a7a7a7;
    }

    .content {
        margin-left: 32px;
    }
`

function Message({ text, displayName, createAt, photoURL }) {
    return (
        <WrapperStyled>
            <div>
                <Avatar size={'small'} src={photoURL}>A</Avatar>
                <Typography.Text className="author">{displayName}</Typography.Text>
                <Typography.Text className="date">{createAt}</Typography.Text>
            </div>
            <div>
                <Typography.Text className="content">{text}</Typography.Text>
            </div>
        </WrapperStyled>
    );
}

export default Message;