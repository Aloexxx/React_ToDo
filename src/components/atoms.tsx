import { atom ,selector } from "recoil";

//enum은 계속해서 써야하는 값을 저장하는 도구이다.
//enum은 기본적으로 숫자로 이루어져 있다.
// export enum Categories{
//     "TO_DO"="TO_DO",
//     "DOING"="DOING",
//     "DONE"="DONE"
// }

export interface IToDo{
    text:string;
    id:number;
    category:ICategory;
}
export interface ICategory{
    name:string;
    id:number;
}

export const selectCategory = atom({
    key:"currentCategory",
    default:{name:"ALL",id:1},
});

export const categoryState = atom<ICategory[]>({
    key:"category",
    default:[{name:"ALL",id:1}],
})

//처음에 모든 값들은 toDoState에 들어간다.
//하지만 데이터를 보여줄 때는 toDoSelector를 이용해서 변형해서 보여준다.
export const toDoState = atom<IToDo[]>({
    key:"toDo",
    default:[],
});


//seslector의 요점은 atom을 가져다가 output을 변형할 수 있다.
export const toDoSelector = selector({
    key:"toDoSelector",
    //get function이 있어야 atom을 받을 수 있다.
    //{get} 은 selector의 내부로 atom을 가지고 올 수 있게 한다.
    get:({get})=>{
        const toDos = get(toDoState)
        const category = get(selectCategory);
        return toDos.filter((toDo)=>toDo.category.id===category.id)
    }
})
