import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";


function SignupTopbar() {

  const [closeTopBar, SetCloseTopBar] = useState(false);

  const handleCloseTopbar = () => {
    SetCloseTopBar(true);
  }
  return (
    <AnimatePresence>
      {!closeTopBar && (
        <motion.div
          initial={false}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.3 }}
          className="py-2 px-4 text-[14px] text-white bg-buttonBackground flex items-center justify-between">
          <span className="flex-1 text-center">
            Sign up and get 20% off your first order. Sign Up Now
          </span>
          <IoMdClose className="cursor-pointer" size={20} onClick={handleCloseTopbar} />
        </motion.div>
      )}
    </AnimatePresence>


  )
}

export default SignupTopbar
