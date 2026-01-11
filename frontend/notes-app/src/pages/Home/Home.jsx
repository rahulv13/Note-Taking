import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { MdAdd, MdPlaylistAdd, MdDescription } from "react-icons/md";

import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Navbar/Cards/NoteCard";
import AddEditNotes from "./AddEditNotes";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";

import axiosInstance from "../../utils/axiosInstance";

import AddNotesImg from "../../assets/images/No-notes.svg";
import NoDataImg from "../../assets/images/No-data.svg";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToast, setShowToast] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const ShowToastMessage = (message, type) => {
    setShowToast({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToast({
      isShown: false,
      message: "",
      type: "add",
    });
  };

  const getUserInfo = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.error("User fetch error:", error.message);
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }, [navigate]);

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data?.notes) {
        setAllNotes(response.data.notes);
      } else {
        setAllNotes([]);
      }
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (note) => {
    try {
      await axiosInstance.delete(`/delete-note/${note._id}`);
      ShowToastMessage("Note Deleted Successfully", "delete");
      getAllNotes();
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data?.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Search error:", error.message);
    }
  };

  const updateIsPinned = async (noteData) => {
    try {
      const response = await axiosInstance.put(`/update-note-pinned/${noteData._id}`, {
        isPinned: !noteData.isPinned,
      });

      if (response.data?.note) {
        ShowToastMessage("Note Updated Successfully", "update");
        getAllNotes();
      }
    } catch (error) {
      console.error("Pin update error:", error.message);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, [getUserInfo]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-600">Loading your notes...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id || index}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                isTodo={item.isTodo}
                checklist={item.checklist}
                onEdit={() =>
                  setOpenAddEditModal({
                    isShown: true,
                    type: "edit",
                    data: item,
                  })
                }
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddNotesImg}
            messsage={
              isSearch
                ? `Oops! No notes found matching your search`
                : `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`
            }
          />
        )}
      </div>

      <div className="fixed right-10 bottom-10 z-50 flex flex-col items-end gap-3">
          {/* Sub Buttons */}
          <div className={`flex flex-col gap-3 items-end mb-2 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}>
             <button
                className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 rounded-lg shadow-md hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => {
                  setOpenAddEditModal({ isShown: true, type: "checklist", data: null });
                  setIsMenuOpen(false);
                }}
                title="Add Checklist"
             >
                 <span className="text-sm font-medium">Checklist</span>
                 <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-slate-700">
                     <MdPlaylistAdd className="text-xl text-primary" />
                 </div>
             </button>

             <button
                 className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 rounded-lg shadow-md hover:bg-slate-100 dark:hover:bg-slate-700"
                 onClick={() => {
                   setOpenAddEditModal({ isShown: true, type: "add", data: null });
                   setIsMenuOpen(false);
                 }}
                 title="Add Text Note"
             >
                <span className="text-sm font-medium">Note</span>
                 <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-slate-700">
                     <MdDescription className="text-xl text-primary" />
                </div>
             </button>
          </div>

          {/* Main FAB */}
          <button
            className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 shadow-lg transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}
            onClick={toggleMenu}
          >
            <MdAdd className="text-[32px] text-white" />
          </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
        }}
        contentLabel=""
        className="w-[90%] md:w-[40%] max-h-3/4 bg-white dark:bg-slate-800 rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
          showToastMessage={ShowToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToast.isShown}
        message={showToast.message}
        type={showToast.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
