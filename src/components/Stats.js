import React, {Component} from 'react'
import { Card, Tabs, Button, Row, Col, Avatar, message } from 'antd'

import {Link} from 'react-router-dom'

const TabPane = Tabs.TabPane

const {Meta} = Card

class Stats extends Component{

  state={
    usernameOne:'',
    usernameTwo:'',
    userOneData: [],
    userTwoData:[],
    starsOne:0,
    starsTwo:0,
    winner:0,
    winnerUser:''
  }

  componentWillMount(){
    const userOne = JSON.parse(localStorage.getItem('userOne'))
    const userTwo = JSON.parse(localStorage.getItem('userTwo'))

    const GuserOne = localStorage.getItem('GithubUserOne')
    const GuserTwo = localStorage.getItem('GithubUserTwo')

    console.log(GuserOne)

    this.setState({
      usernameOne:GuserOne,
      usernameTwo:GuserTwo,
      userOneData: userOne,
      userTwoData: userTwo
    })

    this.getWinner()

  }

  getWinner=(e)=>{
    
    console.log("clickkkkk!!")
    const userOne = JSON.parse(localStorage.getItem('userOne'))
    const userTwo = JSON.parse(localStorage.getItem('userTwo'))

    const GuserOne = localStorage.getItem('GithubUserOne')
    const GuserTwo = localStorage.getItem('GithubUserTwo')
    
    let starsOne = [] 
    let starsTwo = []

    userOne.forEach(element => {
      starsOne.push(element.stargazers_count)
    });

    userTwo.forEach(element => {
      starsTwo.push(element.stargazers_count)
    });

    console.log(starsTwo)

    var maxOne = Math.max.apply(null,starsOne)
    var maxTwo = Math.max.apply(null,starsTwo)

    this.setState({
      starsOne: maxOne,
      starsTwo: maxTwo
    })

    if(maxOne>maxTwo){
      this.setState({
        winner:maxOne,
        winnerUser:GuserOne
      })
      
    }
    if (maxTwo>maxOne){
      this.setState({
        winner:maxTwo,
        winnerUser:GuserTwo
      })
    }

  }

  render(){
    const success = ()=>{message.success(`The winner is ${this.state.winnerUser} have ${this.state.winner} stars`)}
    const operations = <Button type='primary' onClick={success}>Get the Winner!</Button>
    return(
      <div>
        <div className='container has-text-centered'>
          <h3 className='title is-1'>Stats</h3>
          <Link className='subtitle is-2 navbar-item Width' to='/'>Back</Link>
        </div>
        <div className='container'> 
          <div className='notification'>
            <Tabs tabBarExtraContent={operations}>
              <TabPane tab={this.state.usernameOne} key="1">
              <Row gutter={18}>
                { this.state.userOneData.sort((a,b)=>b.stargazers_count - a.stargazers_count)
                  .map((r,i)=>{
                    
                    return <Col key={i} className="gutter-row" span={6}>
                          <div className="gutter-box">
                            <Card  className='Margin' key={i} title={r.owner.login} extra={<p>Stars {r.stargazers_count}</p>} style={{ width: 300 }}>
                            <Meta
                              avatar={<a href={r.owner.html_url}><Avatar src={r.owner.avatar_url}/></a>}
                              title={<a href={r.html_url} target='blank'>{r.name}</a>}
                              description={r.language != null ? r.language : "Sin lenguaje"}
                            />
                            </Card>
                          </div>
                        </Col>
                  })
                }
              </Row>
              </TabPane>
              <TabPane tab={this.state.usernameTwo} key="2">
                <Row gutter={18}>
                  { this.state.userTwoData.sort((a,b)=>b.stargazers_count - a.stargazers_count)

                    .map((r,i)=>{
                      
                      return <Col key={i} className="gutter-row" span={6}>
                            <div className="gutter-box">
                              <Card className='Margin' key={i} title={r.owner.login} extra={<p>Stars {r.stargazers_count}</p>} style={{ width: 300 }}>
                              <Meta
                                avatar={<a href={r.owner.html_url}><Avatar src={r.owner.avatar_url}/></a>}
                                title={<a href={r.html_url} target='blank'>{r.name}</a>}
                                description={r.language}
                              />
                              </Card>
                            </div>
                          </Col>
                    })
                  }
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </div>

      </div>
    )
  }
}

export default Stats