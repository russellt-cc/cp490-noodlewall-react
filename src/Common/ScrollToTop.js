//https://reactrouter.com/web/guides/scroll-restoration

// React
import React from "react";

// React Router
import { withRouter } from "react-router-dom";

// Scroll back to the top when loading a different page
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);
