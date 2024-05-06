/* eslint-disable jsx-a11y/no-redundant-roles */
import { useEffect, useState, useContext, useCallback } from "react";
import { BsTrashFill } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment/moment.js";
import "react-toastify/dist/ReactToastify.css";

import { getNotes } from "../../service/notesAPI.js";
import ModalDelete from "../../component/ModalDelete.js";
import ModalCreate from "../../component/ModalCreate.js";
import AuthContext from "../../context/authContext/RefeshProvider.js";
import ModelEdit from "../../component/ModelEdit.js";
import { Button } from "@nextui-org/react";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const { refesh, setRefesh } = useContext(AuthContext);

    const [data, setData] = useState([]);

    const [search, setSearch] = useState(null);
    //delete
    const [isOpenmodalConfirm, setIsOpenmodalConfirm] = useState(false);
    const [note, setNote] = useState(null);
    //create
    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
    //edit
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);

    useEffect(() => {
        const getnotes = async (search) => {
            try {
                // Thực hiện các công việc bất đồng bộ ở đây
                const response = await getNotes(search);
                if (response.data.code === 0) {
                    toast("Không lấy được nội dung!", { autoClose: 1000 });
                    return;
                }
                setRefesh(false);
                setData(response.data.data);
            } catch (error) {
                // Xử lý lỗi nếu có
            }
        };
        getnotes(search); // Gọi hàm async
    }, [refesh]); // Đảm bảo useEffect chỉ chạy một lần khi component được render

    const handleCreateNote = () => {
        setIsOpenModalCreate(true);
    };
    const getNoteEdit = useCallback(
        (note) => {
            return data.map((item) => (item._id === note ? item : []));
        },
        [isOpenModalEdit]
    );

    const handleEditNote = () => {
        setIsOpenModalEdit(true);
    };
    const handleLogout = () =>{
        // Xóa mục trong localStorage và chuyển hướng đến "/login"
        localStorage.removeItem("mynote");
        <Navigate to="/admin/login" replace={true} />
    }
    return (
        <>
            <ToastContainer />
            <div className="h-screen bg-slate-500">
                <div className=" container mx-auto w-8/12 mb-[20px] pt-[20px]">
                    <div className="flex gap-10 ">
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Mockups, Logos..."
                            required
                        />
                        <Button color="primary" className="h-auto" onClick={() => handleLogout()}>Logout</Button>
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5"
                        onClick={handleCreateNote}
                    >
                        Thêm
                    </button>
                </div>

                <div className="mx-auto container py-20 px-6">
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {data?.map((item) => {
                            return (
                                <>
                                    <div className="rounded" key={item?._id}>
                                        <div className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
                                            <div>
                                                <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3  text-[20px] border-b-[4px] border-solid border-black">
                                                    {item?.title}
                                                </h4>
                                                <p className="text-gray-800 dark:text-gray-100 text-sm text-[18px]">
                                                    {item?.description}
                                                </p>
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
                                                    <p className="text-sm">
                                                        {moment(
                                                            item?.createAt
                                                        ).format(
                                                            "DD-MM-YYYY HH:mm:ss"
                                                        )}
                                                    </p>
                                                    <button
                                                        className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
                                                        aria-label="remove note"
                                                        role="button"
                                                        onClick={() => {
                                                            setNote(item?._id);
                                                            setIsOpenmodalConfirm(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        <BsTrashFill />
                                                    </button>
                                                    <button
                                                        className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
                                                        aria-label="edit note"
                                                        role="button"
                                                        onClick={() => {
                                                            setNote(item?._id);
                                                            handleEditNote();
                                                        }}
                                                    >
                                                        <MdModeEditOutline />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
            <ModalDelete
                modalIsOpen={isOpenmodalConfirm}
                setIsOpenModal={setIsOpenmodalConfirm}
                note={note}
                setNote={setNote}
            />
            <ModalCreate
                modalIsOpen={isOpenModalCreate}
                setIsOpenModal={setIsOpenModalCreate}
            />
            <ModelEdit
                modalIsOpen={isOpenModalEdit}
                setIsOpenModal={setIsOpenModalEdit}
                noteEdit={getNoteEdit(note)}
                setNote={setNote}
            />
        </>
    );
};

export default Home;
