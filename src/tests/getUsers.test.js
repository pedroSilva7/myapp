const axios = require('axios');

function convertObject(array)
    {
        return array = array.map((value)=>{ 
        let nameCamp = value['name'];
        let name = nameCamp['title'] + ' ' + nameCamp['first'] + ' ' + nameCamp['last'];
        let image = value['picture']['large'];
        return {name, image }; 
        });
    };

async function getUsers(gender){

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
};

test('convert manual object into desired object', () => {

    const manualObject =  [
        {name: { title:'some', first:'name', last:'0'}, picture:{ large:'some url0'}},
        {name: { title:'some', first:'name', last:'1'}, picture:{ large:'some url1'}},
        {name: { title:'some', first:'name', last:'2'}, picture:{ large:'some url2'}},
        {name: { title:'some', first:'name', last:'3'}, picture:{ large:'some url3'}},
        {name: { title:'some', first:'name', last:'4'}, picture:{ large:'some url4'}},
        {name: { title:'some', first:'name', last:'5'}, picture:{ large:'some url5'}},
        {name: { title:'some', first:'name', last:'6'}, picture:{ large:'some url6'}},
        {name: { title:'some', first:'name', last:'7'}, picture:{ large:'some url7'}},
        {name: { title:'some', first:'name', last:'8'}, picture:{ large:'some url8'}},
        {name: { title:'some', first:'name', last:'9'}, picture:{ large:'some url9'}},
      ];

    expect(convertObject(manualObject)).toEqual([
        {name: 'some name 0', image:'some url0'},
        {name: 'some name 1', image:'some url1'},
        {name: 'some name 2', image:'some url2'},
        {name: 'some name 3', image:'some url3'},
        {name: 'some name 4', image:'some url4'},
        {name: 'some name 5', image:'some url5'},
        {name: 'some name 6', image:'some url6'},
        {name: 'some name 7', image:'some url7'},
        {name: 'some name 8', image:'some url8'},
        {name: 'some name 9', image:'some url9'},        
      ]);
  });

  test('get 10 more users with the camp name and picture', async () => {

    
       
      const genderArray=['male', 'female'];
      const RNG = Math.floor(Math.random() * genderArray.length);

      const data = await getUsers(RNG);

      expect(data.length).toBe(10)

      data.forEach(element => {
        expect(element).toHaveProperty(['name', 'first']);
        expect(element).toHaveProperty(['name', 'title']);
        expect(element).toHaveProperty(['name', 'last']);
        expect(element).toHaveProperty(['picture', 'large']);
      });

  });

  test('expect error on axios', async () => {
       
      const genderArray=['male', 'female'];
      const RNG = Math.floor(Math.random() * genderArray.length);

      const data = await getUsers(RNG);
      expect(data).toBeFalsy;

  });