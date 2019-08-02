import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { withAlert, AlertManager } from 'react-alert';

import MuiTypography from '@material-ui/core/Typography';

import Paper from 'components/atoms/Paper';
import Tabs from 'components/atoms/Tabs';
import SignIn from 'components/templates/SignIn';
import SignUp from 'components/templates/SignUp';
import Ajax from 'utils/Ajax';

import 'assets/scss/SignPage.scss';

interface SignPageProps {
  alert: AlertManager;
}

interface SignPageState {
  index: 0 | 1;
  pending: boolean;
  signing: boolean;
}

class SignPage extends React.Component<SignPageProps, SignPageState> {
  constructor(props: SignPageProps) {
    super(props);
    this.state = { index: 0, pending: false, signing: false };
  }

  isDuplicatedId = async (id: string) => {
    let isDuplicated = false;
    await this.setState({ pending: true }, () => {
      Ajax.get(`/members/duplicate/${id}`)
        .then(response => {
          isDuplicated = true;
        })
        .finally(() => this.setState({ pending: false }));
    });

    return isDuplicated;
  };

  onSubmitSignIn = (data: object) => {
    this.setState({ pending: true }, () => {
      Ajax.post('/members', data)
        .then(response => {
          Ajax.defaults.headers.common['Authorization'] = response.data.token;
          this.setState({ pending: false, signing: true });
          this.props.alert.success('로그인 성공');
        })
        .catch(error => {
          this.setState({ pending: false });
          this.props.alert.error('로그인 실패');
        });
    });
  };

  onSubmitSignUp = (data: object) => {
    this.setState({ pending: true }, () => {
      Ajax.post('/members/signup', data)
        .then(() => {
          this.setState({ index: 0, pending: false });
          this.props.alert.success('회원 가입 성공');
        })
        .catch(error => {
          this.setState({ pending: false });
          this.props.alert.error('회원 가입 실패');
        });
    });
  };

  onChangeTabs = (e: React.ChangeEvent<{}>, value: any) => {
    this.setState({ index: value });
  };

  render() {
    if (this.state.signing) return <Redirect to="/" />;
    return (
      <Paper className="sign-page">
        <Paper className="sign-page__wrapper" square>
          <Tabs.HorizontalTabs
            centered
            indicatorColor="secondary"
            textColor="secondary"
            value={this.state.index}
            onChange={this.onChangeTabs}
          >
            <Tabs.HorizontalTab
              label={
                <MuiTypography variant="h6" gutterBottom>
                  로그인
                </MuiTypography>
              }
            />
            <Tabs.HorizontalTab
              label={
                <MuiTypography variant="h6" gutterBottom>
                  회원가입
                </MuiTypography>
              }
            />
          </Tabs.HorizontalTabs>
          <div className="sign-page__contents">
            {this.state.index === 0 && (
              <SignIn pending={this.state.pending} onSubmit={this.onSubmitSignIn} />
            )}
            {this.state.index === 1 && (
              <SignUp
                isDuplicatedId={this.isDuplicatedId}
                pending={this.state.pending}
                onSubmit={this.onSubmitSignUp}
              />
            )}
          </div>
        </Paper>
      </Paper>
    );
  }
}

export default withAlert()(SignPage);
