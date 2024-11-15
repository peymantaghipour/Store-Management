import { PostForm } from "../Adapters/Api";

export const registerPictureAction={url:"api/Pictures",type:"post"};


export default class PictureService
{
    registerPicture(picture)
    {
       return PostForm(registerPictureAction,picture);
    }
}