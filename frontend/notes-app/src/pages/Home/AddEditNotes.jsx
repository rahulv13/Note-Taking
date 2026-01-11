import React, { useState, useEffect } from "react";
import TagInput from "../../components/Navbar/Input/TagInput";
import ChecklistInput from "../../components/Navbar/Input/ChecklistInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [isTodo, setIsTodo] = useState(noteData?.isTodo || type === 'checklist');
    const [checklist, setChecklist] = useState(noteData?.checklist || []);


    const [error, setError] = useState(null);

    useEffect(() => {
        setTitle(noteData?.title || "");
        setContent(noteData?.content || "");
        setTags(noteData?.tags || []);
        setIsTodo(noteData?.isTodo || type === 'checklist');
        setChecklist(noteData?.checklist || []);
    }, [noteData, type]);

    // Add Note
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags,
                isTodo,
                checklist,
            });

            if (response.data && response.data.note) {
                showToastMessage("Note Added Successfully")
                getAllNotes()
                onClose()
            }
        }catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        }
    };

    // Edit Note
    const editNote = async () => {
        const noteId = noteData._id;

        try {
            const response = await axiosInstance.put(`/edit-note/${noteId}`, {
                title,
                content,
                tags,
                isTodo,
                checklist,
            });

            if (response.data && response.data.note) {
                showToastMessage("Note Updated Successfully")
                getAllNotes()
                onClose()
            }
        }catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        }
    };

    const handleAddNote = () =>{
        if (!title) {
            setError("Please enter the title");
            return;
        }

        if (!content && !isTodo) {
            setError("Please enter the content");
            return;
        }

        if (isTodo && checklist.length === 0) {
            setError("Please add at least one item to the checklist");
            return;
        }

        setError("");

        if (type === 'edit'){
            editNote()
        }else{
            addNewNote()
        }
    };

    return (
        <div className="relative dark:bg-slate-900">
            <button
            className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50 dark:hover:bg-slate-800"
            onClick={onClose}
            >
                <MdClose className="text-xl text-slate-400" />
            </button>


            <div className="flex flex-col gap-2 ">
                <label className="input-label dark:text-slate-400">TITLE</label>
                <input 
                  type="text"
                  className="text-2xl text-slate-950 dark:text-white dark:bg-slate-900 outline-none"
                  placeholder="Go to Gym At 5"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label dark:text-slate-400">{isTodo ? "CHECKLIST" : "CONTENT"}</label>

                {isTodo ? (
                    <ChecklistInput checklist={checklist} setChecklist={setChecklist} />
                ) : (
                    <textarea
                        type="text"
                        className="text-sm text-slate-950 dark:text-white outline-none bg-slate-50 dark:bg-slate-800 p-2 rounded"
                        placeholder="Content"
                        rows={10}
                        value={content}
                        onChange={({ target }) => setContent(target.value)}
                    />
                )}
            </div>

            <div className="mt-3">
                <label className="input-label">TAGS</label>
                <TagInput tags={tags} setTags={setTags}/>
            </div>

            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

            <button className="btn-primary font-medium mt-5 p-3" 
            onClick={handleAddNote}>
                {type === 'edit' ? 'UPDATE' : 'ADD'}
            </button>
        </div>
    )
}

export default AddEditNotes