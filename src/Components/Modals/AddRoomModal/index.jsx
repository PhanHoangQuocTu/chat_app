import { Form, Input, Modal } from "antd";
import { useContext } from "react";
import { AppContext } from '../../../Context/AppProvider'
function AddRoomModal() {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const [form] = Form.useForm();
    const handleOk = () => {
        //logic
        console.log({ formData: form.getFieldValue() })
        setIsAddRoomVisible(false);
    }

    const handleCancel = () => {
        setIsAddRoomVisible(false);
    }
    return (
        <div>
            <Modal
                title="Tạo phòng"
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên phòng" name={'name'} required>
                        <Input placeholder="Nhập tên phòng" />
                    </Form.Item>
                    <Form.Item label="Mô tả" name={'description'} required>
                        <Input.TextArea placeholder="Nhập mô tả" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddRoomModal;