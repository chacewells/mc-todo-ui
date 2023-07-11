export default function TodoTable({
                                      title,
                                      items,
                                      onToggleDone,
                                      children
                                  }) {
    return (<table>
        <thead>
        <tr>
            <th>{title}</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {items.map(todoItem => (<tr key={todoItem.id}>
            <td>{todoItem.description}</td>
            <td><input type="checkbox" checked={todoItem.done} onChange={() => onToggleDone(todoItem)}/></td>
        </tr>))}
        {/* "Add" form */}
        {children}
        </tbody>
    </table>)
}