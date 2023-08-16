import { Avatar, Button, Form, Input, Tooltip } from "antd";
import { styled } from "styled-components";
import { UserAddOutlined } from '@ant-design/icons';
import Message from "../Message";

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rgb(230, 230, 230);

    .header{
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        &__title {
            margin: 0;
            font-weight: bold;
        }

        &__description {
            font-size: 12px;
        }
    }
`

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`

const WrapperStyled = styled.div`
    height: 100vh;
`

const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    padding: 12px;
    justify-content: flex-end;
`

const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 4px 4px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 4px;

    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
`

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;

`

function ChatWindow() {
    return (
        <WrapperStyled>
            <HeaderStyled>
                <div className="header__info">
                    <p className="header__title">Phòng 1</p>
                    <span className="header__description">Đây là phòng 1</span>
                </div>
                <ButtonGroupStyled>
                    <Button icon={<UserAddOutlined />} type='text'>Mời</Button>
                    <Avatar.Group size={'small'} maxCount={3}>
                        <Tooltip title="A">
                            <Avatar>A</Avatar>
                        </Tooltip>
                        <Tooltip title="B">
                            <Avatar>B</Avatar>
                        </Tooltip>
                        <Tooltip title="C">
                            <Avatar>C</Avatar>
                        </Tooltip>
                        <Tooltip title="D">
                            <Avatar>D</Avatar>
                        </Tooltip>
                        <Tooltip title="E">
                            <Avatar>E</Avatar>
                        </Tooltip>
                    </Avatar.Group>
                </ButtonGroupStyled>
            </HeaderStyled>
            <ContentStyled>
                <MessageListStyled>
                    <Message text={'test'} displayName={'Tu'} photoURL={null} createAt={'11/08/2023'} />
                    <Message text={'test 1'} displayName={'Tu'} photoURL={null} createAt={'11/08/2023'} />
                    <Message text={'test 2'} displayName={'Tu'} photoURL={null} createAt={'11/08/2023'} />
                    <Message text={'test 3'} displayName={'Tu'} photoURL={null} createAt={'11/08/2023'} />
                </MessageListStyled>
                <FormStyled>
                    <Form.Item>
                        <Input placeholder="Nhập tin nhắn ..." bordered={false} autoComplete="off"/>
                    </Form.Item>
                    <Button type="primary">Gửi</Button>
                </FormStyled>
            </ContentStyled>
        </WrapperStyled>
    );
}

export default ChatWindow;