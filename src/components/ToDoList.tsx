import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {categoryState, ICategory, selectCategory, toDoSelector, toDoState } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";
import CreateButton from "./CreateButton";
import { AsyncLocalStorage } from "async_hooks";

const Container = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
    margin-top:50px;
    margin-bottom:50px;
    height:100vh;
    width:100vw;
`;

const CreateCategoryBox = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    margin-bottom:10px;
    width:25%;
    height:8%;
`;

const PlusMinusButton = styled.button`
    border:none;
    border-radius:20px;
`;

const ButtonBox = styled.div`
    display:flex;
    width:100%;
    height:10%;
    justify-content:space-between;
`;
const Button = styled.span<{category:boolean}>`
    text-align:center;
    padding-top:25px;
    background-color:${(props)=>props.category?"#828282":"#bebebe"};
    width:50%;
    &:first-child{
        border-top-left-radius:20px;
    }
    &:last-child{
        border-top-right-radius:20px;
    }
`;

const MainComponentBox = styled.div`
    width:50%;
    height:90%;
    border-radius:20px;
    box-shadow:1px 1px 9px black;
`;


const Selector = styled.select`
    width:20%;
    height:10%;
`;

function ToDoList(){
    const [showInput,setShowInput] = useState(false);
    const toDos = useRecoilValue(toDoSelector);
    const [allToDos,setAllToDos] = useRecoilState(toDoState);
    const [categoryList,setCategoryList] = useRecoilState(categoryState);
    const [category,setCategory] = useRecoilState(selectCategory);
    const onInput = (event:ICategory)=>{
        //typescript는 option 의 value 가 categories타입과 같다는 걸 알지 못한다.(as any를 붙입으로써 error 제거)
        setCategory({...event});
    };
    useEffect(()=>{
        const temp =localStorage.getItem("todo")||"";
        const tempC =localStorage.getItem("category")||"";
        setAllToDos(JSON.parse(temp));
        setCategoryList(JSON.parse(tempC));
    },[])
    useEffect(()=>{
        localStorage.setItem("todo",JSON.stringify(allToDos));
        localStorage.setItem("category",JSON.stringify(categoryList));
    },[allToDos])
    return(
        <Container>
            <CreateCategoryBox>
                <PlusMinusButton onClick={()=>setShowInput((prev)=>!prev)}>{showInput?<span>➖</span>:<span>➕</span>}</PlusMinusButton>
                {showInput?<CreateButton/>:null}
            </CreateCategoryBox>
            <MainComponentBox>
                <ButtonBox>
                    {categoryList.map((a)=><Button key ={a.id} category={category.name===a.name&&category.id===a.id?true:false} onClick={()=>onInput({...a})}>{a.name}</Button>)}
                </ButtonBox>
                <CreateToDo/>
                {category.id===1?
                    allToDos?.map(toDo=><ToDo key ={toDo.id} {...toDo}/>)
                :
                    toDos?.map(toDo=><ToDo key ={toDo.id} {...toDo}/>)
                }
            </MainComponentBox>
        </Container>
    )
}

export default ToDoList;