import React from 'react';
import ReactModal from "react-modal"
import WebcamCapture from "./WebcamComponent";
import "./modal.css";

interface IProps {
    changeFunction: Function;
}

interface IState {
    showModal: boolean;
    changeFunction: Function;
}

// modal costum CSS
const customStyles = {
    content : {
        top                   : '5px',
        left                  : '5px',
        right                 : '5px',
        bottom                : '5px',
    }
};


export default class Modal extends React.Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);
        this.state = {
            showModal: false,
            changeFunction: this.props.changeFunction,
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }



    render () {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.handleOpenModal}>
                    <i className="fas fa-camera"></i>
                    <span>Take Picture</span>
                </button>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    ariaHideApp={false}
                    style={customStyles}
                >
                    <i className="fas fa-times" onClick={this.handleCloseModal}></i>
                    <WebcamCapture captureFunction={this.state.changeFunction}
                                   modalFunction={this.handleCloseModal}/>
                </ReactModal>
            </div>
        );
    }
}

