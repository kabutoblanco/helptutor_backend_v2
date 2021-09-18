import React from 'react';

// REDUX
import { useDispatch } from 'react-redux';

// ACTIONS
import { returnErrors } from '../../redux/actions/messages';
import { loginGoogle, addTutorGoogle, addStudentGoogle } from '../../redux/actions/auth';

import { useGoogleLogin } from 'react-google-login';

export default function AuthGoogle(props) {
  const { isLogin, role } = props;

  const dispatch = useDispatch();

  const responseGoogle = (res) => {
    const data = {
      token: res.tokenId,
    };
    if (isLogin) dispatch(loginGoogle(data));
    else {
      if (role != 'tutor') dispatch(addTutorGoogle(data));
      else if (role == 'student') dispatch(addStudentGoogle(data));
    }
  };

  const validate = (e) => {
    e.preventDefault();
    if (role == undefined && !isLogin) {
      dispatch(returnErrors({ detail: 'Seleccione un rol' }, 400));
    } else {
      signIn();
    }
  };

  const onSuccess = (res) => {
    responseGoogle(res);
  };

  const onFailure = (res) => {
    responseGoogle(res);
  };

  const { signIn } = useGoogleLogin({
    clientId: '581408483289-vlrheiceitim0evek4mrjnakqm5v07m7.apps.googleusercontent.com',
    onSuccess,
    onFailure,
    accessType: false,
    cookiePolicy: 'single_host_origin',
  });

  return (
    <button className='btn btn-secundary btn-google' onClick={validate}>
      <i className='fab fa-google mr-1'></i>
      Google
    </button>
  );
}
