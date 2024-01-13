import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { Button, Col, Form, Input, Row, Select } from 'antd';
function CreatePackage() {
  const [form] = Form.useForm();
  // handle
  const onFinish = (values) => {
    if (Object.keys(values).length > 0) toast.success('Create is success');
  };
  return (
    <>
      <div className="wrapper__create__user">
        <Row style={{ alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
          <Col>
            {' '}
            <div className="Form__title__icon">
              <i className="fa-solid fa-sim-card"></i>
            </div>{' '}
          </Col>{' '}
          <Col>
            <h4 className="title-bold   w-auto">Thêm mới gói cước</h4>{' '}
          </Col>
        </Row>
        <Form form={form} name="register" onFinish={onFinish} scrollToFirstError layout="vertical">
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
                <Input size="large" placeholder="Name" />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                hasFeedback
                label="Price"
                name="price"
                style={{ marginLeft: '10px' }}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống',
                  },
                ]}>
                <Input size="large" placeholder="Price" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col md={12}>
              <Form.Item
                hasFeedback
                label="Cycle time"
                name="cycle"
                style={{ marginRight: '10px' }}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không bỏ trống',
                  },
                ]}>
                <Input size="large" placeholder="Cycle time" />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item style={{ marginLeft: '10px' }} label="Type" hasFeedback>
                <Select size="large" defaultValue="1" allowClear>
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">0</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col md={24}>
              <Form.Item hasFeedback name="description" label="Description">
                <Input.TextArea placeholder="Description" rows={5} />
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
export default CreatePackage;
