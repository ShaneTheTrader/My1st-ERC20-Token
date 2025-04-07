import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl flex items-center justify-center w-40 h-40"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <h1 className="text-3xl font-bold text-white font-[Playfair Display] tracking-wide">
        MyToken
      </h1>
    </motion.div>
  );
};

export default Logo;
