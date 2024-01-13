import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { validateEmail, validatePhone } from 'ultils/validate';
import './CreateUser.scss';
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      defaultValue="84"
      style={{
        width: 70,
      }}>
      <Select.Option value="84">+84</Select.Option>
      <Select.Option value="87">+87</Select.Option>
    </Select>
  </Form.Item>
);
function CreateUser() {
  const [form] = Form.useForm();

  // handle
  const onFinish = (values) => {
    if (Object.keys(values).length > 0) toast.success('Create is success');
  };

  return (
    <>
      <div className="wrapper__create__user">
        <Row style={{ alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <Col>
            {' '}
            <div className="Form__title__icon">
              <i className="fa-solid fa-user"></i>{' '}
            </div>{' '}
          </Col>{' '}
          <Col>
            <h4 className="title-bold   w-auto">Thêm mới người dùng</h4>{' '}
          </Col>
        </Row>
        <Form form={form} name="register" onFinish={onFinish} scrollToFirstError layout="vertical">
          <Row justify="space-between">
            <Col md={12}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống',
                  },
                ]}
                style={{ marginRight: '10px' }}>
                <Input size="middle" placeholder="Username" />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống',
                  },
                  {
                    validator: validateEmail,
                  },
                ]}
                hasFeedback
                label="Email"
                name="email"
                style={{ marginLeft: '10px' }}>
                <Input size="middle" placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col md={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống',
                  },
                ]}
                hasFeedback
                label="Name"
                name="name"
                style={{ marginRight: '10px' }}>
                <Input size="middle" placeholder="Name" />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                hasFeedback
                label="Password"
                name="password"
                style={{ marginLeft: '10px' }}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống',
                  },
                  {
                    min: 8,
                    message: 'Mật khẩu phải có 8 ký tự trở lên',
                  },
                ]}>
                <Input.Password size="middle" placeholder="Password" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col md={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                style={{ marginRight: '10px' }}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống',
                  },
                  {
                    validator: validatePhone,
                  },
                ]}>
                <Input placeholder="Phone Number" addonBefore={prefixSelector} size="middle" />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item style={{ marginLeft: '10px' }} label="Role" hasFeedback>
                <Select defaultValue="1" allowClear>
                  <Select.Option value="1">User-read</Select.Option>
                  <Select.Option value="2">User-write</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col md={24}>
              <Form.Item hasFeedback name="description" label="Description">
                <Input.TextArea placeholder="Description" rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Thêm mới
                </Button>
              </Form.Item>
            </>
          </Row>
        </Form>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
}
export default CreateUser;
