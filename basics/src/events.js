/**
 * Created by sana_amin on 2/15/17.
 */

function createElement(type, id) {
    var element = document.createElement(type);
    element.setAttribute('id', id);
    document.body.appendChild(element);

}

function List(props) {
    return <li data-value={props.value}>
        {props.value} --->
        <a data-action="view">View</a>
        ----
        <a data-action="delete">Delete</a>
    </li>;
}

class ListItems extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        var target = event.target;

        console.log('clicked on ' + target.parentElement.getAttribute('data-value') + ' for ' +
            target.getAttribute('data-action') + ' action');
    }

    render() {
        const numbers = [1, 2, 3, 4, 5];
        const items = numbers.map((number) =>
            <List key={number.toString()}
                  value={number}/>
        );

        return(
            <div>
                <ul onClick={this.handleClick}>
                    {items}
                </ul>
            </div>
        )
    }
}

createElement('div', 'event-container');
ReactDOM.render(<ListItems/>, document.getElementById('event-container'));