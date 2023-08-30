import { Row, Col, Button, Typography } from 'antd';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { addDocument, checkExistAccount, generateKeywords } from '../../firebase/services';

const { Title } = Typography

const fbProvider = new FacebookAuthProvider()
const ggProvider = new GoogleAuthProvider();
function Login() {
    const handleFbLogin = async () => {
        const { user }  = await signInWithPopup(auth, fbProvider);
        
        const isExist = await checkExistAccount('users', user.uid);
        //add new user to firestore
        if(!isExist){
            await addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: user.providerId
            })
        }
    }

    const handleGgLogin = async () => {
        //sign in
        const { user } = await signInWithPopup(auth, ggProvider);

        const isExist = await checkExistAccount('users', user.uid);
        //add new user to firestore
        if(!isExist){
            await addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: user.providerId,
                keywords: generateKeywords(user.displayName)
            })
        }
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