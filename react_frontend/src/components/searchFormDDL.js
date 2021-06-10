import axios from 'axios';
import '../css/searchFormDDL.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import React, { Component }from 'react';
import Animal from './animalObj';
import Header from './navbarComp';
import { Container, Row, Col, Input, Button,Form } from 'reactstrap';


const RESULT_API = "http://127.0.0.1:8888/api/petresult/";
const ANIMAL_LISTAPI = "http://127.0.0.1:8888/api/animallist/";
const BREED_LISTAPI = "http://127.0.0.1:8888/api/breedlist/";

class HomeSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animalDDL: [],
            breedDDL: [],
            petResult: [],
            allPets:[],
            dataFetch: false,
            // Form input queries
            animalType:'',
            breedType:'',
            zipCode:'',
            age:'', 
            //Validating form
            animalTypeValid: false,
            breedTypeValid: false,
            zipCodeValid: false,
            ageValid: false,
            isFormValid: false        
        }
        this.getAPI = this.getAPI.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.selectBreed = this.selectBreed.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validateForm = this.validateForm.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.getAllPets = this.getAllPets.bind(this);
    };

    handleBlur = (e) => {
        const checkVal = new RegExp('^0+');
        const checkVal2 = new RegExp('[^0-9]+');

        if(e.key==='.'){e.preventDefault();}

        if (checkVal.test(this.state.age) || checkVal.test(this.state.zipCode)){
            this.setState({
                age : this.state.age.replace(/^0+/,''), 
                zipCode : this.state.zipCode.replace(/^0+/,'')
            });          
        } 
        else if(checkVal2.test(this.state.age) || checkVal2.test(this.state.zipCode)){
            this.setState({
                age : this.state.age.replace(/[^0-9]*/g,''), 
                zipCode : this.state.zipCode.replace(/[^0-9]*/g,'')
            });
        }
        else
            return;       
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        switch(name){
            case 'animalType':
                this.setState({
                    animalTypeValid: !(value == 'Select Animal') ? true : false
                },this.validateForm);
                break;
            case 'breedType':
                this.setState({
                    breedTypeValid: !(value == 'Select Breed') ? true : false
                },this.validateForm);
                break;
            case 'zipCode':
                this.setState({
                    zipCodeValid: (!(Number(value) === 0)) ? true : false
                },this.validateForm);
                break;
            case 'age':
                this.setState({
                    ageValid: (!(Number(value) === 0)) ? true : false
                },this.validateForm);
                break;
            default:
                break;
        }
    }

    componentDidMount(){
        this.handleSubmit;
    }

    getAPI = () => {
        axios.get(ANIMAL_LISTAPI)
            .then(response => {
                this.setState({
                    animalDDL: response.data
                });
            });
    }

    selectBreed = () => {      
        let result = [];
        axios.get(BREED_LISTAPI)
            .then(response => {
                response.data.forEach(elem => {
                    if(elem.animalType.animalType === this.state.animalType ){
                        result.push(elem)
                    }
                })
                this.setState({
                    breedDDL:result,
                });
            }); 
    }

    validateForm = () =>{      
        this.setState({isFormValid: this.state.animalTypeValid && this.state.breedTypeValid && this.state.ageValid && this.state.zipCodeValid}); 
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let result = [];
        let params = new URLSearchParams();
        params.append("age", this.state.age);
        params.append("breed__animalType__animalType", this.state.animalType);
        params.append("breed__breedType", this.state.breedType);
        params.append("zipCode", this.state.zipCode);       
        let request = {
            params: params
        };
        axios.get(RESULT_API, request)
            .then(response => {
                response.data.forEach( elem =>{
                    result.push(elem)
                })
                this.setState({
                    petResult: result,
                    dataFetch: true,                    
                })
            });
    }

    getAllPets = () =>{
        let result = [];
        axios.get(RESULT_API)
            .then(response => {
                response.data.forEach(elem =>{
                    result.push(elem)
                })
                this.setState({
                    allPets: result,
                    dataFetch: false,                    
                })
            })
    }

    render(){
        let animals = null; 
        if(this.state.dataFetch === true){
            animals = (
                <Container className="containerResult" fluid >
                    <Row> 
                    {
                        this.state.petResult.map((elem) => {
                            return <Animal                                
                                name={elem.name}
                                age={elem.age}  
                                description={elem.description}
                                breedType={elem.breed.breedType}
                                zip={elem.zipCode}
                                imageURL={elem.item_image_url}/>
                        })
                    }
                    </Row>                  
                </Container>
            );
        }
        else{
            animals = (
                <Container className="containerResult" fluid >
                    <Row> 
                    {
                        this.state.allPets.map((elem) => {
                            return <Animal                                
                                name={elem.name}
                                age={elem.age}  
                                description={elem.description}
                                breedType={elem.breed.breedType}
                                zip={elem.zipCode}
                                imageURL={elem.item_image_url}/>
                        })
                    }
                    </Row>                  
                </Container>
            );
        }

        return (
            <div>
                <Header click = {this.getAllPets}/>
                <br/>
                <br/>
                <br/>
                <br/>                 
                <div>
                    <Container fluid>
                        <Row>
                            <Col md={2}>
                                <Form onSubmit={this.handleSubmit}>
                                    <label><b>Animal:</b></label><br/>
                                    <div class="input-group input-group-sm mb-3">
                                        <Input
                                            class="form-select form-select-sm" 
                                            aria-label=".form-select-sm example" 
                                            type="select"
                                            value = {this.state.animalType}
                                            onClick = {this.getAPI}
                                            name = "animalType"
                                            onChange={this.handleInputChange}                                           
                                            >
                                            <option>Select Animal</option>
                                            {
                                                this.state.animalDDL.map((e, key) => {
                                                    return <option key={key} >{e.animalType}</option>;
                                                })
                                            }
                                        </Input>
                                    </div>
                                    <label><b>Breed:</b></label><br/>
                                    <div class="input-group input-group-sm mb-3">                                        
                                        <Input 
                                            class="form-select form-select-sm" 
                                            aria-label=".form-select-sm example"
                                            type="select"
                                            value = {this.state.breedType} 
                                            name ="breedType" 
                                            onClick = {this.selectBreed}
                                            onChange={this.handleInputChange}
                                            >
                                            <option>Select Breed</option>
                                            {
                                                this.state.breedDDL.map( (e,key) => {
                                                    return <option key={key}>{e.breedType}</option>;
                                                })
                                            }
                                        </Input>                                     
                                    </div>
                                    <label><b>Max age:</b></label><br/>
                                    <div class="input-group input-group-sm mb-3">                                         
                                        <Input class="form-control form-control-sm" type = "number" name = "age" value={this.state.age} 
                                            onChange={this.handleInputChange}
                                            onInput={this.handleBlur} 
                                            onKeyDown={this.handleBlur}
                                            onBlur={this.handleBlur}  
                                            min="1"
                                            step="1"/>                                                                                   
                                    </div>                                    
                                    <label><b>Zip:</b></label><br/>
                                    <div class="input-group input-group-sm mb-3">
                                        <Input class="form-control form-control-sm" type = "number" name = "zipCode" value={this.state.zipCode} 
                                            onChange={this.handleInputChange}
                                            onInput={this.handleBlur}
                                            onKeyDown={this.handleBlur}
                                            onBlur={this.handleBlur}   
                                            min="1"
                                            step="1"/>
                                    </div>
                                    <Button class="btn btn-outline-secondary" type="submit" disabled={!this.state.isFormValid}>Search</Button>                                                                                                             
                                </Form>
                                <br/>
                            </Col>
                            <Col md={10}>
                                {animals}
                            </Col>
                        </Row>
                    </Container>
                </div>                                 
            </div>            
        );
    }
}

export default HomeSearch;
