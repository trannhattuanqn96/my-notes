import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getDetailNoteById } from "../../service/notesAPI";
import parse from "html-react-parser";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "prismjs/themes/prism-okaidia.css";
hljs.registerLanguage("javascript", javascript);
const DetailNote = () => {
    const { id } = useParams();

    const [detailNote, setDetailNote] = useState(null);

    const getDetail = async () => {
        const get = await getDetailNoteById(id);
        if (get?.data.code === 0) {
            toast("Lấy nội dung không thành công", { autoClose: 1000 });
            return;
        }
        setDetailNote(get?.data?.data);
    };
    console.log(detailNote);
    useEffect(() => {
        Prism.highlightAll();
        getDetail();
    }, []);

    
    return (
        <>
            <ToastContainer />
            <div className="h-screen bg-[#1F2028]">
                <div className="pt-40 px-40">
                    <div className="border-[1px] bg-[#1a1a1a] rounded-[1rem] shadow-md p-[20px] ">
                        <h1 className="text-yellow-400">{detailNote?.title}</h1>
                        {detailNote === null ? null : (
                            // <div dangerouslySetInnerHTML={{ __html: detailNote?.content }} />
                            <div class="">{parse(detailNote?.content)}</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailNote;
