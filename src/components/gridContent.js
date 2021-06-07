import React, { Fragment } from 'react';
const axios = require('axios');

export class GridContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList:[{name:'default', image:'default'}],
      elements: [],
      gender: null,
      loading: true,
      error: null
    };

  }

  delay(ms){
    return new Promise(res => setTimeout(res, ms));
  }

  convertObject(array)
  {
    return array = array.map((value)=>{ 
      let nameCamp = value['name'];
      let name = nameCamp['title'] + ' ' + nameCamp['first'] + ' ' + nameCamp['last'];
      let image = value['picture']['large'];
      return {name, image }; 
    });
  }   

  async getUsers(gender){

    try {
      return await axios.get('https://randomuser.me/api', {
        params: {
          gender: gender,
          results: 10
        }
      }).then( async({ data })  => {
        return data['results'];
      }).catch((err) => {
        this.setState({loading:false, error: err.response.status + ' ' + err.response.statusText});
        return null;
      });

    } catch (error) {
      this.setState({loading:false, error: error.response.status + ' ' + error.response.statusText});
      return null;
    }
  }

  async populateUserList(mode) {

    this.setState({loading: true});
    
    let userList, gender;

    switch(mode){
      default:
      case 'new':
        const genderArray=['male', 'female'];
        const RNG = Math.floor(Math.random() * genderArray.length);
        gender = genderArray[RNG];
        userList = await this.getUsers(gender);
        if(userList)
        {
          userList = this.convertObject(userList);
          await this.delay(2000);
          this.setState({userList: userList, gender: gender, loading:false, error: null});
        }
        break;
      case 'more':
        const oldUserList = this.state.userList;
        gender = this.state.gender;
        let newUserList = await this.getUsers(gender);
        if(newUserList)
        {
          newUserList = this.convertObject(newUserList);
          userList = oldUserList.concat(newUserList);
          await this.delay(2000);
          this.setState({userList: userList, loading:false, error:null});
        }
        break;          
    }
  }

 drawCards(userList, loading) {

  let elements=[];

  if(loading)
  {
    elements.push(
      <div className="d-flex justify-content-center">
        <div className="spinner-border m-5" style={{width: '3rem', height: '3rem'}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  else
  {
    userList.forEach((element, index) => {
      const {name, image} = element;
  
      elements.push(
        <div className='col' key={index}>
        <div className="card text-center shadow ">
          <img src={image} className="card-img-top" alt="..."/>
          <div className="card-body" >
            <h5 className="card-title" >{name}</h5>
          </div>
        </div>
        </div>
        );
    });
    elements=(
      <div className='row row-cols-1 row-cols-md-5 g-4'>
        {elements}
      </div>);
  }

  return elements;
    
 }

 drawButton(loading){

  let text, span;

  text = loading ? 'Loading...' : 'Add 10 people';
  span = loading ? (<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>) : null;

  return(<button type="button" className="btn btn-secondary" onClick={this.populateUserList.bind(this, 'more')} disabled={loading}>{span} {text}</button>);

 }

 drawErrorMessage(error) {
   if(error)
   {
    return (
      <div className="py-2" style={{color:'red'}}>
        {error}
      </div>
    );
   }
   else
   {
     return [];
   }
  
}

 componentDidMount()
 {
   this.populateUserList('new');
 }


  render() {

    const {userList, loading, error} = this.state;

    const elements = this.drawCards(userList, loading);
    const button = this.drawButton(loading);

    const errorMessage = this.drawErrorMessage(error);
    return (
      <Fragment>
        {elements}
      <br></br>
      {button}
      {errorMessage}
      </Fragment>
    );
  }
}
