"use client";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import Note from "@/components/Note";
import Popup from "@/components/Popup";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [editNote, setEditNote] = useState(false);
  const [currentNote, setCurrentNote] = useState({});

  const { data: session } = useSession();

  useEffect(() => {
    axios
      .post(`api/getnote/`, { email: session?.user?.email })
      .then((res) => {
        console.log(res.data);
        setNotes(res.data);
      })
      .catch((err) => console.log(err));
  }, [session?.user, updateUI]);

  if (!session?.user) return <Login />;

  return (
    <main className="px-5">
      <Navbar />
      <section className="appContainer relative">
        <div className="grid grid-cols-2 md:grid-col-3 gap-4 mt-4">
          {notes.map((note) => {
            return (
              <Note
                key={note._id}
                note={note.note}
                onClick={() => {
                  setEditNote(true);
                  setOpenPopup(true);
                  setCurrentNote(note);
                }}
              />
            );
          })}
        </div>
        <div
          className="rounded-full size-10 grid place-items-center text-2xl cursor-pointer text-gray-400 fixed z-10 right-0 bottom-0 m-4 bg-primary"
          title="Add Note"
          onClick={() => {
            setEditNote(false);
            setOpenPopup(true);
          }}
        >
          +
        </div>
      </section>
      {openPopup && (
        <Popup
          setOpenPopup={setOpenPopup}
          editNote={editNote}
          setUpdateUI={setUpdateUI}
          text={currentNote.note}
          id={currentNote._id}
        />
      )}
    </main>
  );
}
