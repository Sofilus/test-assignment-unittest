/**
 *@jest-environment jsdom
 */

import * as main from '../ts/main';
import * as functions from '../ts/functions';
import { Todo } from "../ts/models/Todo";

beforeEach(() => {
    document.body.innerHTML = "";
});

describe("Tests that belongs to function createNewTodo", () => {

    test("Should call function displayError if text has less than 3 letters", () => {

        const text: string = "He";
        let list: [] = []; 
        let spyOnDisplayError = jest.spyOn(main,"displayError").mockReturnValue();

        main.createNewTodo(text, list);

        expect(spyOnDisplayError).toHaveBeenCalledTimes(1);
        spyOnDisplayError.mockRestore();
    });

    test("Should call function createHtml if text has more than 2 letters", () => {

        const text: string = "Hello World";
        let list: [] = []; 
        let spyOnCreateHtmlFunction = jest.spyOn(main,"createHtml").mockReturnValue();

        main.createNewTodo(text, list);

        expect(spyOnCreateHtmlFunction).toHaveBeenCalledTimes(1);
        spyOnCreateHtmlFunction.mockRestore();
    });
});

describe("Tests that belongs to function dispalyError", () => { 

    test("Should add error text to div", () => {

        document.body.innerHTML = `<div id="error" class="error">`;
        let error: string = "Error";
        let show: boolean = true;

        main.displayError(error, show);

        let result = document.getElementById("error")?.innerHTML;
        expect(result).toEqual("Error");
    });

    test("If true, class 'show' should be added to div", () => {

        document.body.innerHTML = `<div id="error" class="error">`;
        let error: string = "Error";

        main.displayError(error, true);

        let result: HTMLDivElement = document.getElementById("error") as HTMLDivElement;
        expect(result.classList.contains("show")).toBe(true);
    });

    test("If false, class 'show' should not be added to div", () => {

        document.body.innerHTML = `<div id="error" class="error">`;
        let error: string = "Error";

        main.displayError(error, false);

        let result: HTMLDivElement = document.getElementById("error") as HTMLDivElement;
        expect(result.classList.contains("show")).toBe(false);
    });
});

test("Test for function clearTodo, Should call function createHtml and removeAllTodo", () => {

    let list: [] = [];
    let spyOnCreateHtml = jest.spyOn(main,"createHtml").mockReturnValue();
    let spyOnRemoveAllTodos = jest.spyOn(functions,"removeAllTodos").mockReturnValue();
    
    main.clearTodos(list);

    expect(spyOnCreateHtml).toHaveBeenCalledTimes(1);
    expect(spyOnRemoveAllTodos).toHaveBeenCalledTimes(1);
    spyOnCreateHtml.mockRestore();
    spyOnRemoveAllTodos.mockRestore();
});

test("Test for function toggleTodo, Should call function changeTodo and createHtml", () => {

    let todo: Todo = {text: "Hello world", done: false};
    let spyOnChangeTodo = jest.spyOn(functions,"changeTodo").mockReturnValue();
    let spyOnCreateHtml = jest.spyOn(main,"createHtml").mockReturnValue();

    main.toggleTodo(todo);

    expect(spyOnChangeTodo).toHaveBeenCalledTimes(1);
    expect(spyOnCreateHtml).toHaveBeenCalledTimes(1);
    spyOnChangeTodo.mockRestore();
    spyOnCreateHtml.mockRestore();
});

describe("Tests that belongs to function createHtml", () => {
   
    test("done = false, Should create html li without class 'todo__text--done'", () => {

        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
        let list: Todo[] = [{text: "Clean", done: false}];
        let newHtml = `<li class="todo__text">Clean</li>`;
        
        main.createHtml(list);

        let result = document.getElementById("todos")?.innerHTML;
        expect(result).toEqual(newHtml);
    });

    test("done = true, Should create html li with class 'todo__text--done'", () => {

        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
        let list: Todo[] = [{text: "Clean", done: true}];
        let newHtml = `<li class="todo__text--done todo__text">Clean</li>`;

        main.createHtml(list);

        let result = document.getElementById("todos")?.innerHTML;
        expect(result).toEqual(newHtml);
    });

    test("Should call function toggleTodo if li are clicked", () => {

        document.body.innerHTML = `<ul id="todos" class="todo">
        <li class="todo__text--done todo__text">Clean</li>
        </ul>`;
        let list: Todo[] = [{text: "Clean", done: true}];
        let spyOnToggleTodo = jest.spyOn(main,"toggleTodo");

        main.createHtml(list);

        document.querySelector("li")?.click();
        expect(spyOnToggleTodo).toHaveBeenCalledTimes(1);
        spyOnToggleTodo.mockRestore();
    });
});