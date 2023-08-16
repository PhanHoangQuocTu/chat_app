import { Row, Col } from "antd";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

function ChatRoom() {
    return (
        <Row>
            <Col span={8}>
                <Sidebar />
            </Col>
            <Col span={16}>
                <ChatWindow />
            </Col>
        </Row>
    );
}

export default ChatRoom;