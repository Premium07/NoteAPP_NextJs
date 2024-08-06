"use client";
import { MdOutlineClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const Popup = ({ setOpenPopup, editNote, setUpdateUI, text, id }) => {
  const [note, setNote] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    if (editNote) setNote(text);

    return () => {
      document.body.style.overflowY = "visible";
    };
  }, [editNote, text]);

  const saveEditedNote = () => {
    axios
      .put(`api/editnote/${id}`, { note })
      .then((res) => {
        // console.log(res.data);
        setUpdateUI((prev) => !prev);
        setOpenPopup(false);
      })
      .catch((err) => console.log(err));
  };

  const saveNewNote = () => {
    axios
      .post(`api/savenote`, {
        email: session?.user?.email,
        note,
      })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prev) => !prev);
        setOpenPopup(false);
      })
      .catch((err) => console.log(err));
  };

  const deleteNote = () => {
    axios
      .delete(`api/deletenote/${id}`)
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prev) => !prev);
        setOpenPopup(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-[#00000050] fixed top-0 left-0 w-full h-screen grid place-items-center z-50">
      <div className="bg-primaryDark w-full max-w-[800px] text-center p-4 md:px-8 relative rounded">
        <MdOutlineClose
          className="text-3xl text-gray-400 cursor-pointer absolute top-0 right-0 m-4"
          onClick={() => setOpenPopup(false)}
        />
        <h2 className="text-xl text-gray-400 pb-2">
          {editNote ? "Edit Note" : "Add Note"}
        </h2>
        <textarea
          name="textarea"
          rows={10}
          placeholder="Add Note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="bg-transparent w-full text-gray-400 p-4 outline-none"
        ></textarea>
        <div className="flex gap-4 justify-end mt-2">
          <button
            className="bg-red-600 text-gray-400 px-4 py-1 rounded-sm hover:bg-gray-600"
            onClick={deleteNote}
          >
            Delete
          </button>
          <button
            className="bg-green-700 text-gray-400 px-4 py-1 rounded-sm hover:bg-gray-600"
            onClick={editNote ? saveEditedNote : saveNewNote}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
