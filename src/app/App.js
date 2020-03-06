import React, {Component} from 'react';

class App extends Component {
    constructor(){
        super();

        this.state ={
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };

        this.agregaTarea = this.agregaTarea.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.editTask = this.editTask.bind(this);
    }

    agregaTarea(event){
        if(this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => console.log(data));
            this.getTasks();
        }else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Task Saved'});
                this.setState({
                    title: '',
                    description: ''
                });
                this.getTasks();
            })
            .catch(err => console.error(err));
            //console.log(this.state);
        }
    event.preventDefault();
    }
    
    componentDidMount(){
        this.getTasks();
    }

    editTask(id){
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            })
        });
    }

    getTasks(){
        fetch('/api/tasks' )
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            this.setState({ tasks: data});
            console.log(this.state.tasks);
        })
    }

    deleteTask(id){
        if(confirm('Delete Task?')){
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                M.toast({html: 'Task Deleted'});
                this.getTasks();
            });
        }
    }

    handleChange(event){
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        });
    }

    render(){

        const {
            title,
            description
        } = this.state;
        return(
            <div>
                {/*Navigation*/}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Mern Stack</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.agregaTarea}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" value={title} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Task Descrption" className="materialize-textarea" value={description} ></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4" >Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.tasks && this.state.tasks.map(task => {
                                        return(
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    <button onClick={() => this.editTask(task._id)} style={{margin: '4px'}}>
                                                        <i>Edit</i>
                                                    </button>
                                                    <button onClick={() => this.deleteTask(task._id)} style={{margin: '4px'}}>
                                                        <i>Delete</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
             </div>
        );
    }
}

export default App;
