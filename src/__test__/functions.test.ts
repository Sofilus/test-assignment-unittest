import { 
    addTodo,
    changeTodo, 
    removeAllTodos,
    sortTodoList
} from "../ts/functions";

import { Todo } from "../ts/models/Todo";

describe("Tests that belongs to function addTodo", () => {

   test("add todo to list", () => {

      const list: Todo[] = [];
      const str: string = "Clean";

      let addTodoResult = addTodo(str, list);

      expect(list).toEqual([{text: "Clean", done: false}]);
      expect(addTodoResult).toEqual({ success: true, error: "" });
   });

   test("Dont add todo to list", () => {

      const list: Todo[] = [];
      const str: string = "Go";

      let errorMessage = addTodo(str, list);

      expect(list.length).toBe(0);
      expect(errorMessage).toEqual({ success: false, error: "Du måste ange minst tre bokstäver" });
   });
});

test("ChangeTodo function should change done:boolean value to opposite", () => {

   let todo = new Todo("Clean", false);
   
   changeTodo(todo);

   expect(todo.done).toEqual(true);
});

test("removeAllTodos function should remove listitem ", () => {

   const list: Todo[] = [{text: "Clean", done: false}];

   removeAllTodos(list);

   expect(list.length).toBe(0);
});

test("Should sort todo list in alphabetic order", () => {
   
   let list: Todo[] = [{text: "b", done: true}, {text: "a", done: true}];

   sortTodoList(list);

   expect(list).toEqual([{text: "a", done: true}, {text: "b", done: true}]);
});