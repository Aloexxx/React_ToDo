import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, IToDo, selectCategory, toDoState } from "./atoms";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
    display:flex;
    justify-content:center;
`;

const List = styled.li`
    display:flex;
    background-color:#e8d0ff;
    width:98%;
    height:40px;
    margin:5px;
    padding:5px;
    align-items:center;
    justify-content:space-between;
    border-radius:10px;
    box-shadow:0px 15px 35px rgba(0,0,0,0.2);
`;

const MoveDeleteButton = styled.button`
    border:none;
    border-radius:4px;
    margin:2px;
`;

const ModifyPage = styled.div`
    display:flex;
    flex-direction:column;
    position:absolute;
    width:800px;
    height:500px;
    border-radius:20px;
    justify-content:center;
    align-items:center;
    background-color:#e7e7e7;
    top:30px;
    box-shadow:2px 2px 10px black;
`;

const ModifyPosition = styled.div`
    display:flex;
    flex-direction:column;
`;

const ChangeButton = styled.button`
    width:40px;
    height:30px;
    border:none;
    border-radius:10px;
    box-shadow:2px 2px 10px black;
`;

const OkButton = styled.button`
    padding:10px;
    margin:10px;
    width:120px;
    height:50px;
    border:none;
    border-radius:10px;
    box-shadow:1px 1px 10px black;
`;


function ToDo({text,category,id}:IToDo){
    const [modify,setModify] = useState(false);
    const setToDos = useSetRecoilState(toDoState);
    const selectC = useRecoilValue(selectCategory);
    const [categoryList,setCategoryList] = useRecoilState(categoryState);
    const onClick = (newCategory:IToDo["category"]) =>{
        setToDos(oldToDos=>{
            const targetIndex = oldToDos.findIndex(toDo=>toDo.id===id)
            const newToDo = {text,id,category:newCategory};
            return [
                ...oldToDos.slice(0,targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex+1),
            ]
        })
    }

    const onDelete=()=>{
        setToDos(oldToDos=>{
            return oldToDos.filter(a=>a.id!==id)
        })
    }
    const onRepair=()=>{
        setModify((prev)=>!prev)
    }
    return (
        <Container>
            <List>
                <span>{text}</span>
                {selectC.id===1?<span style={{opacity:0.5}}>category: {category.name}</span>:null}
                <div>
                    <MoveDeleteButton onClick={onRepair}>move</MoveDeleteButton>
                    <MoveDeleteButton onClick={onDelete}>Delete</MoveDeleteButton>
                </div>
            </List>
            {modify?
                <ModifyPage>
                    <ModifyPosition>
                        <span style={{margin:30,fontSize:22}}>현재 위치:{category.name}</span>
                        {categoryList.map(a=>category.id!==a.id && <ChangeButton key={a.id} onClick={()=>onClick(a)}>{a.name}</ChangeButton>)}
                        {categoryList.length!==1?null:<span>옮길 수 있는 카테고리가 없습니다.</span>}
                    </ModifyPosition>
                    <OkButton onClick={onRepair}>확인</OkButton>
                </ModifyPage>
            :
                null
            }
        </Container>
    );
}

export default ToDo;