import { useEffect, useState } from "react";
import { getNotes } from "../../service/notesAPI";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Notes = () => {
    const [getList, setGetNotes] = useState(null);
    const getListNotes = async () => {
        const list = await getNotes();
        if (list?.data?.code === 0) {
            toast("Không lấy được nội dung!", { autoClose: 1000 });
            return;
        }
        setGetNotes(list?.data?.data);
    };
    useEffect(() => {
        getListNotes();
    }, []);
    console.log(getList)
    return (
        <>
            <ToastContainer />
            <div className="h-screen bg-[#1F2028]">
                <div className="pt-40 px-40">
                    {getList?.map((item) => {
                        return (
                            <div
                                key={item?._id}
                                className="text-red-600 border-[1px] bg-[#1a1a1a] rounded-[1rem] shadow-md p-[20px] mb-[20px]"
                            >
                                <Link to={item?._id} title={item?.title}>
                                    <h1>{item?.title}</h1>
                                    <p>{item?.description}</p>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Notes;
