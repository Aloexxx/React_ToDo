import { useRecoilState } from "recoil";
import { categoryState } from "./atoms";
import {useForm} from "react-hook-form"
import styled from "styled-components";
import { useEffect } from "react";

const FormButton = styled.form`
    display:flex;
    flex-direction:row;
`;

const InputButton = styled.input`
    border:none;
    border-top-left-radius:20px;
    border-bottom-left-radius:20px;
`;
const BUttonButton = styled.button`
    border:none;
    border-top-right-radius:20px;
    border-bottom-right-radius:20px;
`;

function CreateButton(){
    const [category,setCategory] = useRecoilState(categoryState);
    const {register,handleSubmit,setValue} = useForm();
    const onSubmit=(e:any)=>{
        setCategory(oldCategory=>[...oldCategory,{name:e.input,id:Date.now()}]);
        setValue("input","")
    }
    useEffect(()=>{
        localStorage.setItem("category",JSON.stringify(category))
    },[category])
    return (   
        <FormButton onSubmit={handleSubmit(onSubmit)}>
            <InputButton {...register("input")} placeholder="createToDoList"/>
            <BUttonButton>submit</BUttonButton>
        </FormButton>
    )
}

export default CreateButton;