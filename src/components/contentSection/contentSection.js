import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import * as actionCreators from '../../common/actions';
import Button from '../button';
import './contentSection.css';

class Right extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  
  static propTypes = {
      history: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
      }).isRequired,
  }

  clickHandler(e) {
    e.preventDefault();
    this.props.actions.pageAnimationForward();
    setTimeout(this.props.history.push, 2000, '/profile');
  }

  emailHandler(email) {
    window.location.href = 'mailto:' + email;
    return false;
  }

  render() {
    const {translations} = this.props;
    return (
      <div className="content-container">
        <div className="job-application--button-container">
          <Link to="/profile" onClick={this.clickHandler}>
            <Button text={translations.resume} />
          </Link>
          <Button
            className="hidden-mobile-480"
            text={translations.sendEmail}
            onClick={() => this.emailHandler(translations.email)}
          />
        </div>
      </div>
    );
  }
}

/**
 * Maps state to components props
 *
 * @param {Object} state - Application state
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
function mapStateToProps(state) {
  return {
    common: state.common,
    translations: state.common.translations,
    routing: state.routing,
  };
}

/**
 * Maps dispatch to components props
 *
 * @param {Object} dispatch - Redux dispatch medhod
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Right));
