import { toast } from 'react-toastify';
export const successMessage=()=>{
    toast.success("عملیات با موفقیت انجام شد",
        {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            icon:"🦄"
            }
        );
    }
        export const errorMessage=(msg)=>{
            toast.error(msg,
                    {
                        position: "top-left",
                        autoClose: 6000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme:"light",
                        icon:"🦄"
                    }
        
                );
}