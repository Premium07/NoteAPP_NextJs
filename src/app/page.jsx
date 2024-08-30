"use client";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import Note from "@/components/Note";
import Popup from "@/components/Popup";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [editNote, setEditNote] = useState(false);
  const [currentNote, setCurrentNote] = useState({});

  const ref = useRef();

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
    <main className="px-5 relative overflow-hidden">
      <Navbar />
      <div className="absolute -z-10 top-60 left-1/2 -translate-x-1/2">
        <h1 className="text-9xl font-bold text-zinc-700">Note App.</h1>
      </div>
      <section className="relative w-full h-screen overflow-hidden">
        <div ref={ref} className="w-full h-full">
          <div className="grid grid-cols-2 md:grid-col-3 gap-4 mt-4">
            {notes.map((note) => {
              return (
                <Note
                  reference={ref}
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
