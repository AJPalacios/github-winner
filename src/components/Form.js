import React,{ Component } from 'react'
import {Button, Input} from 'antd'
import {withRouter} from 'react-router-dom'
import axios from 'axios'



class Form extends Component {

  state = {
    loading: false,
    userOne:'',
    userTwo:''
  }

  handleChangeOne = (e)=>{
    const field = e.target.name
    const value = e.target.value
    this.setState({
      userOne:value
    })
    
  }
  handleChangeTwo = (e)=>{
    const field = e.target.name
    const value = e.target.value
    this.setState({
      userTwo:value
    })
    
  }

	getUser=(e)=>{

    const firstUrl = `https://api.github.com/users/${this.state.userOne}/repos`
    const secondUrl = `https://api.github.com/users/${this.state.userTwo}/repos`

    e.preventDefault()

    this.setState({
      loading:true
    })

    axios.all([
      axios.get(firstUrl),
      axios.get(secondUrl)
    ])
    .then(axios.spread((first,second)=>{
      this.setState({loading:false})

      localStorage.setItem('GithubUserOne', this.state.userOne)
      localStorage.setItem('GithubUserTwo', this.state.userTwo)

      localStorage.setItem('userOne', JSON.stringify(first.data))
      localStorage.setItem('userTwo', JSON.stringify(second.data))
      const stats = this.props.history
      stats.push('/stats')
    }))
	}

  render(){
    return(
      <div>
        <h1>Github Winner!</h1>
        <h2>Ingresa dos usernames</h2>
        <form onSubmit={this.getUser}>
          <Input
          name='usernameOne'
          type='text'
          placeholder='username one'
          onChange={this.handleChangeOne}
          />
          <Input
          name='usernameTwo'
          type='text'
          placeholder='username two'
          onChange={this.handleChangeTwo}
          />
          <Button type="primary" htmlType='submit'>GO!</Button>
        </form>
      </div>
    );
  }

}

export default withRouter(Form)
