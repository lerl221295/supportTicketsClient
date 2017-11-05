import React, { Component } from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import CircularProgress from 'material-ui/CircularProgress';
import { /*Grid,*/ Row, Col } from 'react-flexbox-grid';

const Cargando = () => (
  <Row>
    <Col xs={12} md={12} sm={12}>
      <LinearProgress mode="indeterminate" />
    </Col>
  </Row>
)

const loadingComponentFirst = (WrappedComponent) => (
  class LoadingComponentFirst extends Component {
    state = {
      renderWrappedComponent: false,
    };

    componentDidMount() {
      setTimeout(() => {
        this.setState({
            renderWrappedComponent: true,
        });
      }, 0);
    }

    render() {
      const { renderWrappedComponent } = this.state;
      return renderWrappedComponent ? <WrappedComponent { ...this.props }/> : <Cargando / > ;
    }
  }
);

export default loadingComponentFirst