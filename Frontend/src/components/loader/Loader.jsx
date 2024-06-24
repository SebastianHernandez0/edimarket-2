import { Blocks } from "react-loader-spinner"

export function Loader() {
    return (
        <div className="flex flex-col justify-center items-center my-36">
            <Blocks
                height="80"
                width="80"
                color="#42bea6"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
            />
        </div>
    )
}