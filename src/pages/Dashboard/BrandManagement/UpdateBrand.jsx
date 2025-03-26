import { useParams } from "react-router-dom"
import CreateBrand from "./CreateBrand";

const UpdateBrand = () => {
    const {id}=useParams();
  return (
    <>
     <CreateBrand Id={id}/>
    </>
  )
}

export default UpdateBrand;