import React, { useState } from 'react';
import { MdAdd, MdClose } from "react-icons/md";

const ChecklistInput = ({ checklist, setChecklist }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const addNewItem = () => {
        if (inputValue.trim().length > 0) {
            setChecklist([...checklist, { text: inputValue, isDone: false }]);
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewItem();
        }
    };

    const handleRemoveItem = (index) => {
        const newChecklist = checklist.filter((_, i) => i !== index);
        setChecklist(newChecklist);
    };

    const toggleItemDone = (index) => {
        const newChecklist = checklist.map((item, i) => {
             if (i === index) {
                 return { ...item, isDone: !item.isDone };
             }
             return item;
        });
        setChecklist(newChecklist);
    }

    return (
        <div>
            <div className="flex items-center gap-2 mb-3">
                <input
                    type="text"
                    className="text-sm bg-transparent border px-3 py-2 rounded outline-none flex-1 dark:text-white dark:bg-slate-800 dark:border-slate-700"
                    placeholder="Add a task..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700 transition-colors"
                    onClick={() => addNewItem()}
                >
                    <MdAdd className="text-2xl text-blue-700 hover:text-white" />
                </button>
            </div>

            <div className="flex flex-col gap-2">
                {checklist.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                         <input
                            type="checkbox"
                            checked={item.isDone}
                            onChange={() => toggleItemDone(index)}
                            className="accent-primary"
                        />
                        <span className={`flex-1 text-sm ${item.isDone ? 'line-through text-slate-500' : 'text-slate-950 dark:text-white'}`}>
                            {item.text}
                        </span>
                        <button
                            onClick={() => handleRemoveItem(index)}
                        >
                            <MdClose className="text-xl text-slate-500 hover:text-red-500" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChecklistInput;
