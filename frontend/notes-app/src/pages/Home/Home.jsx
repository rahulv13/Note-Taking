import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";

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

  const navigate = useNavigate();

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

      {/* Add Button */}
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

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
        className="w-[90%] md:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
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
