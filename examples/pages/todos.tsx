import React, { memo } from "react";
import { Injectable, RxService, useService, ServiceProxy } from "../../src";

@Injectable({ global: false, autoIgnore: true })
export class PS implements ServiceProxy {
  todos: { id: string; value: string; ui: { isEdit: boolean } }[] = [];

  // inputRef_ = useRef<HTMLInputElement>(null);
  inputRef_ = React.createRef<HTMLInputElement>();

  add() {
    if (!this.inputRef_.current) return;
    this.todos.push({
      // chrome 93
      id: (window.crypto as any).randomUUID(),
      value: this.inputRef_.current.value,
      ui: {
        isEdit: false,
      },
    });
    this.inputRef_.current.value = "";
  }

  del(i: number) {
    this.todos.splice(i, 1);
  }

  OnDestroy() {
    return true;
  }
}

export default memo(() => {
  const [ps] = useService(PS);
  return (
    <RxService
      services={[PS]}
      global={false}
      builder={() => {
        return (
          <>
            <p>
              <input ref={ps.inputRef_} type="text" className="input-todo" />
              <button className="add-btn" onClick={ps.add}>
                ADD
              </button>
            </p>
            <div>
              <ol className="list">
                {ps.todos.map((todo, i) => (
                  <li className="item" key={todo.id}>
                    {todo.ui.isEdit ? (
                      <input
                        className="item-input"
                        type="text"
                        defaultValue={todo.value}
                        onChange={(e) => (todo.value = e.target.value)}
                      />
                    ) : (
                      <span className="todo-value">{todo.value}</span>
                    )}

                    <button className="del-btn" onClick={() => ps.del(i)}>
                      删除
                    </button>

                    {/* save or edit */}
                    {todo.ui.isEdit ? (
                      <button
                        className="save-btn"
                        onClick={() => {
                          if (todo.value.trim()) todo.ui.isEdit = false;
                        }}
                      >
                        保存
                      </button>
                    ) : (
                      <button
                        className="edit-btn"
                        onClick={() => (todo.ui.isEdit = true)}
                      >
                        编辑
                      </button>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </>
        );
      }}
    />
  );
});
