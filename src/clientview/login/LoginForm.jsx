import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";

function LoginForm() {
  return (
    <>
      <Container className="mt-4">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="fw-bold text-dark" style={{ cursor: 'pointer' }}>
            ourproject
          </h1>
        </Link>
      </Container>
      <Container className="mt-5" style={{ maxWidth: '400px' }}>
        <h3 className="mb-4 text-center">로그인</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="email" placeholder="이메일 입력" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="비밀번호 입력" />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            로그인
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default LoginForm;