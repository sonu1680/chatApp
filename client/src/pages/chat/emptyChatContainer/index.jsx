import { animationDefaultOptions } from "@/lib/utils";
import Lottie from "react-lottie";
const EmptyChatCntainer = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all " >

        <Lottie isClickToPauseDisabled={true} height={200} width={200} options={animationDefaultOptions}   />

        <div className="text-opacity-90 text-white flex flex-col gap-5 items-center transition-all duration-300 text-3xl text-center mt-10 lg:text-4xl ">
            <h3 className="poppins-medium" >
                Hi this is chat app.
            </h3>
        </div>
    </div>
  )
}

export default EmptyChatCntainer