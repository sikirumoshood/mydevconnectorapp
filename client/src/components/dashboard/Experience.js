import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profileActions";
import PropTypes from "prop-types";
import Moment from "react-moment";
import Transition from "react-transition-group/Transition";
class Experience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animate: true
    };
  }
  handleDelete = id => {
    this.props.deleteExperience(id);
  };
  render() {
    const experiences = this.props.experiences.map((exp, index) => (
      <tr key={exp._id}>
        <td>{index + 1}</td>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>{exp.location}</td>
        <td>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            type="button"
            style={{ boxShadow: "0px 0px 15px #FFE4EB", color: "#FF0004" }}
            className="btn btn-lg btn-outline-light"
            onClick={() => this.handleDelete(exp._id)}
          >
            <i className="fa fa-trash" />
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

    const experience = (
      <div>
        <h5 style={{ fontSize: "25px" }} className="display-4">
          Experience credentials
        </h5>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Company</th>
                <th>Title</th>
                <th>Location</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>{experiences}</tbody>
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
              {experience}
            </div>
          )}
        </Transition>
      </React.Fragment>
    );
  }
}

Experience.propTypes = {
  experiences: PropTypes.array.isRequired
};
export default connect(
  null,
  { deleteExperience }
)(Experience);
