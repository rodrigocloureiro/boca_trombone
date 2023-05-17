import { Component } from "react";

class Button extends Component {
  render() {
    const { btnClass, title, text } = this.props;

    return (
      <a role="button" className={ btnClass } title={ title }>{ text }</a>
    );
  }
}

export default Button;