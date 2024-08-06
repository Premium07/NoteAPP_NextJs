const Note = ({ note, onClick }) => {
  return (
    <div
      className="bg-primary text-gray-400 h-[200px] rounded-lg cursor-pointer p-4 overflow-hidden"
      onClick={onClick}
    >
      <p className="h-[calc(200px - 32px)] overflow-hidden">{note}</p>
    </div>
  );
};

export default Note;
