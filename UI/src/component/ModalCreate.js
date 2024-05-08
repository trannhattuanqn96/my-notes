import React, { useRef, useState, useContext, useEffect } from "react";
import {
    ModalHeader,
    ModalDescription,
    ModalContent,
    ModalActions,
    Button,
    Icon,
    Modal,
    FormField,
    Form,
    Input,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { createNotes } from "../service/notesAPI";
import AuthContext from "../context/authContext/RefeshProvider";
import { Chip } from "@nextui-org/react";
import EditorTiny from "./EditorTiny";
const ModalCreate = (prop) => {
    const { setRefesh } = useContext(AuthContext);
    const { modalIsOpen, setIsOpenModal } = prop;

    const editorRef = useRef(null);
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState([]);
    const [currValueTag, setCurrValueTag] = useState("");
    const [description, setDescription] = useState(null);

    const handleCreateNote = async () => {
        if (!title || !editorRef.current.getContent()) {
            toast("Tiêu đề không được để trống", { autoClose: 1000 });
            return;
        }
        const createNote = await createNotes(
            title,
            editorRef.current.getContent(),
            tag,
            description
        );
        if (createNote.data.code === 0) {
            toast("Lưu note không thành công", { autoClose: 1000 });
        }
        toast("Lưu note thành công", { autoClose: 1000 });
        setRefesh(true);
        setIsOpenModal(false);
        setTag([]);
        setDescription(null);
    };
    const handleKeyUpTag = (e) => {
        if (e.keyCode === 32) {
            if (e.target.value.trim() === "") {
                return;
            }
            setTag((oldState) => [...oldState, e.target.value.trim()]);
            setCurrValueTag("");
        }
    };
    

    const handleChange = (e) => {
        setCurrValueTag(e.target.value);
    };

    const handleDelete = (item, index) => {
        let arr = [...tag];
        arr.splice(index, 1);
        setTag(arr);
    };
    return (
        <>
            <Modal
                open={modalIsOpen}
                onClose={() => setIsOpenModal(false)}
                onOpen={() => setIsOpenModal(true)}
                style={{ width: "80%" }}
            >
                <ModalHeader>Thêm</ModalHeader>
                <ModalContent scrolling className="">
                    <ModalDescription>
                        <Form>
                            <FormField>
                                <Input
                                    placeholder="Tiêu đề"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </FormField>
                            <FormField>
                                <div className=" flex items-center gap-2  flex-wrap flex-row border-2 p-4 rounded ">
                                    <Input
                                        value={currValueTag}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyUpTag}
                                        placeholder="Tag"
                                    />
                                    {tag.map((item, index) => (
                                        <>
                                            <div className="gap-6 flex flex-row flex-wrap">
                                                <Chip
                                                    onClose={() =>
                                                        handleDelete(
                                                            item,
                                                            index
                                                        )
                                                    }
                                                    className="bg-gray-500 px-2 py-1 rounded-md text-white"
                                                >
                                                    {item}
                                                </Chip>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </FormField>
                            <FormField>
                                <Input
                                    placeholder="Mô tả"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </FormField>
                          
                            <EditorTiny editorRef={editorRef} checkEdit={false}/>
                        </Form>
                    </ModalDescription>
                </ModalContent>
                <ModalActions>
                    <Button primary onClick={() => handleCreateNote()}>
                        Thêm <Icon name="right chevron" />
                    </Button>
                </ModalActions>
            </Modal>
        </>
    );
};

export default ModalCreate;
