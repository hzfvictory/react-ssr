import React from "react";

const WithStyle = (DecoratedComponent, styles) => {
  return class NewComponent extends React.Component {
    componentWillMount() {
      if (this.props.staticContext) {
        this.props.staticContext.css.push(styles._getCss());
      }
    }

    render() {
      return <DecoratedComponent {...this.props} />
    }
  };
}

export default WithStyle