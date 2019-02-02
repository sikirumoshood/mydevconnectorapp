import React, { Component } from "react";
import PropTypes from "prop-types";
import Transition from "react-transition-group/Transition";

class FadinComponent extends Component {
  render() {
    const duration = 600;

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

    return (
      <div>
        {/* appear is required to make the component animate on load other wise it won't. But if the in is toggled later
            you don't need appear.
      */}
        <Transition in={true} appear={true} timeout={duration} unmountOnExit>
          {state => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              {this.props.Component}
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

FadinComponent.propTypes = {
  Component: PropTypes.any.isRequired
};

export default FadinComponent;
