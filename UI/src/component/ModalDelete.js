import React, {useContext} from "react";
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { deleteNote } from "../service/notesAPI.js";
import {  toast } from "react-toastify";
import AuthContext from "../context/authContext/AuthProvider.js";
const ModalDelete = (prop) => {
  const { setRefesh } = useContext(AuthContext);

  const { modalIsOpen, setIsOpenModal, note } = prop;

  const handleDelete = async () => {
    try {
      // Thực hiện các công việc bất đồng bộ ở đây
      const response = await deleteNote(note);
      if (response.data.code === 0) {
        toast("Xóa bị lỗi", { autoClose: 1000 });
      }
      toast("Xóa thành công", { autoClose: 1000 });
      
    } catch (error) {
      toast("Xóa bị lỗi", { autoClose: 1000 });
    }
    setRefesh(true)
    setIsOpenModal(false);
  };

  return (
    <>
      <Modal open={modalIsOpen}>
        <ModalHeader>XÓA cái NOTE này</ModalHeader>
        <ModalContent>
          <p>CHắc Xóa</p>
        </ModalContent>
        <ModalActions>
          <Button onClick={(e) => setIsOpenModal(false)} positive>
            No
          </Button>
          <Button
            onClick={(e) => {
              handleDelete();
            }}
            negative
          >
            Yes
          </Button>
        </ModalActions>
      </Modal>
    </>
  );
};

export default ModalDelete;
