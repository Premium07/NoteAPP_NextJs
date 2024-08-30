import { motion } from "framer-motion";

const Note = ({ note, onClick, reference }) => {
  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.2 }}
      dragElastic={0.2}
      dragTransition={{
        bounceStiffness: 100,
        bounceDamping: 10,
        min: 0,
        max: 100,
        bounceDamping: 8,
      }}
      className="bg-primary w-[340px] text-gray-400 h-[200px] rounded-2xl cursor-pointer p-4 overflow-hidden"
    >
      <button onClick={onClick} className="text-green-500 mb-2">
        Open
      </button>
      <p className="h-[calc(200px - 32px)] overflow-hidden">{note}</p>
    </motion.div>
  );
};

export default Note;
