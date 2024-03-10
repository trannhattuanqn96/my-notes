import React, { useRef, useState, useContext } from "react";
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
import AuthContext from "../context/authContext/AuthProvider";

const ModalCreate = (prop) => {
    const { setRefesh } = useContext(AuthContext);
    const { modalIsOpen, setIsOpenModal } = prop;

    const editorRef = useRef(null);
    const [title, setTitle] = useState("");

    const handleCreateNote = async () => {
        if (!title || !editorRef.current.getContent()) {
            toast("Không được để trống", { autoClose: 1000 });
        }
        const createNote = await createNotes(
            title,
            editorRef.current.getContent()
        );
        if (createNote.data.code === 0) {
            toast("Lưu note không thành công", { autoClose: 1000 });
        }
        toast("Lưu note thành công", { autoClose: 1000 });
        setRefesh(true)
        setIsOpenModal(false);
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
                            <Editor
                                apiKey="2fbonljqeyt6v92j1jnq0szb9xelpoomqz7etfuj3nzf3l8u"
                                onInit={(evt, editor) =>
                                    (editorRef.current = editor)
                                }
                                init={{
                                    plugins:
                                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
                                    toolbar:
                                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                                    tinycomments_mode: "embedded",
                                    tinycomments_author: "Author name",
                                    mergetags_list: [
                                        {
                                            value: "First.Name",
                                            title: "First Name",
                                        },
                                        { value: "Email", title: "Email" },
                                    ],
                                    ai_request: (request, respondWith) =>
                                        respondWith.string(() =>
                                            Promise.reject(
                                                "See docs to implement AI Assistant"
                                            )
                                        ),
                                }}
                            />
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
