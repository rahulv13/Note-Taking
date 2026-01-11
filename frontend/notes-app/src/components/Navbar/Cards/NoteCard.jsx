import moment from "moment";
import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title = "",
  date,
  content = "",
  tags = [],
  isPinned = false,
  onEdit = () => {},
  onDelete = () => {},
  onPinNote = () => {},
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">
            {date ? moment(date).format("DD MMM YYYY") : "No Date"}
          </span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2">
        {content.slice(0, 60)}
      </p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500 flex flex-wrap gap-1">
          {tags.length > 0 &&
            tags.map((tag, i) => (
              <span key={i}>#{tag}</span>
            ))}
        </div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
