import { Blocks } from "react-loader-spinner"
import Lottie from 'react-lottie';
import animationData from "./loader-animation.json"


export function Loader() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="flex flex-col justify-center items-center my-36">
            <Lottie options={defaultOptions} height={200} width={200} />
        </div>
    )
}