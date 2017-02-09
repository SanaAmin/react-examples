/**
 * Created by sana_amin on 1/23/17.
 */

function createElement(type, id) {
    var element = document.createElement(type);
    element.setAttribute('id', id);
    document.body.appendChild(element);

}

function DeleteItem(props) {
    return <small onClick={props.onClick}>x</small>;
}

function ListItem(props) {
    return <li>{props.value} <DeleteItem onClick={props.onDelete} value={props.value} /></li>;
}

function AddItem(props) {
    return <div>
        <input type="text" placeholder="Type value" onChange={props.onChange} />
        <button onClick={props.onAdd}>Add Item</button>
    </div>;
}

class NumberList extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {numbers: this.props.numbers, newNumber: 0};
    }
    onDelete(number) {
        this.setState((prevState) => {
            let index = prevState.numbers.indexOf(number);
            numbers: prevState.numbers.splice(index, 1);
        });
    }

    onAdd() {
        this.setState((prevState) => {
            numbers: prevState.numbers.push(this.state.newNumber);
        });
    }

    onChange(e) {
        var newValue = e.target.value;
        this.setState({newNumber: newValue});
    }

    render() {
        const numbers = this.state.numbers;
        const listItem = numbers.map((number) =>
            <ListItem key={number.toString()}
                      value={number}
                      onDelete={this.onDelete.bind(this, number)}/>
        );
        return(
            <div>
                <ul>
                    {listItem}
                </ul>
                <AddItem onChange={this.onChange} onAdd={this.onAdd} />
            </div>
        );
    }

}

createElement('div', 'list-items');
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(<NumberList numbers={numbers}/>, document.getElementById('list-items'));

