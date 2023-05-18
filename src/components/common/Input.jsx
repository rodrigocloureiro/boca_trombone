import { Component } from "react";

// Renderiza um input de acordo com as props recebidas
class Input extends Component {
  render() {
    const { type, name, placeholder, id, className, event, autoComplete, value, disable, handleNavigateSuggestions, required, minLength, maxLength, inputRef } = this.props;
    
    return <input type={ type } name={name} placeholder={ placeholder } id={ id } className={ className } onInput={ event } autoComplete={ autoComplete } defaultValue={ value } disabled={ disable } onKeyDown={ handleNavigateSuggestions } required={required}  minLength={minLength} maxLength={maxLength} ref={inputRef} />
  }
}

export default Input;
