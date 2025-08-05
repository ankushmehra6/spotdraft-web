import { store } from "../../../../redux/store";
import { setUploadOpen } from "../../../../redux/slice/dashboard/slice";
import { MdHome } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";



export const config = [
    {
        icon:IoMdAddCircle,
        label:"New",
        onClick:()=>{
            store.dispatch(setUploadOpen(true))
        }
    },
    {
        icon: MdHome,
        label:"Home",
        onClick:()=>{
            window.location.href = "/";
        }
    },
]