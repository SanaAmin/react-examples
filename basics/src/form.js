/**
 * Created by sana_amin on 2/9/17.
 */

function createElement(type, id) {
    var element = document.createElement(type);
    element.setAttribute('id', id);
    document.body.appendChild(element);

}

function InputElement(props) {
    return <input value={props.value} onChange={props.handleChange}></input>;
}

function SelectElement(props) {
    const options = props.options.map((option) => {
        return <option key={option.key.toString()} value={option.key}> {option.value} </option>
    });
    return (<select value={props.value} onChange={props.onSelectChange}>
        <option key='-1' value='-1'> Select </option>
        {options}
    </select>);
}

class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.state = {name: '', gender: ''};
    }

    handleChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    submitForm() {
        alert('form has been submitted with name: ' + this.state.name + ' and gender: ' + this.state.gender);
    }

    onSelectChange(event) {
        if (event.target.value === '-1') {
            alert('Not a valid selection');
            return;
        }
        this.setState({
            gender: event.target.value
        });
    }

    render() {
        const genderOptions = [
            { key: 'M', value: 'Male' },
            { key: 'F', value: 'Female' }
            ];
        return <form onSubmit={this.submitForm}>
            <InputElement value={this.state.name} handleChange={this.handleChange} />
            <SelectElement value={this.state.gender} options={genderOptions} onSelectChange={this.onSelectChange} />
            <button type="submit">Submit</button>
        </form>
    }
}

createElement('div', 'form-container');
ReactDOM.render(<MyForm/>, document.getElementById('form-container'));