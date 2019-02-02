import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profileActions";
import PropTypes from "prop-types";
import Moment from "react-moment";
import Transition from "react-transition-group/Transition";

class Education extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animate: true
    };
  }
  handleDelete = id => {
    this.props.deleteEducation(id);
  };
  render() {
    const educations = this.props.educations.map((edu, index) => (
      <tr key={edu._id}>
        <td>{index + 1}</td>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldofstudy}</td>
        <td>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            type="button"
            style={{ boxShadow: "0px 0px 15px #FFE4EB" }}
            className="btn btn-lg btn-outline-light"
            onClick={() => this.handleDelete(edu._id)}
          >
            <i className="fa fa-trash text-danger" />
          </button>
        </td>
      </tr>
    ));

    const duration = 400;

    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0
    };

    const transitionStyles = {
      entering: { opacity: 0.01 },
      entered: { opacity: 1 },
      exiting: { opacity: 0.01 },
      exited: { opacity: 0 }
    };

    const dashboard = (
      <div>
        <h5 style={{ fontSize: "25px" }} className="display-4">
          Education credentials
        </h5>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>School</th>
                <th>Degree</th>
                <th>Field of Study</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>{educations}</tbody>
          </table>
        </div>
      </div>
    );

    return (
      <React.Fragment>
        {/* appear is required to make the component animate on load other wise it won't. But if the in is toggled later
            you don't need appear.
      */}
        <Transition
          in={this.state.animate}
          appear={true}
          timeout={duration}
          unmountOnExit
        >
          {state => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              {dashboard}
            </div>
          )}
        </Transition>
      </React.Fragment>
    );
  }
}

Education.propTypes = {
  educations: PropTypes.array.isRequired
};
export default connect(
  null,
  { deleteEducation }
)(Education);
