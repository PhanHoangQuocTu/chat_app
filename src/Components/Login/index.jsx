import { Row, Col, Button, Typography } from 'antd';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { addDocument } from '../../firebase/services';

const { Title } = Typography

const fbProvider = new FacebookAuthProvider()
const ggProvider = new GoogleAuthProvider();
function Login() {
    const handleFbLogin = async () => {
        const data = await signInWithPopup(auth, fbProvider);
        console.log({ data });
    }

    const handleGgLogin = async () => {
        const { user } = await signInWithPopup(auth, ggProvider);
        await addDocument('users', {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: user.providerId
        }, user.uid)
        console.log(user);
    }

    return (
        <div>
            <Row justify='center' style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>Fun chat</Title>
                    <Button style={{ width: '100%', marginBottom: 5 }} onClick={handleGgLogin}>
                        Đăng nhập bằng Google
                    </Button>
                    <Button style={{ width: '100%' }} onClick={handleFbLogin}>
                        Đăng nhập bằng Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Login;