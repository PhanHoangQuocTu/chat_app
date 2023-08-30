import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns/esm";
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

function formatData(seconds) {
    let formattedDate = '';
    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date());

        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

        return formattedDate;
    }
}

function Message({ text, displayName, createAt, photoURL }) {
    return (
        <WrapperStyled>
            <div>
                <Avatar size={'small'} src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className="author">{displayName}</Typography.Text>
                <Typography.Text className="date">{formatData(createAt?.seconds)}</Typography.Text>
            </div>
            <div>
                <Typography.Text className="content">{text}</Typography.Text>
            </div>
        </WrapperStyled>
    );
}

export default Message;