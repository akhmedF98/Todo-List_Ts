/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { css } from "@emotion/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type todos = {
    id: string;
    text: string;
    completed: boolean;
};

function Todos() {
    const [todos, setTodos] = useState<[] | todos[]>([
        {
            id: uuidv4(),
            text: "Complete assignment",
            completed: false
        }
    ]);

    useEffect(() => {
        //empty the array on componentMount
        setTodos([]);
    }, []);

    const [inputValue, setInputValue] = useState<string>("");

    function onCreate(e: React.FormEvent) {
        e.preventDefault();

        //check if input is empty, if true, dont add new todo.
        if (!inputValue.length) return;

        //create new object with previous initial values
        const newTodo = {
            id: uuidv4(),
            text: inputValue,
            completed: false
        };

        setTodos([...todos, newTodo]);

        toast.success("New todo added!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });

        //after todo is added, reset the input value.
        setInputValue("");
    }

    function updateInputValue(e: React.ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value);
    }

    function onToggleComplete(id: string): void {
        setTodos((todoList) =>
            todoList.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        completed: !todo.completed
                    }
                    : todo
            )
        );
    }

    function onRemove(id: string): void {
        //filter the array and get the el that is not equal to the id passed.
        const filterTodos = todos.filter((el) => el.id !== id);

        //update array
        setTodos(filterTodos);
        toast.error("Todo deleted!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }

    return (
        <main>
            {/* eslint-disable-next-line */}
            <TodoForm
                onCreate={onCreate}
                inputValue={inputValue}
                updateValue={updateInputValue}
            />
            <ul>
                {todos.length ? (
                    todos
                        .map((task: todos) => {
                            return (
                                //eslint-disable-next-line
                                <Todo
                                    key={task.id}
                                    {...task}
                                    onToggleComplete={onToggleComplete}
                                    onRemove={() => onRemove(task.id)}
                                />
                            );
                        })
                        .reverse()
                ) : (
                    <small
                        css={css`
              display: flex;
              color: rgba(255, 255, 255, 0.445);
              margin-left: -1.36em;
            `}
                    >
                        Todo list is empty{" "}
                    </small>
                )}
            </ul>
        </main>
    );
}

type toDoProps = {
    id: string;
    text: string;
    completed: boolean;
    onRemove: () => void;
    onToggleComplete: (id: string) => void;
};

function Todo({ id, text, completed, onRemove, onToggleComplete }: toDoProps) {
    // styles
    const todo_section = css`
    display: flex;
    align-items: center;
  `;

    const todo_wrapper = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4px auto;
    color: #fff;
    background: #212121;
    padding: 16px;
    border-radius: 5px;
    width: 85%;
    text-transform: capitalize;
    &:hover {
      transform: scale(1.05);
      transition: transform 0.1s ease-in;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
    }
  `;

    const completed_todo = css`
    background: linear-gradient(90deg, rgb(255, 84, 17), #ff8c19);
  `;

    const todo_li = css`
    list-style: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `;
    const checkbox = css`
    appearance: none;
    height: 25px;
    width: 25px;
    border: 1px solid #615454;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    margin-left: -1.55em;
  `;

    const trash_icon = css`
    cursor: pointer;
    padding: 0.2em;
  `;

    return (
        <section css={todo_section}>
            <input
                className="checkbox"
                css={checkbox}
                id={id}
                type="checkbox"
                checked={completed}
                onChange={() => onToggleComplete(id)}
            />
            <article
                css={completed ? [todo_wrapper, completed_todo] : [todo_wrapper]}
            >
                <li css={todo_li}>{text}</li>
                <i css={trash_icon} onClick={onRemove} className="fas fa-trash"></i>
            </article>
        </section>
    );
}

type toDoFormProps = {
    onCreate: (e: React.FormEvent) => void;
    inputValue: string;
    updateValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function TodoForm({ onCreate, inputValue, updateValue }: toDoFormProps) {
    //  styles
    const form_input = css`
    padding: 14px 23px 14px 16px;
    border-radius: 4px 0 0 4px;
    border: 2px solid rgb(255, 84, 17);
    outline: none;
    width: 380px;
    background: transparent;
    color: #fff;
  `;

    const form_button = css`
    padding: 16px;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    outline: none;
    background: linear-gradient(90deg, rgb(255, 84, 17), #ff8c19);
    color: #fff;
    text-transform: capitalize;

    &:hover {
      background: linear-gradient(230deg, #ff8c19, rgb(255, 84, 17));
    }
  `;

    return (
        <form onSubmit={onCreate}>
            <input
                css={form_input}
                value={inputValue}
                onInput={updateValue}
                placeholder="Add a new todo"
            />
            <button css={form_button}> Add Todo</button>
        </form>
    );
}

export default function App() {
    const date: Date = new Date();

    function ending(date: number | boolean): string {
        switch (date) {
            case date === 1 || date === 21 || date === 31:
                return "st";
            case date === 2 || date === 22:
                return "nd";
            case date === 3 || date === 23:
                return "rd";
            default:
                return "th";
        }
    }

    const getEnding = ending(date.getDate());

    type daysKey = {
        [key: string]: string | number;
    };

    const days: daysKey = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    };
    const day = `${days[date.getDay()]} ${date.getDate()}${getEnding}`.toString();

    //styles
    const App_style = css`
    font-family: sans-serif;
    text-align: center;
    color: rgb(224, 214, 214);
    width: 550px;
    min-height: 600px;
    background: #2c2c2c;
    margin: 200px auto;
    padding-bottom: 1em;
    border-radius: 15px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 1.8em;
      text-align: left;
      padding: 0.8em 0em 0.3em 0.55em;
    }
  `;

    const day_style = css`
    color: rgb(255, 84, 17);
    background: linear-gradient(90deg, rgb(255, 84, 17), #ff8c19);
    font-size: 0.7em;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-left: 0;
    display: flex;
  `;

    return (
        <div className="App" css={App_style}>
            <h1>
                Today's schedule <small css={day_style}> {day} </small>
            </h1>

            <Todos />
            <ToastContainer />
        </div>
    );
}
