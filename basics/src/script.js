/**
 * Created by sana on 9/26/16.
 */

function createElement(type, id) {
    var element = document.createElement(type);
    element.setAttribute('id', id);
    document.body.appendChild(element);

}

ReactDOM.render(
    <h1>First React Example! foo</h1>,
    document.getElementById('example')
);

// First component
var CommentBox = React.createClass({
    render: function() {
        return (
            <div>
                <label>Comment box</label>
                <textarea></textarea>
            </div>
        );
    }
});

ReactDOM.render(<CommentBox />, document.getElementById('commentBox'));

// Jan 11, 2017

function formatUserName(name) {
    if (name) {
        return name.first + ' ' + name.last;
    }
    return 'Some stranger is there';
}

const user = {
    first: 'Sana',
    last: 'Amin'
};

// direct rendering
ReactDOM.render(
    <div>
        <p>{formatUserName(user)}</p>
    </div>,
    document.getElementById('user-name')
)

// element as const
const element = (
    <div>
        <p>Hello, {formatUserName()}</p>
    </div>
);


ReactDOM.render(
    element,
    document.getElementById('user-name2')
)

// create element

const element2 = (
    <h1 className="greeting">
        Hello Sana !!
    </h1>
);

// the above is equivalent to the example below
// cannot write class here since it is part of javascript
const element3 = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello sana from create element'
);
// the above code will create an object like this
/**
 * const element3 = {
      type: 'h1',
      props: {
        className: 'greeting',
        children: 'Hello sana from create element'
      }
    };
 */

ReactDOM.render(
    element3,
    document.getElementById('greeting')
);

// React element are immutable, cannot be changed
// To update it, we will have to re-render it

function ticktoc(){
    const element = (
        <h3>The current time is {new Date().toJSON()}</h3>
    );

    ReactDOM.render(element, document.getElementById('current-date'));
}

setInterval(ticktoc, 1000);

// wow, the react will only render the difference that is, time. The other part of element will remain same. Check it with inspect element

//***************** Functions and Class components ***********

function FirstComponent(props) {
    return <h4>Hi {props.name}, this is our first component.</h4>
}

ReactDOM.render(FirstComponent({name: 'Sana'}), document.getElementById('first-component'));

// OR
const firstComponentElement = <FirstComponent name="Sana" />;
ReactDOM.render(firstComponentElement, document.getElementById('first-component'));

// OR

class SecondComponent extends React.Component {
    render() {
        return <h4>Hi {this.props.name}, this is our 2nd component via class.</h4>;
    }
}
const secondComponentElement = <SecondComponent name="Sana Amin"/>;
ReactDOM.render(secondComponentElement, document.getElementById('second-component'));


// Component inside another component

function Users() {
    return (
        <div>
            <FirstComponent name="Sana" />
            <FirstComponent name="Sidra" />
            <FirstComponent name="Aisha" />
        </div>
    )
}

ReactDOM.render(<Users />, document.getElementById('first-component'));

// Jan 13, 2017

function Avatar(props) {
    return <img width="50" height="50" src={props.user.picUrl} />;
}

function UserInfo(props) {
    return <div>
        <Avatar user={props.user.picUrl} />
        <p>{props.user.name}</p>
    </div>
}

const userObj = {
    name: 'Sana',
    picUrl: 'abc'
};

ReactDOM.render(<UserInfo user={userObj} />, document.getElementById('user-info'));

// Writing clock class

class Clock extends React.Component{
    render() {
        return <div>
            <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
        </div>
    }
}

function tick() {
    ReactDOM.render(<Clock date={new Date()} />, document.getElementById('clock'));
}

setInterval(tick, 1000);

// Now maintaining class state, only one time clock

class ClockState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    render() {
        return <div>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
    }
}

ReactDOM.render(<ClockState />, document.getElementById('clock-state'));

// Adds lifecycle now. Do the work when the DOM has been rendered and destroy if the component is not here any more

class ClockStateLC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    // will be called after DOM rendered
    // Initialize the timer
    componentDidMount() {
        this.clockInterval = setInterval(
            () => this.tick(),
            1000
        );
    }

    // will be called when the component destroyed
    componentWillUnmount() {
        clearInterval(this.clockInterval);
    }

    tick() {
        // sets the class state. Here, we are updating the date
        this.setState({
            date: new Date()
        });
    }

    render() {
        const color = 'red';
        return <div>
            <h2 style={{color: color}}>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
    }
}
ReactDOM.render(<ClockStateLC />, document.getElementById('clock-state-lc'));

// Event Handlers
// Lets create a link with component
// event name will be in camel case
// cannot do return false, instead we need to prevent default inside code

function MyLink() {
    function onClick(e) {
        e.preventDefault();
        alert('clicked');
    }
    return (
        <a href="#" onClick={onClick}>
            My Link
        </a>
    );
}
ReactDOM.render(<MyLink/>, document.getElementById('my-link'));

// with ES6 class

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggle: true };

        // need to bind with 'this'
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle() {
        this.setState(prevState => ({
            isToggle: !prevState.isToggle
        }));


        this.setState(function(prevState) {

        })
    }

    render() {
        return <button onClick={this.onToggle}>
            {this.state.isToggle ? 'ON' : 'OFF'}
        </button>
    }
}
createElement('div', 'toggle-btn');
ReactDOM.render(<Toggle/>, document.getElementById('toggle-btn'));

// Jan 20
// Login Component

//*
function MemberGreeting() {
    return <h3>Welcome Back!</h3>;
}

function GuestGreeting() {
    return <h3>Please Login</h3>
}

function Greetings(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <MemberGreeting/>;
    } else {
        return <GuestGreeting/>;
    }
}

function LogInButton(props) {
    return <button onClick={props.onClick}>Login</button>;
}

function LogOutButton(props) {
    return <button onClick={props.onClick}>Log out</button>;
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginState = this.handleLoginState.bind(this);
        this.handleLogoutState = this.handleLogoutState.bind(this);
        this.state = { isLoggedIn: false };
    }

    handleLoginState() {
        this.setState({isLoggedIn: true});
    }

   handleLogoutState() {
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        let button = null;
        if (isLoggedIn) {
            button = <LogOutButton onClick={this.handleLogoutState}/>;
        } else {
            button = <LogInButton onClick={this.handleLoginState}/>;
        }

        return (
            <div>
                <Greetings isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

createElement('div', 'login-container');
ReactDOM.render(<LoginControl />, document.getElementById('login-container'));

