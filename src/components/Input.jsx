import { Component } from "react";

class Input extends Component {
  render() {
    const { type, placeholder, id, className, event, eventHandler, autoComplete, value, disable, onChange, handleNavigateSuggestions } = this.props;
    
    return <input type={ type } placeholder={ placeholder } id={ id } className={ className } onInput={ event } autoComplete={ autoComplete } defaultValue={ value } disabled={ disable } onKeyDown={ handleNavigateSuggestions } />
  }
}

export default Input;
