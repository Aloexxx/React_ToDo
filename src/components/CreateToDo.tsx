import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {selectCategory, toDoState } from "./atoms";
import styled from "styled-components";

const FormBox = styled.form`
    display:flex;
    width:100%;
    height:10%;
    padding:10px;
    justify-content:center;
    align-items:center;
    position:relative;
`;

const InputBox = styled.input`
    width:90%;
    height:100%;
    border:none;
    border-top-left-radius:20px;
    border-bottom-left-radius:20px;
    box-shadow:0px 15px 35px rgba(0,0,0,0.2);
`;

const InputButton = styled.button`
    width:10%;
    height:100%;
    border:none;
    border-top-right-radius:20px;
    border-bottom-right-radius:20px;
    box-shadow:0px 15px 35px rgba(0,0,0,0.2);
`;

interface IForm{
    toDo:string;
}

function CreateToDo(){
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(selectCategory);
    const {register,handleSubmit,setValue} = useForm<IForm>();
    const handleValid =(data:IForm) =>{
        setToDos(oldToDos => [{text:data.toDo,id:Date.now(),category},...oldToDos])
        setValue("toDo",""); //입력칸을 비워준다.
    };
    
    return ( 
        <FormBox onSubmit={handleSubmit(handleValid)}>
            <InputBox {...register("toDo",{
                    required:"Please write a To Do"
                })}
                placeholder="Write a to do"
            />
            <InputButton>Add</InputButton>
        </FormBox>
    );
}

export default CreateToDo;