import moment from "moment";
import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const NoteCard = ({
  title = "",
  date,
  content = "",
  tags = [],
  isPinned = false,
  isTodo = false,
  checklist = [],
  onEdit = () => {},
  onDelete = () => {},
  onPinNote = () => {},
}) => {
  return (
    <div className="border rounded p-4 bg-white dark:bg-slate-800 dark:border-slate-700 hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium dark:text-white">{title}</h6>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {date ? moment(date).format("DD MMM YYYY") : "No Date"}
          </span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300 dark:text-slate-500"}`}
          onClick={onPinNote}
        />
      </div>

      {isTodo ? (
          <div className="mt-2 flex flex-col gap-1">
              {checklist.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-center gap-1">
                      {item.isDone ?
                        <MdCheckBox className="text-primary text-sm"/> :
                        <MdCheckBoxOutlineBlank className="text-slate-400 text-sm"/>
                      }
                      <span className={`text-xs ${item.isDone ? 'line-through text-slate-400' : 'text-slate-600 dark:text-slate-300'}`}>
                          {item.text}
                      </span>
                  </div>
              ))}
              {checklist.length > 3 && (
                  <span className="text-xs text-slate-400">+ {checklist.length - 3} more items</span>
              )}
          </div>
      ) : (
        <p className="text-xs text-slate-600 mt-2 dark:text-slate-300">
            {content?.slice(0, 60)}
        </p>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap gap-1">
          {tags.length > 0 &&
            tags.map((tag, i) => (
              <span key={i}>#{tag}</span>
            ))}
        </div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600 dark:text-slate-400 dark:hover:text-green-500"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500 dark:text-slate-400 dark:hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
