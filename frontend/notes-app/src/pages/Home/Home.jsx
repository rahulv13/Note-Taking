import React, { useEffect } from 'react';
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from '../../components/Navbar/Cards/NoteCard';
import { MdAdd } from "react-icons/md";
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal";
import { useNavigate } from "react-router-dom"
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
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
  }
  );

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();


  const handleEdit = (noteDetails) => {
  setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
};


  const ShowToastMessage = (message, type) => {
    setShowToast({ 
      isShown: true, 
      message: message, 
      type: type

  });
}

  const handleCloseToast = () => {
    setShowToast({ 
      isShown: false, 
      message: "", 

  });
}
  // Get User Info
  const getUserInfo = React.useCallback(async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }, [navigate]);

  // Get all Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again later.",error.message);
    }
  };

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
            const response = await axiosInstance.delete(`/delete-note/${noteId}`);

            if (response.data && !response.data.error) {
                ShowToastMessage("Note Deleted Successfully", "delete")
                getAllNotes()
            }
        }catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                console.log("An unexpected error occurred. Please try again later.",error.message);
            }
        }
  }
  

  // Search Notes
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get('/search-notes',{
        params: { query},
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
  }
};

const updateIsPinned = async (noteData) => {
  const noteId = noteData._id;

        try {
            const response = await axiosInstance.put(`/update-note-pinned/${noteId}`, {
                "isPinned": !noteData.isPinned,
            });

            if (response.data && response.data.note) {
                ShowToastMessage("Note Updated Successfully", "update");
                getAllNotes()
             } 
      }catch (error) {
        console.log(error);
        }
};

const handleClearSearch = () => {
  setIsSearch(false);
  getAllNotes();
};

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {}
  }, [getUserInfo]);

  return (
    <>
    <Navbar 
      userInfo={userInfo} 
      onSearchNote={onSearchNote} 
      handleClearSearch={handleClearSearch} 
    />

    <div className='container mx-auto'>
      {allNotes?.length > 0 && allNotes.map((item, index) => (
  item && (
    <NoteCard  
      key={item._id || index}
      title={item.title}
      date={item.createdOn}
      content={item.content}
      tags={item.tags || []}
      isPinned={item.isPinned}
      onEdit={() => handleEdit(item)}
      onDelete={() => deleteNote(item)}
      onPinNote={() => updateIsPinned(item)}
    />
  )
))}
      </div>
    ) : (
      <EmptyCard 
      imgSrc={isSearch ? NoDataImg : AddNotesImg}  
      messsage={
        isSearch 
        ? `Oops! No notes found matching your search` 
        : `Start creating your first note! Click the 'Add' button to jot down your 
        thoughts, ideas, and reminders. Let's get started!`} />
    )}
    </div>

    <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
       onClick={() => {
        setOpenAddEditModal({isShown: true, type: "add", data: null})
       }}>
      <MdAdd className="text-[32px] text-white" />
    </button>

    <Modal 
      isOpen={openAddEditModal.isShown}
      onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)",
        }
      }}
      contentLabel=""
      className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >

    <AddEditNotes
       type={openAddEditModal.type}
       noteData={openAddEditModal.data}
       onClose={() => {
        setOpenAddEditModal({ isShown: false, type: "add", data: null});
       }}
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
  )
}

export default Home
