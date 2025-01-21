import { Modal } from "antd";

const { confirm } = Modal;

export const alertModal = (
  message?: string,
  description?: string,
  onClick?: () => void
) => {
  confirm({
    title: message || "Do you want to delete these item ?",
    content: description || "Some descriptions",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    centered: true,
    onOk() {
      onClick?.();
    },
  });
};