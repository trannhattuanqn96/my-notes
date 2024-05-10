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
import { toast } from "react-toastify";
import { updateDetailNoteById } from "../service/notesAPI";
import AuthContext from "../context/authContext/RefeshProvider";
import { Chip } from "@nextui-org/react";
import EditorTiny from "./EditorTiny";
const ModelEdit = (prop) => {
    const { setRefesh } = useContext(AuthContext);
    const { modalIsOpen, setIsOpenModal, noteEdit } = prop;
    const editorRef = useRef(null);
    const [title, setTitle] = useState(noteEdit?.title);
    const [tag, setTag] = useState(noteEdit?.tag);
    const [currValueTag, setCurrValueTag] = useState("");
    const [description, setDescription] = useState(noteEdit?.description);
    const handleEditNote = async () => {
        if (!title || !editorRef.current.getContent()) {
            toast("Tiêu đề không được để trống", { autoClose: 1000 });
            return;
        }
        const createNote = await updateDetailNoteById({
            id: noteEdit?._id,
            title,
            content: editorRef.current.getContent(),
            tag,
            description,
        });
        if (createNote.data.code === 0) {
            toast("Sửa note không thành công", { autoClose: 1000 });
        }
        toast("Sửa note thành công", { autoClose: 1000 });
        setRefesh(true);
        setIsOpenModal(false);
        setTag([]);
        setDescription(null);
    };
    useEffect(() => {
        setTitle(noteEdit?.title)
        setTag(noteEdit?.tag)
        setDescription(noteEdit?.description)
    },[modalIsOpen])
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
                <ModalHeader>Sửa</ModalHeader>
                <ModalContent scrolling className="">
                    <ModalDescription>
                        <Form>
                            <FormField>
                                <Input
                                    placeholder="Tiêu đề"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
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
                                    {tag?.map((item, index) => (
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
                                    value={description}
                                />
                            </FormField>

                            <EditorTiny
                                editorRef={editorRef}
                                checkEdit={true}
                                initContent={noteEdit?.content}
                            />
                        </Form>
                    </ModalDescription>
                </ModalContent>
                <ModalActions>
                    <Button primary onClick={() => handleEditNote()}>
                        Sửa <Icon name="right chevron" />
                    </Button>
                </ModalActions>
            </Modal>
        </>
    );
};

export default ModelEdit;
