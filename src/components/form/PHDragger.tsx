import { Controller } from "react-hook-form";
import { Form, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

type TInputProps = {
  name: string;
  label?: string;
  rules?: object;
};

export default function PHDragger({ name, label, rules }: TInputProps) {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error?.message}
        >
          <Upload.Dragger
            name={name}
            fileList={value ? [value] : []}
            onChange={(e) => onChange(e.fileList[0] || null)}
            beforeUpload={() => false}
            style={{ width: "100%" }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>
      )}
    />
  );
}
