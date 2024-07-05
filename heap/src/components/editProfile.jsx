import React, { Component } from "react";
import { useParams } from "react-router-dom";
import withNavigateandLocation from './withNavigateandLocation';
import "./css/Create.css";
import RewardService from "../services/RewardService";
import VolunteerService from "../services/VolunteerService";
import UserService from "../services/UserService";
import MediaService from "../services/MediaService";

class EditProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            contactNo: "",
            email: "",
            gender: "",
            profilePicture: null
        }
        this.changeFullNameHandler = this.changeFullNameHandler.bind(this);
        this.changeContactNoHandler = this.changeContactNoHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.changeProfilePictureHandler = this.changeProfilePictureHandler.bind(this);
    }

    async componentDidMount(){
        const { id } = this.props.params;
        try{
            const res = await UserService.getProfile(id);
            console.log(res.status);
            console.log(res.data);
            this.setState({
                fullName: res.data.fullName,
                contactNo: res.data.contactNo,
                email: res.data.email,
                gender: res.data.gender,
            });
        } catch(error){
            console.error("failed to fetch user", error);
        }
    }
    changeFullNameHandler= (event) => {
        this.setState({fullName: event.target.value});
    }

    changeContactNoHandler= (event) => {
        this.setState({contactNo: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changeGenderHandler= (event) => {
        const selectedGender = event.target.value;
        let genderChar;

        if (selectedGender === 'male') {
        genderChar = 'M';
        } else if (selectedGender === 'female') {
        genderChar = 'F';
        } else if (selectedGender === 'non-binary') {
        genderChar = 'N';
        } else {
        genderChar = 'O';
        }
        this.setState({gender: genderChar});
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }   

    changeProfilePictureHandler= (event) =>{
        this.setState({ profilePicture: event.target.files[0] });
    }

    editProfile = (e) => {
        e.preventDefault();
        const { state } = this.props.location;
        console.log(state);
        let profile = {
            email: this.state.email,
            fullName: this.state.fullName,
            password: null,
            contactNo: this.state.contactNo,
            gender: this.state.gender,
            dob: null
        };
        const formData = new FormData();
        formData.append('pfp',this.state.profilePicture)
        console.log('profile => ' + JSON.stringify(profile));
        MediaService.uploadPfp(formData);
        VolunteerService.updateVolunteer(profile).then(res => {
            this.props.navigate('/');
            console.log(res.status);
        });

    }

    render() {

        console.log(this.state);
        return (
            <>
                <div className="wrapper">
<<<<<<< Updated upstream
                <h1 className="title">Edit Profile</h1>

                    <form enctype="multipart/form-data">
                        <label>
                            <p>Name</p>
                            <input type="text" required value={this.state.fullName} onChange={this.changeNameHandler}/>
                        </label>
                        <label>
                            <p>Contact No</p>
                            <input type="number" required value={this.state.contactNo} onChange={this.changeContactNoHandler}/>
                        </label>
                        <label>
                            <p>Email</p>
                            <input type="text" required value={this.state.email}
                                   onChange={this.changeEmailHandler}/>
                        </label>
                        <label>
                            <p>Gender</p>
                            <select
                                className="select select-bordered w-full"
                                onChange={this.changeGenderHandler}
                            >
                                <option disabled selected>
                                Select type
                                </option>
                                <option value={"male"}>Male</option>
                                <option value={"female"}>Female</option>
                                <option value={"non-binary"}>Non-binary</option>
                            </select>
                        </label>
                        <label>
                            <p>Profile Picture</p>
                            <input required type="file" accept="image/*" onChange={this.changeProfilePictureHandler}/>
                        </label>

                        <div className="button-container">
                            <button className="btn btn-wide" onClick={this.editProfile}>Save</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }


}

export default withNavigateandLocation((props) => <EditProfile {...props} params={useParams()} />);